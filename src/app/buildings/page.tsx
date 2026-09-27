import type { Metadata } from 'next';
import Link from 'next/link';
import { buildings, type Building } from '@/lib/buildings';
import { metadataFor, breadcrumbSchema, StructuredData } from '@/lib/seo';
import { InquiryForm } from '@/components/InquiryForm';
import { BuildingRequestLink } from '@/components/BuildingRequestLink';

export const metadata:Metadata=metadataFor('/buildings/','Brickell condo buildings | Buyer comparison guide','Compare completed Brickell condo buildings, developing projects and delivery questions before requesting a unit-specific shortlist.');

const groups = [
  { status:'completed', eyebrow:'01 / COMPLETED BUILDINGS', title:'Explore existing condos.', description:'Start with the actual unit and current association documents. A completed building does not guarantee that a unit is available.' },
  { status:'in-development', eyebrow:'02 / DEVELOPING PROJECTS', title:'Plan around delivery.', description:'Compare the proposed home with the contract, deposit schedule and current construction updates.' },
  { status:'verify-delivery', eyebrow:'03 / STATUS TO VERIFY', title:'Confirm move-in timing.', description:'Get written occupancy and unit-specific details before relying on a delivery date.' }
] as const;

function BuildingCard({building,index}:{building:Building;index:number}) {
  return <article className="building-index-card">
    <span className="building-index-number">{String(index+1).padStart(2,'0')} / {building.profile}</span>
    <h3><Link href={`/buildings/${building.slug}/`}>{building.name}</Link></h3>
    <dl className="building-index-facts">
      <div><dt>Location</dt><dd>{building.area}</dd></div>
      <div><dt>Consider if</dt><dd>{building.buyerFit}</dd></div>
      <div><dt>Check before buying</dt><dd>{building.buyerCheck}</dd></div>
    </dl>
    <div className="building-index-actions"><Link href={`/buildings/${building.slug}/`}>Compare this building ↗</Link><BuildingRequestLink slug={building.slug} name={building.name}/></div>
  </article>;
}

export default function Buildings(){return <>
  <StructuredData data={breadcrumbSchema([{name:'Home',path:'/'},{name:'Building guides',path:'/buildings/'}])}/>
  <section className="wrap page-header"><span className="eyebrow">THE BUILDING INDEX / BRICKELL</span><h1>Know the building.<br/><em>Then the unit.</em></h1><p className="page-deck">Compare eight Brickell buildings by location, buyer fit and the question to resolve before choosing a unit. No live listings are displayed here.</p></section>
  {groups.map(group=><section className="wrap building-index-section" key={group.status} aria-labelledby={`buildings-${group.status}`}><div className="building-index-heading"><span className="eyebrow">{group.eyebrow}</span><h2 id={`buildings-${group.status}`}>{group.title}</h2><p>{group.description}</p></div><div className="index-grid">{buildings.filter(b=>b.status===group.status).map(b=><BuildingCard key={b.slug} building={b} index={buildings.indexOf(b)}/>)}</div></section>)}
  <InquiryForm intent="building-index"/>
</>}
