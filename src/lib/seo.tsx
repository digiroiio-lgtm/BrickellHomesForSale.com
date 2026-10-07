import type { Metadata } from 'next';
import revisions from './content-revisions.json';
import { buyerSources, site } from './site';

const dates: Record<string, { date: string; hash: string }> = revisions;

/** Editorial revision date (YYYY-MM-DD) for a canonical path, from the guarded revision manifest. */
export const revisionDate = (path: string): string | undefined => dates[path]?.date;
export const latestRevision = (): string => Object.values(dates).map(d => d.date).sort().at(-1) ?? '';

export const orgId = `${site.origin}/#organization`;
export const websiteId = `${site.origin}/#website`;
const abs = (path: string) => `${site.origin}${path}`;
const place = { '@type': 'Place', name: 'Brickell, Miami, Florida', containedInPlace: { '@type': 'City', name: 'Miami' } };

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

/** Append the brand only where the whole title still fits a search-result line. */
export function fullTitle(title: string): string {
  for (const suffix of [` | ${site.name}`, ' | Brickell Homes']) if (title.length + suffix.length <= TITLE_LIMIT) return `${title}${suffix}`;
  return title;
}

/** Building page title: add the area keyword when it fits. */
export const buildingTitle = (name: string): string => {
  const long = `${name} Brickell building guide`;
  return long.length <= TITLE_LIMIT ? long : `${name} building guide`;
};

/** Extend a short description with supporting sentences while staying within the snippet length. */
export function richDescription(base: string, extras: string[]): string {
  let out = base.trim();
  for (const extra of extras) {
    const next = `${out} ${extra.trim()}`;
    if (next.length <= DESCRIPTION_LIMIT) out = next;
  }
  return out;
}

export function metadataFor(path: string, title: string, description: string, options: { article?: boolean; image?: string } = {}): Metadata {
  const full = fullTitle(title);
  const modified = revisionDate(path);
  // Explicit trailing-slash image URL: the site uses trailingSlash, so the hashed default would 308 first.
  const images = [{ url: options.image ?? '/opengraph-image/', width: 1200, height: 630 }];
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: abs(path),
      type: options.article ? 'article' : 'website',
      siteName: site.name,
      locale: 'en_US',
      images,
      ...(options.article && modified ? { modifiedTime: `${modified}T00:00:00.000Z` } : {})
    },
    twitter: { card: 'summary_large_image', title: full, description, images }
  };
}

type Crumb = { name: string; path: string };

const breadcrumbNode = (items: Crumb[], id?: string) => ({
  '@type': 'BreadcrumbList',
  ...(id ? { '@id': id } : {}),
  itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: abs(item.path) }))
});

export const breadcrumbSchema = (items: Crumb[], id?: string) => ({ '@context': 'https://schema.org', ...breadcrumbNode(items, id) });

export const siteGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: site.name,
      url: site.origin,
      description: site.description,
      inLanguage: 'en-US',
      publisher: { '@id': orgId }
    },
    {
      '@type': 'Organization',
      '@id': orgId,
      name: site.name,
      url: site.origin,
      description: 'Independent editorial buyer research and inquiry website for Brickell, Miami. Broker identity is not asserted.',
      logo: { '@type': 'ImageObject', url: abs('/logo.svg'), width: 512, height: 512 },
      areaServed: place,
      knowsAbout: ['Brickell condominiums', 'Miami condominium ownership costs', 'Florida condominium buyer due diligence', 'Brickell residential buildings']
    }
  ]
});

type SourceKey = keyof typeof buyerSources;

/**
 * One JSON-LD graph per page: WebPage (+ Article for guides, CollectionPage + ItemList for indexes) and its BreadcrumbList.
 * Deliberately no Offer, RealEstateListing, RealEstateAgent or FAQPage while the site is MLS-free and operator-anonymous.
 */
export function pageGraph(input: {
  path: string;
  name: string;
  description: string;
  trail?: Crumb[];
  kind?: 'article' | 'collection' | 'page' | 'about';
  items?: Crumb[];
  sourceKeys?: SourceKey[];
}) {
  const url = abs(input.path);
  const kind = input.kind ?? 'page';
  const modified = revisionDate(input.path);
  const webPageType = kind === 'collection' ? 'CollectionPage' : kind === 'about' ? 'AboutPage' : 'WebPage';
  const graph: Record<string, unknown>[] = [
    {
      '@type': webPageType,
      '@id': `${url}#webpage`,
      url,
      name: input.name,
      description: input.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': websiteId },
      ...(input.trail && input.trail.length > 1 ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
      ...(modified ? { dateModified: modified } : {}),
      ...(kind === 'collection' && input.items ? { mainEntity: { '@id': `${url}#list` } } : {})
    },
    ...(input.trail && input.trail.length > 1 ? [breadcrumbNode(input.trail, `${url}#breadcrumb`)] : [])
  ];
  if (kind === 'article') {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: input.name,
      description: input.description,
      inLanguage: 'en-US',
      mainEntityOfPage: { '@id': `${url}#webpage` },
      publisher: { '@id': orgId },
      about: place,
      ...(modified ? { dateModified: modified } : {}),
      ...(input.sourceKeys?.length ? { citation: input.sourceKeys.map(k => ({ '@type': 'CreativeWork', name: buyerSources[k].label, url: buyerSources[k].url })) } : {})
    });
  }
  if (kind === 'collection' && input.items) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#list`,
      numberOfItems: input.items.length,
      itemListElement: input.items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: abs(item.path) }))
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function StructuredData({data}:{data:Record<string,unknown>}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}} />;
}
