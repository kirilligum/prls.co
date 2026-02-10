# Recheck GSC After Host Canonicalization (prls.co)

## Context

On 2026-02-10, canonical host was switched to `https://prls.co`:
- `www.prls.co/*` and `pearls.community/*` 301 redirect to `https://prls.co/*` (Cloudflare Worker `prls-host-redirect`)
- Astro `site` set to `https://prls.co` so sitemaps/canonicals use apex
- Legacy `.html` redirects removed (expect 404s for old links)
- GSC sitemap updated: submitted `https://prls.co/sitemap-index.xml` and removed `https://www.prls.co/sitemap-index.xml`

GSC reports will lag until Google re-crawls.

## What To Check

1. **Sitemaps**
- `https://prls.co/sitemap-index.xml` shows `Success`
- Discovered pages count > 0
- No submitted sitemap entries under `https://www.prls.co/*`

2. **URL inspection**
- `https://prls.co/` should become `PASS` (not "Page with redirect")
- `https://www.prls.co/` should become "Page with redirect" to `https://prls.co/`

3. **Indexing → Pages reasons**
- Expect “Page with redirect” bucket to move from old `prls.co/* -> www` to the inverse
- Expect `.html` URLs to remain as 404 until recrawl; count should trend down over time

4. **Links**
- Monitor top referrers for legacy `.html` URLs (notably atmo.ai)

