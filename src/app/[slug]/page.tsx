import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { guides, guideBySlug } from '@/lib/content';
import { buyerSources, site } from '@/lib/site';
import { metadataFor, breadcrumbSchema, StructuredData } from '@/lib/seo';
import { InquiryForm } from '@/components/InquiryForm';
import { Diagram } from '@/components/Diagrams';
import { matrices } from '@/lib/decision-matrices';
import { propertyTypeContent } from '@/lib/property-type-content';
import { buyerGuideContent } from '@/lib/buyer-guide-content';
import { ExplorePropertyPaths } from '@/components/ExplorePropertyPaths';

export function generateStaticParams(){return guides.map(g=>({slug:g.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const g=guideBySlug[slug];return g?metadataFor(`/${slug}/`,g.title,g.description):{};}

export default async function GuidePage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;const g=guideBySlug[slug];if(!g)notFound();
  const related=guides.filter(x=>x.slug!==slug&&(x.budget===g.budget||x.type===g.type)).slice(0,3);
  const diagram=slug==='hoa-fees'?'hoa':slug==='brickell-vs-downtown-miami'?'comparison':slug==='new-construction'?'construction':slug==='buying-a-condo-in-brickell'?'journey':['condos-for-sale','brickell-condos-under-1m'].includes(slug)?'budget':null;
  const matrix=matrices[slug];
  const propertyDetail=propertyTypeContent[slug];
  const detail=propertyDetail??buyerGuideContent[slug];
  return <>
    <StructuredData data={breadcrumbSchema([{name:'Home',path:'/'},{name:g.title,path:`/${slug}/`}])} />
    <div className="wrap page-header"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span>{g.eyebrow}</div><span className="eyebrow">THE BRICKELL BUYER’S NOTEBOOK / {g.eyebrow.toUpperCase()}</span><h1>{g.title}</h1><p className="page-deck">{g.description}</p><Link className="button" href="#inquiry">Request Current Availability <span>↗</span></Link></div>
    <div className="wrap article-layout"><article><div className="article-mark">01 — THE FRAMEWORK</div><h2>{detail?.headline??'Start with the decision, not the search result.'}</h2><p>{detail?detail.intro:`${g.lead} A useful comparison begins with what you can verify about the building and the actual unit. This guide is an editorial framework; it does not display current listings or suggest an available property at a stated price.`}</p><div className="article-mark">02 — WHAT TO CHECK</div><h2>Three checks that change the answer.</h2><div className="checklist">{g.checks.map((c,i)=><div key={c}><span>0{i+1}</span><p>{c}</p></div>)}</div>{detail?.sections.map((section,i)=><section className="property-detail" key={section.heading}><div className="article-mark">0{i+3} — BUYER DECISION</div><h2>{section.heading}</h2><p>{section.text}</p><ul>{section.checks.map(check=><li key={check}>{check}</li>)}</ul></section>)}{matrix&&<section className="decision-matrix"><span className="eyebrow">THE BUYER SCORECARD</span><h2>{matrix.heading}</h2><p>{matrix.intro}</p><div className="table-scroll"><table><thead><tr><th>Compare</th><th>Ask for</th><th>Why it matters</th></tr></thead><tbody>{matrix.rows.map(([label,evidence,reason])=><tr key={label}><th scope="row">{label}</th><td>{evidence}</td><td>{reason}</td></tr>)}</tbody></table></div></section>}{diagram&&<Diagram kind={diagram} />}<div className="article-mark">{detail?'06':'03'} — BEFORE YOU DECIDE</div><h2>Make the comparison specific.</h2><p>{g.decision}</p><p>{detail?detail.brief:'Ask for the most recent association documents, confirm the unit’s legal details and use independent professionals where legal, tax, insurance or financing questions affect your purchase.'}</p>{propertyDetail&&<ExplorePropertyPaths explore={propertyDetail.explore} />}{g.sourceKeys&&<div className="sources"><strong>Further reading / primary sources</strong>{g.sourceKeys.map(k=><a key={k} href={buyerSources[k].url} target="_blank" rel="noopener noreferrer">{buyerSources[k].label} ↗</a>)}</div>}</article><aside><div className="aside-card"><span className="eyebrow">YOUR SHORTLIST</span><h3>{propertyDetail?'Make your search specific.':'Get the right questions answered.'}</h3><p>{detail?detail.brief:'Share budget, property type and timing. Request current options matched to your brief.'}</p><Link className="button" href="#inquiry">Start your inquiry ↗</Link></div><div className="aside-link"><strong>RELATED READING</strong>{detail?detail.related.map(link=><Link href={link.href} key={link.href}>{link.label} ↗</Link>):related.map(x=><Link href={`/${x.slug}/`} key={x.slug}>{x.title} ↗</Link>)}</div></aside></div>
    <div className="wrap disclosure">{site.disclosure}</div><InquiryForm intent={g.intent} budget={['under-1m','1m-2m','2m-plus'].includes(g.budget)?g.budget:''} propertyType={['condo','luxury condo','penthouse','waterfront condo','new construction'].includes(g.type)?g.type:'condo'} heading={propertyDetail?.formHeading} description={propertyDetail?.formDescription} />
  </>;
}
