import Link from 'next/link';
import { InquiryForm } from '@/components/InquiryForm';
import { breadcrumbSchema, StructuredData } from '@/lib/seo';
import { trust } from '@/lib/trust-content';

export function TrustPage({slug}:{slug:keyof typeof trust}) {
 const item=trust[slug];
 return <><StructuredData data={breadcrumbSchema([{name:'Home',path:'/'},{name:item.title,path:`/${slug}/`}])}/><div className="wrap page-header legal"><Link href="/">← Home</Link><span className="eyebrow">TRANSPARENCY / BRICKELL</span><h1>{item.title}</h1><p className="page-deck">{item.intro}</p>{item.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}<p><Link className="text-link" href="/methodology/">Methodology ↗</Link> · <Link className="text-link" href="/editorial-standards/">Editorial standards ↗</Link> · <Link className="text-link" href="/disclosures/">Disclosures ↗</Link> · <Link className="text-link" href="/privacy/">Privacy ↗</Link></p></div><InquiryForm intent={slug}/></>;
}
