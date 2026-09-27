import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildings, buildingBySlug } from '@/lib/buildings';
import { metadataFor, breadcrumbSchema, StructuredData } from '@/lib/seo';
import { InquiryForm } from '@/components/InquiryForm';
import { site } from '@/lib/site';

export function generateStaticParams(){return buildings.map(b=>({slug:b.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const b=buildingBySlug[slug];return b?metadataFor(`/buildings/${slug}/`,`${b.name} | Brickell buyer guide`,b.summary):{};}

export default async function BuildingPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;const b=buildingBySlug[slug];if(!b)notFound();
  return <><StructuredData data={breadcrumbSchema([{name:'Home',path:'/'},{name:'Buildings',path:'/buildings/'},{name:b.name,path:`/buildings/${slug}/`}])}/><section className="wrap page-header"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/buildings/">Buildings</Link><span>/</span>{b.name}</div><span className="eyebrow">BUILDING NOTEBOOK / {b.area.toUpperCase()}</span><h1>{b.name}</h1><p className="page-deck">{b.summary}</p><Link className="button" href="#inquiry">Request Current Availability ↗</Link></section><div className="wrap article-layout"><article><div className="article-mark">01 — VERIFIED PROFILE</div><h2>What the project source says.</h2><div className="checklist">{b.confirmed.map((fact,i)=><div key={fact}><span>0{i+1}</span><p>{fact}</p></div>)}</div><div className="sources"><strong>Source reviewed 27 September 2026</strong><a href={b.source.url} target="_blank" rel="noopener noreferrer">{b.source.label} ↗</a><p>Project materials describe the building, but do not verify current unit availability, pricing or association policies. Development plans can change.</p></div><div className="article-mark">02 — BUYER QUESTIONS</div><h2>Documents matter more than a brochure.</h2><div className="checklist">{b.questions.map((q,i)=><div key={q}><span>0{i+1}</span><p>{q}</p></div>)}</div><p>Request current association documents and have the actual unit reviewed before making decisions. No rental or pet policy is represented here because current written rules have not been obtained.</p></article><aside><div className="aside-card"><span className="eyebrow">SPECIFIC BUILDING?</span><h3>Ask about {b.name}.</h3><p>Send your budget and timing so the availability inquiry can be checked against your needs.</p><Link className="button" href="#inquiry">Request a match ↗</Link></div><div className="aside-link"><strong>NEARBY READING</strong><Link href="/hoa-fees/">Understand HOA fees ↗</Link><Link href="/condo-documents/">Document checklist ↗</Link><Link href="/buildings/">All building guides ↗</Link></div></aside></div><div className="wrap disclosure">{site.disclosure}</div><InquiryForm intent={`building-${slug}`} building={b.name}/></>;
}
