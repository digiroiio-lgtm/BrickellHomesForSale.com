# Building profile facts

The 23 building profiles are thin (2026-10-07 audit: median 97 page-specific words, 63% template text). They stay separate pages, one per building; no merging or redirects. Real information gain has to come from facts the official source states, never from padding.

## Status (2026-10-18)
The page template, data fields (`facts`, `factsChecked` in `src/lib/buildings.ts`) and schema (`Place.additionalProperty`) are ready. No facts have been added yet: the session's egress policy denied all 23 official source hosts (HTTP 403 on CONNECT), so nothing could be checked. Add facts only from the source page or from facts supplied and confirmed by the owner.

## Allowed facts
Neutral statements the official source makes explicitly: floors, residence count, architect, developer, completion year as stated, location phrase, named amenities. Write each as the source's claim, with the check date.

## Not allowed
Prices, availability, sales status, rental or pet rules, returns, fee amounts, marketing superlatives, anything inferred. If a source page is empty or script-only, that building gets no new facts and stays flagged IMPROVE in `npm run audit:seo`.

## Hosts to allow for fetching
swireproperties.com, relatedgroup.com, jdsdevelopment.com, cmcgroupmiami.com, fourseasons.com, unaresidences.com, miamisrr.com, mercedesbenzplaces.com, 1428brickell.com, 2200brickell.com, ciprianiresidencesmiami.com, viceroybrickellresidences.com, baccaratresidencesmiami.com.

## After adding facts
Set `facts` and `factsChecked` for the building, run `node scripts/content-revisions.cjs --snapshot --date=<real date>` (only changed buildings get a new date), rebuild, rerun `npm run audit:seo`, and log it in `docs/seo-deployment-log.md`.
