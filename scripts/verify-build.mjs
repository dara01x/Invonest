/**
 * Verifies dist/ the way GitHub Pages will actually serve it.
 *
 * Guards the regression that got the site rejected from AdSense for "low value
 * content": deep routes returning HTTP 404 and pages shipping an empty
 * <div id="root"> with no crawlable text.
 *
 * Run after `npm run build`:  npm run verify
 */
import fsp from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { allRoutes, SITE_URL } from './routes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

/** Minimum crawlable text for a page to count as having content. */
const MIN_TEXT = 350;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

/** GitHub Pages semantics: exact file, then <path>/index.html, then <path>.html,
 *  otherwise 404.html with a real 404 status. Deliberately no SPA fallback. */
const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const direct = path.join(dist, urlPath);

  // GitHub Pages 301s /faq -> /faq/ when the path is a directory. Reproduce it
  // so canonical/sitemap mismatches surface here instead of in Search Console.
  if (!urlPath.endsWith('/')) {
    try {
      if ((await fsp.stat(direct)).isDirectory()) {
        res.writeHead(301, { Location: urlPath + '/' });
        res.end();
        return;
      }
    } catch {
      // not a directory; fall through
    }
  }

  for (const candidate of [direct, path.join(direct, 'index.html'), direct + '.html']) {
    try {
      const stat = await fsp.stat(candidate);
      if (stat.isFile()) {
        const type = MIME[path.extname(candidate)] ?? 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': type });
        res.end(await fsp.readFile(candidate));
        return;
      }
    } catch {
      // try the next candidate
    }
  }
  res.writeHead(404, { 'Content-Type': MIME['.html'] });
  res.end(await fsp.readFile(path.join(dist, '404.html')));
});

const port = await new Promise((resolve) =>
  server.listen(0, '127.0.0.1', () => resolve(server.address().port))
);
const origin = 'http://127.0.0.1:' + port;

function crawlableText(html) {
  const start = html.indexOf('<div id="root"');
  const body = start === -1 ? html : html.slice(start);
  return body
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

let failed = 0;
const fail = (msg) => {
  console.error('  FAIL ' + msg);
  failed++;
};

console.log('1. Every route returns 200 with crawlable content\n');
for (const route of allRoutes()) {
  const res = await fetch(origin + route.path, { redirect: 'follow' });
  const html = await res.text();
  const text = crawlableText(html);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [, ''])[1];
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [, ''])[1];
  const description = (html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1];
  const expectedCanonical = SITE_URL + (route.path.endsWith('/') ? route.path : route.path + '/');

  const problems = [];
  if (res.status !== 200) problems.push('status ' + res.status);
  if (text.length < MIN_TEXT) problems.push('only ' + text.length + ' chars of text');
  if (!title) problems.push('no <title>');
  if (canonical !== expectedCanonical) problems.push('canonical=' + canonical);
  if (!description) problems.push('no meta description');

  if (problems.length > 0) fail(route.path + ' -> ' + problems.join(', '));
  else console.log('  ok   ' + route.path.padEnd(46) + String(text.length).padStart(6) + ' chars');
}

console.log('\n2. Unknown URLs return a real 404\n');
for (const bad of ['/does-not-exist', '/blog/nope', '/admin']) {
  const res = await fetch(origin + bad);
  const html = await res.text();
  if (res.status !== 404) fail(bad + ' returned ' + res.status + ', expected 404');
  else if (html.includes('Single Page Apps for GitHub Pages')) {
    fail(bad + ' still serves the obsolete redirect shim');
  } else console.log('  ok   ' + bad.padEnd(20) + ' 404');
}

console.log('\n3. The app still boots and navigates client-side\n');
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const url = request.url();
    const blocked = ['googletagmanager', 'google-analytics', 'googlesyndication', 'doubleclick', 'chimpstatic'];
    if (blocked.some((host) => url.includes(host))) request.abort().catch(() => {});
    else request.continue().catch(() => {});
  });

  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto(origin + '/faq', { waitUntil: 'networkidle0' });
  const mounted = await page.evaluate(() => {
    const el = document.getElementById('root');
    return !!el && el.children.length > 0 && (el.innerText || '').includes('Frequently Asked Questions');
  });
  if (mounted) console.log('  ok   /faq renders after React takes over');
  else fail('/faq did not render after React booted');

  // An answer must be revealable by clicking, not merely present in the markup.
  await page.evaluate(() => {
    const heading = [...document.querySelectorAll('div, span')].find(
      (el) => (el.textContent || '').trim() === 'What is Invonest?'
    );
    heading?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  await new Promise((resolve) => setTimeout(resolve, 400));
  const answerRevealed = await page.evaluate(() =>
    (document.body.innerText || '').includes('free, open-source invoice generator')
  );
  if (answerRevealed) console.log('  ok   FAQ answer expands on click');
  else fail('FAQ answer did not expand on click');

  await page.goto(origin + '/blog/how-to-create-professional-invoices', { waitUntil: 'networkidle0' });
  const articleRendered = await page.evaluate(() => {
    const headings = [...document.querySelectorAll('h1')].map((h) => h.innerText.trim());
    return (
      headings.length === 1 &&
      headings[0] === 'How to Create Professional Invoices for Freelancers'
    );
  });
  if (articleRendered) console.log('  ok   deep blog URL renders with exactly one <h1>');
  else fail('deep blog URL did not render a single, correct <h1>');

  if (pageErrors.length > 0) fail('uncaught page errors: ' + pageErrors.slice(0, 3).join(' | '));
  else console.log('  ok   no uncaught page errors');
} finally {
  await browser.close();
  server.close();
}

console.log(failed === 0 ? '\nAll checks passed.' : '\n' + failed + ' check(s) failed.');
process.exit(failed === 0 ? 0 : 1);
