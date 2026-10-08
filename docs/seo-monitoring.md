# SEO and AI-visibility monitoring

Operating routine for `docs/seo-geo-constitution.md` sections 18, 19, 25 and 26. Property IDs: Search Console `sc-domain:brickellhomesforsale.com`, GA4 `556502894`.

## Baseline (pulled 2026-10-08; the site was 11 days old)
| Source | Window | Result |
| --- | --- | --- |
| Search Console | 2026-09-10 to 2026-10-07 | 1 impression, 0 clicks. One query, "brickell real estate market", on `/`, average position 94. The previous 28 days had no data. |
| GA4 | last 28 days | 34 sessions: 33 Direct, 1 Unassigned. Organic 0, referral 0, AI referrals 0. One landing page was `/?gtm_latency=1` (GTM preview/test traffic). |
| GA4 events | last 28 days | page_view 79, session_start 34, form_start 10, form_submit 5, request_matched_options 5. `keyEvents` reported 96 for 33 sessions, which suggests events other than the form events are marked as key events. |
| HubSpot AEO | 2026-09-08 to 2026-10-08 | Not configured: 0 prompts, 0 capacity, no runs. |

Reading: this is the discovery stage, not a penalty or an update effect. Direct sessions are probably the owner and testing. Judge nothing about ranking until Google has indexed the pages.

## Setup checks (human, outside the repo)
1. Search Console: confirm `https://brickellhomesforsale.com/sitemap.xml` is submitted and read. Use URL Inspection on `/` and five key guides; request indexing there. The Indexing API is not used (constitution section 13).
2. Bing Webmaster Tools: add the site, set `NEXT_PUBLIC_BING_SITE_VERIFICATION`, generate an IndexNow key and commit `public/<key>.txt`, then run `INDEXNOW_KEY=<key> node scripts/indexnow.cjs`.
3. GA4: exclude internal and GTM-preview traffic; mark only `form_submit` and `request_matched_options` as key events; add a custom channel group for AI referrals (`chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com`); register `intent` as a custom dimension if the form sends it.
4. Check whether the 5 form submissions were tests before treating them as conversions.

## Weekly routine
1. Search Console, last 7 days against the previous 7 (28 against 28 monthly), by query, then page, then intent cluster (property type, area, cost, process, buyer type, comparison, building). Record clicks, impressions, position, ranking-query count, Top 3 / 10 / 20.
2. GA4: Organic Search and AI-referral sessions, landing pages, `form_submit`.
3. Run `npm run audit:seo -- --gsc <pages.csv>` once Search Console has data and pages pass 90 days (about 2026-12-26 for the first pages). The low-value rule only nominates candidates.
4. Append anything shipped to `docs/seo-deployment-log.md` before analysing a change.
5. On an abnormal drop, follow the incident order in constitution section 18 before touching code.

## AI-visibility panel (manual until a tracking tool has capacity)
Run weekly in ChatGPT, Perplexity, Claude and Google AI results. Log in `docs/seo-audit/ai-visibility.csv`: `date,assistant,prompt,site_mentioned,site_cited,cited_urls,competitors_cited,notes`. Start with about 20 buyer questions drawn from the guides, for example:
- What should I check before buying a condo in Brickell?
- How do special assessments work for Miami condos?
- Brickell Key vs mainland Brickell for a condo buyer
- What financing issues affect condos in Miami for foreign buyers?
Do not edit pages to chase a single answer; record, then judge against constitution section 27.

## Crawler visibility
Count requests whose user agent matches `GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|PerplexityBot|Googlebot|bingbot` in the host's request logs or firewall data, and note `/llms.txt` and `/llms-full.txt` fetches. These are crawl signals, not ranking or citation signals.
