import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { guides, guideBySlug } from '@/lib/content';
import { buyerSources, site } from '@/lib/site';
import { metadataFor, breadcrumbSchema, StructuredData } from '@/lib/seo';
import { InquiryForm } from '@/components/InquiryForm';
import { Diagram } from '@/components/Diagrams';
import { matrices } from '@/lib/decision-matrices';

export function generateStaticParams(){return guides.map(g=>({slug:g.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const g=guideBySlug[slug];return g?metadataFor(`/${slug}/`,g.title,g.description):{};}

export default async function GuidePage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;const g=guideBySlug[slug];if(!g)notFound();
  const related=guides.filter(x=>x.slug!==slug&&(x.budget===g.budget||x.type===g.type)).slice(0,3);
  const diagram=slug==='hoa-fees'?'hoa':slug==='brickell-vs-downtown-miami'?'comparison':slug==='new-construction'?'construction':slug==='buying-a-condo-in-brickell'?'journey':['condos-for-sale','brickell-condos-under-1m'].includes(slug)?'budget':null;
  const matrix=matrices[slug];
  return <>
    <StructuredData data={breadcrumbSchema([{name:'Home',path:'/'},{name:g.title,path:`/${slug}/`}])} />
    <div className="wrap page-header"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span>{g.eyebrow}</div><span className="eyebrow">BRICKELL CONDO GUIDE / {g.eyebrow.toUpperCase()}</span><h1>{g.title}</h1><p className="page-deck">{g.description}</p><Link className="button" href="#inquiry">Request condo options <span>↗</span></Link></div>
    <div className="wrap article-layout"><article><div className="article-mark">01 — YOUR SEARCH</div><h2>{g.focus}</h2><p>{g.context}</p><p>{g.lead}</p><div className="article-mark">02 — CHECK THE DETAILS</div><h2>What to verify for a specific condo.</h2><div className="checklist">{g.checks.map((c,i)=><div key={c}><span>0{i+1}</span><p>{c}</p></div>)}</div>{matrix&&<section className="decision-matrix"><span className="eyebrow">THE BUYER SCORECARD</span><h2>{matrix.heading}</h2><p>{matrix.intro}</p><div className="table-scroll"><table><thead><tr><th>Compare</th><th>Ask for</th><th>Why it matters</th></tr></thead><tbody>{matrix.rows.map(([label,evidence,reason])=><tr key={label}><th scope="row">{label}</th><td>{evidence}</td><td>{reason}</td></tr>)}</tbody></table></div></section>}{diagram&&<Diagram kind={diagram} />}<div className="article-mark">03 — YOUR NEXT STEP</div><h2>Use the evidence to narrow your options.</h2><p>{g.decision}</p>{g.sourceKeys&&<div className="sources"><strong>Official buyer resources</strong>{g.sourceKeys.map(k=><a key={k} href={buyerSources[k].url} target="_blank" rel="noopener noreferrer">{buyerSources[k].label} ↗</a>)}</div>}</article><aside><div className="aside-card"><span className="eyebrow">YOUR CONDO SEARCH</span><h3>Request options that fit.</h3><p>Share your budget, bedrooms, preferred buildings and buying timeline.</p><Link className="button" href="#inquiry">Request condo options ↗</Link></div><div className="aside-link"><strong>COMPARE NEXT</strong>{related.map(x=><Link href={`/${x.slug}/`} key={x.slug}>{x.title} ↗</Link>)}</div></aside></div>
    <div className="wrap disclosure">{site.disclosure}</div><InquiryForm intent={g.intent} budget={['under-1m','1m-2m','2m-plus'].includes(g.budget)?g.budget:''} propertyType={['condo','luxury condo','penthouse','waterfront condo','new construction'].includes(g.type)?g.type:'condo'} />
  </>;
}
