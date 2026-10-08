import Link from 'next/link';
import { guideBySlug } from '@/lib/content';
import { contextualLinks } from '@/lib/internal-links';
import { profilesForGuide } from '@/lib/building-groups';

export function RelatedProfiles({ slug }: { slug: string }) {
  const guides = contextualLinks(slug).map(s => guideBySlug[s]).filter(Boolean);
  const profiles = profilesForGuide(slug);
  if (!guides.length && !profiles.length) return null;
  return <section className="property-paths">
    {guides.length > 0 && <><span className="eyebrow">MORE ON THIS TOPIC</span><h2>Keep researching.</h2><div className="index-links">{guides.map(g => <Link key={g.slug} href={`/${g.slug}/`}><b>{g.title} <span aria-hidden="true">↗</span></b><span>{g.description}</span></Link>)}</div></>}
    {profiles.length > 0 && <><span className="eyebrow">BUILDING PROFILES</span><h2>Profiles that fit this guide.</h2><p>Source-linked editorial profiles; none shows current units or availability.</p><div className="index-links">{profiles.map(b => <Link key={b.slug} href={`/buildings/${b.slug}/`}><b>{b.name} <span aria-hidden="true">↗</span></b><span>{b.profile}</span></Link>)}</div></>}
  </section>;
}
