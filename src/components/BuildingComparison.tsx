'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { comparisonZones, type ComparisonBuilding } from '@/lib/building-comparison';
import { event } from './Analytics';

const initial = ['brickell-flatiron','echo-brickell','icon-brickell'];
export function BuildingComparison({ buildings }: { buildings:ComparisonBuilding[] }) {
  const [zone,setZone]=useState('All areas');
  const [category,setCategory]=useState('All residence types');
  const [search,setSearch]=useState('');
  const [selected,setSelected]=useState<string[]>(initial);
  const [notice,setNotice]=useState('');
  useEffect(()=>{
    const value=new URLSearchParams(window.location.search).get('compare');
    if(value!==null) setSelected([...new Set(value.split(',').filter(slug=>buildings.some(b=>b.slug===slug)))].slice(0,3));
  },[buildings]);
  const shown=buildings.filter(b=>(zone==='All areas'||b.zone===zone)&&(category==='All residence types'||b.category===category)&&b.name.toLowerCase().includes(search.trim().toLowerCase()));
  const compared=selected.map(slug=>buildings.find(b=>b.slug===slug)!).filter(Boolean);
  function change(slug:string) {
    if(!selected.includes(slug)&&selected.length===3){setNotice('Choose up to 3 buildings. Remove one before adding another.');return;}
    const next=selected.includes(slug)?selected.filter(s=>s!==slug):[...selected,slug];
    setSelected(next);setNotice('');
    const url=new URL(window.location.href);url.searchParams.set('compare',next.join(','));window.history.replaceState(null,'',url);
    event('building_compare',{building:slug,action:next.includes(slug)?'add':'remove'});
  }
  return <div className="comparison-tool">
    <div className="tool-filters"><label>Find a building<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name, e.g. Echo Brickell" /></label><label>Area<select value={zone} onChange={e=>setZone(e.target.value)}><option>All areas</option>{comparisonZones.map(z=><option key={z}>{z}</option>)}</select></label><label>Residence type<select value={category} onChange={e=>setCategory(e.target.value)}><option>All residence types</option><option>Residential condominium</option><option>Branded residential</option></select></label></div>
    <div className="tool-toolbar"><p role="status">{shown.length} of {buildings.length} buildings · {selected.length} of 3 selected</p><a className="button" href="#comparison-results">View comparison ↓</a><button className="tool-button" type="button" onClick={()=>{setZone('All areas');setCategory('All residence types');setSearch('');setNotice('Filters reset. Your selected buildings are retained.');}}>Reset filters</button></div>
    <p className="tool-notice" role="status">{notice}</p>
    <section id="comparison-results" className="comparison-results" aria-labelledby="comparison-title"><h2 id="comparison-title">Your building comparison</h2><p>Select up to three buildings above. Filters do not remove selections. The page address keeps your selection so you can bookmark or share it.</p>{compared.length===0?<p>Choose at least one building to compare.</p>:<div className="table-scroll" role="region" aria-label="Selected building comparison" tabIndex={0}><table><caption>Published project context and questions for the actual unit. No investment ranking or live listings.</caption><thead><tr><th scope="col">Decision</th>{compared.map(b=><th scope="col" key={b.slug}><Link href={`/buildings/${b.slug}/`}>{b.name} ↗</Link><button className="tool-button" type="button" onClick={()=>change(b.slug)} aria-label={`Remove ${b.name}`}>Remove</button></th>)}</tr></thead><tbody>
      <tr><th scope="row">Location / editorial area</th>{compared.map(b=><td key={b.slug}>{b.area}<br/><small>{b.zone}</small></td>)}</tr>
      <tr><th scope="row">Published positioning</th>{compared.map(b=><td key={b.slug}>{b.profile}</td>)}</tr>
      <tr><th scope="row">Source-linked facts</th>{compared.map(b=><td key={b.slug}><ul>{(b.evidence?.facts??b.confirmed).map(f=><li key={f}>{f}</li>)}</ul></td>)}</tr>
      <tr><th scope="row">Completion / delivery evidence</th>{compared.map(b=><td key={b.slug}>{b.evidence?.status??'Current delivery stage not verified'}</td>)}</tr>
      <tr><th scope="row">What to verify</th>{compared.map(b=><td key={b.slug}><ul>{b.questions.map(q=><li key={q}>{q}</li>)}</ul></td>)}</tr>
      <tr><th scope="row">HOA, rental rules and assessments</th>{compared.map(b=><td key={b.slug}>Not verified here. Obtain current documents for the legal unit and association. <Link href="/condo-documents/">Document checklist ↗</Link></td>)}</tr>
      <tr><th scope="row">Evidence and review date</th>{compared.map(b=><td key={b.slug}><a href={b.source.url} target="_blank" rel="noopener noreferrer">{b.source.label} ↗</a><p>{b.evidence?`Additional source facts checked ${b.evidence.checked}`:`Existing profile reviewed ${b.profileReviewed??'date not recorded'}`}</p></td>)}</tr>
    </tbody></table></div>}</section>
    <h2>Choose from all 23 profiles</h2>
    <div className="comparison-cards">{shown.map(b=><section key={b.slug} className="comparison-card"><span className="eyebrow">{b.zone}</span><h2><Link href={`/buildings/${b.slug}/`}>{b.name}</Link></h2><p>{b.profile}</p><p>{b.summary}</p><label className="compare-choice"><input type="checkbox" checked={selected.includes(b.slug)} onChange={()=>change(b.slug)} /> Compare {b.name}</label><a href={b.source.url} target="_blank" rel="noopener noreferrer">Official project source ↗</a></section>)}</div>
    {shown.length===0&&<p>No buildings match these filters. Reset filters to see all profiles.</p>}

  </div>;
}
