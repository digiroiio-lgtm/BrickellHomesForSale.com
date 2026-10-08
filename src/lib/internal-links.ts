// Contextual guide-to-guide links. Each target lists the guides that should point to it because a buyer reading
// the source is plausibly the next reader of the target. Links are editorial, not a keyword-anchored cluster.
const sourcesByTarget: Record<string, string[]> = {
  'foreign-buyers': ['closing-costs', 'financing', 'buying-a-condo-in-brickell', 'condo-documents', 'property-taxes'],
  'financing': ['closing-costs', 'brickell-condo-mortgage-requirements', 'first-time-condo-buyer', 'foreign-buyers', 'cash-vs-financing-brickell-condo'],
  'best-condos-in-brickell': ['condos-for-sale', 'luxury-condos', 'brickell-vs-downtown-miami'],
  'brickell-condos-2m-plus': ['luxury-condos', 'penthouses', 'brickell-condos-1m-2m'],
  'brickell-commute': ['brickell-key-vs-brickell', 'brickell-vs-downtown-miami', 'brickell-key', 'brickell-avenue'],
  'first-time-condo-buyer': ['buying-a-condo-in-brickell', 'closing-costs', 'condos-for-sale', 'ownership-costs'],
  'brickell-condo-investment': ['investment-properties-brickell', 'brickell-condo-rental-restrictions', 'ownership-costs'],
  'primary-residence-brickell': ['buying-a-home-in-brickell', 'second-home-brickell', 'ownership-costs'],
  'second-home-brickell': ['primary-residence-brickell', 'foreign-buyers', 'condo-insurance'],
  'investment-properties-brickell': ['brickell-condo-investment', 'brickell-condo-rental-restrictions', 'property-taxes']
};

const bySource: Record<string, string[]> = {};
for (const [target, sources] of Object.entries(sourcesByTarget)) for (const source of sources) (bySource[source] ??= []).push(target);

export const contextualLinks = (slug: string): string[] => bySource[slug] ?? [];
