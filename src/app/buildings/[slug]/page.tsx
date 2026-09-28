import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildings, buildingBySlug } from '@/lib/buildings';
import { metadataFor, breadcrumbSchema, StructuredData } from '@/lib/seo';
import { InquiryForm } from '@/components/InquiryForm';
import { site } from '@/lib/site';

export function generateStaticParams(){return buildings.map(b=>({slug:b.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const b=buildingBySlug[slug];return b?metadataFor(`/buildings/${slug}/`,`${b.name} | Brickell residential building guide`,b.summary):{};}

const developmentSlugs = new Set(['una-residences','cipriani-residences-miami','viceroy-brickell','baccarat-residences-miami','residences-at-1428-brickell','st-regis-residences-miami','mercedes-benz-places-miami','2200-brickell','mandarin-oriental-residences-miami']);
const brandedSlugs = new Set(['four-seasons-residences','cipriani-residences-miami','viceroy-brickell','baccarat-residences-miami','st-regis-residences-miami','mercedes-benz-places-miami','mandarin-oriental-residences-miami']);
const waterfrontSlugs = new Set(['una-residences','baccarat-residences-miami','st-regis-residences-miami','mandarin-oriental-residences-miami','brickell-key-one','courts-brickell-key','courvoisier-courts','one-tequesta-point']);
function areaLink(area:string) {
 if(area.includes('Brickell Key')) return {label:'Brickell Key',href:'/brickell-key/'};
 if(area.includes('riverfront')) return {label:'North Brickell / river edge',href:'/north-brickell-miami-river/'};
 if(area.includes('Bay')) return {label:'Brickell Bay Drive',href:'/brickell-bay-drive/'};
 if(area.includes('South Brickell')) return {label:'South Brickell',href:'/south-brickell/'};
 if(area.includes('Avenue')) return {label:'Brickell Avenue',href:'/brickell-avenue/'};
 return {label:'Brickell Core',href:'/brickell-core/'};
}

export default async function BuildingPage({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;const b=buildingBySlug[slug];if(!b)notFound();
 const area=areaLink(b.area),development=developmentSlugs.has(slug),branded=brandedSlugs.has(slug),waterfront=waterfrontSlugs.has(slug);
 const type=branded?{label:'Branded residences',href:'/branded-residences/'}:waterfront?{label:'Waterfront residences',href:'/waterfront-condos/'}:development?{label:'New construction',href:'/new-construction/'}:{label:'High-rise residences',href:'/high-rise-residences/'};
 return <><StructuredData data={breadcrumbSchema([{name:'Home',path:'/'},{name:'Buildings',path:'/buildings/'},{name:b.name,path:`/buildings/${slug}/`}])}/>
 <section className="wrap page-header"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/buildings/">Buildings</Link><span>/</span>{b.name}</div><span className="eyebrow">BUILDING NOTEBOOK / {b.area.toUpperCase()}</span><h1>{b.name}</h1><p className="page-deck">{b.summary}</p><Link className="button" href="#inquiry">Request matched options ↗</Link></section>
 <div className="wrap article-layout"><article>
 <div className="article-mark">01 — LOCATION & POSITIONING</div><h2>Place the development in its context.</h2><p>{b.name} is profiled as {b.profile.toLowerCase()} in the {b.area} search area. This editorial classification helps compare residential choices; it does not establish a legal submarket boundary, completion stage or current unit availability.</p>
 <div className="building-facts"><dl><div><dt>Related area</dt><dd><Link className="text-link" href={area.href}>{area.label} ↗</Link></dd></div><div><dt>Residence research</dt><dd><Link className="text-link" href={type.href}>{type.label} ↗</Link></dd></div><div><dt>Sale-stage evidence</dt><dd>{development?'Review current project status, offering documents and deposit terms.':'Ask whether the actual residence is a resale and inspect current documents.'}</dd></div><div><dt>Broad unit mix</dt><dd>Request current official floor plans and the legal unit description; availability and layouts are not verified here.</dd></div></dl></div>
 <div className="article-mark">02 — PUBLISHED PROJECT CONTEXT</div><h2>What the project source says.</h2><div className="checklist">{b.confirmed.map((fact,i)=><div key={fact}><span>0{i+1}</span><p>{fact}</p></div>)}</div><div className="sources"><strong>Official project source</strong><a href={b.source.url} target="_blank" rel="noopener noreferrer">{b.source.label} ↗</a><p>Project materials describe the development. They do not verify current unit availability, view, asking price, association rules or service rights. Plans may change.</p></div>
 <div className="article-mark">03 — THE ACTUAL RESIDENCE</div><h2>What to inspect for this buyer.</h2><p>{waterfront?'Verify whether the exact floor and line face the water and obtain address-specific insurance guidance. ': 'Check the actual floor, line, outlook and daily entrance route. '}{branded?'Request the current service agreement and distinguish included from optional services. ':'Confirm amenity and parking rights in current written documents. '}Compare any unit with its legal description and present condition.</p>
 <div className="article-mark">04 — OWNERSHIP QUESTIONS</div><h2>Documents matter more than a brochure.</h2><div className="checklist">{b.questions.map((q,i)=><div key={q}><span>0{i+1}</span><p>{q}</p></div>)}</div><p>Request budgets, reserves, insurance, inspection records and known assessment information where applicable. For an undelivered project, compare projected costs and contractual terms with current resale evidence. No rental or pet policy is represented here.</p><p><Link className="text-link" href="/ownership-costs/">Model total ownership costs ↗</Link></p>
 </article><aside><div className="aside-card"><span className="eyebrow">SPECIFIC BUILDING?</span><h3>Ask about {b.name}.</h3><p>Share your budget, objective and timing. Any availability must be checked after your inquiry.</p><Link className="button" href="#inquiry">Request a match ↗</Link></div><div className="aside-link"><strong>RELATED RESEARCH</strong><Link href={area.href}>{area.label} area guide ↗</Link><Link href={type.href}>{type.label} buyer guide ↗</Link><Link href="/ownership-costs/">Total ownership costs ↗</Link><Link href="/brickell-condo-special-assessments/">Assessment questions ↗</Link><Link href="/brickell-condo-rental-restrictions/">Written rental restrictions ↗</Link><Link href="/buildings/">All building profiles ↗</Link></div></aside></div><div className="wrap disclosure">{site.disclosure}</div><InquiryForm intent={`building-${slug}`} building={b.name}/></>;
}
