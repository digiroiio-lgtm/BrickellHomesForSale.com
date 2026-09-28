import type { Metadata } from 'next';
import Link from 'next/link';
import { buildings } from '@/lib/buildings';
import { metadataFor, breadcrumbSchema, StructuredData } from '@/lib/seo';
import { InquiryForm } from '@/components/InquiryForm';

export const metadata:Metadata=metadataFor('/buildings/','Brickell residential building guides','23 editorial Brickell residential building profiles with sourced general facts and a document checklist. No live unit inventory.');
export default function Buildings(){return <><StructuredData data={breadcrumbSchema([{name:'Home',path:'/'},{name:'Building guides',path:'/buildings/'}])}/><section className="wrap page-header"><span className="eyebrow">THE BUILDING INDEX / BRICKELL</span><h1>Know the building.<br/><em>Then the unit.</em></h1><p className="page-deck">23 source-linked profiles and the questions a buyer should bring to a viewing. There are no live unit listings here.</p></section><section className="wrap index-grid">{buildings.map((b,i)=><Link href={`/buildings/${b.slug}/`} key={b.slug}><span>0{i+1} / {b.area}</span><h2>{b.name}</h2><p>{b.summary}</p><b>Explore building ↗</b></Link>)}</section><InquiryForm intent="building-index"/></>}
