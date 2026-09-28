import type { Guide } from './content';

const areas = new Set(['brickell-key','brickell-avenue','brickell-core','south-brickell','brickell-bay-drive','north-brickell-miami-river']);
const propertyTypes = new Set(['condos-for-sale','luxury-condos','waterfront-condos','penthouses','new-construction','branded-residences','high-rise-residences','resale-properties','pre-construction']);

export function guideTrail(guide: Guide) {
  const home = { name: 'Home', path: '/' };
  const current = { name: guide.title, path: `/${guide.slug}/` };
  if (areas.has(guide.slug) || propertyTypes.has(guide.slug)) return [home, current];
  return [home, { name: 'Buyer guides', path: '/buyer-guides/' }, current];
}
