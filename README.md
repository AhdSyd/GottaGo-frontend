# GottaGo!

A map of local deals. Mall websites scatter their promotions across dozens of
store pages. GottaGo! read those pages every week, validated each offer, removed
duplicates, and plotted the results on one map.

Built as an honors thesis project by a team of three. I was lead engineer and
built the system end to end in TypeScript — the AI extraction pipeline, the
REST API, and this interface. It reached 60+ users before being deprecated.

This repository is the frontend. The scraping and extraction pipeline lives in
[GottaGoBackend](https://github.com/AhdSyd/GottaGoBackend).

## This build is a demo

It ships a fixed sample dataset instead of live results. Promotions expire within
weeks, and a portfolio link that quietly shows a wrong price for a real business
is worse than one that shows invented stores. The stores, offers, and street
addresses in `src/data/demoDeals.ts` are fictional; coordinates sit in the
Phoenix metro so the map behaves like the real thing.

Everything else is the real interface — search, category filters, sorting, the
map, and the store detail view all run the production code paths.

Differences from the live build:

- No backend and no API calls. `dealsService` resolves from a local array.
- Leaflet with OpenStreetMap tiles instead of the Google Maps JS SDK, so there is
  no API key and no per-visit billing. "Get directions" links are plain URLs.
- No auth flow.

## Running it

```bash
npm install
npm run dev     # dev server
npm run build   # static output in dist/
npm run lint
```

The build is fully static and hosts free on Vercel, Netlify, Cloudflare Pages, or
GitHub Pages.

## Stack

React 18, TypeScript, Tailwind, Vite 7, React Router 7, Leaflet.

## Layout

```
src/
├── components/
│   ├── LandingPage.tsx    Case-study page
│   ├── AppInterface.tsx   Filtering, sorting, layout state
│   ├── DealsList.tsx      List, with DealItem
│   ├── DealsMap.tsx       Leaflet map and markers
│   └── StoreModal.tsx     Store detail
├── data/demoDeals.ts      The sample dataset
├── services/              Deal lookup, map deep links
└── types/
```

## License

MIT
