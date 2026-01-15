# prls.co

This repo hosts multiple projects. The production website is the Astro app in `website/` and is deployed to Cloudflare Pages.

## Quick start (Astro site)

```sh
cd website
npm install
npm run dev
```

## Deploy (Cloudflare Pages)

Cloudflare Pages should be configured with:

- Root directory: `website`
- Build command: `npm ci && npm run build`
- Output directory: `dist`

The Astro config uses the Cloudflare adapter (server output). For `/index.html` requests, a redirect is defined in `website/public/_redirects`.

## Repo layout

- `website/` - Astro site (production)
- `website/src/pages/` - routes (e.g. `index.astro`, `[company_id]/`)
- `website/public/` - static assets and `_redirects`
- `website/public/prls_co/` - legacy static HTML files
- `remix/` - Remix app (not used for prls.co in production)
- `prls_co/` - legacy static HTML copies (not deployed by Astro)

## Common changes

- Update homepage: `website/src/pages/index.astro`
- Add a redirect: `website/public/_redirects`
- Add static asset: `website/public/`

## Troubleshooting

- `https://www.prls.co/index.html` should redirect to `/` via `website/public/_redirects`.
- If Pages returns 404, check the Pages root directory and build output settings.
