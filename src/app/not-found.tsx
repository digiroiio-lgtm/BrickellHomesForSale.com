import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };
const paths = [
  { href: '/condos-for-sale/', label: 'Brickell condos for sale', text: 'Start with location, ownership costs and building profile.' },
  { href: '/buyer-guides/', label: 'All buyer guides', text: 'Property types, areas, costs, comparisons and purchase steps.' },
  { href: '/buildings/', label: 'Building profiles', text: 'Source-linked Brickell residential building guides.' },
  { href: '/ownership-costs/', label: 'Total ownership costs', text: 'Taxes, insurance, association fees and reserves in one budget.' }
];

export default function NotFound() {
  return <>
    <section className="wrap page-header"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>This page is not here.</h1><p className="page-deck">The address may have changed or never existed. Continue from one of the main research paths below, or send a brief to request options matched to you.</p><Link className="button" href="/#inquiry">Request matched options <span>↗</span></Link></section>
    <section className="wrap section"><div className="index-links">{paths.map(p => <Link key={p.href} href={p.href}><b>{p.label} ↗</b><span>{p.text}</span></Link>)}</div></section>
  </>;
}
