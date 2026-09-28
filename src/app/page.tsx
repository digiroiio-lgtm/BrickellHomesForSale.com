import type { Metadata } from 'next';
import Link from 'next/link';
import { InquiryForm } from '@/components/InquiryForm';
import { Diagram } from '@/components/Diagrams';
import { buildings } from '@/lib/buildings';
import { guides } from '@/lib/content';
import { metadataFor } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata:Metadata=metadataFor('/','Brickell homes for sale | Buyer guides & property types',site.description);
const propertyTypes=[
  {label:'Condos',slug:'condos-for-sale',caption:'Compare buildings, costs and layouts.'},
  {label:'Waterfront',slug:'waterfront-condos',caption:'Explore bayfront locations and views.'},
  {label:'Luxury residences',slug:'luxury-condos',caption:'Weigh privacy, service and ownership costs.'},
  {label:'Penthouses',slug:'penthouses',caption:'Check terraces, rights and floor plans.'},
  {label:'New construction',slug:'new-construction',caption:'Compare project stages and delivery terms.'}
];
const areas=[
  {label:'Brickell Key',slug:'brickell-key',caption:'Island setting and mainland access.'},
  {label:'Brickell Avenue',slug:'brickell-avenue',caption:'Buildings along a varied corridor.'},
  {label:'Brickell vs Downtown',slug:'brickell-vs-downtown-miami',caption:'Compare daily life across two areas.'}
];

export default function Home() {
  return <>
    <section className="hero wrap"><div className="hero-copy"><span className="eyebrow">MIAMI / BRICKELL / BUYER GUIDES</span><h1>Brickell homes<br/><em>for sale.</em></h1><p>Explore Brickell condos, waterfront and luxury residences, penthouses and new construction. Compare areas, buildings and ownership costs, then request options matched to your criteria.</p><div className="hero-actions"><Link className="button" href="#property-types">Explore property types <span>↗</span></Link><Link className="text-link" href="#inquiry">Request matched options <span>→</span></Link></div><p className="hero-note">Independent buyer guides • No live listings on this site</p></div><div className="hero-art" aria-label="Abstract original illustration of the Brickell waterfront skyline" role="img"><div className="sun"/><div className="tower t1"/><div className="tower t2"/><div className="tower t3"/><div className="tower t4"/><div className="water"/><div className="hero-art-label">25°45′ N <span>80°11′ W</span></div></div></section>
    <div className="ticker"><div className="wrap">BRICKELL HOMES <span>✳</span> PROPERTY TYPES <span>✳</span> AREAS & BUILDINGS <span>✳</span> BUYER RESOURCES</div></div>
    <section id="property-types" className="wrap section"><div className="section-heading"><div><span className="eyebrow">01 / PROPERTY TYPES</span><h2>Find the home<br/>that fits your search.</h2></div><p>Start with the kind of property you want. These guides explain what to compare; they do not show live inventory.</p></div><div className="intent-grid">{propertyTypes.map(({label,slug,caption},i)=><Link className="intent-card" href={`/${slug}/`} key={slug}><span className="intent-number">0{i+1} / PROPERTY TYPE</span><h3>{label}</h3><p>{caption}</p><span className="intent-arrow" aria-hidden="true">↗</span></Link>)}</div><div className="section-tail"><Link className="text-link" href="/brickell-condos-under-1m/">Explore condos by budget <span>→</span></Link></div></section>
    <section id="areas" className="wrap section area-section"><div className="section-heading"><div><span className="eyebrow">02 / AREAS</span><h2>Where in Brickell<br/>will you feel at home?</h2></div><p>Compare daily routes and settings before narrowing your search to specific buildings and units.</p></div><div className="intent-grid area-grid">{areas.map(({label,slug,caption},i)=><Link className="intent-card" href={`/${slug}/`} key={slug}><span className="intent-number">0{i+1} / AREA GUIDE</span><h3>{label}</h3><p>{caption}</p><span className="intent-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
    <section id="buildings" className="wrap section"><div className="section-heading"><div><span className="eyebrow">03 / BUILDINGS</span><h2>Behind every address,<br/>a different decision.</h2></div><Link className="text-link" href="/buildings/">All building guides ↗</Link></div><div className="building-preview">{buildings.slice(0,4).map((b,i)=><Link href={`/buildings/${b.slug}/`} key={b.slug}><span>0{i+1} / {b.area}</span><h3>{b.name}</h3><p>{b.profile}</p><b>Read the guide ↗</b></Link>)}</div></section>
    <section className="dark-band"><div className="wrap dark-grid"><div><span className="eyebrow">04 / OWNERSHIP COSTS</span><h2>A home is one number.<br/><em>Owning it is several.</em></h2><p>Association finances, taxes, insurance, closing costs and future repairs belong in the conversation before you compare asking prices.</p><Link className="light-link" href="/hoa-fees/">Understand ownership costs ↗</Link></div><Diagram kind="budget" /></div></section>
    <section id="buyer-resources" className="wrap section guides-section"><div className="section-heading"><div><span className="eyebrow">05 / BUYING RESOURCES</span><h2>Questions worth asking.</h2></div><p>Practical research for buying in Brickell, from first comparisons to documents and closing costs.</p></div><div className="guide-links">{guides.filter(g=>['buying-a-condo-in-brickell','foreign-buyers','property-taxes','financing','closing-costs','brickell-vs-downtown-miami','brickell-condo-closing-process','brickell-condo-special-assessments','brickell-condo-rental-restrictions','brickell-condo-pet-rules','brickell-condo-application-approval','brickell-condo-mortgage-requirements','cash-vs-financing-brickell-condo'].includes(g.slug)).map(g=><Link key={g.slug} href={`/${g.slug}/`}>{g.title}<span aria-hidden="true">↗</span></Link>)}</div></section>
    <div className="disclosure wrap">{site.disclosure}</div>
    <InquiryForm intent="home" />
  </>;
}
