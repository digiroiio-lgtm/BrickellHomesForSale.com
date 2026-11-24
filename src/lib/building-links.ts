import { buildings, type Building } from './buildings';

// Editorial classification shared by building pages, guide "next step" blocks and the link audit.
const development = new Set(['una-residences','cipriani-residences-miami','viceroy-brickell','baccarat-residences-miami','residences-at-1428-brickell','st-regis-residences-miami','mercedes-benz-places-miami','2200-brickell','mandarin-oriental-residences-miami']);
const branded = new Set(['four-seasons-residences','cipriani-residences-miami','viceroy-brickell','baccarat-residences-miami','st-regis-residences-miami','mercedes-benz-places-miami','mandarin-oriental-residences-miami']);
const waterfront = new Set(['una-residences','baccarat-residences-miami','st-regis-residences-miami','mandarin-oriental-residences-miami','brickell-key-one','courts-brickell-key','courvoisier-courts','one-tequesta-point']);

export const isDevelopment = (slug: string) => development.has(slug);
export const isBranded = (slug: string) => branded.has(slug);
export const isWaterfront = (slug: string) => waterfront.has(slug);

export function areaLink(area: string) {
  if (area.includes('Brickell Key')) return { label: 'Brickell Key', href: '/brickell-key/' };
  if (area.includes('riverfront')) return { label: 'North Brickell / river edge', href: '/north-brickell-miami-river/' };
  if (area.includes('Bay')) return { label: 'Brickell Bay Drive', href: '/brickell-bay-drive/' };
  if (area.includes('South Brickell')) return { label: 'South Brickell', href: '/south-brickell/' };
  if (area.includes('Avenue')) return { label: 'Brickell Avenue', href: '/brickell-avenue/' };
  return { label: 'Brickell Core', href: '/brickell-core/' };
}

export function buildingType(slug: string) {
  if (branded.has(slug)) return { label: 'Branded residences', href: '/branded-residences/' };
  if (waterfront.has(slug)) return { label: 'Waterfront residences', href: '/waterfront-condos/' };
  if (development.has(slug)) return { label: 'New construction', href: '/new-construction/' };
  return { label: 'High-rise residences', href: '/high-rise-residences/' };
}

const byAreaHref = (href: string) => buildings.filter(b => areaLink(b.area).href === href);

/** Buildings that belong to an area guide path, or to a property-type guide path. */
export function buildingsForGuide(slug: string): Building[] {
  const area = byAreaHref(`/${slug}/`);
  if (area.length) return area;
  if (slug === 'branded-residences') return buildings.filter(b => branded.has(b.slug));
  if (slug === 'waterfront-condos') return buildings.filter(b => waterfront.has(b.slug));
  if (slug === 'new-construction' || slug === 'pre-construction') return buildings.filter(b => development.has(b.slug));
  if (slug === 'high-rise-residences') return buildings.filter(b => buildingType(b.slug).href === '/high-rise-residences/');
  return [];
}

/** Other buildings in the same area, starting after this one so every building is linked from a neighbour. */
export function siblingBuildings(slug: string, count = 3): Building[] {
  const self = buildings.find(b => b.slug === slug);
  if (!self) return [];
  const href = areaLink(self.area).href;
  const same = byAreaHref(href);
  const i = same.findIndex(b => b.slug === slug);
  const ordered = [...same.slice(i + 1), ...same.slice(0, i)];
  if (ordered.length >= count) return ordered.slice(0, count);
  // Small areas: top up with buildings of the same type, then any building after this one in the registry.
  const type = buildingType(slug).href;
  const extra = buildings.filter(b => b.slug !== slug && !ordered.includes(b) && buildingType(b.slug).href === type);
  return [...ordered, ...extra].slice(0, count);
}
