# AGENTS

This file is for LLM and automation agents working in this repo.

## Source of truth

The production website is the Astro project in `website/`.
The production Git branch is `website-live` (Cloudflare Pages is configured to deploy from this branch).
Playwright browser automation is available for GUI tasks (e.g., Search Console actions).

## How to run locally

```sh
cd website
npm install
npm run dev
```

## How to deploy

Cloudflare Pages (intended):

- Root directory: `website`
- Build command: `npm ci && npm run build`
- Output directory: `dist`

## Where to change things

- Routes/pages: `website/src/pages/`
- Homepage: `website/src/pages/index.astro`
- AIK dynamic pages: `website/src/pages/[company_id]/[page].astro`
- Redirects: `website/public/_redirects`
- Static assets: `website/public/`
- Legacy static HTML: `website/public/prls_co/`
- Task tracking: `tasks/` (see `tasks/README.md` for structure and usage)

## Known pitfalls

- `/index.html` is not a real file in Astro server output; it must be redirected to `/`.
- `prls_co/` at repo root is legacy and is not deployed by the Astro build.
- `remix/` is a separate app and is not used for prls.co unless explicitly configured.

## Astro best practices in this repo

- Use `Astro.site` for absolute URLs (canonical tags and link generation).
- Treat `website/public/*/*.json` as the content source for AIK pages.
