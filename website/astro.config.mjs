import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.prls.co',
  output: 'server',

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
