import Link from 'next/link';
import type { PropertyTypeContent } from '@/lib/property-type-content';

const groups = [
  { key: 'propertyTypes', title: 'Compare property types' },
  { key: 'areas', title: 'Explore areas' },
  { key: 'buildings', title: 'Research buildings' },
  { key: 'buying', title: 'Plan your purchase' }
] as const;

export function ExplorePropertyPaths({ explore }: { explore: PropertyTypeContent['explore'] }) {
  return <section className="property-paths" aria-labelledby="property-paths-title">
    <span className="eyebrow">CONTINUE YOUR BRICKELL SEARCH</span>
    <h2 id="property-paths-title">Compare the next decision.</h2>
    <p>These editorial guides do not display current units or verify availability at a named building.</p>
    <div className="property-path-grid">
      {groups.map(({ key, title }) => <div className="property-path-group" key={key}>
        <h3>{title}</h3>
        {explore[key].map(({ label, href, description }) => <Link href={href} key={href}>
          <strong>{label} <span aria-hidden="true">↗</span></strong>
          <span>{description}</span>
        </Link>)}
      </div>)}
    </div>
  </section>;
}
