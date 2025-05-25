@astrojs/ vue
=============

v5.1.0 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/vue/) [npm](https://www.npmjs.com/package/@astrojs/vue) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/vue/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** enables rendering and client-side hydration for your [Vue 3](https://vuejs.org/) components.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

To install `@astrojs/vue`, run the following from your project directory and follow the prompts:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3313)
*   [pnpm](#tab-panel-3314)
*   [Yarn](#tab-panel-3315)

Terminal window

    npx astro add vue

Terminal window

    pnpm astro add vue

Terminal window

    yarn astro add vue

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/vue` package:

*   [npm](#tab-panel-3316)
*   [pnpm](#tab-panel-3317)
*   [Yarn](#tab-panel-3318)

Terminal window

    npm install @astrojs/vue

Terminal window

    pnpm add @astrojs/vue

Terminal window

    yarn add @astrojs/vue

Most package managers will install associated peer dependencies as well. If you see a `Cannot find package 'vue'` (or similar) warning when you start up Astro, you’ll need to install Vue:

*   [npm](#tab-panel-3319)
*   [pnpm](#tab-panel-3320)
*   [Yarn](#tab-panel-3321)

Terminal window

    npm install vue

Terminal window

    pnpm add vue

Terminal window

    yarn add vue

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import vue from '@astrojs/vue';
    export default defineConfig({  // ...  integrations: [vue()],});

Getting started
---------------

[Section titled Getting started](#getting-started)

To use your first Vue component in Astro, head to our [UI framework documentation](/en/guides/framework-components/#using-framework-components). You’ll explore:

*   📦 how framework components are loaded,
*   💧 client-side hydration options, and
*   🤝 opportunities to mix and nest frameworks together

Troubleshooting
---------------

[Section titled Troubleshooting](#troubleshooting)

For help, check out the `#support` channel on [Discord](https://astro.build/chat). Our friendly Support Squad members are here to help!

You can also check our [Astro Integration Documentation](/en/guides/integrations-guide/) for more on integrations.

Contributing
------------

[Section titled Contributing](#contributing)

This package is maintained by Astro’s Core team. You’re welcome to submit an issue or PR!

Options
-------

[Section titled Options](#options)

This integration is powered by `@vitejs/plugin-vue`. To customize the Vue compiler, options can be provided to the integration. See the `@vitejs/plugin-vue` [docs](https://www.npmjs.com/package/@vitejs/plugin-vue) for more details.

astro.config.mjs

    import { defineConfig } from 'astro/config';import vue from '@astrojs/vue';
    export default defineConfig({  // ...  integrations: [    vue({      template: {        compilerOptions: {          // treat any tag that starts with ion- as custom elements          isCustomElement: (tag) => tag.startsWith('ion-'),        },      },      // ...    }),  ],});

### appEntrypoint

[Section titled appEntrypoint](#appentrypoint)

You can extend the Vue `app` instance setting the `appEntrypoint` option to a root-relative import specifier (for example, `appEntrypoint: "/src/pages/_app"`).

The default export of this file should be a function that accepts a Vue `App` instance prior to rendering, allowing the use of [custom Vue plugins](https://vuejs.org/guide/reusability/plugins.html), `app.use`, and other customizations for advanced use cases.

astro.config.mjs

    import { defineConfig } from 'astro/config';import vue from '@astrojs/vue';
    export default defineConfig({  // ...  integrations: [vue({ appEntrypoint: '/src/pages/_app' })],});

src/pages/\_app.ts

    import type { App } from 'vue';import i18nPlugin from 'my-vue-i18n-plugin';
    export default (app: App) => {  app.use(i18nPlugin);};

### jsx

[Section titled jsx](#jsx)

You can use Vue JSX by setting `jsx: true`.

astro.config.mjs

    import { defineConfig } from 'astro/config';import vue from '@astrojs/vue';
    export default defineConfig({  // ...  integrations: [vue({ jsx: true })],});

This will enable rendering for both Vue and Vue JSX components. To customize the Vue JSX compiler, pass an options object instead of a boolean. See the `@vitejs/plugin-vue-jsx` [docs](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx) for more details.

astro.config.mjs

    import { defineConfig } from 'astro/config';import vue from '@astrojs/vue';
    export default defineConfig({  // ...  integrations: [    vue({      jsx: {        // treat any tag that starts with ion- as custom elements        isCustomElement: (tag) => tag.startsWith('ion-'),      },    }),  ],});

### devtools

[Section titled devtools](#devtools)

**Added in:** `@astrojs/vue@4.2.0`

You can enable [Vue DevTools](https://devtools-next.vuejs.org/) in development by passing an object with `devtools: true` to your `vue()` integration config:

astro.config.mjs

    import { defineConfig } from 'astro/config';import vue from '@astrojs/vue';
    export default defineConfig({  // ...  integrations: [vue({ devtools: true })],});

#### Customizing Vue DevTools

[Section titled Customizing Vue DevTools](#customizing-vue-devtools)

**Added in:** `@astrojs/vue@4.3.0`

For more customization, you can instead pass options that the [Vue DevTools Vite Plugin](https://devtools-next.vuejs.org/guide/vite-plugin#options) supports. (Note: `appendTo` is not supported.)

For example, you can set `launchEditor` to your preferred editor if you are not using Visual Studio Code:

astro.config.mjs

    import { defineConfig } from "astro/config";import vue from "@astrojs/vue";
    export default defineConfig({  // ...  integrations: [    vue({      devtools: { launchEditor: "webstorm" },    }),  ],});

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/vue.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Svelte](/en/guides/integrations-guide/svelte/) [Next  
Cloudflare](/en/guides/integrations-guide/cloudflare/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)