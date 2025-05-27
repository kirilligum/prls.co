import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.prls.co', // Replace with your actual domain, e.g., https://www.prls.co
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [tailwind()],
  vite: {
    ssr: {
      external: [
        'async_hooks', 
        'fs', 
        'child_process', 
        /\.node$/, 
        '@boundaryml/baml-linux-x64-musl', 
        '@boundaryml/baml-linux-x64-gnu'
        // REMOVED '@boundaryml/baml' from external, let Vite try to bundle its JS parts
      ],
    }
  }
});
