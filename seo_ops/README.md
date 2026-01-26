# SEO Ops

## Canonicalization guardrails

This repo uses Astro for the production site in `website/` and Cloudflare Pages for deployment.

To keep indexing stable and avoid legacy URL discovery:

1. **Host canonicalization must be enforced at Cloudflare**, not in `_redirects`.
   - Cloudflare Pages does not support domain-level redirects in `_redirects`.
   - Create a Cloudflare Redirect Rule (or Bulk Redirect) at the zone level:
     - **If hostname equals** `prls.co` (and `pearls.community` if desired)
     - **Then** 301 to `https://www.prls.co${uri}` (preserve path + query)
2. **Path canonicalization is enforced in `website/public/_redirects`**:
   - `/index.html` -> `/`
   - `/*/*.html` -> `/:splat`
   - `/*/*/` -> `/:splat`
   - `/*/1` -> `/:splat/`
3. **Only one sitemap should be published and submitted**:
   - `https://www.prls.co/sitemap-index.xml` generated at build time by Astro's sitemap integration

4. **Legacy .html URL compatibility**:
   - A Workers route (`prls-html-redirect`) handles `www.prls.co/*` and 301-redirects any `*.html` URL
     to the same path without `.html`. This preserves older links (e.g., `/company/1.html`) while keeping
     canonical URLs clean.
   - Do not publish per-company legacy `website/public/*/sitemap.xml`

## CI checks

The workflow in `.github/workflows/seo_checks.yml` enforces:
- No `.html` links inside `website/public` (excluding `_redirects`).
- No non-canonical host links (`https://prls.co/`) inside `website/public`.

If these checks fail, update the references to canonical URLs.
