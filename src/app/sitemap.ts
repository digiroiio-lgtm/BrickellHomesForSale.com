import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { guides } from '@/lib/content';
import { buildings } from '@/lib/buildings';
import { revisionDate } from '@/lib/seo';

// Only canonical, indexable URLs. `lastmod` is the guarded editorial revision date (scripts/content-revisions.cjs);
// priority and changeFrequency are omitted because Google ignores them.
const paths = [
  '/',
  ...guides.map(g => `/${g.slug}/`),
  '/buildings/',
  '/buyer-guides/',
  ...buildings.map(b => `/buildings/${b.slug}/`),
  '/about/', '/methodology/', '/editorial-standards/', '/disclosures/', '/privacy/'
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map(path => {
    const date = revisionDate(path);
    if (!date) throw new Error(`Missing content revision for ${path}`);
    return { url: `${site.origin}${path}`, lastModified: new Date(`${date}T00:00:00.000Z`) };
  });
}
