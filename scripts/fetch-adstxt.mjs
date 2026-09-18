/**
 * Fetches Ezoic's managed ads.txt into public/ads.txt at build time.
 *
 * Ezoic requires ads.txt to redirect to their Ads.txt Manager so the entries
 * stay current as their demand partners change. GitHub Pages serves static
 * files only - no redirects, no cron - so instead we pull the managed file on
 * every build, and the deploy workflow runs on a daily schedule to keep it
 * fresh.
 *
 * A failure here never fails the build: a slightly stale ads.txt costs some ad
 * revenue, a failed deploy takes the whole site down.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'public', 'ads.txt');

/** Ezoic Ads.txt Manager endpoint for this site (publicly served, not a secret). */
const MANAGER_URL = 'https://srv.adstxtmanager.com/19390/invonest.site';

/** Sanity check: a real ads.txt names at least one seller relationship. */
function looksLikeAdsTxt(text) {
  return /^[^#\s].*,.*\b(DIRECT|RESELLER)\b/im.test(text);
}

async function main() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  let response;
  try {
    response = await fetch(MANAGER_URL, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from Ads.txt Manager`);
  }

  // Mirror the manager's bytes exactly, CRLF and all. Ezoic's validator
  // compares our file against theirs, so any rewriting - even harmless line
  // ending normalisation - risks being read as a mismatch.
  const bytes = Buffer.from(await response.arrayBuffer());
  const text = bytes.toString('utf8');
  if (!looksLikeAdsTxt(text)) {
    throw new Error('response did not look like an ads.txt file');
  }

  const previous = fs.existsSync(target) ? fs.readFileSync(target) : Buffer.alloc(0);
  fs.writeFileSync(target, bytes);

  const lines = text.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#')).length;
  console.log(
    `ads.txt: fetched ${bytes.length} bytes, ${lines} entries` +
      (bytes.equals(previous) ? ' (unchanged)' : ' (updated)')
  );
}

main().catch((error) => {
  console.warn(`ads.txt: could not refresh (${error.message}) - keeping the existing file`);
  if (!fs.existsSync(target)) {
    console.warn('ads.txt: no existing file to fall back on; the site will ship without one');
  }
  // Deliberately exit 0 - see the note at the top of this file.
});
