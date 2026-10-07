import type { Metadata } from 'next';
import Link from 'next/link';
import { InquiryForm } from '@/components/InquiryForm';
import { Diagram } from '@/components/Diagrams';
import { buildings } from '@/lib/buildings';
import { guides } from '@/lib/content';
import { metadataFor, pageGraph, StructuredData } from '@/lib/seo';
import { ReviewedBy } from '@/components/PageMeta';
import { site } from '@/lib/site';

export const metadata: Metadata = metadataFor('/', 'Brickell homes for sale | Residential buyer intelligence', site.description);
const propertyTypes = [
  {label:'Condos',slug:'condos-for-sale',caption:'Compare units, buildings and ownership documents.'},
  {label:'Waterfront residences',slug:'waterfront-condos',caption:'Verify the view, frontage and exposure.'},
  {label:'Luxury residences',slug:'luxury-condos',caption:'Weigh service, privacy and carrying costs.'},
  {label:'Penthouses',slug:'penthouses',caption:'Check terraces, layouts and legal rights.'},
  {label:'New construction',slug:'new-construction',caption:'Compare project stages and delivery terms.'},
  {label:'Branded residences',slug:'branded-residences',caption:'Examine hospitality services and fees.'},
  {label:'High-rise residences',slug:'high-rise-residences',caption:'Assess floors, access and shared systems.'},
  {label:'Resale properties',slug:'resale-properties',caption:'Inspect condition and association history.'},
  {label:'Pre-construction',slug:'pre-construction',caption:'Review deposits, contract and timing.'}
];
const areas = [
  {label:'Brickell Key',slug:'brickell-key',caption:'Island access and varied residences.'},
  {label:'Brickell Avenue',slug:'brickell-avenue',caption:'Compare a long corridor by block.'},
  {label:'Brickell Core',slug:'brickell-core',caption:'Financial district and mixed-use streets.'},
  {label:'South Brickell',slug:'south-brickell',caption:'Southern corridor and waterfront choices.'},
  {label:'Brickell Bay Drive',slug:'brickell-bay-drive',caption:'Bay-edge position and exact-unit views.'},
  {label:'North Brickell / river edge',slug:'north-brickell-miami-river',caption:'River crossings and downtown access.'}
];
const objectives = [
  {label:'Primary residence',slug:'primary-residence-brickell',caption:'Build a daily-life shortlist.'},
  {label:'Second home',slug:'second-home-brickell',caption:'Plan use, access and care while away.'},
  {label:'Investment objective',slug:'investment-properties-brickell',caption:'Verify rental rules and stress-test costs.'}
];
const costLinks = [
  {label:'HOA and association fees',href:'/hoa-fees/'},
  {label:'Property taxes',href:'/property-taxes/'},
  {label:'Insurance',href:'/condo-insurance/'},
  {label:'Special assessments',href:'/brickell-condo-special-assessments/'},
  {label:'Reserves',href:'/condo-reserves/'},
  {label:'Closing costs',href:'/closing-costs/'}
];
const featuredSlugs = ['brickell-flatiron','icon-brickell','brickell-key-one','four-seasons-residences','reach-brickell-city-centre','una-residences','st-regis-residences-miami','mandarin-oriental-residences-miami'];
const featured = featuredSlugs.map(slug => buildings.find(b => b.slug === slug)).filter((b):b is (typeof buildings)[number] => Boolean(b));
const buyerSlugs = ['buying-a-home-in-brickell','foreign-buyers','financing','first-time-condo-buyer','second-home-brickell','investment-properties-brickell','pre-construction-buying-process','new-construction-vs-resale','brickell-condo-closing-process','cash-vs-financing-brickell-condo'];
const comparisons = [
  {label:'Brickell vs Downtown Miami',href:'/brickell-vs-downtown-miami/'},
  {label:'Brickell Key vs mainland Brickell',href:'/brickell-key-vs-brickell/'},
  {label:'New construction vs resale',href:'/new-construction-vs-resale/'},
  {label:'Waterfront vs inland',href:'/waterfront-vs-inland-brickell/'},
  {label:'Condo vs branded residence',href:'/condo-vs-branded-residence/'},
  {label:'Best condos in Brickell: build your shortlist',href:'/best-condos-in-brickell/'},
  {label:'Brickell commute and location checklist',href:'/brickell-commute/'}
];

export default function Home() {
  return <>
    <StructuredData data={pageGraph({path:'/',name:'Brickell homes for sale | Residential buyer intelligence',description:site.description})} />
    <section className="hero wrap"><div className="hero-copy"><span className="eyebrow">BRICKELL / MIAMI / FLORIDA</span><h1>Brickell homes<br/><em>for sale.</em></h1><p>Independent buyer guides for homes and residences across Brickell, from waterfront addresses and luxury developments to penthouses and new construction. Compare the place, the building and the true cost before requesting options matched to you.</p><div className="hero-actions"><Link className="button" href="#property-types">Explore residences <span>↗</span></Link><Link className="text-link" href="#inquiry">Request matched options <span>→</span></Link></div><p className="hero-note">Independent editorial research • No live listings on this site</p><ReviewedBy path="/" /></div><div className="hero-art" aria-label="Abstract original illustration of the Brickell waterfront skyline" role="img"><div className="sun"/><div className="tower t1"/><div className="tower t2"/><div className="tower t3"/><div className="tower t4"/><div className="water"/><div className="hero-art-label">25°45′ N <span>80°11′ W</span></div></div></section>
    <div className="ticker"><div className="wrap">BRICKELL HOMES <span>✳</span> RESIDENTIAL TYPES <span>✳</span> AREAS & BUILDINGS <span>✳</span> BUYER DECISIONS</div></div>
    <section id="property-types" className="wrap section"><div className="section-heading"><div><span className="eyebrow">01 / PROPERTY TYPES</span><h2>The residence<br/>behind the search.</h2></div><p>Choose an ownership experience first. Each guide asks different questions about location, rights, service, project stage and cost.</p></div><div className="intent-grid">{propertyTypes.map(({label,slug,caption},i)=><Link className="intent-card" href={`/${slug}/`} key={slug}><span className="intent-number">{String(i+1).padStart(2,'0')} / RESIDENTIAL TYPE</span><h3>{label}</h3><p>{caption}</p><span className="intent-arrow" aria-hidden="true">↗</span></Link>)}</div><div className="section-tail"><h3>Compare condos by budget</h3><div className="guide-links"><Link href="/brickell-condos-under-1m/">Brickell condos under $1M <span>↗</span></Link><Link href="/brickell-condos-1m-2m/">Brickell condos $1M–$2M <span>↗</span></Link><Link href="/brickell-condos-2m-plus/">Brickell condos $2M+ <span>↗</span></Link></div></div></section>
    <section id="areas" className="wrap section area-section"><div className="section-heading"><div><span className="eyebrow">02 / BRICKELL SUBMARKETS</span><h2>Every address<br/>has a different routine.</h2></div><p>These practical search areas describe access and building context, not rigid legal neighborhood boundaries.</p></div><div className="intent-grid area-grid">{areas.map(({label,slug,caption},i)=><Link className="intent-card" href={`/${slug}/`} key={slug}><span className="intent-number">{String(i+1).padStart(2,'0')} / AREA</span><h3>{label}</h3><p>{caption}</p><span className="intent-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
    <section id="buildings" className="wrap section"><div className="section-heading"><div><span className="eyebrow">03 / FEATURED BUILDINGS</span><h2>Know the building.<br/>Then the residence.</h2></div><Link className="text-link" href="/buildings/">Explore all 23 building profiles ↗</Link></div><div className="building-preview">{featured.map((b,i)=><Link href={`/buildings/${b.slug}/`} key={b.slug}><span>{String(i+1).padStart(2,'0')} / {b.area}</span><h3>{b.name}</h3><p>{b.profile}</p><b>Read the profile ↗</b></Link>)}</div><div className="guide-links">{buildings.filter(b=>!featuredSlugs.includes(b.slug)).map(b=><Link key={b.slug} href={`/buildings/${b.slug}/`}>{b.name}<span aria-hidden="true">↗</span></Link>)}</div></section>
    <section id="ownership-costs" className="dark-band"><div className="wrap dark-grid"><div><span className="eyebrow">04 / OWNERSHIP ECONOMICS</span><h2>The price is one number.<br/><em>Ownership is several.</em></h2><p>Cash to close, taxes, insurance, association costs and a repair or furnishing reserve belong in the same decision across residential types. For a future project, distinguish projected from adopted charges.</p><Link className="light-link" href="/ownership-costs/">Explore total ownership costs ↗</Link><div className="cost-links">{costLinks.map(link=><Link key={link.href} href={link.href}>{link.label} ↗</Link>)}</div></div><Diagram kind="budget" /></div></section>
    <section id="buyer-objectives" className="wrap section"><div className="section-heading"><div><span className="eyebrow">05 / BUYER OBJECTIVES</span><h2>Start with your reason<br/>for buying.</h2></div><p>A full-time home, occasional base and investment-oriented purchase call for different questions and documents.</p></div><div className="intent-grid area-grid">{objectives.map(({label,slug,caption},i)=><Link className="intent-card" href={`/${slug}/`} key={slug}><span className="intent-number">0{i+1} / BUYER OBJECTIVE</span><h3>{label}</h3><p>{caption}</p><span className="intent-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
    <section id="buyer-resources" className="wrap section guides-section"><div className="section-heading"><div><span className="eyebrow">06 / BUYER GUIDES</span><h2>Make the next decision<br/>with evidence.</h2></div><p>From funding and project stages to the documents that matter before closing.</p></div><div className="guide-links">{buyerSlugs.map(slug=>guides.find(g=>g.slug===slug)).filter((g):g is (typeof guides)[number]=>Boolean(g)).map(g=><Link key={g.slug} href={`/${g.slug}/`}>{g.title}<span aria-hidden="true">↗</span></Link>)}</div><div className="section-tail"><Link className="text-link" href="/buyer-guides/">View all buyer guides <span>→</span></Link></div></section>
    <section id="comparisons" className="wrap section compare-section"><div className="section-heading"><div><span className="eyebrow">07 / BUYER COMPARISONS</span><h2>Compare two real<br/>paths to ownership.</h2></div><p>Decision frameworks for tradeoffs between places, asset types and purchase routes.</p></div><div className="guide-links">{comparisons.map(c=><Link key={c.href} href={c.href}>{c.label}<span aria-hidden="true">↗</span></Link>)}</div></section>
    <div className="disclosure wrap">{site.disclosure}</div>
    <InquiryForm intent="home" />
  </>;
}
