'use client';

import Link from 'next/link';

export function BuildingRequestLink({slug,name}:{slug:string;name:string}) {
  return <Link href={`/buildings/?building=${encodeURIComponent(slug)}#inquiry`} onClick={()=>window.dispatchEvent(new CustomEvent('building-selected',{detail:name}))}>Ask about {name} ↗</Link>;
}
