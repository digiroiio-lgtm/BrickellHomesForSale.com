/* eslint-disable @typescript-eslint/no-require-imports */
// Read-only site-wide scale / low-value audit (SEO + GEO constitution, sections 3, 4, 7, 21, 22).
// It crawls a RUNNING production build, so the numbers describe what a crawler actually receives:
//   npm run build && npx next start -p 3111 &  node scripts/seo-audit.cjs --base http://localhost:3111 --date 2026-10-07
// Optional Search Console export: --gsc pages.csv (columns containing "page", "clicks", "impressions").
// It never changes the site. MERGE / 301 / NOINDEX appear only as candidates that need human approval.
const fs = require('node:fs');
const path = require('node:path');

const arg = (name, fallback) => { const i = process.argv.indexOf(`--${name}`); return i > -1 ? process.argv[i + 1] : fallback; };
const base = arg('base', 'http://localhost:3111').replace(/\/$/, '');
const today = arg('date', new Date().toISOString().slice(0, 10));
const gscPath = arg('gsc');
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'docs', 'seo-audit');
const revisions = JSON.parse(fs.readFileSync(path.join(root, 'src/lib/content-revisions.json'), 'utf8'));

// Decision-support thresholds, not rules. Adjust here and say so in the report.
const T = { thinUniqueWords: 250, sharedRatioHigh: 0.55, similarityReview: 0.6, intentOverlapReview: 0.4, lowValueDays: 90, lowValueImpressions: 10, shingle: 4, sharedSentencePages: 4 };
const STOP = new Set('the a an and or of for to in on with your you what how is are be as at by from this that it its brickell condo condos home homes buyer buyers guide guides buying residences residence miami'.split(' '));

const decode = s => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const textOf = html => decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const words = t => t.toLowerCase().replace(/[^a-z0-9$%\s'-]/g, ' ').split(/\s+/).filter(Boolean);
const sentences = t => t.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.split(' ').length >= 5);
const shingles = ws => { const out = new Set(); for (let i = 0; i + T.shingle <= ws.length; i++) out.add(ws.slice(i, i + T.shingle).join(' ')); return out; };
const jaccard = (a, b) => { if (!a.size || !b.size) return 0; let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n); };
const pct = n => Math.round(n * 100) / 100;
const csvCell = v => { const s = String(v ?? ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };

const templateOf = p => p === '/' ? 'home' : p === '/buildings/' || p === '/buyer-guides/' ? 'index' : /^\/buildings\/[^/]+\/$/.test(p) ? 'building' : ['/about/', '/methodology/', '/editorial-standards/', '/disclosures/', '/privacy/'].includes(p) ? 'trust' : 'guide';
const ageDays = p => { const d = revisions[p]?.date; return d ? Math.max(0, Math.round((Date.parse(today) - Date.parse(d)) / 86400000)) : ''; };

async function get(p) { const r = await fetch(base + p, { redirect: 'manual' }); return { status: r.status, html: r.status === 200 ? await r.text() : '' }; }

function readGsc() {
  if (!gscPath) return null;
  const lines = fs.readFileSync(gscPath, 'utf8').split(/\r?\n/).filter(Boolean);
  const split = l => l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map(c => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"'));
  const head = split(lines[0]).map(h => h.toLowerCase());
  const col = k => head.findIndex(h => h.includes(k));
  const [pi, ci, ii] = [col('page'), col('click'), col('impression')];
  if (pi < 0 || ci < 0 || ii < 0) throw new Error('GSC csv needs page, clicks and impressions columns');
  const map = new Map();
  for (const l of lines.slice(1)) { const c = split(l); let u; try { u = new URL(c[pi]).pathname; } catch { u = c[pi]; } map.set(u, { clicks: Number(c[ci]) || 0, impressions: Number(c[ii]) || 0 }); }
  return map;
}

(async () => {
  const sitemapXml = (await get('/sitemap.xml')).html;
  const paths = [...sitemapXml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(m => m[1]);
  if (!paths.length) throw new Error(`No sitemap URLs at ${base}/sitemap.xml: is the production build running?`);
  const gsc = readGsc();
  const pages = [];
  for (const p of paths) {
    const { status, html } = await get(p);
    const main = (html.match(/<main[\s\S]*?<\/main>/) || [''])[0];
    const article = (main.match(/<article[\s\S]*?<\/article>/) || [main])[0];
    const links = html => [...new Set([...html.matchAll(/<a [^>]*href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)].map(m => m[1]))];
    pages.push({
      path: p, status, template: templateOf(p), age: ageDays(p), created: revisions[p]?.date || '',
      title: decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || ''),
      description: decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ''),
      canonical: (html.match(/rel="canonical" href="https?:\/\/[^/]+([^"]*)"/) || [])[1] || '',
      noindex: /<meta name="robots" content="[^"]*noindex/.test(html),
      text: textOf(article), mainLinks: links(main), allLinks: links(html),
      external: [...article.matchAll(/<a [^>]*href="https?:\/\/(?!brickellhomesforsale)[^"]+"/g)].length,
      table: /<table/.test(article), diagram: /class="diagram"/.test(article)
    });
  }
  const byPath = new Map(pages.map(x => [x.path, x]));

  // Sentences repeated across several pages of one template are template boilerplate, not page-specific value.
  const sentenceFreq = new Map();
  for (const x of pages) for (const s of new Set(sentences(x.text))) { const k = `${x.template}|${s}`; sentenceFreq.set(k, (sentenceFreq.get(k) || 0) + 1); }
  for (const x of pages) {
    const all = sentences(x.text);
    const shared = all.filter(s => sentenceFreq.get(`${x.template}|${s}`) >= T.sharedSentencePages);
    const sharedSet = new Set(shared);
    x.words = words(x.text).length;
    x.uniqueText = all.filter(s => !sharedSet.has(s)).join(' ');
    x.uniqueWords = words(x.uniqueText).length;
    x.sharedRatio = x.words ? pct(1 - x.uniqueWords / x.words) : 0;
    x.numericClaims = (x.text.match(/\$\s?\d[\d,.]*\s?[MKk]?|\b\d+(\.\d+)?\s?%/g) || []).filter(m => !/[MKk]$/.test(m)).length; // budget-band labels such as $1M are not factual claims
    x.fullShingles = shingles(words(x.text)); x.uniqueShingles = shingles(words(x.uniqueText));
    x.tokens = new Set(words(`${x.title} ${x.description}`).filter(w => !STOP.has(w) && w.length > 2));
  }

  // Pairwise: near-duplicate text within a template, and intent overlap from title/description vocabulary.
  for (const x of pages) { x.maxFull = { v: 0, peer: '' }; x.maxUnique = { v: 0, peer: '' }; x.intent = { v: 0, peer: '' }; }
  const intentPairs = [];
  for (let i = 0; i < pages.length; i++) for (let j = i + 1; j < pages.length; j++) {
    const a = pages[i], b = pages[j];
    if (a.template === 'guide' || a.template === 'building') if (a.template === b.template) {
      const f = jaccard(a.fullShingles, b.fullShingles), u = jaccard(a.uniqueShingles, b.uniqueShingles);
      if (f > a.maxFull.v) a.maxFull = { v: f, peer: b.path }; if (f > b.maxFull.v) b.maxFull = { v: f, peer: a.path };
      if (u > a.maxUnique.v) a.maxUnique = { v: u, peer: b.path }; if (u > b.maxUnique.v) b.maxUnique = { v: u, peer: a.path };
    }
    if (a.template === 'guide' && b.template === 'guide') {
      const v = jaccard(a.tokens, b.tokens);
      if (v > a.intent.v) a.intent = { v, peer: b.path }; if (v > b.intent.v) b.intent = { v, peer: a.path };
      if (v >= T.intentOverlapReview) intentPairs.push([a.path, b.path, pct(v)]);
    }
  }

  // Link graph from rendered HTML: editorial links live in <main>; header/footer are global navigation.
  const indexPages = new Set(['/', '/buyer-guides/', '/buildings/']);
  for (const x of pages) { x.inboundContent = 0; x.inboundIndex = 0; x.inboundGlobal = 0; }
  for (const x of pages) {
    for (const l of x.mainLinks) { const t = byPath.get(l); if (t && t.path !== x.path) { if (indexPages.has(x.path)) t.inboundIndex++; else t.inboundContent++; } }
    for (const l of x.allLinks) { const t = byPath.get(l); if (t && t.path !== x.path && !x.mainLinks.includes(l)) t.inboundGlobal++; }
  }

  // Consistency: reachable internal URLs that are not in the sitemap, sitemap URLs that are not canonical/indexable.
  const known = new Set(paths); const outside = new Set();
  for (const x of pages) for (const l of x.allLinks) if (!known.has(l) && !/\.(xml|txt|svg|png|webmanifest)$|^\/api\//.test(l)) outside.add(l);
  const outsideResults = [];
  for (const l of outside) { const r = await get(l); outsideResults.push({ path: l, status: r.status, noindex: /name="robots" content="[^"]*noindex/.test(r.html) }); }

  for (const x of pages) {
    const g = gsc?.get(x.path);
    x.clicks = g ? g.clicks : 'NO DATA'; x.impressions = g ? g.impressions : 'NO DATA';
    const flags = [];
    if (x.status !== 200) flags.push(`status ${x.status}`);
    if (x.noindex) flags.push('noindex in sitemap');
    if (x.canonical !== x.path) flags.push(`canonical ${x.canonical || 'missing'}`);
    if (x.template === 'guide' || x.template === 'building') {
      if (x.uniqueWords < T.thinUniqueWords) flags.push(`page-specific text ${x.uniqueWords} words`);
      if (x.sharedRatio > T.sharedRatioHigh) flags.push(`${Math.round(x.sharedRatio * 100)}% template text`);
      if (x.maxFull.v >= T.similarityReview) flags.push(`${Math.round(x.maxFull.v * 100)}% text overlap with ${x.maxFull.peer}`);
      if (x.intent.v >= T.intentOverlapReview) flags.push(`intent overlap ${pct(x.intent.v)} with ${x.intent.peer}`);
      if (x.external === 0) flags.push('no primary-source link');
      if (x.numericClaims) flags.push(`${x.numericClaims} numeric claim(s) to verify`);
    }
    if ((x.template === 'guide' || x.template === 'building') && x.inboundContent === 0) flags.push('no editorial inbound link (index/global only)');
    let rec = 'KEEP';
    if (flags.some(f => /page-specific|template text|primary-source|no editorial/.test(f))) rec = 'IMPROVE';
    if (x.maxFull.v >= T.similarityReview || x.intent.v >= T.intentOverlapReview) rec = 'IMPROVE; MERGE-REVIEW (candidate, needs human approval)';
    if (g && typeof x.age === 'number' && x.age >= T.lowValueDays && g.clicks === 0 && g.impressions < T.lowValueImpressions) { rec = `LOW-VALUE CANDIDATE (${rec}); human decision`; flags.push('90d 0 clicks <10 impressions'); }
    else if (typeof x.age === 'number' && x.age < T.lowValueDays) flags.push(`90-day rule n/a: page is ${x.age} days old`);
    x.recommended = rec; x.rationale = flags.join('; ');
  }

  fs.mkdirSync(outDir, { recursive: true });
  const cols = ['url', 'template', 'created', 'age_days', 'words', 'page_specific_words', 'template_text_ratio', 'inbound_content', 'inbound_index', 'inbound_global', 'max_text_overlap', 'overlap_peer', 'intent_overlap', 'intent_peer', 'external_sources', 'numeric_claims', 'clicks', 'impressions', 'recommended_action', 'rationale'];
  const rows = pages.map(x => [x.path, x.template, x.created, x.age, x.words, x.uniqueWords, x.sharedRatio, x.inboundContent, x.inboundIndex, x.inboundGlobal, pct(x.maxFull.v), x.maxFull.peer, pct(x.intent.v), x.intent.peer, x.external, x.numericClaims, x.clicks, x.impressions, x.recommended, x.rationale]);
  fs.writeFileSync(path.join(outDir, `${today}-review-queue.csv`), [cols, ...rows].map(r => r.map(csvCell).join(',')).join('\n') + '\n');

  const count = (arr, f) => arr.reduce((m, x) => (m[f(x)] = (m[f(x)] || 0) + 1, m), {});
  const tpl = count(pages, x => x.template);
  const med = a => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };
  const by = t => pages.filter(x => x.template === t);
  const stat = t => { const g = by(t); return `${g.length} URLs; median ${med(g.map(x => x.words))} words, median ${med(g.map(x => x.uniqueWords))} page-specific words, median ${Math.round(med(g.map(x => x.sharedRatio)) * 100)}% template text, median max text overlap ${Math.round(med(g.map(x => x.maxFull.v)) * 100)}%`; };
  const within = d => pages.filter(x => typeof x.age === 'number' && x.age <= d).length;
  const recs = count(pages, x => x.recommended.split(' (')[0]);
  const list = (arr, f) => arr.length ? arr.map(f).join('\n') : '- none';
  const summary = `# SEO scale and low-value audit, ${today}

Read-only. Generated by \`scripts/seo-audit.cjs\` against ${base}. Nothing was noindexed, redirected, merged or deleted. MERGE, 301 and NOINDEX are never applied by the script; candidates need human approval (constitution sections 22 and 28).

## Scale
- Indexable URLs in the sitemap: **${pages.length}** (${Object.entries(tpl).map(([k, v]) => `${k} ${v}`).join(', ')}).
- Created in the last 30 days: **${within(30)}**; in the last 90 days: **${within(90)}** (creation date = first revision date in \`content-revisions.json\`).
- Scale is a risk signal, not proof of a violation.

## Template quality (what a crawler receives)
- Guides: ${stat('guide')}.
- Buildings: ${stat('building')}.
- Page-specific text counts sentences that do not repeat on ${T.sharedSentencePages}+ pages of the same template.

## Consistency
- Non-200 or noindex URLs in the sitemap: ${pages.filter(x => x.status !== 200 || x.noindex).length}.
- Sitemap URLs whose canonical is not themselves: ${pages.filter(x => x.canonical !== x.path).length}.
- Internal URLs linked from pages but absent from the sitemap:
${list(outsideResults, r => `  - ${r.path} (HTTP ${r.status}${r.noindex ? ', noindex' : ''})`)}
- Pages with no editorial inbound link (reached only from index pages or global navigation):
${list(pages.filter(x => (x.template === 'guide' || x.template === 'building') && x.inboundContent === 0), x => `  - ${x.path} (${x.template}; inbound from index pages ${x.inboundIndex}, global ${x.inboundGlobal})`)}

## Near-duplicate text (>= ${Math.round(T.similarityReview * 100)}% shared ${T.shingle}-word shingles within a template)
${list(pages.filter(x => x.maxFull.v >= T.similarityReview && x.path < x.maxFull.peer), x => `- ${x.path} and ${x.maxFull.peer}: ${Math.round(x.maxFull.v * 100)}%`)}

## Possible intent overlap, for human review only (title/description vocabulary, Jaccard >= ${T.intentOverlapReview})
${list(intentPairs.sort((a, b) => b[2] - a[2]), p => `- ${p[0]} and ${p[1]}: ${p[2]}`)}

## Information-gain signals
- Guides with a primary-source link: ${by('guide').filter(x => x.external).length}/${by('guide').length}; with a comparison table: ${by('guide').filter(x => x.table).length}; with a diagram: ${by('guide').filter(x => x.diagram).length}.
- Buildings with an official project source: ${by('building').filter(x => x.external).length}/${by('building').length}.
- Dollar or percentage figures in article text, budget-band labels such as $1M excluded (verify or qualify, section 23): ${pages.reduce((n, x) => n + x.numericClaims, 0)} across ${pages.filter(x => x.numericClaims).length} pages.

## Recommended actions (candidates)
${Object.entries(recs).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

## Not measurable from the repo
- Clicks and impressions: ${gsc ? 'loaded from ' + gscPath : '**NO DATA**. Provide a Search Console pages export with `--gsc`.'}
- The 90-day low-value rule (0 clicks, <${T.lowValueImpressions} impressions) cannot apply to pages younger than ${T.lowValueDays} days; the oldest page here is ${Math.max(...pages.map(x => Number(x.age) || 0))} days old.
- Indexed useful pages / total indexed pages (section 29) and recovery metrics (section 26) need Search Console.
`;
  fs.writeFileSync(path.join(outDir, `${today}-summary.md`), summary);
  console.log(summary);
})().catch(e => { console.error(e.message); process.exit(1); });
