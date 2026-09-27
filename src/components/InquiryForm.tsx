'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { event } from './Analytics';

type Props = { intent:string; budget?:string; propertyType?:string; building?:string };
const utmKeys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'] as const;

export function InquiryForm({intent,budget='',propertyType='condo',building=''}:Props) {
  const [utm,setUtm] = useState<Record<string,string>>({});
  const [status,setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [message,setMessage] = useState('');
  const [started,setStarted] = useState(false);
  const startedAt = useRef(Date.now());
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const saved:Record<string,string> = {};
    for (const key of utmKeys) {
      const value = params.get(key);
      if (value) sessionStorage.setItem(key,value.slice(0,200));
      saved[key] = (value || sessionStorage.getItem(key) || '').slice(0,200);
    }
    setUtm(saved);
    startedAt.current = Date.now();
  },[]);

  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending'); setMessage('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.submitted_after_ms = String(Date.now()-startedAt.current);
    data.landing_page = window.location.pathname;
    data.budget_segment = String(data.budget);
    const res = await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(()=>null);
    if (res?.ok) {
      event('form_submit',{intent,landing_page:window.location.pathname});
      event('request_current_listings',{intent,landing_page:window.location.pathname});
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
      setMessage(res?.status===503 ? 'Inquiry delivery is temporarily unavailable. Please try again later.' : 'We could not send your request. Check your details and try again.');
    }
  }

  return <section id="inquiry" className="inquiry wrap" aria-labelledby="inquiry-title">
    <div className="inquiry-intro"><span className="eyebrow">YOUR NEXT MOVE</span><h2 id="inquiry-title">Get current Brickell condo options.</h2><p>Share your budget, preferred buildings and must-haves. Request a shortlist of current Brickell condos matched to your criteria.</p><span className="micro">No obligation. This site does not display live listings. Availability is confirmed before any options are shared. We use your details as described in our privacy notice.</span></div>
    <form onSubmit={submit} onFocus={()=>{if(!started){setStarted(true);event('form_start',{intent,landing_page:window.location.pathname});}}} className="form-grid">
      <input type="hidden" name="lead_source" value="brickellhomesforsale.com" />
      <input type="hidden" name="landing_page" value="/" />
      <input type="hidden" name="intent" value={intent} />
      <input type="hidden" name="budget_segment" value={budget} />
      <input type="hidden" name="submitted_after_ms" value="0" />
      {utmKeys.map(k=><input key={k} type="hidden" name={k} value={utm[k]||''}/>)}
      <div className="trap" aria-hidden="true"><label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label>Budget <select name="budget" defaultValue={budget} required><option value="">Select budget</option><option value="under-1m">Under $1M</option><option value="1m-2m">$1M–$2M</option><option value="2m-plus">$2M+</option><option value="flexible">Flexible / exploring</option></select></label>
      <label>Beds <select name="beds" required defaultValue=""><option value="">Select bedrooms</option><option value="studio">Studio</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4-plus">4+</option><option value="flexible">Flexible</option></select></label>
      <label>Property type <select name="property_type" required defaultValue={propertyType}><option value="condo">Condo</option><option value="luxury condo">Luxury condo</option><option value="penthouse">Penthouse</option><option value="waterfront condo">Waterfront condo</option><option value="new construction">New construction</option><option value="flexible">Flexible</option></select></label>
      <label>Preferred area / building <input name="preferred_area_building" defaultValue={building} maxLength={160} placeholder="Brickell Key, Echo Brickell…" /></label>
      <label>Timeline <select name="timeline" required defaultValue=""><option value="">Select timeline</option><option value="0-3-months">0–3 months</option><option value="3-6-months">3–6 months</option><option value="6-12-months">6–12 months</option><option value="exploring">Exploring</option></select></label>
      <label>Payment <select name="payment" required defaultValue=""><option value="">Select payment</option><option value="cash">Cash</option><option value="mortgage">Mortgage</option><option value="undecided">Undecided</option></select></label>
      <label>Name <input name="name" autoComplete="name" required maxLength={100} /></label>
      <label>Email <input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      <label>Phone / WhatsApp <input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
      <label>Country <input name="country" autoComplete="country-name" required maxLength={80} /></label>
      <label className="wide">Anything else? <textarea name="message" rows={3} maxLength={1000} placeholder="Must-haves, preferred buildings or questions" /></label>
      <label className="consent wide"><input name="consent" type="checkbox" value="yes" required /> I agree to be contacted about my request and have read the <Link href="/privacy/">privacy notice</Link>.</label>
      <button className="button wide" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Get Current Brickell Listings'} <span aria-hidden="true">↗</span></button>
      <p className="form-status wide" role="status">{status==='success'?'Your request was received. Thank you.':message}</p>
    </form>
  </section>;
}
