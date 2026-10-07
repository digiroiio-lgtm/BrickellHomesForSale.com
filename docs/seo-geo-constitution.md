# Google 2026 SEO + GEO + Spam-Safety Master Directive

Status: adopted 2026-10-07 as the standing quality and safety layer for all SEO, GEO, AI-search, content, landing-page, keyword-clustering, programmatic, multilingual, internal-linking, schema, sitemap, indexing, refresh, pruning and architecture work on this site. Site-specific rules live in `CLAUDE.md` and sit below this document.

Source: the project owner's directive (Turkish original), condensed into numbered rules without changing their meaning. Statements about Google's September 2026 Spam Update, the 1 October 2026 generative-AI content guidance update and the 24 September 2026 Search Console multimodal/generative-AI reporting are the owner's reports. They have not been independently verified here; re-check them against Google's own announcements before relying on them.

## Order of decisions (section 30)
USER VALUE → ORIGINALITY → EVIDENCE → INTENT DIFFERENTIATION → TRUST → TECHNICAL ACCESSIBILITY → SEO → GEO → SCALE. Scale comes last. Build a good system first, then scale it. If a page exists mainly to draw Google traffic, do not publish it.

## 1. Working principle
Do not default to Keyword → Page → Optimize → Publish. Use Search Intent → User Problem → Existing Coverage → Unique Value → Evidence → Best Resource → SEO/GEO → Publish. A keyword is not a reason for a new URL. For each new URL answer: what concrete reason does a user have for this as a separate page? No clear answer means no new URL; improve, merge or add a section to a strong existing page instead.

## 2. Scaled content abuse protection
High risk: many variations of one template; pages that differ only by city, district, treatment, property or building; keyword-swapped landing pages; AI-paraphrased duplicates; low information-gain programmatic pages; AI re-summaries of other sources; thin pages created because search volume exists; auto-generated blogs; auto-translated URL copies; several articles for one intent. AI use alone is not the problem. The problem is scale + redundancy + low originality + search-engine-first intent together.

## 3. Site-wide scale audit
Compute: indexable URLs; URLs per template; URLs created in the last 30/90 days; URLs with no impressions or clicks; near-duplicates; URLs sharing one intent; thin content; orphans; canonical conflicts; indexable URLs missing from the sitemap; sitemap URLs that are noindex; soft-404-like low-value pages. Scale is a risk signal, not proof of a violation. Do not classify a site as spam only because it has many URLs. Tool: `npm run audit:seo`.

## 4. Low-value page audit
Pages with 0 clicks and fewer than 10 impressions in 90 days enter a LOW-VALUE REVIEW QUEUE. They are never noindexed automatically. For each URL decide: KEEP (strategic and original), IMPROVE (valuable intent, weak content), MERGE (same or very close intent as another URL), 301 (a stronger canonical resource exists), NOINDEX (needed by users but no standalone search value), 404/410 (truly removed, no replacement), DELETE (unneeded). Write a report and ask for approval before any bulk action.

## 5. Information gain gate
New or substantially updated pages should carry at least two genuine original-value signals where possible: first-party data, real prices, real cases, real processes, anonymised real documents, expert opinion, original photos or video, real user experience, calculations, comparison tables, datasets, checklists, interactive tools, original analysis, proprietary methodology, local sources or data, official sources, dated verification. Never add artificial "unique elements" to fill a quota.

## 6. Local / district programmatic pages
Be careful with city → district → neighbourhood structures. Do not assume hundreds of look-alike district pages should all be indexable. Strengthen pages that deserve to exist with real local information: official municipal sources, real neighbourhoods, local prices and data, official statistics, local process differences, sourced figures. Remove numeric claims that cannot be verified. A district page that is only `[NAME]` plus the same template goes to MERGE/NOINDEX review; fold weak districts into a strong city hub as sections.

## 7. Content cannibalisation
Before creating a URL, check semantic intent overlap with every existing URL. Two phrasings of one intent get one authoritative resource. If four similar posts exist, do not keep all four by default; choose the strongest and evaluate merge + 301 for the rest. Compare real search intent, not just keyword similarity, before redirecting.

## 8. Programmatic SEO test
Before generating programmatic URLs ask: if the template variables are removed, are these pages still meaningfully different? If not, do not generate them. Never produce hundreds of URLs by changing one variable (city, district, treatment, building, price, language). Programmatic SEO is acceptable only when every page has real data + context + intent + utility.

## 9. Doorway page protection
Avoid URL clusters made for many similar queries that all funnel to the same commercial page or form. Each landing page must answer the user's query meaningfully on its own. A page must not exist only to send traffic to a conversion page.

## 10. Trust, authorship, editorial signals
For suitable editorial and YMYL content, show where possible: Author (a real person); Reviewer/Editor (a real expert where needed); Credentials; Published date; Last reviewed/updated (the real last check); Sources supporting claims; site-level About, Editorial Policy and Methodology pages. Do not show a meaningless default author such as "Organization". Model who truly takes responsibility for the content, accurately. Never invent authors or personas.

## 11. YMYL extra quality gate
Health, dental, finance and other YMYL pages get a higher standard. For each important claim: who says this, what evidence supports it, when was it verified, is expert review required. Do not state treatment outcomes, success rates, risks, costs or financial terms as fact without sources. Separate marketing copy from clinical or factual claims.

## 12. Multilingual SEO
Translation is not localisation. Per market, re-evaluate search intent, terminology, currency, regulation, financing options, user objections, travel logistics, local examples and SERP structure. Research → Localise → Add local value → Review → Optimise → Publish, never Translate → Publish.

## 13. Indexing API rule
Do not use the Google Indexing API to get ordinary web pages indexed. Google supports it for specific content types, notably real JobPosting pages (and livestream pages). Ordinary blog/guide/landing pages: do not use it. Real job listings that meet JobPosting rules: it may be used. Bing's IndexNow is evaluated separately and may continue (`scripts/indexnow.cjs`). Do not apply "Indexing API off globally" blindly.

## 14. JobPosting special rule
Check every job URL separately. JobPosting structured data belongs only on the specific page of one real job, never on list or search-result pages. The posting must be real and open, have a detailed description and an application method, correct `datePosted` and `validThrough`, a real `hiringOrganization`, the right location, and markup that matches the page. Stop presenting expired postings as active. (This site has no job pages.)

## 15. Sitemap hygiene
The sitemap contains only canonical URLs we want indexed. Remove noindex, redirected, duplicate, non-canonical, irrelevant-parameter and deleted URLs. Update `lastmod` only for meaningful content changes (here guarded by `scripts/content-revisions.cjs`).

## 16. SEO and GEO are not separate systems
Spam-safe, authoritative, original content is the base layer. For GEO also use: entity clarity, answerability, factual density, explicit relationships, structured headings, first-party evidence, source transparency, useful tables, strong original imagery, descriptive alt text and context, schema where appropriate. Original, meaningful imagery matters for multimodal discovery (per the owner's report that Search Console now reports multimodal performance).

## 17. llms.txt
Useful for other AI crawlers and agents. It is not a Google ranking factor and not a Google GEO ranking signal. Do not tie the SEO/GEO score to its presence.

## 18. Google update incident protocol
When Google traffic drops abnormally, diagnose before changing code. Order: (1) Google Search Status / confirmed updates; (2) Search Console: impressions, clicks, CTR, position, by query, page, country, device; (3) GA4: Google Organic, landing pages, sessions, conversions; (4) control channels: Bing, direct, referral; (5) technical: 200 responses, Googlebot access, robots.txt, meta robots, canonical, sitemap, server errors, firewall/CDN, rendering; (6) indexation: URL Inspection sample; (7) deployment timeline: what shipped before the drop.

## 19. Correlation is not causation
A drop with Bing rising, server returning 200, Googlebot allowed, sample URLs indexed, other sites unaffected and deploy timing not matching points toward a Google-side ranking reassessment. Still do not declare "the Spam Update definitely hit us". Classify it as a high-probability algorithmic reassessment candidate and keep collecting evidence.

## 20. No panic changes during a rollout
While a confirmed update is rolling out, avoid large site-wide changes: hundreds of noindex, hundreds of redirects, architecture changes, title rewrites, canonical overhauls, content deletion. Otherwise the update's effect cannot be separated from our own. Prepare the audit first.

## 21. 90-day low-value rule
90 days + 0 clicks + <10 impressions = LOW VALUE CANDIDATE, not automatic noindex. First check: page age, seasonality, commercial value, strategic topical coverage, long-tail conversions, backlinks, internal-link value, overlap with another URL, improvability. Then decide.

## 22. Content pruning safety
If an audit finds, for example, 514 potential noindex URLs, do not change all 514. Produce a CSV report (URL, clicks, impressions, age, intent, duplicate, recommended action), classify KEEP / IMPROVE / MERGE / 301 / NOINDEX / REMOVE, and apply no mass noindex, delete or 301 without human approval. Output of `npm run audit:seo` follows this shape.

## 23. False information cleanup
Verify numbers and local facts in programmatic content: rent assistance, prices, population, municipal support, health success rates, treatment cost, tax, finance eligibility, property fees. Never hallucinate them. No source: verify → qualify → remove.

## 24. Deployment log
Record every SEO deployment: DATE, URL/TEMPLATE, CHANGE, REASON, EXPECTED EFFECT, so a later change can be attributed to a Google update, a deployment, seasonality or a technical problem. See `docs/seo-deployment-log.md`.

## 25. Weekly monitoring
Review Search Console and GA4 weekly at Query → Page → Intent Cluster level, not only total traffic. Compare last 7 days with the previous 7, and last 28 with the previous 28 when needed. With a confirmed update also compare pre-update baseline, rollout and post-rollout. Record the pre-update baseline (for example impressions per day).

## 26. Recovery metrics
After an update look beyond "did traffic return": indexed valuable pages, impressions, ranking query count, Top 3 / Top 10 / Top 20, clicks, organic conversions, branded vs non-branded, long-tail visibility, crawling, and AI/generative and multimodal visibility where available.

## 27. Pre-publish quality gate
For every new URL check: INTENT (separate user need?), OVERLAP (already answered elsewhere?), ORIGINALITY (new information?), INFORMATION GAIN (beyond commodity content?), EVIDENCE (verifiable claims?), EXPERTISE (expert review needed?), AUTHORSHIP (is responsibility clear?), UTILITY (can the user decide better afterwards?), SEO (title, H1, canonical, internal links, indexability), GEO (entity, fact and answer structure), SPAM (scaled content, doorway, keyword stuffing, duplicate risk), PURPOSE (for users, or only to get Google traffic?). If the answer to PURPOSE is essentially "to capture a keyword/ranking": STOP, do not publish, propose a stronger alternative.

## 28. Agent authority limits
The agent may do on its own: audits, crawl analysis, GSC/GA4 analysis, duplicate detection, intent clustering, content gap analysis, factual verification, schema validation, internal-link suggestions, quality scoring and recommendation reports. The agent must ask for approval before: mass noindex, mass 301, bulk deletion, canonical architecture change, consolidating hundreds of URLs, major sitemap pruning, site-wide taxonomy change. These are hard to reverse.

## 29. Main optimisation goal
Do not measure success by URL count. Optimise Indexed Useful Pages / Total Indexed Pages, then Unique Search Intent Coverage / Indexed Pages. Do not delete a low performer merely to raise the metric. The aim is not a small site but a high signal-to-noise site.
