import { guides } from '@/lib/content';
import { buildings } from '@/lib/buildings';
import { trust } from '@/lib/trust-content';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

// Generated from the same records as the pages and sitemap, so the index cannot drift from the canonical URL set.
const groups = [
  { heading:'Property types and buyer objectives', slugs:['condos-for-sale','waterfront-condos','luxury-condos','penthouses','new-construction','branded-residences','high-rise-residences','resale-properties','pre-construction','primary-residence-brickell','second-home-brickell','investment-properties-brickell'] },
  { heading:'Budget ranges', slugs:['brickell-condos-under-1m','brickell-condos-1m-2m','brickell-condos-2m-plus'] },
  { heading:'Brickell areas', slugs:['brickell-key','brickell-avenue','brickell-core','south-brickell','brickell-bay-drive','north-brickell-miami-river'] },
  { heading:'Ownership costs and financing', slugs:['ownership-costs','hoa-fees','property-taxes','condo-insurance','condo-reserves','brickell-condo-special-assessments','closing-costs','financing','brickell-condo-mortgage-requirements'] },
  { heading:'Comparisons', slugs:['brickell-vs-downtown-miami','brickell-key-vs-brickell','new-construction-vs-resale','waterfront-vs-inland-brickell','condo-vs-branded-residence','cash-vs-financing-brickell-condo'] },
  { heading:'Purchase process and building rules', slugs:['buying-a-home-in-brickell','buying-a-condo-in-brickell','pre-construction-buying-process','foreign-buyers','first-time-condo-buyer','brickell-condo-closing-process','brickell-condo-application-approval','condo-documents','condo-inspections','brickell-condo-rental-restrictions','brickell-condo-pet-rules'] }
];

export function GET() {
  const url = (path:string) => `${site.origin}${path}`;
  const listed = new Set(groups.flatMap(g => g.slugs));
  const guideLine = (slug:string) => { const g = guides.find(x => x.slug === slug); return g ? `- [${g.title}](${url(`/${g.slug}/`)}): ${g.description}` : null; };
  const sections = [
    ...groups.map(g => ({ heading:g.heading, lines:g.slugs.map(guideLine) })),
    { heading:'More buyer research', lines:guides.filter(g => !listed.has(g.slug)).map(g => guideLine(g.slug)) },
    { heading:'Building profiles', lines:[`- [All building profiles](${url('/buildings/')}): Index of source-linked Brickell residential building guides.`, ...buildings.map(b => `- [${b.name}](${url(`/buildings/${b.slug}/`)}) (${b.area}): ${b.summary}`)] },
    { heading:'About this site', lines:[...Object.entries(trust).map(([slug, t]) => `- [${t.title}](${url(`/${slug}/`)}): ${t.description}`), `- [Privacy notice](${url('/privacy/')}): How buyer inquiry data and analytics are handled.`] }
  ];
  const body = [
    `# ${site.name}`,
    '',
    '> Independent editorial buyer guides for residential property in Brickell, Miami, Florida. This website does not display MLS or IDX inventory, live listings, current prices, or unit-specific availability.',
    '',
    `Canonical site: ${url('/')}`,
    `Sitemap: ${url('/sitemap.xml')}`,
    `All buyer guides: ${url('/buyer-guides/')}`,
    '',
    'Use the cited primary sources on each page to verify facts. Building descriptions are editorial and may not reflect recent association or development changes. Rental and pet policies, inventory, prices, and fees require direct, current verification. An inquiry form requests matched options; it does not guarantee an available unit or agent relationship.',
    ...sections.flatMap(s => ['', `## ${s.heading}`, ...s.lines.filter((l):l is string => Boolean(l))]),
    ''
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type':'text/plain; charset=utf-8' } });
}
