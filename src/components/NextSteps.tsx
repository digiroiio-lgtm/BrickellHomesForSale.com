import Link from 'next/link';
import { nextSteps } from '@/lib/next-steps';

export function NextSteps({ slug }: { slug: string }) {
  const steps = nextSteps(slug);
  if (!steps) return null;
  return <section className="wrap next-steps" aria-labelledby="next-steps-title">
    <span className="eyebrow">WHERE TO GO NEXT</span>
    <h2 id="next-steps-title">Keep building your Brickell shortlist.</h2>
    <div className="next-steps-grid">
      <div>
        <h3>Start your search</h3>
        <Link href={steps.hub.href}><strong>{steps.hub.label} <span aria-hidden="true">↗</span></strong>{steps.hub.note&&<span>{steps.hub.note}</span>}</Link>
      </div>
      {steps.guides.length>0&&<div>
        <h3>Related guides</h3>
        {steps.guides.map(l=><Link href={l.href} key={l.href}><strong>{l.label} <span aria-hidden="true">↗</span></strong></Link>)}
      </div>}
      <div>
        <h3>{steps.buildingsHeading}</h3>
        {steps.buildings.map(l=><Link href={l.href} key={l.href}><strong>{l.label} <span aria-hidden="true">↗</span></strong></Link>)}
      </div>
    </div>
  </section>;
}
