@astrojs/ solid-js
==================

v5.1.0 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/solid/) [npm](https://www.npmjs.com/package/@astrojs/solid-js) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/solid/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** enables rendering and client-side hydration for your [SolidJS](https://www.solidjs.com/) components.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

To install `@astrojs/solid-js`, run the following from your project directory and follow the prompts:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3283)
*   [pnpm](#tab-panel-3284)
*   [Yarn](#tab-panel-3285)

Terminal window

    npx astro add solid

Terminal window

    pnpm astro add solid

Terminal window

    yarn astro add solid

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/solid-js` package:

*   [npm](#tab-panel-3286)
*   [pnpm](#tab-panel-3287)
*   [Yarn](#tab-panel-3288)

Terminal window

    npm install @astrojs/solid-js

Terminal window

    pnpm add @astrojs/solid-js

Terminal window

    yarn add @astrojs/solid-js

Most package managers will install associated peer dependencies as well. If you see a `Cannot find package 'solid-js'` (or similar) warning when you start up Astro, you’ll need to install SolidJS:

*   [npm](#tab-panel-3289)
*   [pnpm](#tab-panel-3290)
*   [Yarn](#tab-panel-3291)

Terminal window

    npm install solid-js

Terminal window

    pnpm add solid-js

Terminal window

    yarn add solid-js

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import solidJs from '@astrojs/solid-js';
    export default defineConfig({  // ...  integrations: [solidJs()],});

And add the following code to the `tsconfig.json` file.

tsconfig.json

    {  "extends": "astro/tsconfigs/strict",  "include": [".astro/types.d.ts", "**/*"],  "exclude": ["dist"],  "compilerOptions": {    "jsx": "preserve",    "jsxImportSource": "solid-js"  }}

Getting started
---------------

[Section titled Getting started](#getting-started)

To use your first SolidJS component in Astro, head to our [UI framework documentation](/en/guides/framework-components/#using-framework-components). You’ll explore:

*   📦 how framework components are loaded,
*   💧 client-side hydration options, and
*   🤝 opportunities to mix and nest frameworks together

Configuration
-------------

[Section titled Configuration](#configuration)

### devtools

[Section titled devtools](#devtools)

**Added in:** `@astrojs/solid-js@4.2.0`

You can enable [Solid DevTools](https://github.com/thetarnav/solid-devtools) in development by passing an object with `devtools: true` to your `solid()` integration config and adding `solid-devtools` to your project dependencies:

*   [npm](#tab-panel-3292)
*   [pnpm](#tab-panel-3293)
*   [Yarn](#tab-panel-3294)

Terminal window

    npm install solid-devtools

Terminal window

    pnpm add solid-devtools

Terminal window

    yarn add solid-devtools

astro.config.mjs

    import { defineConfig } from 'astro/config';import solid from '@astrojs/solid-js';
    export default defineConfig({  // ...  integrations: [solid({ devtools: true })],});

Options
-------

[Section titled Options](#options)

### Combining multiple JSX frameworks

[Section titled Combining multiple JSX frameworks](#combining-multiple-jsx-frameworks)

When you are using multiple JSX frameworks (React, Preact, Solid) in the same project, Astro needs to determine which JSX framework-specific transformations should be used for each of your components. If you have only added one JSX framework integration to your project, no extra configuration is needed.

Use the `include` (required) and `exclude` (optional) configuration options to specify which files belong to which framework. Provide an array of files and/or folders to `include` for each framework you are using. Wildcards may be used to include multiple file paths.

We recommend placing common framework components in the same folder (e.g. `/components/react/` and `/components/solid/`) to make specifying your includes easier, but this is not required:

astro.config.mjs

    import { defineConfig } from 'astro/config';import preact from '@astrojs/preact';import react from '@astrojs/react';import svelte from '@astrojs/svelte';import vue from '@astrojs/vue';import solid from '@astrojs/solid-js';
    export default defineConfig({  // Enable many frameworks to support all different kinds of components.  // No `include` is needed if you are only using a single JSX framework!  integrations: [    preact({      include: ['**/preact/*'],    }),    react({      include: ['**/react/*'],    }),    solid({      include: ['**/solid/*', '**/node_modules/@suid/material/**'],    }),  ],});

Usage
-----

[Section titled Usage](#usage)

Use a SolidJS component as you would any [UI framework component](/en/guides/framework-components/).

### Suspense Boundaries

[Section titled Suspense Boundaries](#suspense-boundaries)

In order to support Solid Resources and Lazy Components without excessive configuration, server-only and hydrating components are automatically wrapped in top-level Suspense boundaries and rendered on the server using the [`renderToStringAsync`](https://www.solidjs.com/docs/latest/api#rendertostringasync) function. Therefore, you do not need to add a top-level Suspense boundary around async components.

For example, you can use Solid’s [`createResource`](https://www.solidjs.com/docs/latest/api#createresource) to fetch async remote data on the server. The remote data will be included in the initial server-rendered HTML from Astro:

CharacterName.tsx

    function CharacterName() {  const [name] = createResource(() =>    fetch('https://swapi.dev/api/people/1')      .then((result) => result.json())      .then((data) => data.name)  );
      return (    <>      <h2>Name:</h2>      {/* Luke Skywalker */}      <div>{name()}</div>    </>  );}

Similarly, Solid’s [Lazy Components](https://www.solidjs.com/docs/latest/api#lazy) will also be resolved and their HTML will be included in the initial server-rendered page.

Non-hydrating [`client:only` components](/en/reference/directives-reference/#clientonly) are not automatically wrapped in Suspense boundaries.

Feel free to add additional Suspense boundaries according to your preference.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/solid-js.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
React](/en/guides/integrations-guide/react/) [Next  
Svelte](/en/guides/integrations-guide/svelte/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)