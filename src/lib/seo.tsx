import type { Metadata } from 'next';
import { site } from './site';

export function metadataFor(path: string, title: string, description: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: `${site.origin}${path}`, type:'website', siteName: site.name } };
}

export function breadcrumbSchema(items: {name:string; path:string}[]) {
  return { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:items.map((item,index)=>({ '@type':'ListItem', position:index+1, name:item.name, item:`${site.origin}${item.path}` })) };
}

export function StructuredData({data}:{data:Record<string,unknown>}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}} />;
}
