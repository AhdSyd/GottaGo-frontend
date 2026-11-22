# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people evaluating the team's work. This is now a portfolio piece, and it is built **recruiter-first**. A hiring manager or recruiter skimming for about 30 seconds should understand what GottaGo! was, who built it, and what it achieved. A technical reader (an engineer or interviewer) who keeps going should find a credible pipeline write-up and links to the source.

Original audience, kept as story context: college students in the Phoenix metro looking for real local deals near them.

## Product Purpose

GottaGo! was a team initiative to help college students find local deals. Mall websites scatter their promotions across dozens of store pages. GottaGo! read those pages on a schedule, extracted each offer, validated it, removed duplicates, and plotted the results on a map.

The product is retired. This build exists to present the story, the impact, and the engineering behind it. Success means a visitor leaves knowing what the team built, why it mattered to students, how far it got, and how it worked.

## Positioning

What GottaGo! did that others didn't: it kept the data clean. An AI extraction pipeline pulled offers from mall pages, every row passed a typed validation layer before it was stored, and a unique index removed duplicates. Do not mention model hallucinations in any copy. No neighboring deals aggregator can honestly claim this specific pipeline, or this team's story of scaling it across three cities.

## Operating Context

- Two surfaces: a case-study landing page at `/` and the interactive demo at `/app` (list, filters, sort, Leaflet map, store detail).
- **Current direction for the demo:** treat it as a showcase. For now, present **pictures of how the product ran and what it was meant to be, on both web and mobile**, rather than leaning on the interactive demo. Work on the interactive demo is deferred.
- Visitors come from portfolio links, résumés, and applications. Many will be on a phone.

## Capabilities and Constraints

- Stack in place: React 18, TypeScript, Tailwind, Vite 7, React Router 7, Leaflet with OpenStreetMap tiles. Static build deployed on Vercel.
- The demo build has no backend, no API calls, and no auth. `dealsService` resolves from the local array in `src/data/demoDeals.ts`.
- The live build used Google Maps; the demo uses Leaflet so it needs no API key and has no per-visit billing.
- Original backend: Node, Express, TypeScript; Supabase Postgres with unique-index dedup; Puppeteer rendering; two-stage GPT-4o-mini extraction plus rewrite; node-cron scheduling, weekly per mall. Source: https://github.com/AhdSyd/GottaGoBackend
- Undecided: the future scope of the interactive demo.

## Brand Commitments

- Name: **GottaGo!** (with the exclamation mark).
- **Team voice, not solo voice.** GottaGo! is presented as the work of a team of three, an honors thesis initiative. Copy uses "we" and never reads as one person's project.
- **Team roster (confirmed 2026-11-15):** credit the team as "a team of three" with three roles only: Lead Engineer (listed first), Growth & Operations, Growth & Operations. No names and no LinkedIn links anywhere on the site. Never word the roster in a way that diminishes the growth and operations roles.
- The tech stack can be mentioned, framed as part of the honors thesis.
- Plain, factual tone. No marketing hype and no inflated claims.

## Evidence on Hand

Confirmed facts, to be stated exactly and never inflated:
- Team of three; honors thesis project.
- Built to help college students find local deals.
- Scaled to **Scottsdale, Chandler, and Tempe**.
- Reached **60+ users** before it was retired.

Assets:
- A fictional demo dataset (`src/data/demoDeals.ts`) with coordinates around the Phoenix metro. The stores, offers, and addresses are invented and must stay labeled as sample data.
- The privacy policy and terms (`public/privacy-policy.html`, `public/terms-of-service.html`).

Absent, so it must not be fabricated:
- No screenshots of the live web or mobile product exist in the repo yet. The planned "pictures of how it ran" need real captures from the team, or clearly labeled renders of the demo build.
- No testimonials, user quotes, usage metrics beyond 60+ users, press coverage, or named partner malls.

## Product Principles

1. **Credit the team.** Every surface tells a team-of-three story.
2. **Exact facts only.** State what the product did and how far it got, nothing embellished. Do not describe it as filtering deals by whether they had a number; it found local deals, validated them, and removed duplicates.
3. **Skimmable first, deep on demand.** The recruiter gets the story and the impact at a glance. The engineer can dig into the pipeline and the source.
4. **Show it, don't just describe it.** Use real web and mobile views of the product, not abstractions about it.
5. **Never pass sample data off as live.** Fictional data is always labeled as such.
