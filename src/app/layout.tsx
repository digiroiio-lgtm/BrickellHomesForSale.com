import type { Metadata } from 'next';
import Link from 'next/link';
import { DM_Sans, Manrope } from 'next/font/google';
import { Analytics } from '@/components/Analytics';
import { TrackLink } from '@/components/TrackLink';
import { StructuredData, siteGraph } from '@/lib/seo';
import { site } from '@/lib/site';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-dm-sans' });
const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });

export const metadata:Metadata={
  metadataBase:new URL(site.origin),
  title:{default:'Brickell Homes For Sale | Independent Buyer Guides',template:'%s | Brickell Homes For Sale'},
  description:site.description,
  applicationName:site.name,
  alternates:{types:{'application/rss+xml':'/feed.xml'}},
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},
  formatDetection:{telephone:false,email:false,address:false},
  verification:{google:process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,other:process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?{'msvalidate.01':process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION}:undefined}
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  const email=process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsapp=process.env.NEXT_PUBLIC_WHATSAPP_URL;
  return <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}><body>
    <a className="skip-link" href="#main">Skip to content</a><StructuredData data={siteGraph()} />
    <Analytics />
    <header className="header"><div className="wrap nav"><Link className="brand" href="/"><span className="brand-icon" aria-hidden="true">B<span>.</span></span><span>BRICKELL <b>HOMES</b><small>BUYER INTELLIGENCE</small></span></Link><nav className="desktop-nav" aria-label="Primary"><Link href="/">Homes</Link><Link href="/#property-types">Property types</Link><Link href="/#areas">Areas</Link><Link href="/buildings/">Buildings</Link><Link href="/buyer-guides/">Buyer guides</Link><details className="trust-nav"><summary>Trust</summary><div className="trust-menu"><Link href="/about/">About</Link><Link href="/methodology/">Methodology</Link><Link href="/editorial-standards/">Editorial standards</Link><Link href="/disclosures/">Disclosures</Link><Link href="/privacy/">Privacy</Link></div></details></nav><details className="mobile-nav"><summary>Menu</summary><nav aria-label="Mobile primary"><Link className="mobile-nav-cta" href="/#inquiry">Request options ↗</Link><Link href="/">Homes</Link><Link href="/#property-types">Property types</Link><Link href="/#areas">Areas</Link><Link href="/buildings/">Buildings</Link><Link href="/buyer-guides/">Buyer guides</Link><Link href="/about/">About</Link><Link href="/methodology/">Methodology</Link><Link href="/editorial-standards/">Editorial standards</Link><Link href="/disclosures/">Disclosures</Link><Link href="/privacy/">Privacy</Link></nav></details><Link className="nav-cta" href="/#inquiry">Request options <span>↗</span></Link></div></header>
    <main id="main">{children}</main>
    <footer className="footer"><div className="wrap footer-grid"><div><Link className="brand footer-brand" href="/"><span className="brand-icon" aria-hidden="true">B<span>.</span></span><span>BRICKELL <b>HOMES</b><small>BUYER INTELLIGENCE</small></span></Link><p>{site.disclosure}</p></div><div><strong>EXPLORE</strong><Link href="/condos-for-sale/">Condos</Link><Link href="/waterfront-condos/">Waterfront</Link><Link href="/luxury-condos/">Luxury residences</Link><Link href="/penthouses/">Penthouses</Link><Link href="/new-construction/">New construction</Link><Link href="/branded-residences/">Branded residences</Link><Link href="/resale-properties/">Resale</Link></div><div><strong>AREAS & BUILDINGS</strong><Link href="/brickell-key/">Brickell Key</Link><Link href="/brickell-avenue/">Brickell Avenue</Link><Link href="/buildings/">Building guides</Link><Link href="/buyer-guides/">Buyer guides</Link></div><div><strong>TRUST</strong><Link href="/about/">About</Link><Link href="/methodology/">Methodology</Link><Link href="/editorial-standards/">Editorial standards</Link><Link href="/disclosures/">Disclosures</Link><Link href="/privacy/">Privacy</Link></div><div><strong>CONTACT</strong>{email&&<TrackLink href={`mailto:${email}`} kind="email_click">Email us ↗</TrackLink>}{whatsapp&&<TrackLink href={whatsapp} kind="whatsapp_click">WhatsApp ↗</TrackLink>}<Link href="/#inquiry">Buyer inquiry ↗</Link><Link href="/privacy/">Privacy</Link></div></div><div className="wrap footer-base"><span>© {new Date().getFullYear()} Brickell Homes For Sale</span><span>Independent editorial research • Miami, Florida</span></div></footer>
  </body></html>;
}
