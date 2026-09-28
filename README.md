# Brickell Homes For Sale

The approved next-stage SEO/GEO architecture is documented in [the transaction-intent graph](docs/transaction-intent-graph.md). It defines the Core → Price → Buildings → Bedroom/Features → New Construction → Investor rollout and publication gates for future licensed inventory-backed Money Pages. The current site remains an MLS-free editorial buyer resource until a permitted inventory source is connected.

An MLS/IDX-free editorial buyer acquisition site built with Next.js 15, React 19 and TypeScript. The repository began empty; the default branch was initialized with a README, and this implementation lives on `feat/brickell-buyer-engine` for review.

## Implementation plan and status

1. **Editorial foundation — implemented.** 27 static intent guides, including all 15 requested routes, plus eight building guides and a building index. The 15 core guides have dedicated decision scorecards. The remaining 12 supplementary guides are shorter and need another editorial review before a public launch.
2. **Buyer inquiry — implemented, connection required.** The form captures budget, beds, type, area/building, timeline, funding, contact details, country, message, consent, lead source, landing page, intent, budget segment and five UTM fields. Server validates all data, applies a honeypot and timing check, and forwards the inquiry over HTTPS to a configured webhook with an HMAC signature. A 2xx from the destination is required before success appears. Without a configured endpoint and secret the API returns **503** and no lead is accepted; never represent the system as receiving leads until an actual durable destination has been connected and tested.
3. **Search and measurement — implemented, credentials required.** Static canonical pages, unique title/description/H1, sitemap, robots, llms.txt, BreadcrumbList, WebSite and Organization markup, internal linking, GA4 event hooks, Search Console token hook. GA4 loads only when an ID is configured. No RealEstateAgent, FAQPage or listing schema is asserted without qualifying data.
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

The `.env.example` file lists all optional and required integration values. Production form delivery requires `LEAD_WEBHOOK_URL` (an HTTPS receiving service) and `LEAD_WEBHOOK_SECRET` (shared HMAC key). The receiver must verify `X-Lead-Signature: sha256=<hex>` against the exact JSON request body, store leads durably and implement its own deduplication and notifications. `NEXT_PUBLIC_GA4_ID` and `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` are separate public integration values. WhatsApp and email links render only if an approved URL/address is configured. Do not add these values to Git.

## Launch review gates

- Identify the real site operator, privacy contact, receiving partner and retention/deletion process; update the privacy notice before collecting public leads.
- Configure and end-to-end test the secure webhook destination and its HMAC verification, durable storage and notification path; add production edge/WAF rate limits (the in-memory limiter is only a local backstop).
- Confirm broker/agent relationship and disclosures before displaying an agent identity or advertising a matching service as staffed. Building rules, assessments, availability, and any development timing must be reverified against current written documents.
- Review all 27 guides, especially 12 supplementary guides, for editorial depth and current claims; confirm the eight primary building URLs and source dates.
- Add licensed photography only after documenting usage rights. The current hero and diagrams are original CSS/HTML; no external property photos are bundled.
- Add an appropriate analytics consent flow and review applicable privacy obligations before enabling GA4 in production.

No deployment, merge, licensed feed or live third-party integration is part of this branch.
