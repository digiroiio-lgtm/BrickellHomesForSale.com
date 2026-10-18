import { buildings } from './buildings';

export const developmentSlugs = new Set(['una-residences','cipriani-residences-miami','viceroy-brickell','baccarat-residences-miami','residences-at-1428-brickell','st-regis-residences-miami','mercedes-benz-places-miami','2200-brickell','mandarin-oriental-residences-miami']);
export const brandedSlugs = new Set(['four-seasons-residences','cipriani-residences-miami','viceroy-brickell','baccarat-residences-miami','st-regis-residences-miami','mercedes-benz-places-miami','mandarin-oriental-residences-miami']);
export const waterfrontSlugs = new Set(['una-residences','baccarat-residences-miami','st-regis-residences-miami','mandarin-oriental-residences-miami','brickell-key-one','courts-brickell-key','courvoisier-courts','one-tequesta-point']);
export function areaLink(area:string) {
 if(area.includes('Brickell Key')) return {label:'Brickell Key',href:'/brickell-key/'};
 if(area.includes('riverfront')) return {label:'North Brickell / river edge',href:'/north-brickell-miami-river/'};
 if(area.includes('Bay')) return {label:'Brickell Bay Drive',href:'/brickell-bay-drive/'};
 if(area.includes('South Brickell')) return {label:'South Brickell',href:'/south-brickell/'};
 if(area.includes('Avenue')) return {label:'Brickell Avenue',href:'/brickell-avenue/'};
 return {label:'Brickell Core',href:'/brickell-core/'};
}


const typeGuides: Record<string, (slug: string) => boolean> = {
  'branded-residences': slug => brandedSlugs.has(slug),
  'waterfront-condos': slug => waterfrontSlugs.has(slug),
  'new-construction': slug => developmentSlugs.has(slug),
  'high-rise-residences': slug => !brandedSlugs.has(slug) && !waterfrontSlugs.has(slug) && !developmentSlugs.has(slug)
};

/** Building profiles that belong to an area or residence-type guide, using the same grouping the building pages use. */
export function profilesForGuide(guideSlug: string) {
  const byType = typeGuides[guideSlug];
  return buildings.filter(b => byType ? byType(b.slug) : areaLink(b.area).href === `/${guideSlug}/`);
}

/** Up to three other profiles in the same area, topped up with the same residence type. */
export function peersFor(slug: string) {
  const self = buildings.find(b => b.slug === slug);
  if (!self) return [];
  const areaHref = areaLink(self.area).href;
  const kind = (s: string) => brandedSlugs.has(s) ? 'branded' : waterfrontSlugs.has(s) ? 'waterfront' : developmentSlugs.has(s) ? 'development' : 'tower';
  const others = buildings.filter(b => b.slug !== slug);
  const sameArea = others.filter(b => areaLink(b.area).href === areaHref);
  const sameType = others.filter(b => kind(b.slug) === kind(slug) && !sameArea.includes(b));
  return [...sameArea, ...sameType].slice(0, 3);
}
