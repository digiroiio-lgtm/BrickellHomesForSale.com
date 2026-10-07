import type { Metadata } from 'next';
import Link from 'next/link';
import { guides } from '@/lib/content';
import { metadataFor, pageGraph, StructuredData } from '@/lib/seo';
import { ReviewedBy } from '@/components/PageMeta';
import { InquiryForm } from '@/components/InquiryForm';

export const metadata: Metadata = metadataFor('/buyer-guides/','Brickell residential buyer guides','Research property types, areas, ownership economics, comparisons and transaction decisions across Brickell homes.');
const groups = [
  { heading:'Compare condos by budget', slugs:['brickell-condos-under-1m','brickell-condos-1m-2m','brickell-condos-2m-plus'] },
  { heading:'Property types and objectives', slugs:['condos-for-sale','waterfront-condos','luxury-condos','penthouses','new-construction','branded-residences','high-rise-residences','resale-properties','pre-construction','primary-residence-brickell','second-home-brickell','investment-properties-brickell'] },
  { heading:'Brickell areas', slugs:['brickell-key','brickell-avenue','brickell-core','south-brickell','brickell-bay-drive','north-brickell-miami-river'] },
  { heading:'Ownership economics', slugs:['ownership-costs','hoa-fees','property-taxes','condo-insurance','condo-reserves','brickell-condo-special-assessments','closing-costs','financing','brickell-condo-mortgage-requirements'] },
  { heading:'Compare your options', slugs:['brickell-vs-downtown-miami','brickell-key-vs-brickell','new-construction-vs-resale','waterfront-vs-inland-brickell','condo-vs-branded-residence','cash-vs-financing-brickell-condo'] },
  { heading:'Plan the purchase', slugs:['buying-a-home-in-brickell','buying-a-condo-in-brickell','pre-construction-buying-process','foreign-buyers','first-time-condo-buyer','brickell-condo-closing-process','brickell-condo-application-approval','condo-documents','condo-inspections','brickell-condo-rental-restrictions','brickell-condo-pet-rules'] }
];
const organized=new Set(groups.flatMap(g=>g.slugs));
const allGroups=[...groups,{heading:'More buyer research',slugs:guides.filter(g=>!organized.has(g.slug)).map(g=>g.slug)}];
export default function BuyerGuides(){return <><StructuredData data={pageGraph({path:'/buyer-guides/',name:'Brickell residential buyer guides',description:'Research property types, areas, ownership economics, comparisons and transaction decisions across Brickell homes.',trail:[{name:'Home',path:'/'},{name:'Buyer guides',path:'/buyer-guides/'}],kind:'collection',items:guides.map(g=>({name:g.title,path:`/${g.slug}/`}))})}/><section className="wrap page-header"><span className="eyebrow">BRICKELL / RESIDENTIAL RESEARCH</span><h1>Buyer guides for every decision.</h1><p className="page-deck">Explore residences by property type, location, cost and buying objective. These editorial guides help you ask better questions before requesting matched options.</p><ReviewedBy path="/buyer-guides/" /></section><div className="wrap section">{allGroups.map(group=><section key={group.heading}><h2 className="index-subheading">{group.heading}</h2><div className="index-links">{group.slugs.map(slug=>guides.find(g=>g.slug===slug)).filter((g):g is (typeof guides)[number]=>Boolean(g)).map(g=><Link key={g.slug} href={`/${g.slug}/`}><b>{g.title} ↗</b><span>{g.description}</span></Link>)}</div></section>)}<h2 className="index-subheading">Building intelligence</h2><p className="index-intro">Continue from an area or residence type to the <Link className="text-link" href="/buildings/">Brickell building profiles ↗</Link>, then check unit-level information with the appropriate professionals.</p></div><InquiryForm intent="buyer-guides"/></>}
