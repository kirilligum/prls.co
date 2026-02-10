import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical host (used for sitemap + absolute URL generation).
  // Keep this in sync with edge redirects and CI checks.
  site: 'https://prls.co',
  output: 'server',
  build: {
    // Prevent Astro from inlining linked CSS into <style> tags during prerender.
    // Inlined CSS was causing the Atmo theme to be embedded into other datasets.
    inlineStylesheets: 'never'
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },
    routes: {
      extend: {
        exclude: [
          { pattern: "/sitemap-index.xml" },
          { pattern: "/sitemap-0.xml" }
        ]
      }
    }
  }),

  integrations: [
    tailwind(),
    sitemap()
  ]
});
