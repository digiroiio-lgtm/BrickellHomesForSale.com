// Internal-link audit over the rendered site (run with the server up): hub links, inbound counts, footer coverage.
const base = new URL(process.argv[2] || 'http://localhost:3000');
const hubs = new Set(['/condos-for-sale/', '/luxury-condos/', '/penthouses/', '/new-construction/', '/waterfront-condos/', '/resale-properties/', '/high-rise-residences/', '/branded-residences/']);
const sitewide = new Set(['/', '/about/', '/methodology/', '/editorial-standards/', '/disclosures/', '/privacy/', '/buyer-guides/', '/buildings/']);
const MIN_GUIDE_INBOUND = 4; // contextual links from other pages' <main>
const MIN_BUILDING_INBOUND = 2; // from guide pages, not counting sibling building pages
const problems = [];
const normalize = href => { const h = href.split('#')[0].split('?')[0]; return h.endsWith('/') || h.includes('.') ? h : `${h}/`; };
async function html(route) {
  const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(30000) });
  if (response.status !== 200) throw new Error(`${route}: expected 200, got ${response.status}`);
  return response.text();
}
async function main() {
  const xml = await html('/sitemap.xml');
  const routes = [...xml.matchAll(/<loc>https:\/\/brickellhomesforsale\.com([^<]*)<\/loc>/g)].map(m => m[1] || '/');
  const out = {};
  for (const route of routes) {
    const page = await html(route);
    const main = (page.match(/<main[\s\S]*?<\/main>/) || [''])[0];
    out[route] = [...new Set([...main.matchAll(/href="(\/[^"]*)"/g)].map(m => normalize(m[1])))].filter(h => h !== route);
  }
  const inbound = Object.fromEntries(routes.map(r => [r, new Set()]));
  for (const [route, links] of Object.entries(out)) for (const link of links) if (inbound[link]) inbound[link].add(route);
  for (const route of routes) {
    const isBuilding = route.startsWith('/buildings/') && route !== '/buildings/';
    if (sitewide.has(route)) continue;
    if (isBuilding) {
      const fromGuides = [...inbound[route]].filter(r => !r.startsWith('/buildings/')).length;
      if (fromGuides < MIN_BUILDING_INBOUND) problems.push(`${route}: only ${fromGuides} contextual link(s) from guide pages (min ${MIN_BUILDING_INBOUND})`);
    } else {
      if (!out[route].some(l => hubs.has(l))) problems.push(`${route}: guide does not link to a core property-type hub`);
      if (inbound[route].size < MIN_GUIDE_INBOUND) problems.push(`${route}: only ${inbound[route].size} inbound contextual link(s) (min ${MIN_GUIDE_INBOUND})`);
    }
  }
  if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; } else console.log(`Internal links OK for ${routes.length} pages.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
