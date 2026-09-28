# Brickell transaction-intent graph

## Decision and rollout

This is the target SEO/GEO architecture for BrickellHomesForSale.com. The current deployment phase uses sourced editorial buyer pages and an inquiry CTA. MLS/IDX integration is deferred. Roll out in this order:

1. Core nodes 1–15
2. Price nodes 16–27
3. Building nodes 55–79
4. Bedroom and feature nodes 28–54
5. New-construction nodes 80–88
6. Investor nodes 89–100

The node numbers refer to the separately approved 100-keyword Money Page Map. **Do not infer these numbers from the order of entries in `src/lib/content.ts`**: its original first 15 entries are an older editorial route set. Import the actual 100-row map, with keyword, URL, H1, title, intent, CTA and parent, before creating or changing Core routes.

## Distinct page kinds

- Existing editorial guides and building profiles explain buyer decisions and disclose that they have no live listings.
- In this phase, a Money Page is a distinct transaction-intent editorial landing page with a qualified inquiry CTA. It can be indexed when it passes the editorial publication gate below, without showing inventory. Its copy must say that matching and availability require independent follow-up; it must not imply a live property feed or guaranteed results. Filter and sort combinations without independent buyer intent remain non-indexable and point to an appropriate canonical page.
- A listing detail page requires a licensed data source and the current listing record. A building profile is not a listing detail page, and project marketing is not evidence of current unit availability.

## Money Page publication gate

For each proposed indexable URL, require all of the following before release:

1. Distinct search intent and buyer decision from parent, siblings and existing guides. Record a target query and reason the page is useful separately.
2. Unique H1, title, intro, contextual building or market facts with source and checked date, buyer decision content, and an intent-specific CTA. Do not fabricate market data or FAQ answers to fill a template.
3. Useful buyer-specific evidence: concrete Brickell area and building context, verifiable due-diligence questions, source attribution for factual claims, and an honest explanation of what can only be checked for a specific unit. No invented inventory, active asking prices, market counts, photos, project delivery dates or association rules.
4. Self-canonical production URL, 200 response, single H1, accurate BreadcrumbList reflecting the actual navigation path, links to its parent and useful children/siblings, and at least one inbound contextual link from an existing indexable page.
5. A specific buyer CTA that carries the node/intent and any selected building into the inquiry, subject to the site's actual delivery and privacy configuration. Phrase it as a request for matched options, not access to live listings.
6. A verified editorial revision date for `lastmod`, changed only for substantive editorial edits.

Only URLs passing this gate join `sitemap.xml`. A thin parameter combination does not become an indexable URL simply because it can be rendered. Use a stable parent canonical for non-indexable filter views; do not self-canonicalize a duplicate. Do not claim `Offer`, `RealEstateListing` or listing availability in structured data during this MLS-free phase. Continue to use `BreadcrumbList` for actual paths.

## Deferred MLS/IDX phase

Inventory is **not a prerequisite for Core, Price or Building editorial pages** in this deployment. If MLS/IDX is approved in a later phase, obtain broker authorization, licensed delivery and display rights, mandatory attribution, refresh limits and removal rules before adding any live listing component. Keep credentials on the server; never scrape or use placeholder listings. Add freshness, source-ID and stale/sold-removal safeguards at that point. An editorial page must not quietly switch into a live-listings representation.

## First implementation slice

1. Import the approved Core 1–15 rows and reconcile each proposed URL against the 81 live canonical URLs. Reuse a URL when intent matches; avoid a second near-duplicate guide for the same buyer decision. Record redirects only for genuinely replaced routes.
2. Define typed node records and parent/child/sibling edges; resolve all links and breadcrumb trails against canonical routes.
3. Build a reusable editorial Money Page layout with page-specific intent, sourced context, decision support, contextual links and inquiry CTA. Review content individually; do not bulk publish 15 thin keyword variants.
4. Launch Core nodes in reviewed batches, validate canonical/status/schema/sitemap and inquiry attribution in production, then apply the same factory to Price.

**Current dependency:** The exact numbered Core 1–15 rows are absent from this repository. The existing inquiry endpoint is awaiting its planned Resend connection; preserve honest submission status and do not imply that a request has been delivered when it has not. Neither dependency authorizes invented listings. MLS/IDX is explicitly outside this phase.
