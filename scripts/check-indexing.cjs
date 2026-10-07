/* eslint-disable @typescript-eslint/no-require-imports */
// Audit server-rendered pages, without relying on JavaScript or Search Console access.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const canonicalOrigin = 'https://brickellhomesforsale.com';
const base = new URL(process.argv[2] || 'http://localhost:3000');
const revisions = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/lib/content-revisions.json'), 'utf8'));
const problems = [];
const fail = message => problems.push(message);
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m => [m[1].toLowerCase(), decode(m[2])]));
async function get(route) {
  const response = await fetch(new URL(route, base), { redirect: 'manual', signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${route}: expected 200, got ${response.status} (${response.headers.get('location') || ''})`);
  return { response, text: await response.text() };
}
async function main() {
  const { text: robots } = await get('/robots.txt');
  assert(!/^Host:/im.test(robots), 'robots.txt still emits the unsupported Host directive');
  assert(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), 'robots.txt sitemap origin differs');
  assert(!/^Disallow:\s*\/\s*$/im.test(robots), 'robots.txt blocks the whole site');
  const { text: xml } = await get('/sitemap.xml');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decode(m[1]));
  assert(urls.length, 'Empty sitemap');
  assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
  const paths = new Set();
  for (const url of urls) {
    const parsed = new URL(url);
    assert.equal(parsed.origin, canonicalOrigin, `Unexpected sitemap origin: ${url}`);
    assert(!parsed.search && !parsed.hash && parsed.pathname.endsWith('/'), `Noncanonical sitemap URL: ${url}`);
    paths.add(parsed.pathname);
  }
  assert.deepEqual([...paths].sort(), Object.keys(revisions).sort(), 'Sitemap and editorial page manifest differ');
  const links = new Map();
  let next = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (next < urls.length) {
      const url = urls[next++];
      const route = new URL(url).pathname;
      try {
        const { response, text } = await get(route);
        assert(/text\/html/i.test(response.headers.get('content-type') || ''), `${route}: not HTML`);
        assert(!/\b(noindex|none)\b/i.test(response.headers.get('x-robots-tag') || ''), `${route}: noindex response header`);
        // Ignore hydration payloads: only real HTML anchors count for discovery.
        const html = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
        const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
        const canonicals = [...head.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0])).filter(a => a.rel === 'canonical');
        assert.equal(canonicals.length, 1, `${route}: expected exactly one canonical in head`);
        assert.equal(canonicals[0].href, url, `${route}: canonical differs from sitemap`);
        for (const match of head.matchAll(/<meta\b[^>]*>/gi)) {
          const a = attrs(match[0]);
          if (/^(robots|googlebot)$/i.test(a.name || '')) assert(!/\b(noindex|none)\b/i.test(a.content || ''), `${route}: noindex meta`);
        }
        assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `${route}: expected one rendered H1`);
        const outgoing = new Set();
        for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
          const href = attrs(match[0]).href;
          if (!href) continue;
          const target = new URL(href, url);
          if (target.origin !== canonicalOrigin) continue;
          if (paths.has(target.pathname)) outgoing.add(target.pathname);
          else fail(`${route}: internal link outside sitemap: ${target.pathname}`);
        }
        links.set(route, outgoing);
      } catch (error) { fail(error.message); }
    }
  }));
  const depths = new Map([['/', 0]]);
  const queue = ['/'];
  for (let i = 0; i < queue.length; i++) {
    const route = queue[i];
    for (const target of links.get(route) || []) if (!depths.has(target)) {
      depths.set(target, depths.get(route) + 1);
      queue.push(target);
    }
  }
  for (const route of paths) {
    if (!depths.has(route)) fail(`${route}: unreachable from home through rendered links`);
    else if (depths.get(route) > 2) fail(`${route}: ${depths.get(route)} clicks from home (maximum 2)`);
  }
  const { response: icon, text: iconText } = await get('/favicon.ico');
  assert(/image\//i.test(icon.headers.get('content-type') || ''), 'favicon.ico is not served as an image');
  assert(iconText.length, 'favicon.ico is empty');
  if (problems.length) throw new Error(problems.join('\n'));
  console.log(`Indexing audit passed: ${urls.length} pages return 200, self-canonicalize, allow indexing and are reachable within two clicks. robots.txt and favicon.ico OK.`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
