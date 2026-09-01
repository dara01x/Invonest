/**
 * Post-build prerenderer.
 *
 * The app is a client-rendered SPA, so the built dist/index.html ships an empty
 * <div id="root">. Search and ad crawlers that do little or no JavaScript saw a
 * site with no content, and every deep URL fell through to the GitHub Pages 404
 * handler and returned HTTP 404.
 *
 * This script serves dist/, drives a headless browser over every known route,
 * and writes the fully rendered DOM to dist/<route>/index.html. GitHub Pages
 * then serves each route as a real file: HTTP 200 with the content in the
 * source. It also regenerates sitemap.xml from the same route list so the two
 * cannot drift.
 *
 * Any failure exits non-zero: shipping a silently un-prerendered build would
 * take every deep link back to a 404.
 */
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { allRoutes, SITE_URL } from './routes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

/** Third parties are blocked while prerendering so their injected iframes,
 *  pixels and ad slots never get baked into the static HTML. The <script> tags
 *  stay in the markup, so they still run for real visitors. */
const BLOCKED_HOSTS = [
  'googletagmanager.com',
  'google-analytics.com',
  'googlesyndication.com',
  'doubleclick.net',
  'googleadservices.com',
  'googletagservices.com',
  'chimpstatic.com',
  'list-manage.com',
  'ezojs.com',
  'ezoic.net',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

/** Static server over dist/ with SPA fallback, so client-side routes resolve
 *  while we crawl them. */
function startServer() {
  const server = http.createServer(async (req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const candidate = path.join(dist, urlPath);
    if (!candidate.startsWith(dist)) {
      res.writeHead(403).end();
      return;
    }
    try {
      const stat = await fsp.stat(candidate);
      if (stat.isFile()) {
        const type = MIME[path.extname(candidate)] ?? 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': type });
        res.end(await fsp.readFile(candidate));
        return;
      }
    } catch {
      // fall through to the SPA fallback below
    }
    res.writeHead(200, { 'Content-Type': MIME['.html'] });
    res.end(await fsp.readFile(path.join(dist, 'index.html')));
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

function outputFileFor(routePath) {
  return routePath === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, routePath.replace(/^\//, ''), 'index.html');
}

/** Runs in the page: strip the obsolete GitHub Pages SPA redirect shim and
 *  return the rendered document. */
function serializeDocument() {
  document
    .querySelectorAll('script:not([src]):not([type="application/ld+json"])')
    .forEach((script) => {
      if ((script.textContent || '').includes('Single Page Apps for GitHub Pages')) {
        script.remove();
      }
    });
  return '<!doctype html>\n' + document.documentElement.outerHTML;
}

function rootTextLength() {
  const el = document.getElementById('root');
  return el ? (el.innerText || '').trim().length : 0;
}

/** Minimum rendered text before a route counts as prerendered. Well below the
 *  smallest real page, high enough to catch a blank or error render. */
const MIN_TEXT_LENGTH = 400;

async function main() {
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    throw new Error('dist/index.html not found - run `vite build` before prerendering.');
  }

  const routes = allRoutes();
  const { server, port } = await startServer();
  const origin = 'http://127.0.0.1:' + port;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const failures = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      if (BLOCKED_HOSTS.some((host) => url.includes(host))) {
        request.abort().catch(() => {});
      } else {
        request.continue().catch(() => {});
      }
    });

    for (const route of routes) {
      try {
        await page.goto(origin + route.path, { waitUntil: 'networkidle0', timeout: 45000 });
        await page.waitForFunction(
          'document.getElementById("root") && (document.getElementById("root").innerText || "").trim().length > ' +
            MIN_TEXT_LENGTH,
          { timeout: 30000 }
        );

        const html = await page.evaluate(serializeDocument);
        const textLength = await page.evaluate(rootTextLength);
        const title = await page.title();

        const outFile = outputFileFor(route.path);
        await fsp.mkdir(path.dirname(outFile), { recursive: true });
        await fsp.writeFile(outFile, html, 'utf8');

        console.log(
          '  ok   ' +
            route.path.padEnd(46) +
            String(textLength).padStart(6) +
            ' chars  ' +
            title.slice(0, 58)
        );
      } catch (error) {
        failures.push({ route: route.path, error: error.message });
        console.error('  FAIL ' + route.path + ': ' + error.message);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failures.length > 0) {
    throw new Error(
      'Prerendering failed for ' +
        failures.length +
        ' route(s):\n' +
        failures.map((f) => '  ' + f.route + ': ' + f.error).join('\n')
    );
  }

  await writeSitemap(routes);
  console.log('\nPrerendered ' + routes.length + ' routes and regenerated sitemap.xml');
}

async function writeSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const body = routes
    .map((r) =>
      [
        '  <url>',
        '    <loc>' + SITE_URL + (r.path.endsWith('/') ? r.path : r.path + '/') + '</loc>',
        '    <lastmod>' + today + '</lastmod>',
        '    <changefreq>' + r.changefreq + '</changefreq>',
        '    <priority>' + r.priority + '</priority>',
        '  </url>',
      ].join('\n')
    )
    .join('\n');
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    body +
    '\n</urlset>\n';
  await fsp.writeFile(path.join(dist, 'sitemap.xml'), xml, 'utf8');
  // Keep the checked-in copy in step so local and deployed sitemaps match.
  await fsp.writeFile(path.join(root, 'public', 'sitemap.xml'), xml, 'utf8');
}

main().catch((error) => {
  console.error('\nPrerender failed: ' + error.message);
  process.exit(1);
});
