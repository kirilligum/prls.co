# prls.co

This repository contains the `prls.co` website and the supporting content and operations tooling around it.

The production site is the Astro app in `website/`. Cloudflare Pages is intended to deploy from the `website-live` branch.

## Production Surface

- Marketing homepage: `/`
- AI Knowledge landing pages: `/<company_id>/`
- AI Knowledge paginated pages: `/<company_id>/<page>/`
- Canonical host: `https://prls.co`

The live site uses Astro server output with the Cloudflare adapter, plus prerendered dataset pages generated from JSON content in `website/public/*`.

## Quick Start

Run the production site locally:

```sh
cd website
npm install
npm run dev
```

Useful commands inside `website/`:

```sh
npm run dev
npm run build
npm run preview
npm run deploy
```

The repo root also has a minimal `package.json` used for local Google Search Console tooling. It is not the production app.

## Deployment

Cloudflare Pages should be configured with:

- Branch: `website-live`
- Root directory: `website`
- Build command: `npm ci && npm run build`
- Output directory: `dist`

Important deployment details:

- `website/astro.config.mjs` sets `site: https://prls.co` for canonical URLs and sitemap generation.
- `website/public/_redirects` handles path canonicalization such as `/index.html -> /`.
- `website/src/middleware.ts` contains hostname redirect logic for `pearls.community`.
- Host-level canonicalization such as `www.prls.co -> prls.co` should be enforced in Cloudflare rules, not only in `_redirects`.

## Content Model

AI Knowledge pages are generated from folders under `website/public/<company_id>/`.

Each dataset folder should contain:

- `company_info.json`
- `aik.json`
- optional `style.css`
- optional logos or other static assets

The loader in `website/src/utils/aikData.js` scans those folders and builds the dataset routes. Each `aik.json` file is paginated at 20 Q&A items per page:

- page 1: `/<company_id>/`
- page 2+: `/<company_id>/2/`, `/<company_id>/3/`, ...

There is no canonical `/<company_id>/1` page; redirects normalize that shape back to `/<company_id>/`.

## Repo Layout

- `website/`: production Astro site
- `website/src/pages/index.astro`: homepage
- `website/src/pages/[company_id]/index.astro`: AI Knowledge first page
- `website/src/pages/[company_id]/[page].astro`: AI Knowledge pagination
- `website/public/`: deployed static assets, redirects, robots, and dataset JSON
- `website/public/*/*.json`: source of truth for AI Knowledge content
- `tasks/`: lightweight task tracking using `backlog/`, `doing/`, `done/`, `blocked/`, `scheduled/`, and `periodic/`
- `seo_ops/`: SEO documentation, guardrails, and local GSC scripts
- `remix/`: separate Remix app prototype, not used for `prls.co` production unless explicitly configured
- `.github/workflows/seo_checks.yml`: CI checks for canonical links and legacy HTML references

Additional root-level folders such as `prls_co/`, `atmo_ai/`, `bennudata_com/`, `mytapscore_com/`, and `powerup-tech_com/` are legacy static artifacts or historical working directories. They are not the deployed source of truth for the Astro site.

## Common Changes

Update the homepage:

- `website/src/pages/index.astro`

Update shared layout or components:

- `website/src/layouts/`
- `website/src/components/`

Add or edit a company dataset:

1. Create or update `website/public/<company_id>/company_info.json`
2. Create or update `website/public/<company_id>/aik.json`
3. Optionally add `website/public/<company_id>/style.css`
4. Optionally add logos or supporting assets in the same folder

Update redirects:

- `website/public/_redirects`

## SEO and Operations

SEO and indexing support lives in `seo_ops/`.

Highlights:

- `seo_ops/scripts/inspect_gsc.fish`: inspect URLs via the GSC API
- `seo_ops/scripts/request_indexing.fish`: use browser automation for "Request indexing"
- `seo_ops/scripts/recheck_gsc.fish`: inspect and request indexing when needed
- `seo_ops/scripts/urls_priority.txt`: canonical URL list for recurring checks

Task tracking lives in `tasks/README.md` and the task folders under `tasks/`.

Playwright browser automation is available in this repo for GUI-only workflows such as Search Console actions.

## Legacy Files and Pitfalls

- `/index.html` is not a real Astro output file; it must redirect to `/`.
- `website/public/prls_co/` is deployed. The root-level `prls_co/` directory is not.
- Root-level `*.html`, `aik.json`, `aik_template.html`, and Python scripts are legacy or utility artifacts, not the production delivery path.
- `generate_aik_html.py` and `.github/workflows/generate_aik_html.yml` reflect an older static HTML workflow.

## CI Guardrails

The SEO workflow runs on `main` and `website-live` and checks:

- no legacy `.html` links under `website/public` except redirect rules
- no non-canonical `https://www.prls.co/` links under `website/public`

If those checks fail, update the offending references to canonical `https://prls.co/` extensionless URLs.
