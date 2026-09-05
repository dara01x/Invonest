import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Blog slugs are the single source of truth in src/lib/blogData.ts.
 * Parsed rather than imported so this stays a plain Node script with no
 * TypeScript toolchain in the loop.
 */
export function blogSlugs() {
  const src = fs.readFileSync(path.join(root, 'src/lib/blogData.ts'), 'utf8');
  const slugs = [...src.matchAll(/^\s{4}id:\s*"([^"]+)"/gm)].map((m) => m[1]);
  if (slugs.length === 0) {
    throw new Error('No blog slugs found in src/lib/blogData.ts — has the file format changed?');
  }
  return slugs;
}

/** Every route that must exist as a real, crawlable HTML file. */
export function allRoutes() {
  return [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/invoice', changefreq: 'monthly', priority: '0.9' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8' },
    ...blogSlugs().map((slug) => ({
      path: `/blog/${slug}`,
      changefreq: 'monthly',
      priority: '0.7',
    })),
    { path: '/tutorial', changefreq: 'monthly', priority: '0.6' },
    { path: '/invoice-guide', changefreq: 'monthly', priority: '0.6' },
    { path: '/freelancing-tips', changefreq: 'monthly', priority: '0.6' },
    { path: '/faq', changefreq: 'monthly', priority: '0.6' },
    { path: '/about', changefreq: 'monthly', priority: '0.6' },
    { path: '/contact', changefreq: 'monthly', priority: '0.5' },
    { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  ];
}

export const SITE_URL = 'https://invonest.site';
