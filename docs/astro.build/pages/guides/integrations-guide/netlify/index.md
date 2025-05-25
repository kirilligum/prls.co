@astrojs/ netlify
=================

v6.3.4 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/netlify/) [npm](https://www.npmjs.com/package/@astrojs/netlify) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/netlify/CHANGELOG.md)

This adapter allows Astro to deploy your [on-demand rendered routes and features](/en/guides/on-demand-rendering/) to [Netlify](https://www.netlify.com/), including [server islands](/en/guides/server-islands/), [actions](/en/guides/actions/), and [sessions](/en/guides/sessions/).

If you’re using Astro as a static site builder, you only need this adapter if you are using additional Netlify services that require a server (e.g. [Netlify Image CDN](#netlify-image-cdn-support)). Otherwise, you do not need an adapter to deploy your static site.

Learn how to deploy your Astro site in our [Netlify deployment guide](/en/guides/deploy/netlify/).

Why Astro Netlify
-----------------

[Section titled Why Astro Netlify](#why-astro-netlify)

[Netlify](https://www.netlify.com/) is a deployment platform that allows you to host your site by connecting directly to your GitHub repository. This adapter enhances the Astro build process to prepare your project for deployment through Netlify.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Add the Netlify adapter to enable on-demand rendering in your Astro project with the `astro add` command. This will install `@astrojs/netlify` and make the appropriate changes to your `astro.config.mjs` file in one step.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3241)
*   [pnpm](#tab-panel-3242)
*   [Yarn](#tab-panel-3243)

Terminal window

    npx astro add netlify

Terminal window

    pnpm astro add netlify

Terminal window

    yarn astro add netlify

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Now, you can enable [on-demand rendering per page](/en/guides/on-demand-rendering/#enabling-on-demand-rendering), or set your build output configuration to `output: 'server'` to [server-render all your pages by default](/en/guides/on-demand-rendering/#server-mode).

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the Netlify adapter to your project’s dependencies using your preferred package manager:

*   [npm](#tab-panel-3244)
*   [pnpm](#tab-panel-3245)
*   [Yarn](#tab-panel-3246)

Terminal window

    npm install @astrojs/netlify

Terminal window

    pnpm add @astrojs/netlify

Terminal window

    yarn add @astrojs/netlify

Then, add the adapter to your `astro.config.*` file:

astro.config.mjs

     import { defineConfig } from 'astro/config'; import netlify from '@astrojs/netlify';
     export default defineConfig({    // ...    adapter: netlify(), });

Usage
-----

[Section titled Usage](#usage)

[Read the full deployment guide here.](/en/guides/deploy/netlify/)

Follow the instructions to [build your site locally](/en/guides/deploy/#building-your-site-locally). After building, you will have a `.netlify/` folder containing both [Netlify Functions](https://docs.netlify.com/functions/overview/) in the `.netlify/functions-internal/` folder and [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/) in the`.netlify/edge-functions/` folder.

To deploy your site, install the [Netlify CLI](https://docs.netlify.com/cli/get-started/) and run:

Terminal window

    netlify deploy

The [Netlify Blog post on Astro](https://www.netlify.com/blog/how-to-deploy-astro/) and the [Netlify Docs](https://docs.netlify.com/integrations/frameworks/astro/) provide more information on how to use this integration to deploy to Netlify.

### Running Astro middleware on Netlify Edge Functions

[Section titled Running Astro middleware on Netlify Edge Functions](#running-astro-middleware-on-netlify-edge-functions)

Any Astro middleware is applied to pre-rendered pages at build-time, and to on-demand-rendered pages at runtime.

To implement redirects, access control, or custom response headers for pre-rendered pages, run your middleware on Netlify Edge Functions by enabling the [`edgeMiddleware` option](/en/reference/adapter-reference/#edgemiddleware):

astro.config.mjs

    import { defineConfig } from 'astro/config';import netlify from '@astrojs/netlify';
    export default defineConfig({  // ...  adapter: netlify({    edgeMiddleware: true,  }),});

When `edgeMiddleware` is enabled, an edge function will execute your middleware code for all requests including static assets, prerendered pages, and on-demand rendered pages.

For on-demand rendered pages, the `context.locals` object is serialized using JSON and sent in a header for the serverless function, which performs the rendering. As a security measure, the serverless function will refuse to serve requests with a `403 Forbidden` response unless they come from the generated edge function.

### Accessing edge context from your site

[Section titled Accessing edge context from your site](#accessing-edge-context-from-your-site)

Netlify Edge Functions provide a [context object](https://docs.netlify.com/edge-functions/api/#netlify-specific-context-object) that includes metadata about the request such as a user’s IP, geolocation data, and cookies.

This can be accessed through the `Astro.locals.netlify.context` object:

    ---const {  geo: { city },} = Astro.locals.netlify.context;---
    <h1>Hello there, friendly visitor from {city}!</h1>

If you’re using TypeScript, you can get proper typings by updating `src/env.d.ts` to use `NetlifyLocals`:

src/env.d.ts

    type NetlifyLocals = import('@astrojs/netlify').NetlifyLocals
    declare namespace App {  interface Locals extends NetlifyLocals {    // ...  }}

This is not available on prerendered pages.

### Netlify Image CDN support

[Section titled Netlify Image CDN support](#netlify-image-cdn-support)

This adapter by default uses the [Netlify Image CDN](https://docs.netlify.com/image-cdn/overview/) to transform images on-the-fly without impacting build times. It’s implemented using an [Astro Image Service](/en/reference/image-service-reference/) under the hood.

To opt out of Netlify’s Image CDN remote image optimization, use the `imageCDN` option:

astro.config.mjs

    import { defineConfig } from 'astro/config';import netlify from '@astrojs/netlify';
    export default defineConfig({  // ...  adapter: netlify({    imageCDN: false,  }),});

If you are using images hosted on another domain, you must authorize the domain or URL patterns using the [`image.domains`](/en/reference/configuration-reference/#imagedomains) or [`image.remotePatterns`](/en/reference/configuration-reference/#imageremotepatterns) configuration options:

astro.config.mjs

    import { defineConfig } from 'astro/config';import netlify from '@astrojs/netlify';
    export default defineConfig({    // ...    adapter: netlify(),    image: {      domains: ['example.com'],    },});

For more information, see [the guide to authorizing remote images](/en/guides/images/#authorizing-remote-images). This is not required for images hosted on the same domain as your site.

### Static sites with the Netlify Adapter

[Section titled Static sites with the Netlify Adapter](#static-sites-with-the-netlify-adapter)

For static sites (`output: 'static'`) hosted on Netlify, you usually don’t need an adapter. However, some deployment features are only available through an adapter.

Static sites will need to install this adapter to use and configure Netlify’s [image service](#netlify-image-cdn-support).

If you use `redirects` configuration in your Astro config, the Netlify adapter can be used to translate this to the proper `_redirects` format.

astro.config.mjs

    import { defineConfig } from 'astro/config';import netlify from '@astrojs/netlify';
    export default defineConfig({  // ...  adapter: netlify(),  redirects: {    '/blog/old-post': '/blog/new-post',  },});

Once you run `astro build` there will be a `dist/_redirects` file. Netlify will use that to properly route pages in production.

Note

You can still include a `public/_redirects` file for manual redirects. Any redirects you specify in the redirects config are appended to the end of your own.

### Sessions

[Section titled Sessions](#sessions)

The Astro [Sessions API](/en/guides/sessions/) allows you to easily store user data between requests. This can be used for things like user data and preferences, shopping carts, and authentication credentials. Unlike cookie storage, there are no size limits on the data, and it can be restored on different devices.

Astro automatically configures [Netlify Blobs](https://docs.netlify.com/blobs/overview/) for session storage when using the Netlify adapter. If you would prefer to use a different session storage driver, you can specify it in your Astro config. See [the `session` configuration reference](/en/reference/configuration-reference/#sessiondriver) for more details.

### Caching Pages

[Section titled Caching Pages](#caching-pages)

On-demand rendered pages without any dynamic content can be cached to improve performance and lower resource usage. Enabling the `cacheOnDemandPages` option in the adapter will cache all server-rendered pages for up to one year:

astro.config.mjs

    export default defineConfig({  // ...  adapter: netlify({    cacheOnDemandPages: true,  }),});

This can be changed on a per-page basis by adding caching headers to your response:

pages/index.astro

    ---import Layout from '../components/Layout.astro';
    Astro.response.headers.set('CDN-Cache-Control', 'public, max-age=45, must-revalidate');---
    <Layout title="Astro on Netlify">  {new Date()}</Layout>

With [fine-grained cache control](https://www.netlify.com/blog/swr-and-fine-grained-cache-control/), Netlify supports standard caching headers like `CDN-Cache-Control` or `Vary`. Refer to the docs to learn about implementing e.g. time to live (TTL) or stale while revalidate (SWR) caching: [https://docs.netlify.com/platform/caching](https://docs.netlify.com/platform/caching)

### Including or excluding files from Netlify Functions

[Section titled Including or excluding files from Netlify Functions](#including-or-excluding-files-from-netlify-functions)

When deploying an Astro site with on-demand rendering to Netlify, the generated functions automatically trace and include server dependencies. However, you may need to customize which files are included in your Netlify Functions.

#### `includeFiles`

[Section titled includeFiles](#includefiles)

**Type:** `string[]`  
**Default:** `[]`  

**Added in:** `astro@5.3.0`

The `includeFiles` property allows you to explicitly specify additional files that should be bundled with your function. This is useful for files that aren’t automatically detected as dependencies, such as:

*   Data files loaded using `fs` operations
*   Configuration files
*   Template files

Provide an array of additional files to include with file paths relative to your project’s [`root`](/en/reference/configuration-reference/#root). Absolute paths may not work as expected.

astro.config.mjs

    import { defineConfig } from 'astro/config';import netlify from '@astrojs/netlify';
    export default defineConfig({  // ...  adapter: netlify({    includeFiles: ['./my-data.json'], // relative to `root`  }),});

#### `excludeFiles`

[Section titled excludeFiles](#excludefiles)

**Type:** `string[]`  
**Default:** `[]`  

**Added in:** `astro@5.3.0`

You can use the `excludeFiles` property to prevent specific files from being bundled that would otherwise be included. This is helpful for:

*   Reducing bundle size
*   Excluding large binaries
*   Preventing unwanted files from being deployed

Provide an array of specific files to exclude with file paths relative to your project’s [`root`](/en/reference/configuration-reference/#root). Absolute paths may not work as expected.

astro.config.mjs

    import { defineConfig } from 'astro/config';import netlify from '@astrojs/netlify';
    export default defineConfig({  // ...  adapter: netlify({    excludeFiles: ['./src/some_big_file.jpg'], // relative to `root`  }),});

#### Using glob patterns

[Section titled Using glob patterns](#using-glob-patterns)

Both `includeFiles` and `excludeFiles` support [glob patterns](/en/guides/imports/#glob-patterns) for matching multiple files:

astro.config.mjs

    import { defineConfig } from 'astro/config';import netlify from '@astrojs/netlify';
    export default defineConfig({  adapter: netlify({    includeFiles: [      './data/**/*.json'    ],    excludeFiles: [      './node_modules/package/**/*',      './src/**/*.test.js'    ]  }),});

Examples
--------

[Section titled Examples](#examples)

*   The [Astro Netlify Edge Starter](https://github.com/sarahetter/astro-netlify-edge-starter) provides an example and a guide in the README.
    
*   [Browse Astro Netlify projects on GitHub](https://github.com/search?q=path%3A**%2Fastro.config.mjs+%40astrojs%2Fnetlify&type=code) for more examples!
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/netlify.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Cloudflare](/en/guides/integrations-guide/cloudflare/) [Next  
Node](/en/guides/integrations-guide/node/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)