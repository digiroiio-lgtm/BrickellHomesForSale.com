// Search-result title/description for pages that already earn impressions.
// The on-page H1 and deck still come from the guide content; these only change the SERP snippet.
// Keep titles within the 60-character brand-suffixed limit and descriptions at 70-160 characters.
export const seoOverrides: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Brickell Homes for Sale: Condo Buyer Guides',
    description: 'Independent guides to Brickell, Miami condos and penthouses for sale: compare buildings, areas, HOA fees and costs, then request matched options.'
  },
  '/buildings/': {
    title: 'Brickell Condo Buildings: 23 Guides',
    description: 'Compare 23 Brickell condo buildings by location, amenities and ownership costs, with sourced facts and a document checklist. No live inventory.'
  },
  '/condos-for-sale/': {
    title: 'Brickell Condos for Sale: Buyer Guide',
    description: 'A guide to Brickell condos for sale: compare buildings, HOA fees, taxes and documents, then request a shortlist matched to your budget.'
  },
  '/luxury-condos/': {
    title: 'Brickell Luxury Condos for Sale Guide',
    description: 'What to compare in Brickell luxury condos for sale: service level, views, privacy, HOA fees and building records. Request a matched shortlist.'
  },
  '/penthouses/': {
    title: 'Brickell Penthouses for Sale: Buyer Guide',
    description: 'Considering a Brickell penthouse for sale? Check view protection, HOA costs, insurance and building records first, then request matched options.'
  }
};
