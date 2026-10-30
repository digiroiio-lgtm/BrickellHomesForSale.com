import { buildings } from './buildings';
import * as revisions from './content-revisions.json';

export const comparisonZones = ['Brickell Key', 'Brickell core / City Centre', 'Brickell Avenue', 'South Brickell', 'River edge', 'Brickell (broader area)'] as const;
export type ComparisonZone = (typeof comparisonZones)[number];
const zones: Record<string, ComparisonZone> = {
  'reach-brickell-city-centre':'Brickell core / City Centre', 'rise-brickell-city-centre':'Brickell core / City Centre',
  'brickell-key-one':'Brickell Key', 'courts-brickell-key':'Brickell Key', 'courvoisier-courts':'Brickell Key', 'one-tequesta-point':'Brickell Key',
  '500-brickell':'Brickell core / City Centre', 'residences-at-1428-brickell':'Brickell Avenue', 'st-regis-residences-miami':'South Brickell',
  'mercedes-benz-places-miami':'Brickell (broader area)', '2200-brickell':'South Brickell', 'mandarin-oriental-residences-miami':'Brickell Key',
  'icon-brickell':'River edge', 'millecento-1100':'Brickell core / City Centre', 'brickell-heights':'Brickell core / City Centre',
  'echo-brickell':'Brickell Avenue', 'brickell-flatiron':'Brickell core / City Centre', 'sls-lux':'Brickell core / City Centre',
  'four-seasons-residences':'Brickell Avenue', 'una-residences':'South Brickell', 'cipriani-residences-miami':'Brickell core / City Centre',
  'viceroy-brickell':'Brickell core / City Centre', 'baccarat-residences-miami':'River edge'
};

// New evidence is kept separate from inherited profile text. No unit count is asserted
// for Echo: its source gives conflicting counts in different sections.
export const comparisonEvidence: Record<string, { checked: string; facts: string[]; status: string }> = {
  'brickell-flatiron': { checked:'2026-10-30', facts:['CMC Group gives the project address as 1000 Brickell Plaza.', 'The portfolio records completion in 2019.', 'The portfolio describes a rooftop pool, fitness club and spa.'], status:'Completed — developer portfolio (2019)' },
  'echo-brickell': { checked:'2026-10-30', facts:['JDS gives the address as 1451 Brickell Avenue.', 'The portfolio records a 2017 year built.', 'JDS describes a 60-story residential tower with a pool and fitness amenities.'], status:'Year built — developer portfolio (2017)' },
  'icon-brickell': { checked:'2026-10-30', facts:['Related Group describes Icon Brickell as a three-tower development.', 'The portfolio identifies the property type as luxury condominium.', 'The developer describes a pool and spa in the shared amenity setting.'], status:'Current delivery stage not verified' }
};

const dates: Record<string, { date:string; hash:string }> = revisions;
export const comparisonBuildings = buildings.map(b => ({
  ...b,
  zone: zones[b.slug],
  category: b.profile.toLowerCase().includes('branded') ? 'Branded residential' : 'Residential condominium',
  evidence: comparisonEvidence[b.slug],
  profileReviewed: dates[`/buildings/${b.slug}/`]?.date
}));
export type ComparisonBuilding = (typeof comparisonBuildings)[number];
export const comparisonMethodology = 'Area filters are editorial groupings of the locations in our source-linked profiles, not legal boundaries. Residence categories describe published positioning, not a certification or a guarantee of services. Only explicitly dated evidence is newly checked; other rows retain the review dates of their existing profiles. Unverified status means not checked here, not incomplete or unavailable.';
