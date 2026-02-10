# SEO Ops

## Canonicalization guardrails

This repo uses Astro for the production site in `website/` and Cloudflare Pages for deployment.

To keep indexing stable and avoid legacy URL discovery:

1. **Host canonicalization must be enforced at Cloudflare**, not in `_redirects`.
   - Cloudflare Pages does not support domain-level redirects in `_redirects`.
   - Create a Cloudflare Redirect Rule (or Bulk Redirect) at the zone level:
     - **If hostname equals** `www.prls.co` (and `pearls.community` if desired)
     - **Then** 301 to `https://prls.co${uri}` (preserve path + query)
2. **Path canonicalization is minimal** (only where it avoids duplicate home/sitemap URLs):
   - `/index.html` -> `/` (avoid duplicate homepage)
   - `/sitemap.xml` -> `/sitemap-index.xml` (single sitemap entrypoint)
3. **Only one sitemap should be published and submitted**:
   - `https://prls.co/sitemap-index.xml` generated at build time by Astro's sitemap integration
4. **No legacy `.html` compatibility**:
   - Old `*.html` AIK URLs are considered removed. If an external site links to them, ask them to update
     the link to the canonical, extensionless URL.

## CI checks

The workflow in `.github/workflows/seo_checks.yml` enforces:
- No `.html` links inside `website/public` (excluding `_redirects`).
- No non-canonical host links (`https://www.prls.co/`) inside `website/public`.

If these checks fail, update the references to canonical URLs.
