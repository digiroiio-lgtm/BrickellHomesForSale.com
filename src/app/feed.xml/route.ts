import { guides } from '@/lib/content';
import { buildings } from '@/lib/buildings';
import { site } from '@/lib/site';
import { buildingTitle, latestRevision, revisionDate } from '@/lib/seo';

export const dynamic = 'force-static';

const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rfc822 = (date: string) => new Date(`${date}T00:00:00Z`).toUTCString();

export function GET() {
  const entries = [
    ...guides.map(g => ({ path: `/${g.slug}/`, title: g.title, description: g.description })),
    ...buildings.map(b => ({ path: `/buildings/${b.slug}/`, title: buildingTitle(b.name), description: b.summary }))
  ].map(e => ({ ...e, date: revisionDate(e.path) ?? latestRevision() })).sort((a, b) => b.date.localeCompare(a.date) || a.path.localeCompare(b.path));
  const items = entries.map(e => `<item><title>${esc(e.title)}</title><link>${site.origin}${e.path}</link><guid isPermaLink="true">${site.origin}${e.path}</guid><pubDate>${rfc822(e.date)}</pubDate><description>${esc(e.description)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(site.name)}</title><link>${site.origin}/</link><description>${esc(site.description)}</description><language>en-us</language><lastBuildDate>${rfc822(latestRevision())}</lastBuildDate><atom:link href="${site.origin}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
