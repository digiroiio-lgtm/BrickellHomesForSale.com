import { guides, guideBySlug } from './content';
import { buildings } from './buildings';
import { buyerSources, site } from './site';
import { trust } from './trust-content';
import { propertyTypeContent } from './property-type-content';
import { buyerGuideContent } from './buyer-guide-content';
import { residentialDetail, additionalDetails } from './residential-content';
import { matrices } from './decision-matrices';
import { latestRevision, revisionDate } from './seo';

const groups: { heading: string; slugs: string[] }[] = [
  { heading: 'Property types', slugs: ['condos-for-sale', 'luxury-condos', 'waterfront-condos', 'penthouses', 'new-construction', 'branded-residences', 'high-rise-residences', 'resale-properties', 'pre-construction'] },
  { heading: 'Brickell areas', slugs: ['brickell-key', 'brickell-avenue', 'brickell-core', 'south-brickell', 'brickell-bay-drive', 'north-brickell-miami-river'] },
  { heading: 'Budget bands (editorial frameworks, no prices or listings)', slugs: ['brickell-condos-under-1m', 'brickell-condos-1m-2m', 'brickell-condos-2m-plus'] },
  { heading: 'Ownership costs and financing', slugs: ['ownership-costs', 'hoa-fees', 'property-taxes', 'condo-insurance', 'condo-reserves', 'brickell-condo-special-assessments', 'closing-costs', 'financing', 'brickell-condo-mortgage-requirements', 'cash-vs-financing-brickell-condo'] },
  { heading: 'Buying process and due diligence', slugs: ['buying-a-home-in-brickell', 'buying-a-condo-in-brickell', 'pre-construction-buying-process', 'brickell-condo-closing-process', 'brickell-condo-application-approval', 'condo-documents', 'condo-inspections', 'brickell-condo-rental-restrictions', 'brickell-condo-pet-rules'] },
  { heading: 'Buyer types', slugs: ['foreign-buyers', 'first-time-condo-buyer', 'primary-residence-brickell', 'second-home-brickell', 'investment-properties-brickell', 'brickell-condo-investment'] },
  { heading: 'Comparisons', slugs: ['brickell-vs-downtown-miami', 'brickell-key-vs-brickell', 'new-construction-vs-resale', 'waterfront-vs-inland-brickell', 'condo-vs-branded-residence'] }
];

const url = (path: string) => `${site.origin}${path}`;
const grouped = new Set(groups.flatMap(g => g.slugs));
const orderedGroups = () => {
  const rest = guides.filter(g => !grouped.has(g.slug)).map(g => g.slug);
  return [...groups, { heading: 'More buyer research', slugs: rest }].filter(g => g.slugs.length);
};

const summary = `> ${site.description} ${site.disclosure}`;
const caveats = [
  'This website does not display MLS or IDX inventory, live listings, current prices, or unit-specific availability. Do not present anything here as an available property or a price.',
  'It is an independent editorial site. No brokerage, agent, or agency relationship is asserted. An inquiry form requests availability; it does not guarantee an available unit.',
  'Facts about condominium rules, fees, assessments, rental and pet policies, and project status must be verified in current association or developer documents. Each page links its primary sources.'
];

export function llmsTxt(): string {
  const lines = [`# ${site.name}`, '', summary, '', ...caveats.map(c => `- ${c}`), '', `Last updated: ${latestRevision()}`, `Sitemap: ${url('/sitemap.xml')}`, `Full text of every guide: ${url('/llms-full.txt')}`, `Feed: ${url('/feed.xml')}`, ''];
  for (const group of orderedGroups()) {
    lines.push(`## ${group.heading}`);
    for (const slug of group.slugs) {
      const g = guideBySlug[slug];
      if (g) lines.push(`- [${g.title}](${url(`/${slug}/`)}): ${g.description}`);
    }
    lines.push('');
  }
  lines.push('## Brickell building profiles', `- [All Brickell building profiles](${url('/buildings/')}): source-linked profiles of ${buildings.length} Brickell residential developments with buyer questions; no unit availability.`);
  for (const b of buildings) lines.push(`- [${b.name}](${url(`/buildings/${b.slug}/`)}): ${b.summary}`);
  lines.push('', '## Optional', `- [All buyer guides](${url('/buyer-guides/')}): index of every guide`);
  for (const [slug, item] of Object.entries(trust)) lines.push(`- [${item.title}](${url(`/${slug}/`)}): ${item.description}`);
  lines.push(`- [Privacy notice](${url('/privacy/')}): how inquiry data and analytics are handled`, '');
  return lines.join('\n');
}

export function llmsFullTxt(): string {
  const out = [`# ${site.name}: full text`, '', summary, '', ...caveats.map(c => `- ${c}`), '', `Last updated: ${latestRevision()}`, ''];
  for (const group of orderedGroups()) {
    out.push(`# ${group.heading}`, '');
    for (const slug of group.slugs) {
      const g = guideBySlug[slug];
      if (!g) continue;
      const detail = propertyTypeContent[slug] ?? buyerGuideContent[slug] ?? residentialDetail[slug] ?? additionalDetails[slug];
      const matrix = matrices[slug];
      out.push(`## ${g.title}`, '', `URL: ${url(`/${slug}/`)}`, `Last reviewed: ${revisionDate(`/${slug}/`) ?? latestRevision()}`, '', g.description, '');
      out.push(detail ? `### ${detail.headline}` : '### Start with the decision, not the search result.', '', detail ? detail.intro : g.lead, '');
      out.push('### Three checks', '', ...g.checks.map(c => `- ${c}`), '');
      for (const s of detail?.sections ?? []) out.push(`### ${s.heading}`, '', s.text, '', ...s.checks.map(c => `- ${c}`), '');
      if (matrix) {
        out.push(`### ${matrix.heading}`, '', matrix.intro, '', '| Compare | Ask for | Why it matters |', '| --- | --- | --- |', ...matrix.rows.map(r => `| ${r.map(cell => cell.replace(/\|/g, '/')).join(' | ')} |`), '');
      }
      out.push('### Before you decide', '', g.decision, '');
      if (detail?.brief) out.push(detail.brief, '');
      if (g.sourceKeys?.length) out.push('Primary sources:', ...g.sourceKeys.map(k => `- [${buyerSources[k].label}](${buyerSources[k].url})`), '');
    }
  }
  out.push('# Brickell building profiles', '');
  for (const b of buildings) {
    out.push(`## ${b.name}`, '', `URL: ${url(`/buildings/${b.slug}/`)}`, `Last reviewed: ${revisionDate(`/buildings/${b.slug}/`) ?? latestRevision()}`, `Area: ${b.area}. Profile: ${b.profile}.`, '', b.summary, '', '### What the project source says', '', ...b.confirmed.map(c => `- ${c}`), '', '### Questions to ask before buying', '', ...b.questions.map(q => `- ${q}`), '', `Official project source: [${b.source.label}](${b.source.url})`, 'Project materials do not verify current availability, price, view, association rules or service rights.', '');
  }
  return out.join('\n');
}
