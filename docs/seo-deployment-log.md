# SEO deployment log

One row per deployment (constitution section 24). Newest first.

| Date | URL / template | Change | Reason | Expected effect |
| --- | --- | --- | --- | --- |
| 2026-10-07 | All Article JSON-LD (guide and building pages) | Removed `author: Organization`; publisher stays | An organisation placeholder is not a responsible author (constitution section 10); the operator is intentionally anonymous | No ranking effect expected; avoids a misleading authorship signal |
| 2026-10-07 | Repo docs and tooling | Added `docs/seo-geo-constitution.md`, `CLAUDE.md`, `scripts/seo-audit.cjs` and the first audit in `docs/seo-audit/` | Make the master directive durable; measure scale and low-value risk before any pruning | None on the live site; audit only |
| 2026-10-01 | `/`, all pages (GA4 loader), home diagram label | GA4 loads on first interaction or after 5 s; diagram eyebrow contrast fixed (PR #18) | PageSpeed: unused JavaScript, TBT, accessibility contrast | Lower TBT, accessibility 100 in local Lighthouse; analytics misses sessions under 5 s with no interaction |
| 2026-10-01 | All 81 URLs | Titles at most 60 characters, richer descriptions, Twitter cards, Open Graph images, icons, manifest, RSS, `@id` JSON-LD graph, `/llms.txt`, `/llms-full.txt`, AI-crawler rules in robots.txt, Quick answer and last-reviewed date (PR #18) | SEO/GEO/AI-search foundation | Cleaner snippets, richer previews, better machine readability; no guaranteed ranking change |
| 2026-10-01 | `/`, `/buildings/`, `/buyer-guides/`, `/privacy/`, `/condos-for-sale/` | Content edited, revision dates set to 2026-10-01 | Home links, schema wiring, wording cleanup (removed "current inventory") | `lastmod` reflects a real edit |
