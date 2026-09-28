import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { guides } from '@/lib/content';
import { buildings } from '@/lib/buildings';
import { residentialGuides } from '@/lib/residential-content';

// Editorial dates, not build/deploy dates. Update a date only when the corresponding
// page's substantive content changes; newly added guides and building profiles are
// included in the 2026-09-28 set. Keep this manifest in review with content edits.
const originalGuideDate = '2026-09-27';
const revisedGuideDate = '2026-09-28';
const revisedGuides = new Set([
  'condos-for-sale', 'luxury-condos', 'waterfront-condos', 'penthouses', 'new-construction',
  'brickell-condo-closing-process', 'brickell-condo-special-assessments',
  'brickell-condo-rental-restrictions', 'brickell-condo-pet-rules',
  'brickell-condo-application-approval', 'brickell-condo-mortgage-requirements',
  'cash-vs-financing-brickell-condo', 'brickell-key', 'brickell-avenue',
  'brickell-vs-downtown-miami', 'brickell-key-vs-brickell', 'new-construction-vs-resale',
  ...residentialGuides.map(g => g.slug)
]);
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
    entry('/', '2026-09-28', 1, 'weekly'),
    ...guides.map(g => {
      const date = revisedGuides.has(g.slug) ? revisedGuideDate : originalGuideDate;
      if (commercialHubs.has(g.slug)) return entry(`/${g.slug}/`, date, 0.9, 'weekly');
      if (primaryIntent.has(g.slug)) return entry(`/${g.slug}/`, date, 0.85, 'weekly');
      if (purchaseIntent.has(g.slug)) return entry(`/${g.slug}/`, date, 0.8, 'monthly');
      return entry(`/${g.slug}/`, date, 0.7, 'monthly');
    }),
    entry('/buildings/', '2026-09-28', 0.75, 'monthly'),
    entry('/buyer-guides/', '2026-09-28', 0.75, 'monthly'),
    ...buildings.map(b => entry(`/buildings/${b.slug}/`, '2026-09-28', 0.7, 'monthly')),
    entry('/about/', '2026-09-28', 0.55, 'monthly'),
    entry('/methodology/', '2026-09-28', 0.5, 'monthly'),
    entry('/editorial-standards/', '2026-09-28', 0.5, 'monthly'),
    entry('/disclosures/', '2026-09-28', 0.2, 'yearly'),
    entry('/privacy/', '2026-09-28', 0.2, 'yearly')
  ];
}
