import type { Metadata } from 'next';
import Link from 'next/link';
import { InquiryForm } from '@/components/InquiryForm';
import { Diagram } from '@/components/Diagrams';
import { buildings } from '@/lib/buildings';
import { guides } from '@/lib/content';
import { metadataFor, pageGraph } from '@/lib/seo';
import { HeadStructuredData } from '@/components/HeadStructuredData';
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

const faqs = [
  {
    id: 'faq-start',
    question: 'How do I start looking for a condo in Brickell?',
    answer: 'Set a purchase budget and a separate monthly ownership limit. Choose two or three areas that fit your weekday routine, then compare exact units by layout, exposure, association dues and building records. Confirm the unit is still available with a listing source or broker before booking a tour.'
  },
  {
    id: 'faq-hoa',
    question: 'What do Brickell condo HOA fees include?',
    answer: 'Coverage varies by association. Dues can include shared maintenance, building insurance, reserves and some utilities or services. Request the adopted budget and the current dues for the exact unit. Check for a separate master association, parking or service charge and confirm which expenses you still pay directly.'
  },
  {
    id: 'faq-documents',
    question: 'What documents should I ask for before buying a Brickell condo?',
    answer: 'Ask for the declaration and amendments, rules, current budget, recent financial statements and meeting minutes, insurance information, and assessment notices. Request the reserve study and inspection or recertification records where applicable. Confirm who will provide each document and review it within your contract deadlines.'
  },
  {
    id: 'faq-rentals',
    question: 'Can I rent out my Brickell condo on Airbnb?',
    answer: 'It depends on the exact building, unit and applicable local requirements. Check the recorded declaration and amendments, association rules and City of Miami requirements before relying on short-term rental income. Ask about minimum lease terms, rental frequency, approvals and whether any advertised exception actually transfers to a new owner.'
  },
  {
    id: 'faq-financing',
    question: 'Can I get a mortgage for a Brickell condo?',
    answer: 'Ask a lender to review both your financing profile and the exact condo project. Borrower preapproval can come before the lender reviews building records such as the budget, insurance or repair information. Share the legal association name and unit number early and ask which documents or project conditions could delay approval.'
  }
];

export default function Home() {
  return <>
    <HeadStructuredData data={pageGraph({path:'/',name:'Brickell homes for sale | Residential buyer intelligence',description:site.description,faqs})} />
    <section className="hero wrap"><div className="hero-copy"><span className="eyebrow">BRICKELL / MIAMI / FLORIDA</span><h1>Brickell homes<br/><em>for sale.</em></h1><p>Independent buyer guides for homes and residences across Brickell, from waterfront addresses and luxury developments to penthouses and new construction. Compare the place, the building and the true cost before requesting options matched to you.</p><div className="hero-actions"><Link className="button" href="#property-types">Explore residences <span>↗</span></Link><Link className="text-link" href="#inquiry">Request matched options <span>→</span></Link></div><p className="hero-note">Independent editorial research • No live listings on this site</p><ReviewedBy path="/" /></div><div className="hero-art" aria-label="Abstract original illustration of the Brickell waterfront skyline" role="img"><div className="sun"/><div className="tower t1"/><div className="tower t2"/><div className="tower t3"/><div className="tower t4"/><div className="water"/><div className="hero-art-label">25°45′ N <span>80°11′ W</span></div></div></section>
    <section className="wrap section" aria-labelledby="popular-brickell-guides"><div className="section-heading"><div><span className="eyebrow">START HERE / BRICKELL REAL ESTATE</span><h2 id="popular-brickell-guides">Explore Brickell homes and buyer resources.</h2></div><p>Start with a property type, compare individual buildings, or review our independent research approach.</p></div><div className="guide-links"><Link href="/condos-for-sale/">Brickell condos for sale <span aria-hidden="true">↗</span></Link><Link href="/waterfront-condos/">Waterfront condos in Brickell <span aria-hidden="true">↗</span></Link><Link href="/luxury-condos/">Luxury condos in Brickell <span aria-hidden="true">↗</span></Link><Link href="/buildings/">Brickell building guides <span aria-hidden="true">↗</span></Link><Link href="/buyer-guides/">Brickell buyer guides <span aria-hidden="true">↗</span></Link><Link href="/about/">About our buyer research <span aria-hidden="true">↗</span></Link></div></section>
    <div className="ticker"><div className="wrap">BRICKELL HOMES <span>✳</span> RESIDENTIAL TYPES <span>✳</span> AREAS & BUILDINGS <span>✳</span> BUYER DECISIONS</div></div>
    <section id="property-types" className="wrap section"><div className="section-heading"><div><span className="eyebrow">01 / PROPERTY TYPES</span><h2>The residence<br/>behind the search.</h2></div><p>Choose an ownership experience first. Each guide asks different questions about location, rights, service, project stage and cost.</p></div><div className="intent-grid">{propertyTypes.map(({label,slug,caption},i)=><Link className="intent-card" href={`/${slug}/`} key={slug}><span className="intent-number">{String(i+1).padStart(2,'0')} / RESIDENTIAL TYPE</span><strong className="home-card-title">{label}</strong><p>{caption}</p><span className="intent-arrow" aria-hidden="true">↗</span></Link>)}</div><div className="section-tail"><h3>Compare condos by budget</h3><div className="guide-links"><Link href="/brickell-condos-under-1m/">Brickell condos under $1M <span>↗</span></Link><Link href="/brickell-condos-1m-2m/">Brickell condos $1M–$2M <span>↗</span></Link><Link href="/brickell-condos-2m-plus/">Brickell condos $2M+ <span>↗</span></Link></div></div></section>
    <section id="areas" className="wrap section area-section"><div className="section-heading"><div><span className="eyebrow">02 / BRICKELL SUBMARKETS</span><h2>Every address<br/>has a different routine.</h2></div><p>These practical search areas describe access and building context, not rigid legal neighborhood boundaries.</p></div><div className="intent-grid area-grid">{areas.map(({label,slug,caption},i)=><Link className="intent-card" href={`/${slug}/`} key={slug}><span className="intent-number">{String(i+1).padStart(2,'0')} / AREA</span><strong className="home-card-title">{label}</strong><p>{caption}</p><span className="intent-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
    <section id="buildings" className="wrap section"><div className="section-heading"><div><span className="eyebrow">03 / FEATURED BUILDINGS</span><h2>Know the building.<br/>Then the residence.</h2></div><Link className="text-link" href="/buildings/">Explore all 23 building profiles ↗</Link></div><div className="building-preview">{featured.map((b,i)=><Link href={`/buildings/${b.slug}/`} key={b.slug}><span>{String(i+1).padStart(2,'0')} / {b.area}</span><strong className="home-card-title">{b.name}</strong><p>{b.profile}</p><b>Read the profile ↗</b></Link>)}</div><div className="guide-links">{buildings.filter(b=>!featuredSlugs.includes(b.slug)).map(b=><Link key={b.slug} href={`/buildings/${b.slug}/`}>{b.name}<span aria-hidden="true">↗</span></Link>)}</div></section>
    <section id="ownership-costs" className="dark-band"><div className="wrap dark-grid"><div><span className="eyebrow">04 / OWNERSHIP ECONOMICS</span><h2>The price is one number.<br/><em>Ownership is several.</em></h2><p>Cash to close, taxes, insurance, association costs and a repair or furnishing reserve belong in the same decision across residential types. For a future project, distinguish projected from adopted charges.</p><Link className="light-link" href="/ownership-costs/">Explore total ownership costs ↗</Link><div className="cost-links">{costLinks.map(link=><Link key={link.href} href={link.href}>{link.label} ↗</Link>)}</div></div><Diagram kind="budget" /></div></section>
    <section id="buyer-objectives" className="wrap section"><div className="section-heading"><div><span className="eyebrow">05 / BUYER OBJECTIVES</span><h2>Start with your reason<br/>for buying.</h2></div><p>A full-time home, occasional base and investment-oriented purchase call for different questions and documents.</p></div><div className="intent-grid area-grid">{objectives.map(({label,slug,caption},i)=><Link className="intent-card" href={`/${slug}/`} key={slug}><span className="intent-number">0{i+1} / BUYER OBJECTIVE</span><strong className="home-card-title">{label}</strong><p>{caption}</p><span className="intent-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
    <section id="buyer-resources" className="wrap section guides-section"><div className="section-heading"><div><span className="eyebrow">06 / BUYER GUIDES</span><h2>Make the next decision<br/>with evidence.</h2></div><p>From funding and project stages to the documents that matter before closing.</p></div><div className="guide-links">{buyerSlugs.map(slug=>guides.find(g=>g.slug===slug)).filter((g):g is (typeof guides)[number]=>Boolean(g)).map(g=><Link key={g.slug} href={`/${g.slug}/`}>{g.title}<span aria-hidden="true">↗</span></Link>)}</div><div className="section-tail"><Link className="text-link" href="/buyer-guides/">View all buyer guides <span>→</span></Link></div></section>
    <section id="comparisons" className="wrap section compare-section"><div className="section-heading"><div><span className="eyebrow">07 / BUYER COMPARISONS</span><h2>Compare two real<br/>paths to ownership.</h2></div><p>Decision frameworks for tradeoffs between places, asset types and purchase routes.</p></div><div className="guide-links">{comparisons.map(c=><Link key={c.href} href={c.href}>{c.label}<span aria-hidden="true">↗</span></Link>)}</div></section>
    <section id="brickell-buyer-checklist" className="wrap section">
      <div className="section-heading">
        <div><span className="eyebrow">08 / BEFORE YOU MAKE AN OFFER</span><h2>Top 6 checks before buying a Brickell condo</h2></div>
        <p>Use the same checks for every finalist. Keep a record of the document, its date and any open questions.</p>
      </div>
      <ol className="buyer-checklist">
        <li><strong>Test the address on a normal day.</strong> Walk from the lobby to your regular destinations and time the garage exit when you expect to use it.</li>
        <li><strong>Tour the exact unit.</strong> Check light, noise and sightlines from inside, and ask how parking and storage are assigned.</li>
        <li><strong>Build a monthly cost estimate.</strong> Include dues, taxes, unit insurance and recurring charges, then record cash needed at closing separately.</li>
        <li><strong>Read the association records.</strong> Compare the adopted budget, recent minutes, reserve information and any notices of assessments or major work.</li>
        <li><strong>Check the rules for your intended use.</strong> Verify lease terms, pets, guest access and renovation rules against current written documents.</li>
        <li><strong>Confirm financing and timing.</strong> Ask when your lender can review the exact project and when outstanding documents must arrive under your contract.</li>
      </ol>
    </section>
    <section id="brickell-buyer-decisions" className="wrap section">
      <div className="section-heading">
        <div><span className="eyebrow">09 / BUYER DECISIONS</span><h2>How do you compare Brickell condos before making an offer?</h2></div>
        <p>Use recent evidence for the exact address and write down what still needs confirmation.</p>
      </div>
      <div className="buyer-answers">
        <section>
          <h3>Which part of Brickell fits your daily routine?</h3>
          <p>Start with the trips you make most often. If you want to reach groceries, restaurants or transit on foot, test a route from an exact address in <Link href="/brickell-core/">Brickell Core</Link>. If you are looking at <Link href="/brickell-key/">Brickell Key</Link>, include the route across the bridge and the time it takes to enter and leave the building. For South Brickell or a unit along Brickell Avenue, walk the actual route to your regular stops and see how crossings and driveways affect it. Do the same for a drive to work during the hours you would normally leave.</p>
          <p>Make two visits if street activity or late deliveries could change your decision. During one visit, start in the garage and time the full trip to the street. During the other, start in the unit and walk to dinner or the nearest stop. Compare both routes with the same destinations for every address.</p>
        </section>
        <section>
          <h3>How do you verify a waterfront view before buying?</h3>
          <p>Evaluate the view from the exact unit, including the rooms and balcony you expect to use. A photo taken from one corner can make a narrow view look wider. Look straight ahead while sitting and standing, then check which portion of the view depends on a gap between buildings. If an open view is central to the price you would pay, identify the parcels in that direction and have your adviser check public planning and permit records for known proposals. Record the date of the check and any unanswered questions.</p>
          <p>Compare the same unit with the windows and balcony doors both open and closed. Listen for mechanical equipment, traffic, boat activity or sound reflected from nearby buildings. Check afternoon sun and wind on the balcony when possible. Use the <Link href="/waterfront-vs-inland-brickell/">waterfront versus inland guide</Link> to compare these tradeoffs across units with similar interiors.</p>
        </section>
        <section>
          <h3>How do you compare two condos with different monthly fees?</h3>
          <p>Put each unit in the same ownership worksheet. Record the contract price, cash needed to close, current association dues for the unit, an estimate of your property taxes, a unit insurance quote and any separate parking or service charges. Identify the expenses included in the dues so they appear only once. Keep a separate line for approved assessments and note which party would pay under the proposed contract. The <a href="https://www.consumerfinance.gov/ask-cfpb/are-condoco-op-fees-or-homeowners-association-dues-included-in-my-monthly-mortgage-payment-en-1945/">Consumer Financial Protection Bureau explains how condo dues relate to mortgage payments</a>.</p>
          <p>Suppose one unit has $300 more in recurring monthly expenses than another. That is $3,600 per year, or $18,000 over five years if expenses stay flat. This illustrative comparison isolates the carrying-cost difference. Use the <Link href="/ownership-costs/">ownership cost guide</Link> to add financing, closing expenses and anticipated one-time work before comparing the two offers.</p>
          <figure>
            <blockquote cite="https://www.floridarealtors.org/newsroom/florida-realtorsr-2025-real-estate-trends-whats-ahead-flas-housing"><p>“In 2024, several challenges weakened demand for housing in Florida, including the fact that mortgage rates remained elevated along with property insurance rates.”</p></blockquote>
            <figcaption><a href="https://www.floridarealtors.org/newsroom/florida-realtorsr-2025-real-estate-trends-whats-ahead-flas-housing">Brad O’Connor, Chief Economist at Florida Realtors, discussing Florida’s 2024 market</a></figcaption>
          </figure>
        </section>
        <section>
          <h3>What do reserve studies and inspection records tell you?</h3>
          <p>A reserve study helps explain what the association expects to repair or replace and how it plans to pay for that work. An inspection report helps explain the condition observed at the time of the inspection and any recommended follow-up. Read both alongside the adopted budget and recent minutes. When the same project appears across records, compare the scope, estimated cost, expected start date and funding status. The <a href="https://condos.myfloridalicense.com/faqs/">Florida Department of Business and Professional Regulation’s condo FAQ</a> describes reserves and milestone inspections.</p>
          <p>Ask the association or manager for the latest versions and for any records showing work completed since the reports were issued. For example, a report that identifies garage repairs and minutes that discuss contractor bids leave a different question than a signed contract with confirmed funding. Identify the local authority for the address and use its records to cross-check the association’s account. The <a href="https://www.miamidade.gov/recertification/">Miami-Dade recertification guide</a> explains the county program.</p>
        </section>
        <section>
          <h3>How can an assessment change what you offer?</h3>
          <p>Ask for the written notice, the amount allocated to the exact unit and the payment schedule. Check whether the work is still being discussed, the board has voted on it, or installments are already being collected. If the seller proposes paying the balance at closing, have your closing professional reconcile that agreement with the association’s records and the contract. Compare the settlement amount, the expected monthly charges after closing and the timing of construction disruption.</p>
          <p>Consider two illustrative units at the same asking price. One carries a confirmed $20,000 assessment payable in four equal installments. The other has minutes discussing a possible project, with no documented allocation to the unit. For the first, put the $5,000 payments on the calendar and verify who is responsible. For the second, write down what still needs to be priced and when the association expects an update. The <Link href="/brickell-condo-special-assessments/">assessment guide</Link> explains which records can clarify the difference.</p>
        </section>
        <section>
          <h3>Why should your lender review the condo project early?</h3>
          <p>Give your lender the property address, unit number and legal association name as soon as you have a serious candidate. Ask whether your loan requires a project review, which records it needs and who will request them. An association questionnaire can take time to obtain, and a follow-up request for insurance or repair documentation can affect the purchase schedule. <a href="https://singlefamily.fanniemae.com/originating-underwriting/mortgage-products/eligibility-pricing">Fannie Mae’s project eligibility resources</a> explain the project standards for loans delivered to Fannie Mae. Confirm the requirements for your own loan with your lender.</p>
          <p>Have the lender identify what remains open before relying on a closing date. If you are paying cash, you can still ask how the building’s condition, finances and insurance could affect future buyers who need financing. Discuss review deadlines with your advisers while terms are still being negotiated. The <Link href="/cash-vs-financing-brickell-condo/">cash versus financing guide</Link> covers how the two purchase routes differ.</p>
          <figure>
            <blockquote cite="https://www.floridarealtors.org/news-media/news-articles/2024/05/new-florida-law-roils-condo-market"><p>“It’s the buildings that aren’t qualifying.”</p></blockquote>
            <figcaption><a href="https://www.floridarealtors.org/news-media/news-articles/2024/05/new-florida-law-roils-condo-market">Craig Studnicky, Chief Executive at ISG World, quoted in 2024 coverage of Florida condo financing</a></figcaption>
          </figure>
        </section>
        <section>
          <h3>How do you compare pre-construction with a resale condo?</h3>
          <p>With a resale, you can walk through the unit and ask for the current association records. With pre-construction, you are comparing a contract, plans and a projected operating budget. Map each deposit to its due date and ask a Florida real estate attorney to explain delivery provisions, changes the developer can make and the process if the transaction does not close as expected. Ask which finishes, parking or storage rights are included in the written agreement.</p>
          <p>Compare both options over the same time horizon. For example, if you plan to move in August and a project shows an estimated completion later in the year, account for temporary housing, a second move and the timing of your financing. For resale, allow time for inspections and any work you want to complete before moving. The <Link href="/new-construction-vs-resale/">new construction versus resale comparison</Link> walks through these different evidence and timing questions.</p>
        </section>
        <section>
          <h3>What should you confirm if you plan to rent the unit?</h3>
          <p>Work backward from the rental arrangement you would need. Write down the minimum stay, frequency, start date and rental income you are assuming, then check each point against current association documents and applicable local rules. Ask how lease approval works, what fees apply, and whether guests have the amenity access you intend to advertise. If a seller describes an exception, find out whether it applies to that unit and whether a new owner can use it.</p>
          <p>Build a second scenario around a longer lease or a period without a tenant. Include vacancy, management, turnover, insurance, dues and any approved assessments. For example, if the purchase depends on weekend bookings but the documents require longer leases, rebuild the estimate using a permitted rental pattern before setting an offer price. The <Link href="/investment-properties-brickell/">Brickell investment buyer guide</Link> covers other inputs that can affect the result.</p>
        </section>
        <section>
          <h3>How should you interpret the building profiles on this site?</h3>
          <p>Use the profiles to decide what to verify and which buildings to investigate first. They organize the search around the address, building and purchase objective. To validate a specific residence, record the unit number, the date you checked availability and the person or document that confirmed each detail. When a seller’s summary and an association record differ, ask for the latest dated version of the underlying document and keep the discrepancy on your follow-up list.</p>
          <p>Apply the same comparison rules across your shortlist. For sale comparisons, note the closing date, unit size, condition, exposure and any included parking or storage before treating two transactions as similar. For ongoing costs, distinguish adopted dues and approved assessments from estimates. The <Link href="/methodology/">site methodology</Link> explains how the guides use evidence and what to confirm directly for a current purchase.</p>
        </section>
      </div>
    </section>
    <section id="brickell-faq" className="wrap section">
      <div className="section-heading">
        <div><span className="eyebrow">10 / BUYER FAQ</span><h2>Brickell condo buyer FAQ</h2></div>
        <p>Quick answers to questions about starting a search, budgeting and checking a building before you buy.</p>
      </div>
      <div className="buyer-answers">
        {faqs.map(({ id, question, answer }) => (
          <div key={id} id={id}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </div>
        ))}
      </div>
    </section>
    <div className="disclosure wrap">{site.disclosure}</div>
    <InquiryForm intent="home" />
  </>;
}
