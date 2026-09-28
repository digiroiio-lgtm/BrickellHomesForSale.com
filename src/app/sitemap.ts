import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { guides } from '@/lib/content';
import { buildings } from '@/lib/buildings';

// Guide and building dates are validated against their editorial content fingerprints.
import revisions from '@/lib/content-revisions.json';
const contentRevisions: Record<string, { date: string; hash: string }> = revisions;
const commercialHubs = new Set([
  'condos-for-sale', 'luxury-condos', 'waterfront-condos', 'penthouses', 'new-construction',
  'branded-residences', 'high-rise-residences', 'resale-properties', 'pre-construction'
]);
const primaryIntent = new Set([
  'brickell-key', 'brickell-avenue', 'brickell-core', 'south-brickell',
  'brickell-bay-drive', 'north-brickell-miami-river', 'ownership-costs', 'buying-a-home-in-brickell',
  'buying-a-condo-in-brickell',
  'brickell-condos-under-1m', 'brickell-condos-1m-2m', 'brickell-condos-2m-plus'
]);
const purchaseIntent = new Set([
  'brickell-condo-closing-process', 'brickell-condo-special-assessments',
  'brickell-condo-mortgage-requirements', 'cash-vs-financing-brickell-condo',
  'primary-residence-brickell', 'second-home-brickell', 'investment-properties-brickell',
  'pre-construction-buying-process'
]);

function entry(path: string, date: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly') {
  return { url: `${site.origin}${path}`, lastModified: new Date(`${date}T00:00:00.000Z`), changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry('/', contentRevisions['/'].date, 1, 'weekly'),
    ...guides.map(g => {
      const date = contentRevisions[`/${g.slug}/`].date;
      if (commercialHubs.has(g.slug)) return entry(`/${g.slug}/`, date, 0.9, 'weekly');
      if (primaryIntent.has(g.slug)) return entry(`/${g.slug}/`, date, 0.85, 'weekly');
      if (purchaseIntent.has(g.slug)) return entry(`/${g.slug}/`, date, 0.8, 'monthly');
      return entry(`/${g.slug}/`, date, 0.7, 'monthly');
    }),
    entry('/buildings/', contentRevisions['/buildings/'].date, 0.75, 'monthly'),
    entry('/buyer-guides/', contentRevisions['/buyer-guides/'].date, 0.75, 'monthly'),
    ...buildings.map(b => entry(`/buildings/${b.slug}/`, contentRevisions[`/buildings/${b.slug}/`].date, 0.7, 'monthly')),
    entry('/about/', contentRevisions['/about/'].date, 0.55, 'monthly'),
    entry('/methodology/', contentRevisions['/methodology/'].date, 0.5, 'monthly'),
    entry('/editorial-standards/', contentRevisions['/editorial-standards/'].date, 0.5, 'monthly'),
    entry('/disclosures/', contentRevisions['/disclosures/'].date, 0.2, 'yearly'),
    entry('/privacy/', contentRevisions['/privacy/'].date, 0.2, 'yearly')
  ];
}
