import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@/components/Analytics';
import { TrackLink } from '@/components/TrackLink';
import { StructuredData } from '@/lib/seo';
import { site } from '@/lib/site';
import './globals.css';

export const metadata:Metadata={metadataBase:new URL(site.origin),title:{default:'Brickell Homes For Sale | Buyer Guides & Current Availability',template:'%s | Brickell Homes For Sale'},description:site.description,robots:{index:true,follow:true},verification:{google:process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined}};

export default function RootLayout({children}:{children:React.ReactNode}) {
  const email=process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsapp=process.env.NEXT_PUBLIC_WHATSAPP_URL;
  return <html lang="en"><body>
    <StructuredData data={{'@context':'https://schema.org','@graph':[{'@type':'WebSite',name:site.name,url:site.origin,description:site.description},{'@type':'Organization',name:site.name,url:site.origin,description:'Independent editorial buyer inquiry website. Broker identity is not asserted.'}]}} />
    <Analytics />
    <header className="header"><div className="wrap nav"><Link className="brand" href="/" aria-label="Brickell Homes For Sale home"><span className="brand-icon">B<span>.</span></span><span>BRICKELL <b>HOMES</b><small>BUYER INTELLIGENCE</small></span></Link><nav className="desktop-nav" aria-label="Primary"><Link href="/">Homes</Link><Link href="/#property-types">Property types</Link><Link href="/#areas">Areas</Link><Link href="/buildings/">Buildings</Link><Link href="/#buyer-resources">Buying resources</Link></nav><details className="mobile-nav"><summary>Menu</summary><nav aria-label="Mobile primary"><Link href="/">Homes</Link><Link href="/#property-types">Property types</Link><Link href="/#areas">Areas</Link><Link href="/buildings/">Buildings</Link><Link href="/#buyer-resources">Buying resources</Link></nav></details><Link className="nav-cta" href="/#inquiry">Request options <span>↗</span></Link></div></header>
    <main>{children}</main>
    <footer className="footer"><div className="wrap footer-grid"><div><Link className="brand footer-brand" href="/"><span className="brand-icon">B<span>.</span></span><span>BRICKELL <b>HOMES</b><small>BUYER INTELLIGENCE</small></span></Link><p>{site.disclosure}</p></div><div><strong>EXPLORE</strong><Link href="/condos-for-sale/">Condos</Link><Link href="/waterfront-condos/">Waterfront</Link><Link href="/luxury-condos/">Luxury residences</Link><Link href="/penthouses/">Penthouses</Link><Link href="/new-construction/">New construction</Link></div><div><strong>AREAS & BUILDINGS</strong><Link href="/brickell-key/">Brickell Key</Link><Link href="/brickell-avenue/">Brickell Avenue</Link><Link href="/buildings/">Building guides</Link><Link href="/#buyer-resources">Buying resources</Link></div><div><strong>CONTACT</strong>{email&&<TrackLink href={`mailto:${email}`} kind="email_click">Email us ↗</TrackLink>}{whatsapp&&<TrackLink href={whatsapp} kind="whatsapp_click">WhatsApp ↗</TrackLink>}<Link href="/#inquiry">Buyer inquiry ↗</Link><Link href="/privacy/">Privacy</Link></div></div><div className="wrap footer-base"><span>© {new Date().getFullYear()} Brickell Homes For Sale</span><span>Independent editorial research • Miami, Florida</span></div></footer>
  </body></html>;
}
