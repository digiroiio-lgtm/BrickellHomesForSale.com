# Brickell Homes For Sale: working notes for Claude

## Standing SEO/GEO rules
All SEO, GEO, AI-search, content and architecture work follows `docs/seo-geo-constitution.md` (read it before creating, merging, redirecting or noindexing any URL). Decision order: user value → originality → evidence → intent differentiation → trust → technical access → SEO → GEO → scale last.

## Site-specific rules
- The site is an independent, MLS-free editorial buyer-guide and inquiry site. Never show or imply live listings, prices, availability, rental/pet permissions or returns.
- Operator identity is deliberately anonymous. Do not invent authors, reviewers, addresses, phone numbers, licences or brokerage claims. Article markup has no `author`; add one only when the owner supplies a real, responsible person.
- Do not emit `Offer`, `RealEstateListing`, `RealEstateAgent` or `FAQPage` structured data (see `docs/transaction-intent-graph.md`).
- Do not use the Google Indexing API (no JobPosting or livestream pages here). `scripts/indexnow.cjs` is for Bing and others only.
- `scripts/content-revisions.cjs` guards editorial dates: editing guide, building, trust, home, index or privacy content fails the build until the affected URLs are reviewed and snapshotted with the real revision date (`node scripts/content-revisions.cjs --snapshot --date=YYYY-MM-DD`). `lastmod` changes only for meaningful edits.
- Needs human approval first: mass noindex, mass 301, bulk deletion, canonical or taxonomy changes, large sitemap pruning, consolidating many URLs. The 90-day / 0 clicks / <10 impressions rule only nominates candidates.
- Record every SEO deployment in `docs/seo-deployment-log.md`.

## Commands
- `npm run lint`, `npm run typecheck`, `npm run check:seo` (title/description hygiene), `npm run check:revisions`, `npm run build`
- `npm run audit:seo`: read-only scale / low-value audit against a running production build (`npx next start -p 3111`; add `--gsc <csv>` for Search Console data). Reports land in `docs/seo-audit/`.
