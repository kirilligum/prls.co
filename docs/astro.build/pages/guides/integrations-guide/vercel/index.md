@astrojs/ vercel
================

v8.1.4 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/vercel/) [npm](https://www.npmjs.com/package/@astrojs/vercel) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/vercel/CHANGELOG.md)

This adapter allows Astro to deploy your [on-demand rendered routes and features](/en/guides/on-demand-rendering/) to [Vercel](https://www.vercel.com/), including [server islands](/en/guides/server-islands/), [actions](/en/guides/actions/), and [sessions](/en/guides/sessions/).

If you’re using Astro as a static site builder, you only need this adapter if you are using additional Vercel services (e.g. [Vercel Web Analytics](https://vercel.com/docs/analytics), [Vercel Image Optimization](https://vercel.com/docs/image-optimization)). Otherwise, you do not need an adapter to deploy your static site.

Learn how to deploy your Astro site in our [Vercel deployment guide](/en/guides/deploy/vercel/).

Why Astro Vercel?
-----------------

[Section titled Why Astro Vercel?](#why-astro-vercel)

[Vercel](https://www.vercel.com/) is a deployment platform that allows you to host your site by connecting directly to your GitHub repository. This adapter enhances the Astro build process to prepare your project for deployment through Vercel.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Add the Vercel adapter to enable on-demand rendering in your Astro project with the following `astro add` command. This will install `@astrojs/vercel` and make the appropriate changes to your `astro.config.mjs` file in one step.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3304)
*   [pnpm](#tab-panel-3305)
*   [Yarn](#tab-panel-3306)

Terminal window

    npx astro add vercel

Terminal window

    pnpm astro add vercel

Terminal window

    yarn astro add vercel

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Now, you can enable [on-demand rendering per page](/en/guides/on-demand-rendering/#enabling-on-demand-rendering), or set your build output configuration to `output: 'server'` to [server-render all your pages by default](/en/guides/on-demand-rendering/#server-mode).

### Manual Install

[Section titled Manual Install](#manual-install)

First, add the `@astrojs/vercel` adapter to your project’s dependencies using your preferred package manager:

*   [npm](#tab-panel-3307)
*   [pnpm](#tab-panel-3308)
*   [Yarn](#tab-panel-3309)

Terminal window

    npm install @astrojs/vercel

Terminal window

    pnpm add @astrojs/vercel

Terminal window

    yarn add @astrojs/vercel

Then, add the adapter to your `astro.config.*` file:

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({  // ...  adapter: vercel(),});

Usage
-----

[Section titled Usage](#usage)

Find out more about [deploying your project to Vercel](/en/guides/deploy/vercel/).

You can deploy by CLI (`vercel deploy`) or by connecting your new repo in the [Vercel Dashboard](https://vercel.com/). Alternatively, you can create a production build locally:

Terminal window

    astro buildvercel deploy --prebuilt

Configuration
-------------

[Section titled Configuration](#configuration)

To configure this adapter, pass an object to the `vercel()` function call in `astro.config.mjs`:

### `webAnalytics`

[Section titled webAnalytics](#webanalytics)

**Type:** `VercelWebAnalyticsConfig`  
**Available for:** Serverless, Static  

**Added in:** `@astrojs/vercel@3.8.0`

With `@vercel/analytics@1.3.x` or earlier, you can set `webAnalytics: { enabled: true }` in your Astro config to inject Vercel’s tracking scripts into all of your pages.

For `@vercel/analytics@1.4.0` and later, use Vercel’s Analytics component to enable [Vercel Web Analytics](https://vercel.com/docs/concepts/analytics) instead.

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({  // ...  adapter: vercel({    webAnalytics: {      enabled: true,    },  }),});

### `imagesConfig`

[Section titled imagesConfig](#imagesconfig)

**Type:** `VercelImageConfig`  
**Available for:** Serverless, Static

**Added in:** `@astrojs/vercel@3.3.0`

Configuration options for [Vercel’s Image Optimization API](https://vercel.com/docs/concepts/image-optimization). See [Vercel’s image configuration documentation](https://vercel.com/docs/build-output-api/v3/configuration#images) for a complete list of supported parameters.

The `domains` and `remotePatterns` properties will automatically be filled using [the Astro corresponding `image` settings](/en/reference/configuration-reference/#image-options).

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({  // ...  output: 'static',  adapter: vercel({    imagesConfig: {      sizes: [320, 640, 1280],    },  }),});

### `imageService`

[Section titled imageService](#imageservice)

**Type:** `boolean`  
**Available for:** Serverless, Static

**Added in:** `@astrojs/vercel@3.3.0`

When enabled, an [Image Service](/en/reference/image-service-reference/) powered by the Vercel Image Optimization API will be automatically configured and used in production. In development, the image service specified by [`devImageService`](#devimageservice) will be used instead.

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({  // ...  output: 'static',  adapter: vercel({    imageService: true,  }),});

src/pages/index.astro

    ---import { Image } from 'astro:assets';import astroLogo from '../assets/logo.png';---
    <!-- This component --><Image src={astroLogo} alt="My super logo!" />
    <!-- will become the following HTML --><img  src="/_vercel/image?url=_astro/logo.hash.png&w=...&q=..."  alt="My super logo!"  loading="lazy"  decoding="async"  width="..."  height="..."/>

### `devImageService`

[Section titled devImageService](#devimageservice)

**Type:** `'sharp' | string`  
**Available for:** Serverless, Static

**Added in:** `@astrojs/vercel@3.8.0`

**Default**: `sharp`

Allows you to configure which image service to use in development when [imageService](#imageservice) is enabled. This can be useful if you cannot install Sharp’s dependencies on your development machine, but using another image service like Squoosh would allow you to preview images in your dev environment. Build is unaffected and will always use Vercel’s Image Optimization.

It can also be set to any arbitrary value in order to use a custom image service instead of Astro’s built-in ones.

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({  // ...  adapter: vercel({    imageService: true,    devImageService: 'sharp',  }),});

### `isr`

[Section titled isr](#isr)

**Type:** `boolean | VercelISRConfig`  
**Available for:** Serverless

**Added in:** `@astrojs/vercel@7.2.0`

**Default**: `false`

Allows your project to be deployed as an [ISR (Incremental Static Regeneration)](https://vercel.com/docs/incremental-static-regeneration) function, which caches your on-demand rendered pages in the same way as prerendered pages after first request.

To enable this feature, set `isr` to true in your Vercel adapter configuration in `astro.config.mjs`:

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({  // ...  adapter: vercel({    isr: true,  }),});

Note that ISR function requests do not include search params, similar to [requests](/en/reference/api-reference/#request) in static mode.

#### ISR cache invalidation

[Section titled ISR cache invalidation](#isr-cache-invalidation)

By default, an ISR function caches for the duration of your deployment. You can further control caching by setting an expiration time, or by excluding particular routes from caching entirely.

##### Time-based invalidation

[Section titled Time-based invalidation](#time-based-invalidation)

You can change the length of time to cache routes this by configuring an `expiration` value in seconds:

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({  // ...  adapter: vercel({    isr: {      // caches all pages on first request and saves for 1 day      expiration: 60 * 60 * 24,    },  }),});

##### Excluding paths from caching

[Section titled Excluding paths from caching](#excluding-paths-from-caching)

To implement Vercel’s [Draft mode](https://vercel.com/docs/build-output-api/v3/features#draft-mode), or [On-Demand Incremental Static Regeneration (ISR)](https://vercel.com/docs/build-output-api/v3/features#on-demand-incremental-static-regeneration-isr), you can create a bypass token and provide it to the `isr` config along with any routes to exclude from caching:

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({    adapter: vercel({        isr: {            // A secret random string that you create.            bypassToken: "005556d774a8",            // Paths that will always be served fresh.            exclude: [              '/preview',              '/auth/[page]',              /^\/api\/.+/ // Regular expressions supported since @astrojs/vercel@v8.1.0            ]        }    })})

### `includeFiles`

[Section titled includeFiles](#includefiles)

**Type:** `string[]`  
**Available for:** Serverless

Use this property to force files to be bundled with your function. This is helpful when you notice missing files.

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({  // ...  adapter: vercel({    includeFiles: ['./my-data.json'],  }),});

### `excludeFiles`

[Section titled excludeFiles](#excludefiles)

**Type:** `string[]`  
**Available for:** Serverless

Use this property to exclude any files from the bundling process that would otherwise be included.

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({  // ...  adapter: vercel({    excludeFiles: ['./src/some_big_file.jpg'],  }),});

### `maxDuration`

[Section titled maxDuration](#maxduration)

**Type:** `number`  
**Available for:** Serverless

Use this property to extend or limit the maximum duration (in seconds) that Serverless Functions can run before timing out. See the [Vercel documentation](https://vercel.com/docs/functions/serverless-functions/runtimes#maxduration) for the default and maximum limit for your account plan.

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({// ...  adapter: vercel({    maxDuration: 60  }),});

### `skewProtection`

[Section titled skewProtection](#skewprotection)

**Type:** `boolean`  
**Available for:** Serverless

**Added in:** `@astrojs/vercel@7.6.0`

Use this property to enable [Vercel Skew protection](https://vercel.com/docs/deployments/skew-protection) (available with Vercel Pro and Enterprise accounts).

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({// ...  adapter: vercel({    skewProtection: true  }),});

### Running Astro middleware on Vercel Edge Functions

[Section titled Running Astro middleware on Vercel Edge Functions](#running-astro-middleware-on-vercel-edge-functions)

The `@astrojs/vercel` adapter can create an [edge function](https://vercel.com/docs/functions/edge-functions) from an Astro middleware in your code base. When `edgeMiddleware` is enabled, an edge function will execute your middleware code for all requests including static assets, prerendered pages, and on-demand rendered pages.

For on-demand rendered pages, the `context.locals` object is serialized using JSON and sent in a header for the serverless function, which performs the rendering. As a security measure, the serverless function will refuse to serve requests with a `403 Forbidden` response unless they come from the generated edge function.

This is an opt-in feature. To enable it, set `edgeMiddleware` to `true`:

astro.config.mjs

    import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
    export default defineConfig({  // ...  adapter: vercel({    edgeMiddleware: true,  }),});

The edge middleware has access to Vercel’s [`RequestContext`](https://vercel.com/docs/functions/edge-middleware/middleware-api#requestcontext) as `ctx.locals.vercel.edge`. If you’re using TypeScript, you can get proper typings by updating `src/env.d.ts` to use `EdgeLocals`:

    type EdgeLocals = import('@astrojs/vercel').EdgeLocals
    declare namespace App {  interface Locals extends EdgeLocals {    // ...  }}

### Node.js Version Support

[Section titled Node.js Version Support](#nodejs-version-support)

The `@astrojs/vercel` adapter supports specific Node.js versions for deploying your Astro project on Vercel. To view the supported Node.js versions on Vercel, click on the settings tab for a project and scroll down to “Node.js Version” section.

Check out the [Vercel documentation](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js#default-and-available-versions) to learn more.

### Sessions

[Section titled Sessions](#sessions)

The Astro [Sessions API](/en/guides/sessions/) allows you to easily store user data between requests. This can be used for things like user data and preferences, shopping carts, and authentication credentials. Unlike cookie storage, there are no size limits on the data, and it can be restored on different devices.

When using sessions on Vercel, you need to [configure a driver](/en/reference/configuration-reference/#sessiondriver) for session storage. You can install a storage provider from [the Vercel marketplace](https://vercel.com/marketplace?category=storage).

For example, if you have installed [a Redis integration](https://vercel.com/marketplace?category=storage&search=redis) and linked a database to your site:

1.  Install the `ioredis` package:
    
    *   [npm](#tab-panel-3310)
    *   [pnpm](#tab-panel-3311)
    *   [Yarn](#tab-panel-3312)
    
    Terminal window
    
        npm install ioredis
    
    Terminal window
    
        pnpm install ioredis
    
    Terminal window
    
        yarn add ioredis
    
2.  Use [the Vercel CLI](https://vercel.com/docs/cli) to load your environment variables:
    
    Terminal window
    
        vercel env pull .env.local
    
    This will create a `.env.local` file in your project root with the environment variables needed to connect to your Redis database when developing locally.
    
3.  Configure the session driver:
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';import vercel from '@astrojs/vercel';
        export default defineConfig({  adapter: vercel(),  session: {    driver: 'redis',    options: {      url: process.env.REDIS_URL,    },  },});
    

More integrations
-----------------

### Front-end frameworks

*   ![](/logos/alpine-js.svg)
    
    ### [@astrojs/alpinejs](/en/guides/integrations-guide/alpinejs/)
    
*   ![](/logos/preact.svg)
    
    ### [@astrojs/preact](/en/guides/integrations-guide/preact/)
    
*   ![](/logos/react.svg)
    
    ### [@astrojs/react](/en/guides/integrations-guide/react/)
    
*   ![](/logos/solid.svg)
    
    ### [@astrojs/solid⁠-⁠js](/en/guides/integrations-guide/solid-js/)
    
*   ![](/logos/svelte.svg)
    
    ### [@astrojs/svelte](/en/guides/integrations-guide/svelte/)
    
*   ![](/logos/vue.svg)
    
    ### [@astrojs/vue](/en/guides/integrations-guide/vue/)
    

### Adapters

*   ![](/logos/cloudflare-pages.svg)
    
    ### [@astrojs/cloudflare](/en/guides/integrations-guide/cloudflare/)
    
*   ![](/logos/netlify.svg)
    
    ### [@astrojs/netlify](/en/guides/integrations-guide/netlify/)
    
*   ![](/logos/node.svg)
    
    ### [@astrojs/node](/en/guides/integrations-guide/node/)
    
*   ![](/logos/vercel.svg)
    
    ### [@astrojs/vercel](/en/guides/integrations-guide/vercel/)
    

### Other integrations

*   ![](/logos/db.svg)
    
    ### [@astrojs/db](/en/guides/integrations-guide/db/)
    
*   ![](/logos/markdoc.svg)
    
    ### [@astrojs/markdoc](/en/guides/integrations-guide/markdoc/)
    
*   ![](/logos/mdx.svg)
    
    ### [@astrojs/mdx](/en/guides/integrations-guide/mdx/)
    
*   ![](/logos/partytown.svg)
    
    ### [@astrojs/partytown](/en/guides/integrations-guide/partytown/)
    
*   ![](/logos/sitemap.svg)
    
    ### [@astrojs/sitemap](/en/guides/integrations-guide/sitemap/)
    

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/vercel.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Node](/en/guides/integrations-guide/node/) [Next  
DB](/en/guides/integrations-guide/db/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)