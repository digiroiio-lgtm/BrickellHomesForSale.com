# Brickell Homes For Sale

The October 2026 Search Console findings, live HTTP checks, crawlability fixes and post-publication steps are documented in [the indexing follow-up](docs/indexing-recovery.md). Run `npm run check:indexing` against a running production build to audit all 81 sitemap pages; GitHub Actions also performs this audit on pull requests and pushes to main.

The approved next-stage SEO/GEO architecture is documented in [the transaction-intent graph](docs/transaction-intent-graph.md). It defines the Core → Price → Buildings → Bedroom/Features → New Construction → Investor rollout and publication gates for distinct editorial Money Pages. This phase remains MLS-free; licensed inventory is a separate future option.

An MLS/IDX-free editorial buyer acquisition site built with Next.js 15, React 19 and TypeScript. The repository began empty; the default branch was initialized with a README, and this implementation lives on `feat/brickell-buyer-engine` for review.

## Implementation plan and status

1. **Editorial foundation — implemented.** 27 static intent guides, including all 15 requested routes, plus eight building guides and a building index. The 15 core guides have dedicated decision scorecards. The remaining 12 supplementary guides are shorter and need another editorial review before a public launch.
2. **Buyer inquiry — implemented with Formspree.** The form captures budget, beds, type, area/building, timeline, funding, contact details, country, message, consent, lead source, landing page, intent, budget segment and five UTM fields. Server validates all data, applies a honeypot and timing check, and posts the validated inquiry to the Brickell Formspree endpoint. A 2xx from Formspree is required before success appears; delivery failures return **503**. Confirm the destination email in Formspree settings and test a real submission before treating the form as operational.
3. **Search, GEO and AI-search — implemented.** Static canonical pages, unique title/description/H1 (≤60/≤160 characters, enforced by `npm run check:seo`), sitemap with guarded `lastmod`, robots with explicit AI-crawler allow rules (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others), generated `/llms.txt` (all 81 URLs by section) and `/llms-full.txt` (full guide text), RSS `/feed.xml`, web manifest, icons and per-page Open Graph images, a single `@id`-linked JSON-LD graph per page (WebSite, Organization, WebPage/Article/CollectionPage/AboutPage, ItemList, BreadcrumbList, citations to primary sources), visible "Last reviewed" dates and a Quick answer block, internal linking, GA4 event hooks, Search Console and Bing verification token hooks, and `scripts/indexnow.cjs` for manual IndexNow submission (needs `INDEXNOW_KEY` and a committed `public/<key>.txt`). The site-wide GA4 measurement ID is `G-KRJFRNMYM5`; Search Console verification still requires a token. No RealEstateAgent or listing schema is asserted without qualifying data. The condo search FAQ guide uses FAQPage markup for its 15 visible editorial questions and answers, alongside Article and BreadcrumbList.
4. **Future licensed inventory — design reserved.** Keep editorial `Guide`/`Building` objects separate from any later licensed `Property` model. An IDX/MLS integration will need broker authorization, rights and attribution rules, upstream identifiers, status and last-seen timestamps, scheduled synchronization, stale/sold removal, audit log, and consent-aware lead routing. Do not connect an unlicensed feed or create property pages from third-party scraped data.

## Local use

```bash
npm ci
cp .env.example .env.local
npm run dev
npm run lint
npm run typecheck
npm run build
```

### Editorial revision dates

`src/lib/content-revisions.json` stores the last substantive editorial change date and a content fingerprint for each indexable page. `npm run build` checks these fingerprints before generating `sitemap.xml`; ordinary deploys leave `lastmod` unchanged. After a substantive content edit, review the affected page and run `node scripts/content-revisions.cjs --snapshot --date=YYYY-MM-DD` with the actual edit date, then review the manifest diff before committing. A template or navigation edit does not automatically rewrite every guide's date. The home and index entries also track their displayed page text and linked guide/building summaries.

The `.env.example` file lists the remaining optional integration values. Form delivery uses `https://formspree.io/f/moevrvak` in `src/app/api/inquiry/route.ts`; submissions should appear in the Brickell form's Formspree Submissions tab and be emailed to its verified target address. `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is a separate public integration value; GA4 uses the measurement ID in `src/components/Analytics.tsx`. WhatsApp and email links render only if an approved URL/address is configured. Do not add private integration values to Git.

## Launch review gates

- Identify the real site operator, privacy contact, receiving partner and retention/deletion process; update the privacy notice before collecting public leads.
- Confirm the Formspree form is active, its target email is verified, and a test submission appears in both the Submissions tab and the notification inbox; add production edge/WAF rate limits (the in-memory limiter is only a local backstop).
- Confirm broker/agent relationship and disclosures before displaying an agent identity or advertising a matching service as staffed. Building rules, assessments, availability, and any development timing must be reverified against current written documents.
- Review all 27 guides, especially 12 supplementary guides, for editorial depth and current claims; confirm the eight primary building URLs and source dates.
- Add licensed photography only after documenting usage rights. The current hero and diagrams are original CSS/HTML; no external property photos are bundled.
- Review applicable analytics consent and privacy obligations for production traffic and add an appropriate consent flow where required.

No licensed feed is included in this implementation.

## Condo search questions (October 30, 2026)

`/where-to-find-brickell-condos/` answers all 15 search and buying questions with matching visible FAQPage data. Its questions and answers also appear in `/llms-full.txt`; the registry supplies sitemap, feed and buyer-guide discovery. See [Nightwatch tracking status](docs/nightwatch-prompts.md) for the 5 saved prompts and the 10 blocked by the account limit. FAQ markup describes the page; no search appearance or AI citation is promised.

## Buyer decision tools (October 30, 2026)

- `/compare-brickell-buildings/`: filter 23 existing source-linked profiles by editorial area or residential positioning; compare up to three side by side. The selected slugs persist in the page URL. Three featured developer portfolios have additional dated evidence; missing current stage, fees and rental permissions remain explicitly unverified.
- `/brickell-condo-cost-calculator/`: user-entered USD inputs, cash or fully amortizing fixed-rate finance, explicit zero-cost entries, a monthly breakdown, annual budget, purchase cash plan and in-memory A/B scenario comparison. No tax/rate/HOA data feed. The optional example is invented and clearly labeled. Inputs are not persisted or included in analytics.
- `/brickell-condos-under-750k/`: an exact-ceiling budget guide with three visible FAQs and matching structured answers; linked from the original 15-question guide and budget index. No unit availability is asserted.

`npm run check:tools` checks cash/loan arithmetic, zero interest, rejected invalid inputs and comparison coverage. The rendered indexing audit now checks canonical-linked WebPage graphs, breadcrumbs and visible FAQ text on every sitemap page. Building Article graphs cite their official project source. The comparison page uses CollectionPage and ItemList for its visible 23-profile catalogue.
