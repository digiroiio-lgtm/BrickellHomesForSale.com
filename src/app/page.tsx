import type { Metadata } from 'next';
import Link from 'next/link';
import { InquiryForm } from '@/components/InquiryForm';
import { Diagram } from '@/components/Diagrams';
import { buildings } from '@/lib/buildings';
import { guides } from '@/lib/content';
import { metadataFor } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = metadataFor('/', 'Brickell condos for sale | Compare budgets and buildings', site.description);

const paths = [
  ['Under $1M', 'brickell-condos-under-1m', 'See what your budget needs to cover'],
  ['$1M–$2M', 'brickell-condos-1m-2m', 'Compare layouts and monthly costs'],
  ['$2M+', 'brickell-condos-2m-plus', 'Prioritize views, space and privacy'],
  ['Penthouses', 'penthouses', 'Check terraces and ownership rights'],
  ['Waterfront', 'waterfront-condos', 'Compare views, insurance and exposure'],
  ['New construction', 'new-construction', 'Review deposits and delivery timing'],
  ['Brickell Key', 'brickell-key', 'Test island access and building costs']
];

export default function Home() {
  return <>
    <section className="hero wrap">
      <div className="hero-copy">
        <span className="eyebrow">MIAMI / BRICKELL / CONDO BUYER GUIDES</span>
        <h1>Brickell condos<br/><em>that fit you.</em></h1>
        <p>Compare condos by budget, location and building. Understand HOA fees and buying costs before you request current options.</p>
        <div className="hero-actions">
          <Link className="button" href="#inquiry">Request current condo options <span>↗</span></Link>
          <Link className="text-link" href="/condos-for-sale/">Compare condo guides <span>→</span></Link>
        </div>
        <p className="hero-note">Independent buyer guides • No live listing feed</p>
      </div>
      <div className="hero-art" aria-label="Abstract original illustration of the Brickell waterfront skyline" role="img">
        <div className="sun"/><div className="tower t1"/><div className="tower t2"/><div className="tower t3"/><div className="tower t4"/><div className="water"/>
        <div className="hero-art-label">25°45′ N <span>80°11′ W</span></div>
      </div>
    </section>
    <div className="ticker"><div className="wrap">COMPARE YOUR OPTIONS <span>✳</span> CHECK THE BUILDING <span>✳</span> KNOW THE FULL COST</div></div>
    <section className="wrap section">
      <div className="section-heading">
        <div><span className="eyebrow">01 / START YOUR SEARCH</span><h2>Start with your budget<br/>and priorities.</h2></div>
        <p>Choose a price range, location or condo type. Each guide shows what to compare before asking about available units.</p>
      </div>
      <div className="intent-grid">{paths.map(([label,slug,caption],i)=><Link className="intent-card" href={'/'+slug+'/'} key={slug}><span className="intent-number">0{i+1} / BUYER GUIDE</span><h3>{label}</h3><p>{caption}</p><span className="intent-arrow">↗</span></Link>)}</div>
    </section>
    <section className="dark-band"><div className="wrap dark-grid"><div>
      <span className="eyebrow">02 / KNOW THE FULL COST</span>
      <h2>Plan beyond<br/><em>the asking price.</em></h2>
      <p>Check HOA fees, property taxes, insurance, closing costs and potential assessments before deciding what you can comfortably buy.</p>
      <Link className="light-link" href="/hoa-fees/">Compare ownership costs ↗</Link>
    </div><Diagram kind="budget" /></div></section>
    <section className="wrap section">
      <div className="section-heading"><div><span className="eyebrow">03 / COMPARE BUILDINGS</span><h2>Check the building<br/>before you tour a unit.</h2></div><Link className="text-link" href="/buildings/">Compare all buildings ↗</Link></div>
      <div className="building-preview">{buildings.slice(0,4).map((b,i)=><Link href={'/buildings/'+b.slug+'/'} key={b.slug}><span>0{i+1} / {b.area}</span><h3>{b.name}</h3><p>{b.profile}</p><b>Check this building ↗</b></Link>)}</div>
    </section>
    <section className="wrap section guides-section">
      <div className="section-heading"><div><span className="eyebrow">04 / BUY WITH THE FACTS</span><h2>Know what to ask<br/>before you buy.</h2></div><p>Use these guides to check costs, financing, location and documents for the condo you want.</p></div>
      <div className="guide-links">{guides.filter(g=>['buying-a-condo-in-brickell','foreign-buyers','property-taxes','financing','closing-costs','brickell-vs-downtown-miami'].includes(g.slug)).map(g=><Link key={g.slug} href={'/'+g.slug+'/'}>{g.title}<span>↗</span></Link>)}</div>
    </section>
    <div className="disclosure wrap">{site.disclosure}</div>
    <InquiryForm intent="home" />
  </>;
}
