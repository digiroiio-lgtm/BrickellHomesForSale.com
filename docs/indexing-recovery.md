# Search Console indexing follow-up — 7 October 2026

## Findings and limits

The supplied Search Console report shows one indexed URL, 83 excluded URLs and 80 discovered but not crawled URLs. These counts are supplied observations, not a fresh Search Console export.

An independent live HTTP check on 7 October found all 81 sitemap URLs responding with 200, exactly one self-referencing canonical and no robots meta `noindex`. The homepage variants currently redirect permanently to `https://brickellhomesforsale.com/`: HTTP apex goes directly to HTTPS apex; HTTP www first goes to HTTPS www, which redirects to HTTPS apex. The historical Google-selected canonical `https://www.demonslayerr.com/` is absent from the current source. Its historical cause cannot be established from current code or HTTP checks.

The content pages are already statically rendered. The buyer guide index links to all 50 guides, and the building index links to all 23 building profiles. No evidence supports changing site ownership, disabling indexing, removing valid content from the sitemap, or redirecting content pages to the homepage.

## Changes

- Removed the unsupported `Host` directive from generated robots.txt; retained crawl access and the sitemap declaration.
- Made metadata canonicals explicit absolute URLs on the fixed production origin, matching existing sitemap and Open Graph URLs.
- Added a real `/favicon.ico`, derived from the existing brand icon.
- Gave the three budget guides direct homepage links and a dedicated group in the buyer guide index.
- Updated only homepage and buyer guide index revision fingerprints/dates after those content changes. Other editorial dates stay unchanged.
- Added a rendered-page audit and GitHub Actions checks for HTTP status, canonical consistency, accidental noindex, internal links, homepage reachability, sitemap coverage, robots.txt and favicon.

## Verification

Run `npm ci`, `npm run lint`, `npm run check:seo`, `npm run build`, then `npm run typecheck`. Start the production server with `npm run start` and run `npm run check:indexing` in another terminal. The default audit target is `http://localhost:3000`; an alternate target can be passed with `npm run check:indexing -- https://brickellhomesforsale.com`.

The updated production build passed all checks: 81 indexable HTML pages returned 200, each had one correct canonical and one H1, none had noindex, and all were reachable from home through actual server-rendered anchors within two clicks. The favicon returned 200 as an image; robots.txt had no Host directive. The workflow repeats these checks on pull requests and pushes to main.

The HTTP audit checks technical eligibility and discovery paths. It does not query Google's index, evaluate content quality, or replace Search Console's live URL test.

## After production publication

1. Run the audit against production and confirm the deployed commit contains these changes. A passing local audit does not prove production has been updated.
2. In Search Console, inspect the canonical HTTPS homepage and run **Test live URL**, then request indexing once. Inspect the old HTTP www URL separately to verify its redirect and observe Google's selected canonical after a new crawl.
3. Run live tests for `/condos-for-sale/`, the three budget guides, `/buyer-guides/` and `/buildings/`, then request indexing for a small representative set that passes the tests.
4. Confirm the existing sitemap remains successful. Resubmit it once after publication if needed; do not add redirected, favicon or sitemap URLs as content entries, and do not fabricate lastmod dates.
5. Record the inspection date, last crawl, Google-selected canonical and indexing status for the same sample after 7–14 days. If discovery remains unchanged, examine crawl logs and review originality, depth, overlap and usefulness of individual pages before expanding the page count.

Google controls crawling and indexing. Recrawl requests are subject to quotas, repeated requests do not accelerate crawling, and inclusion is not guaranteed. These changes cannot erase the old canonical record directly.

References: [canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [recrawl requests](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [sitemap best practices](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
