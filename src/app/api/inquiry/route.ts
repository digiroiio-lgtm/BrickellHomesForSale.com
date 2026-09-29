import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
const choice = (values: readonly [string,...string[]]) => z.enum(values);
const schema = z.object({
  budget: choice(['under-1m','1m-2m','2m-plus','flexible']),
  beds: choice(['studio','1','2','3','4-plus','flexible']),
  property_type: choice(['condo','luxury residence','waterfront residence','penthouse','new construction','branded residence','resale','flexible']),
  buyer_objective: choice(['primary-residence','second-home','investment','undecided']),
  preferred_area_building: z.string().trim().max(160).default(''),
  timeline: choice(['0-3-months','3-6-months','6-12-months','exploring']),
  payment: choice(['cash','mortgage','undecided']),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(40).regex(/^[+()\d\s.\-]+$/),
  country: z.string().trim().min(2).max(80),
  message: z.string().trim().max(1000).default(''),
  consent: z.literal('yes'),
  website: z.string().max(100).default(''),
  submitted_after_ms: z.coerce.number().min(0).max(86400000),
  lead_source: z.literal('brickellhomesforsale.com'),
  landing_page: z.string().regex(/^\/[a-z0-9\-/]*$/).max(200),
  intent: z.string().regex(/^[a-z0-9-]+$/).max(60),
  budget_segment: z.string().max(40).default(''),
  utm_source: z.string().max(200).default(''),
  utm_medium: z.string().max(200).default(''),
  utm_campaign: z.string().max(200).default(''),
  utm_term: z.string().max(200).default(''),
  utm_content: z.string().max(200).default('')
}).strict();

// Best-effort per-instance limit. Place an edge/WAF limit in front for production scale.
const attempts = new Map<string,{count:number;until:number}>();
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  // Proxy hosts can differ from Next's internal req.nextUrl.origin; compare the browser origin to the public Host header.
  if (origin) {
    let sameHost=false;
    try { sameHost=new URL(origin).host===req.headers.get('host'); } catch { /* malformed origin */ }
    if (!sameHost) return NextResponse.json({error:'Invalid origin'},{status:403});
  }
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const record = attempts.get(ip);
  if (record && record.until>now && record.count>=5) return NextResponse.json({error:'Too many requests'},{status:429});
  attempts.set(ip, record && record.until>now ? {count:record.count+1,until:record.until} : {count:1,until:now+15*60_000});
  let raw:unknown;
  try { if (Number(req.headers.get('content-length'))>12_000) throw Error('too large'); raw=await req.json(); }
  catch { return NextResponse.json({error:'Invalid request'},{status:400}); }
  const parsed=schema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({error:'Invalid fields'},{status:400});
  const { website, submitted_after_ms, ...lead } = parsed.data;
  // Accept bot traps without revealing which rule fired. Never forward spam.
  if (website) return NextResponse.json({ok:true});
  if (submitted_after_ms<1200) return NextResponse.json({error:'Please retry your inquiry'},{status:400});
  const payload=JSON.stringify({id:randomUUID(),received_at:new Date().toISOString(),...lead});
  try {
    const response=await fetch('https://formspree.io/f/moevrvak',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:payload,signal:AbortSignal.timeout(8000),cache:'no-store'});
    if (!response.ok) return NextResponse.json({error:'Inquiry delivery unavailable'},{status:503});
    return NextResponse.json({ok:true},{status:201});
  } catch { return NextResponse.json({error:'Inquiry delivery unavailable'},{status:503}); }
}
