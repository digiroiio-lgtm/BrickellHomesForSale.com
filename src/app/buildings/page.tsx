import type { Metadata } from 'next';
import Link from 'next/link';
import { buildings } from '@/lib/buildings';
import { metadataFor, breadcrumbSchema, StructuredData } from '@/lib/seo';
import { InquiryForm } from '@/components/InquiryForm';

export const metadata:Metadata=metadataFor('/buildings/','Brickell building guides','Eight editorial Brickell building profiles with sourced general facts and a document checklist. No live unit inventory.');
export default function Buildings(){return <><StructuredData data={breadcrumbSchema([{name:'Home',path:'/'},{name:'Building guides',path:'/buildings/'}])}/><section className="wrap page-header"><span className="eyebrow">BRICKELL CONDO BUILDINGS</span><h1>Compare Brickell buildings<br/><em>before you tour.</em></h1><p className="page-deck">Compare eight building profiles, then ask for the current budget, rules and inspection records of any building on your shortlist.</p></section><section className="wrap index-grid">{buildings.map((b,i)=><Link href={`/buildings/${b.slug}/`} key={b.slug}><span>0{i+1} / {b.area}</span><h2>{b.name}</h2><p>{b.summary}</p><b>Check this building ↗</b></Link>)}</section><InquiryForm intent="building-index"/></>}
