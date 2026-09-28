import Link from 'next/link';

export function ContextLinks({eyebrow,heading,links}:{eyebrow:string;heading:string;links:{label:string;href:string}[]}) {
  if(!links.length) return null;
  return <section className="property-paths"><span className="eyebrow">{eyebrow}</span><h2>{heading}</h2><div className="index-links">{links.map(link=><Link key={link.href} href={link.href}><b>{link.label} ↗</b></Link>)}</div></section>;
}
