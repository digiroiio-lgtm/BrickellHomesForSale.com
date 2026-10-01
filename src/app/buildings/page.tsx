import type { Metadata } from 'next';
import Link from 'next/link';
import { buildings } from '@/lib/buildings';
import { metadataFor, pageGraph, StructuredData } from '@/lib/seo';
import { ReviewedBy } from '@/components/PageMeta';
import { InquiryForm } from '@/components/InquiryForm';

export const metadata:Metadata=metadataFor('/buildings/','Brickell residential building guides','23 editorial Brickell residential building profiles with sourced general facts and a document checklist. No live unit inventory.');
export default function Buildings(){return <><StructuredData data={pageGraph({path:'/buildings/',name:'Brickell residential building guides',description:'Editorial Brickell residential building profiles with sourced general facts and a document checklist.',trail:[{name:'Home',path:'/'},{name:'Building guides',path:'/buildings/'}],kind:'collection',items:buildings.map(b=>({name:b.name,path:`/buildings/${b.slug}/`}))})}/><section className="wrap page-header"><span className="eyebrow">THE BUILDING INDEX / BRICKELL</span><h1>Know the building.<br/><em>Then the unit.</em></h1><p className="page-deck">23 source-linked profiles and the questions a buyer should bring to a viewing. There are no live unit listings here.</p><ReviewedBy path="/buildings/" /></section><section className="wrap index-grid">{buildings.map((b,i)=><Link href={`/buildings/${b.slug}/`} key={b.slug}><span>0{i+1} / {b.area}</span><h2>{b.name}</h2><p>{b.summary}</p><b>Explore building ↗</b></Link>)}</section><InquiryForm intent="building-index"/></>}
