import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false, follow: true } };

export default function NotFound() {
  return <div className="wrap page-header legal">
    <span className="eyebrow">404 / NOT FOUND</span>
    <h1>That page is not here.</h1>
    <p className="page-deck">It may have moved or never existed. These starting points cover the guides on this site.</p>
    <div className="index-links">
      <Link href="/buyer-guides/"><b>All buyer guides ↗</b><span>Property types, areas, ownership costs, comparisons and the buying process.</span></Link>
      <Link href="/buildings/"><b>Brickell building profiles ↗</b><span>Source-linked profiles with the questions to ask before a viewing.</span></Link>
      <Link href="/condos-for-sale/"><b>Start with condos ↗</b><span>A framework for building a Brickell shortlist.</span></Link>
      <Link href="/">Back to the home page ↗</Link>
    </div>
  </div>;
}
