import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@/components/Analytics';
import { TrackLink } from '@/components/TrackLink';
import { StructuredData } from '@/lib/seo';
import { site } from '@/lib/site';
import './globals.css';

export const metadata:Metadata={metadataBase:new URL(site.origin),title:{default:'Brickell Condos for Sale | Budgets, Buildings & Buyer Guides',template:'%s | Brickell Homes For Sale'},description:site.description,robots:{index:true,follow:true},verification:{google:process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined}};

export default function RootLayout({children}:{children:React.ReactNode}) {
  const email=process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsapp=process.env.NEXT_PUBLIC_WHATSAPP_URL;
  return <html lang="en"><body>
    <StructuredData data={{'@context':'https://schema.org','@graph':[{'@type':'WebSite',name:site.name,url:site.origin,description:site.description},{'@type':'Organization',name:site.name,url:site.origin,description:'Independent editorial buyer inquiry website. Broker identity is not asserted.'}]}} />
    <Analytics />
    <header className="header"><div className="wrap nav"><Link className="brand" href="/" aria-label="Brickell Homes For Sale home"><span className="brand-icon">B<span>.</span></span><span>BRICKELL <b>HOMES</b><small>CONDO BUYER GUIDES</small></span></Link><nav aria-label="Primary"><Link href="/condos-for-sale/">Compare condos</Link><Link href="/buildings/">Compare buildings</Link><Link href="/buying-a-condo-in-brickell/">Buying guide</Link></nav><Link className="nav-cta" href="/#inquiry">Request condo options <span>↗</span></Link></div></header>
    <main>{children}</main>
    <footer className="footer"><div className="wrap footer-grid"><div><Link className="brand footer-brand" href="/"><span className="brand-icon">B<span>.</span></span><span>BRICKELL <b>HOMES</b><small>CONDO BUYER GUIDES</small></span></Link><p>{site.disclosure}</p></div><div><strong>EXPLORE</strong><Link href="/brickell-condos-under-1m/">Under $1M</Link><Link href="/luxury-condos/">Luxury condos</Link><Link href="/brickell-key/">Brickell Key</Link><Link href="/new-construction/">New construction</Link></div><div><strong>BUYING COSTS</strong><Link href="/hoa-fees/">HOA fees</Link><Link href="/closing-costs/">Closing costs</Link><Link href="/foreign-buyers/">Foreign buyers</Link><Link href="/privacy/">Privacy</Link></div><div><strong>CONTACT</strong>{email&&<TrackLink href={`mailto:${email}`} kind="email_click">Email us ↗</TrackLink>}{whatsapp&&<TrackLink href={whatsapp} kind="whatsapp_click">WhatsApp ↗</TrackLink>}<Link href="/#inquiry">Request condo options ↗</Link></div></div><div className="wrap footer-base"><span>© {new Date().getFullYear()} Brickell Homes For Sale</span><span>Independent Brickell condo guides • Miami, Florida</span></div></footer>
  </body></html>;
}
