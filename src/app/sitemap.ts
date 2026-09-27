import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { guides } from '@/lib/content';
import { buildings } from '@/lib/buildings';
export default function sitemap():MetadataRoute.Sitemap{
  const paths=['/','/buildings/','/privacy/',...guides.map(g=>`/${g.slug}/`),...buildings.map(b=>`/buildings/${b.slug}/`)];
  return paths.map(path=>({url:`${site.origin}${path}`,changeFrequency:'monthly' as const,priority:path==='/'?1:path.startsWith('/buildings/')?.65:.8}));
}
