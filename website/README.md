# website

This is the production Astro site for `prls.co`.

The repo-level overview lives in the root [`README.md`](../README.md). This file focuses on the app in `website/`.

## Commands

Run all commands from `website/`:

```sh
npm install
npm run dev
npm run build
npm run preview
```

Available scripts:

- `npm run dev`: start Astro locally
- `npm run build`: build the Cloudflare-targeted production output
- `npm run preview`: build and run a local Pages preview with Wrangler
- `npm run deploy`: build and deploy with Wrangler Pages
- `npm run cf-typegen`: regenerate Cloudflare types

## Key Files

- `src/pages/index.astro`: homepage
- `src/pages/[company_id]/index.astro`: first AI Knowledge page for a company
- `src/pages/[company_id]/[page].astro`: paginated AI Knowledge pages
- `src/utils/aikData.js`: loads dataset content from `public/*`
- `src/middleware.ts`: hostname redirect logic
- `public/_redirects`: path canonicalization rules
- `astro.config.mjs`: Astro config, Cloudflare adapter, sitemap, canonical site URL
- `wrangler.toml`: Pages config for local preview and deploy

## Content Source

AI Knowledge content is loaded from folders under `public/<company_id>/`.

Each folder should contain:

- `company_info.json`
- `aik.json`
- optional `style.css`
- optional assets such as logos

The site paginates `aik.json` into groups of 20 entries:

- `/<company_id>/`
- `/<company_id>/2/`
- `/<company_id>/3/`

## Deployment Notes

Cloudflare Pages is intended to deploy this app from the `website-live` branch with:

- Root directory: `website`
- Build command: `npm ci && npm run build`
- Output directory: `dist`

Use `Astro.site` for absolute URLs and canonical tags. Do not treat `/index.html` as a real output file; redirect it to `/`.
