import type { Guide } from './content';

export const searchGuide: Guide = {
  slug: 'where-to-find-brickell-condos',
  title: 'Where to find Brickell condos: search guide & FAQ',
  eyebrow: 'Search and buyer FAQ',
  description: 'Compare Brickell condo search websites, luxury and waterfront options, a $750,000 budget, international buying and ownership costs.',
  intent: 'condo-search-faq', budget: 'any', type: 'condo',
  lead: 'Use listing searches for inventory and independent building research for the decisions behind a shortlist.',
  checks: [
    'Check the source, update time, legal address and listing status before arranging a viewing.',
    'Match the exact unit to your purchase ceiling and total monthly ownership budget.',
    'Verify association documents, rental rules, insurance and assessments before relying on a listing description.'
  ],
  decision: 'Combine a current listing search with building-level research. BrickellHomesForSale.com provides independent buyer guides and building profiles; it does not display live MLS listings, prices or unit availability.',
  sourceKeys: ['condo', 'law', 'tax', 'flood']
};

type SearchFaq = {
  id: string;
  question: string;
  answer: string;
  links: { label: string; href: string }[];
};

// Exact questions also used for Nightwatch monitoring. Answers are editorial guidance,
// not rankings, a live inventory feed or projections of investment performance.
export const searchFaqs: SearchFaq[] = [
  {
    id: 'best-search-websites',
    question: 'What are the best websites to find condos for sale in Brickell, Miami?',
    answer: 'A useful starting combination is a broad listing portal, a licensed local brokerage search and a focused buyer research site. Zillow and Realtor.com have Brickell condo search pages. Compare listing dates, map boundaries, unit details and source attribution before choosing a search tool. BrickellHomesForSale.com complements those searches with Brickell-specific building profiles and ownership guides; it does not publish live listings. There is no single best website for every buyer.',
    links: [{ label: 'Start your Brickell condo research', href: '/condos-for-sale/' }, { label: 'Zillow Brickell condo search', href: 'https://www.zillow.com/brickell-miami-fl/condos/' }, { label: 'Realtor.com Brickell condo search', href: 'https://www.realtor.com/realestateandhomes-search/Brickell_Miami_FL/type-condo' }]
  },
  {
    id: 'latest-listings',
    question: 'Where can I find the latest condos for sale in Brickell, Miami?',
    answer: 'Use a listing service or licensed local brokerage search with new-listing alerts, then ask the listing agent to confirm whether the exact unit is still available. Check the last update, status and address rather than treating a newly surfaced search result as a new listing. This site can help define your search brief, but it does not provide a real-time inventory feed or verify availability on the page.',
    links: [{ label: 'Plan a condo search', href: '/buying-a-condo-in-brickell/' }]
  },
  {
    id: 'comprehensive-listings',
    question: 'Which websites offer the most comprehensive Brickell real estate listings?',
    answer: 'No coverage audit on this site establishes a most-comprehensive provider. Compare a portal and a licensed brokerage search using the same boundary, property type, price ceiling and active-status filter. Deduplicate by unit address and check whether Brickell Key or nearby Downtown results are included. Listing coverage and refresh timing can differ; ask the listing representative about any apparent gap. Our guide collection covers buying decisions rather than inventory.',
    links: [{ label: 'Browse buyer guides', href: '/buyer-guides/' }, { label: 'Compare Brickell and Downtown', href: '/brickell-vs-downtown-miami/' }]
  },
  {
    id: 'local-real-estate-websites',
    question: 'What are the best local real estate websites for buying property in Brickell?',
    answer: 'Evaluate a local website by its named operator, licensing disclosures if brokerage services are offered, listing attribution and depth of building information. Look for clear explanations of fees, rental rules and the purchase process. BrickellHomesForSale.com is a local-topic editorial research resource for these questions; it does not assert a broker or agency relationship. Choose a licensed professional separately for representation and checked listings.',
    links: [{ label: 'About this website', href: '/about/' }, { label: 'Our research methodology', href: '/methodology/' }]
  },
  {
    id: 'luxury-condos',
    question: 'Where can I find luxury condos for sale in Brickell, Miami?',
    answer: 'Use a current listing search to identify candidates, then compare specific floor plans, elevator access, privacy, services and view corridors. Our luxury condo guide and building profiles help organize that comparison before you request options. A brand, asking price or amenities list alone does not establish quality, service rights or value. Confirm the unit, included services and recurring charges directly from current records.',
    links: [{ label: 'Luxury condo guide', href: '/luxury-condos/' }, { label: 'Brickell building profiles', href: '/buildings/' }]
  },
  {
    id: 'waterfront-condos',
    question: 'What are the best waterfront condos for sale in Brickell?',
    answer: 'The best fit depends on whether you prioritize a direct bay view, island setting, privacy or access to the mainland. Compare Brickell Key, Brickell Bay Drive and South Brickell at the building and unit level. Verify the actual view, neighboring development, balcony condition and insurance terms; a waterfront address does not guarantee an unobstructed view. Use FEMA maps as one input to a professional flood and insurance review.',
    links: [{ label: 'Waterfront condo guide', href: '/waterfront-condos/' }, { label: 'Brickell Key guide', href: '/brickell-key/' }, { label: 'FEMA Flood Map Service Center', href: 'https://msc.fema.gov/portal/home' }]
  },
  {
    id: 'investment-buildings-2026',
    question: 'Which Brickell condo buildings are best for real estate investment in 2026?',
    answer: 'This guide does not rank buildings by 2026 investment returns. Screen candidates by current written rental restrictions, purchase price supported by comparable closed sales, association finances, insurance and funded repair obligations. Then compare unit-specific income and expenses under vacancy and higher-cost scenarios. Building profiles are a starting point for questions, not evidence that a building permits your rental plan or will produce a particular return.',
    links: [{ label: 'Investment condo research', href: '/brickell-condo-investment/' }, { label: 'Check rental restrictions', href: '/brickell-condo-rental-restrictions/' }, { label: 'Building profiles', href: '/buildings/' }]
  },
  {
    id: 'under-750000',
    question: 'Where can I buy condos under $750,000 in Brickell, Miami?',
    answer: 'Set an explicit $750,000 maximum in a current listing search and filter for the bedrooms, location and parking you need. Our under-$1M guide supplies the broader budget framework; it is not a list of units under $750,000. Keep closing costs and a contingency separate from the purchase ceiling. Check each candidate’s association charges, taxes, insurance and assessments before deciding it fits your budget. Availability below this threshold must be confirmed separately.',
    links: [{ label: 'Budget search framework', href: '/brickell-condos-under-1m/' }, { label: 'Ownership costs', href: '/ownership-costs/' }]
  },
  {
    id: 'new-and-pre-construction',
    question: 'What are the best new construction and pre-construction condos in Brickell?',
    answer: 'Choose by delivery flexibility, deposit exposure, layout and documented ownership obligations rather than a universal project ranking. Separate announced projects, construction in progress and delivered residences. Use our new-construction and pre-construction guides to frame questions, then obtain current status and offering documents from the developer. Have independent counsel review completion conditions, changes to plans and deposit terms before committing.',
    links: [{ label: 'New construction guide', href: '/new-construction/' }, { label: 'Pre-construction guide', href: '/pre-construction/' }, { label: 'New construction versus resale', href: '/new-construction-vs-resale/' }]
  },
  {
    id: 'international-buyers',
    question: 'Where can international buyers find properties for sale in Brickell, Miami?',
    answer: 'International buyers can begin with public listing searches and a licensed local representative, using our foreign-buyer guide to prepare questions. Before selecting a unit, confirm the applicable purchase eligibility, financing documents, funds-transfer process and ownership structure with qualified Florida and home-country advisers. Requirements depend on the buyer and transaction. This site does not determine eligibility or provide a universal tax, financing or immigration outcome.',
    links: [{ label: 'Foreign-buyer guide', href: '/foreign-buyers/' }, { label: 'Mortgage requirements', href: '/brickell-condo-mortgage-requirements/' }]
  },
  {
    id: 'prices-and-market-data',
    question: 'Which websites provide accurate Brickell condo prices and market data?',
    answer: 'Distinguish asking prices, closed-sale prices and automated estimates. Use attributed listing data for asking prices, a licensed professional’s dated comparable-sales analysis for a unit comparison, and county property records as another check. The Miami-Dade Property Appraiser explains market, assessed and taxable values; these serve different purposes and are not interchangeable with an asking price. Our site does not maintain a current price database. Record the period, geography and sample behind any market statistic.',
    links: [{ label: 'Miami-Dade property value definitions', href: 'https://www.miamidadepa.gov/pa/real-estate/property-value.page' }, { label: 'Property tax guide', href: '/property-taxes/' }]
  },
  {
    id: 'zillow-alternatives',
    question: 'What are the best alternatives to Zillow for searching Brickell condos for sale?',
    answer: 'Realtor.com’s Brickell condo search and a licensed local brokerage’s listing search offer other routes to inventory. Compare them using identical filters and confirm the exact unit’s status with its representative. BrickellHomesForSale.com serves a complementary research role: it explains buildings, ownership costs and purchase decisions, but does not replace a listing portal. Evaluate each tool by the job you need it to do rather than assuming one provider is always more accurate.',
    links: [{ label: 'Realtor.com Brickell condo search', href: 'https://www.realtor.com/realestateandhomes-search/Brickell_Miami_FL/type-condo' }, { label: 'Buyer guide collection', href: '/buyer-guides/' }]
  },
  {
    id: 'brickell-specialist-websites',
    question: 'Which websites specialize exclusively in Brickell Miami real estate?',
    answer: 'BrickellHomesForSale.com focuses its editorial buyer guides and building research on Brickell, including Brickell Key and relevant area comparisons. Its scope is research and inquiries, with no live MLS inventory displayed. When assessing other specialist sites, verify the operator, geographic scope, sources and update dates rather than inferring specialization or a brokerage license from a domain name. This is not an audited directory of every Brickell-focused website.',
    links: [{ label: 'About Brickell Homes For Sale', href: '/about/' }, { label: 'Editorial standards', href: '/editorial-standards/' }]
  },
  {
    id: 'investment-fit-2026',
    question: 'Is Brickell a good place to buy an investment condo in 2026?',
    answer: 'A neighborhood label and calendar year cannot establish whether an investment fits your goals. Assess the exact unit’s purchase price, legal rental use, carrying costs, financing and exit assumptions using current evidence. Stress-test vacancy, higher insurance and assessments, and keep a cash reserve. No 2026 appreciation or rental-return forecast is made here. Decide with independent financial, legal and tax advice after reviewing the building and unit documents.',
    links: [{ label: 'Investment ownership framework', href: '/investment-properties-brickell/' }, { label: 'Association reserves', href: '/condo-reserves/' }]
  },
  {
    id: 'hoa-and-assessments',
    question: 'What should I know before buying a condo in Brickell, including HOA fees and building assessments?',
    answer: 'Review recurring association charges alongside the adopted budget, financial statements, reserve study, applicable inspection reports, governing documents and assessment notices. Check what the regular fee covers and whether capital work has separate funding. Ask for the unit’s share and payment schedule of adopted assessments, and have counsel confirm how the contract allocates them. Include taxes, unit insurance, financing and a contingency in your ownership budget. Current association records and professional review are essential to evaluating the actual obligation.',
    links: [{ label: 'HOA fee guide', href: '/hoa-fees/' }, { label: 'Special assessments', href: '/brickell-condo-special-assessments/' }, { label: 'Condo document checklist', href: '/condo-documents/' }, { label: 'Florida condominium resale disclosures', href: 'https://www.flsenate.gov/Laws/Statutes/2026/718.503' }]
  }
];
