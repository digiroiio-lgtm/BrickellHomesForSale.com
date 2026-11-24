import { guideBySlug } from './content';
import { areaLink, buildingsForGuide } from './building-links';
import { buildings } from './buildings';

// Topic clusters for contextual "next step" links. Each guide links to the next peers in its cluster
// (cyclically), so every cluster member receives inbound links from its neighbours.
export const guideClusters: Record<string, string[]> = {
  costs: ['ownership-costs','hoa-fees','property-taxes','closing-costs','condo-insurance','condo-reserves','brickell-condo-special-assessments','financing','brickell-condo-mortgage-requirements','cash-vs-financing-brickell-condo'],
  process: ['where-to-find-brickell-condos','buying-a-condo-in-brickell','buying-a-home-in-brickell','first-time-condo-buyer','best-condos-in-brickell','condo-documents','condo-inspections','brickell-condo-application-approval','brickell-condo-closing-process','foreign-buyers'],
  objectives: ['primary-residence-brickell','second-home-brickell','investment-properties-brickell','brickell-condo-investment','brickell-condo-rental-restrictions','brickell-condo-pet-rules'],
  budget: ['condos-for-sale','brickell-condos-under-1m','brickell-condos-1m-2m','brickell-condos-2m-plus'],
  areas: ['brickell-key','brickell-avenue','brickell-core','south-brickell','brickell-bay-drive','north-brickell-miami-river','brickell-key-vs-brickell','brickell-vs-downtown-miami','brickell-commute','waterfront-vs-inland-brickell'],
  types: ['luxury-condos','penthouses','waterfront-condos','new-construction','branded-residences','high-rise-residences','resale-properties','pre-construction','condo-vs-branded-residence','new-construction-vs-resale','pre-construction-buying-process']
};

const hubByType: Record<string, string> = {
  'condo': 'condos-for-sale',
  'luxury condo': 'luxury-condos',
  'waterfront condo': 'waterfront-condos',
  'penthouse': 'penthouses',
  'new construction': 'new-construction',
  'resale': 'resale-properties',
  'high-rise residence': 'high-rise-residences',
  'branded residence': 'branded-residences'
};
export const coreHubs = ['condos-for-sale','luxury-condos','penthouses','new-construction','waterfront-condos'];

export type NextLink = { href: string; label: string; note?: string };
export type NextSteps = { hub: NextLink; guides: NextLink[]; buildingsHeading: string; buildings: NextLink[] };

const guideLink = (slug: string): NextLink => { const g = guideBySlug[slug]; return { href: `/${slug}/`, label: g.title, note: g.description }; };

/** The ordering of cluster peers after `slug`, cyclic, excluding the guide itself. */
export function clusterPeers(slug: string, count = 3): string[] {
  const key = Object.keys(guideClusters).find(k => guideClusters[k].includes(slug));
  if (!key) return [];
  const list = guideClusters[key];
  const i = list.indexOf(slug);
  return [...list.slice(i + 1), ...list.slice(0, i)].slice(0, count);
}

export function nextSteps(slug: string): NextSteps | null {
  const g = guideBySlug[slug];
  if (!g) return null;
  let hubSlug = hubByType[g.type] ?? 'condos-for-sale';
  if (hubSlug === slug) hubSlug = slug === 'condos-for-sale' ? 'luxury-condos' : 'condos-for-sale';
  const areaOrType = buildingsForGuide(slug);
  const peers = clusterPeers(slug).filter(s => s !== hubSlug);
  const guides = peers.map(guideLink);
  const near = areaOrType.slice(0, 10);
  const buildingsList: NextLink[] = near.map(b => ({ href: `/buildings/${b.slug}/`, label: b.name, note: b.summary }));
  const typeLabel: Record<string, string> = { 'branded-residences': 'branded residences', 'waterfront-condos': 'waterfront residences', 'new-construction': 'new construction', 'pre-construction': 'new construction', 'high-rise-residences': 'high-rise residences' };
  const heading = !areaOrType.length ? 'Research a specific building' : typeLabel[slug] ? `Building guides: ${typeLabel[slug]}` : `Buildings in ${areaLink(areaOrType[0].area).label}`;
  buildingsList.push({ href: '/buildings/', label: `All ${buildings.length} Brickell building guides`, note: 'Compare sourced project facts and the documents to request for each building.' });
  return { hub: guideLink(hubSlug), guides, buildingsHeading: heading, buildings: buildingsList };
}
