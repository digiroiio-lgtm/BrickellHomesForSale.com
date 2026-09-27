import type { Metadata } from 'next';
import Link from 'next/link';
import { InquiryForm } from '@/components/InquiryForm';
import { Diagram } from '@/components/Diagrams';
import { buildings } from '@/lib/buildings';
import { guides } from '@/lib/content';
import { metadataFor } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata:Metadata=metadataFor('/','Brickell condos for sale | Independent buyer guides',site.description);
const paths=[['Under $1M','brickell-condos-under-1m','A considered entry point'],['$1M–$2M','brickell-condos-1m-2m','More room to choose'],['$2M+','brickell-condos-2m-plus','An elevated search'],['Penthouses','penthouses','Privacy at the top'],['Waterfront','waterfront-condos','Bayfront perspective'],['New construction','new-construction','Look ahead carefully'],['Brickell Key','brickell-key','An island rhythm']];

export default function Home() {
  return <>
    <section className="hero wrap"><div className="hero-copy"><span className="eyebrow">MIAMI / BRICKELL / BUYER GUIDES</span><h1>Find your place<br/>in <em>Brickell.</em></h1><p>Clearer questions. Better building comparisons. A smarter way to request current Brickell condos that actually fit your life.</p><div className="hero-actions"><Link className="button" href="#inquiry">Get Current Brickell Listings <span>↗</span></Link><Link className="text-link" href="/condos-for-sale/">Explore the buyer guide <span>→</span></Link></div><p className="hero-note">Independent editorial guides • No live listing feed</p></div><div className="hero-art" aria-label="Abstract original illustration of the Brickell waterfront skyline" role="img"><div className="sun"/><div className="tower t1"/><div className="tower t2"/><div className="tower t3"/><div className="tower t4"/><div className="water"/><div className="hero-art-label">25°45′ N <span>80°11′ W</span></div></div></section>
    <div className="ticker"><div className="wrap">THE BRICKELL BUYER’S NOTEBOOK <span>✳</span> COMPARE BEFORE YOU COMMIT <span>✳</span> ASK FOR CURRENT AVAILABILITY</div></div>
    <section className="wrap section"><div className="section-heading"><div><span className="eyebrow">01 / FIND YOUR DIRECTION</span><h2>What kind of Brickell<br/>are you looking for?</h2></div><p>Start with your intent, then use building records and verified availability to narrow the search.</p></div><div className="intent-grid">{paths.map(([label,slug,caption],i)=><Link className="intent-card" href={`/${slug}/`} key={slug}><span className="intent-number">0{i+1} / SEARCH PATH</span><h3>{label}</h3><p>{caption}</p><span className="intent-arrow">↗</span></Link>)}</div></section>
    <section className="dark-band"><div className="wrap dark-grid"><div><span className="eyebrow">02 / THE BIGGER PICTURE</span><h2>A home is one number.<br/><em>Owning it is several.</em></h2><p>Association finances, taxes, insurance, closing costs and future repairs belong in the conversation before you compare asking prices.</p><Link className="light-link" href="/hoa-fees/">Understand ownership costs ↗</Link></div><Diagram kind="budget" /></div></section>
    <section className="wrap section"><div className="section-heading"><div><span className="eyebrow">03 / KNOW THE BUILDINGS</span><h2>Behind every address,<br/>a different decision.</h2></div><Link className="text-link" href="/buildings/">All building guides ↗</Link></div><div className="building-preview">{buildings.slice(0,4).map((b,i)=><Link href={`/buildings/${b.slug}/`} key={b.slug}><span>0{i+1} / {b.area}</span><h3>{b.name}</h3><p>{b.profile}</p><b>Read the guide ↗</b></Link>)}</div></section>
    <section className="wrap section guides-section"><div className="section-heading"><div><span className="eyebrow">04 / BUY WELL</span><h2>Questions worth asking.</h2></div><p>Specific research for specific decisions. No recycled property grids.</p></div><div className="guide-links">{guides.filter(g=>['buying-a-condo-in-brickell','foreign-buyers','property-taxes','financing','closing-costs','brickell-vs-downtown-miami'].includes(g.slug)).map(g=><Link key={g.slug} href={`/${g.slug}/`}>{g.title}<span>↗</span></Link>)}</div></section>
    <div className="disclosure wrap">{site.disclosure}</div>
    <InquiryForm intent="home" />
  </>;
}
