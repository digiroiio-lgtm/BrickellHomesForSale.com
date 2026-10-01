import Link from 'next/link';
import { InquiryForm } from '@/components/InquiryForm';
import { pageGraph, StructuredData } from '@/lib/seo';
import { ReviewedBy } from '@/components/PageMeta';
import { trust } from '@/lib/trust-content';

export function TrustPage({slug}:{slug:keyof typeof trust}) {
 const item=trust[slug];
 return <><StructuredData data={pageGraph({path:`/${slug}/`,name:item.title,description:item.description,trail:[{name:'Home',path:'/'},{name:item.title,path:`/${slug}/`}],kind:slug==='about'?'about':'page'})}/><div className="wrap page-header legal"><Link href="/">← Home</Link><span className="eyebrow">TRANSPARENCY / BRICKELL</span><h1>{item.title}</h1><p className="page-deck">{item.intro}</p><ReviewedBy path={`/${slug}/`} />{item.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}<p><Link className="text-link" href="/methodology/">Methodology ↗</Link> · <Link className="text-link" href="/editorial-standards/">Editorial standards ↗</Link> · <Link className="text-link" href="/disclosures/">Disclosures ↗</Link> · <Link className="text-link" href="/privacy/">Privacy ↗</Link></p></div><InquiryForm intent={slug}/></>;
}
