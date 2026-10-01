import Link from 'next/link';
import { revisionDate } from '@/lib/seo';

export function Breadcrumb({trail}:{trail:{name:string;path:string}[]}) {
  return <nav className="breadcrumb" aria-label="Breadcrumb"><ol>{trail.map((item,i)=><li key={item.path}>{i<trail.length-1?<Link href={item.path}>{item.name}</Link>:<span aria-current="page">{item.name}</span>}</li>)}</ol></nav>;
}

const format = (date:string) => new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'});

export function ReviewedBy({path}:{path:string}) {
  const date=revisionDate(path);
  if(!date) return null;
  return <p className="reviewed">Last reviewed <time dateTime={date}>{format(date)}</time> · <Link href="/methodology/">How we research</Link> · <Link href="/editorial-standards/">Editorial standards</Link></p>;
}
