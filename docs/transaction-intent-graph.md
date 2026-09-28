# Brickell transaction-intent graph

## Decision and rollout

This is the target SEO/GEO architecture for BrickellHomesForSale.com. Roll out in this order:

1. Core nodes 1–15
2. Price nodes 16–27
3. Building nodes 55–79
4. Bedroom and feature nodes 28–54
5. New-construction nodes 80–88
6. Investor nodes 89–100

The node numbers refer to the separately approved 100-keyword Money Page Map. **Do not infer these numbers from the order of entries in `src/lib/content.ts`**: its original first 15 entries are an older editorial route set. Import the actual 100-row map, with keyword, URL, H1, title, intent, CTA and parent, before creating or changing Core routes.

## Distinct page kinds

- Existing editorial guides and building profiles explain buyer decisions, disclose that they have no live listings, and may remain indexable on their own editorial merit. They are not live-inventory Money Pages.
- A Money Page is an inventory-backed commercial landing page. Its URL is promoted for indexing only after the publication gate below passes. Filter and sort combinations without independent buyer intent remain non-indexable and point to an appropriate canonical page.
- A listing detail page requires a licensed data source and the current listing record. A building profile is not a listing detail page, and project marketing is not evidence of current unit availability.

## Money Page publication gate

For each proposed indexable URL, require all of the following before release:

1. Distinct search intent and buyer decision from parent, siblings and existing guides. Record a target query and reason the page is useful separately.
2. Unique H1, title, intro, contextual building or market facts with source and checked date, buyer decision content, and an intent-specific CTA. Do not fabricate market data or FAQ answers to fill a template.
3. At least one eligible current inventory record from an authorized feed, with source ID, status, permitted display fields, last-seen time, required attribution and listing URL. Exclude stale, sold and unavailable records. If the feed or display rights are not ready, keep the candidate unpublished and out of the sitemap; do not imply live availability.
4. Self-canonical production URL, 200 response, single H1, accurate BreadcrumbList reflecting the actual navigation path, links to its parent and useful children/siblings, and at least one inbound contextual link from an existing indexable page.
5. A specific buyer CTA that carries the node/intent and any selected listing or building into the inquiry, subject to the site's actual delivery and privacy configuration.
6. A verified editorial revision date for `lastmod`, plus a freshness process for inventory independent of deploy time. Product data freshness is not a reason to change the editorial `lastmod` on every sync.

Only URLs passing this gate join `sitemap.xml`. A thin parameter combination does not become an indexable URL simply because it can be rendered. Use a stable parent canonical for non-indexable filter views; do not self-canonicalize a duplicate. Do not claim `Offer`, `RealEstateListing` or listing availability in structured data until corresponding licensed, visible information exists. Continue to use `BreadcrumbList` for actual paths.

## Inventory contract before the Core sprint

Obtain broker authorization and a licensed MLS/IDX/RESO delivery method, geographic and display scope, mandatory attribution, refresh limits, and removal rules. Keep credentials on the server. Normalize source listing ID, building ID/address, unit, asset type, price only where licensed, status, updated/last-seen timestamps, media rights and source attribution. Refresh and remove sold or stale inventory under the provider's rules; preserve an audit trail. Never scrape listing data or populate pages with placeholder units, prices, photos or counts.

## First implementation slice

1. Import the approved Core 1–15 rows and reconcile each proposed URL against the 81 live canonical URLs. Reuse a URL when intent matches; keep an editorial guide separate when the Money Page decision differs. Record redirects only for genuinely replaced routes.
2. Define typed node records and parent/child/sibling edges; resolve all links and breadcrumb trails against canonical routes.
3. Wire the authorized inventory adapter and freshness policy. Build a single reusable Money Page template with page-specific editorial fields, inventory and CTA. Do not bulk publish until the gate passes per URL.
4. Launch Core nodes in reviewed batches, validate canonical/status/schema/sitemap and inquiry attribution in production, then apply the same factory to Price.

**Current dependency:** This repository and production site have no licensed live inventory. The exact numbered Core 1–15 rows are also absent from this repository. The existing inquiry endpoint is awaiting its planned Resend connection. These are concrete input dependencies, not permission to fabricate inventory or publish empty Money Pages.
