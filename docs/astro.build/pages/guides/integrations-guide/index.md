# Aggregated from ./pages/guides/integrations-guide/alpinejs
@astrojs/ alpinejs
==================

v0.4.8 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/alpinejs/) [npm](https://www.npmjs.com/package/@astrojs/alpinejs) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/alpinejs/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** adds [Alpine.js](https://alpinejs.dev/) to your project so that you can use Alpine.js anywhere on your page.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

To install `@astrojs/alpinejs`, run the following from your project directory and follow the prompts:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3185)
*   [pnpm](#tab-panel-3186)
*   [Yarn](#tab-panel-3187)

Terminal window

    npx astro add alpinejs

Terminal window

    pnpm astro add alpinejs

Terminal window

    yarn astro add alpinejs

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/alpinejs` package.

*   [npm](#tab-panel-3188)
*   [pnpm](#tab-panel-3189)
*   [Yarn](#tab-panel-3190)

Terminal window

    npm install @astrojs/alpinejs

Terminal window

    pnpm add @astrojs/alpinejs

Terminal window

    yarn add @astrojs/alpinejs

Most package managers will install associated peer dependencies as well. However, if you see a `Cannot find package 'alpinejs'` (or similar) warning when you start up Astro, you’ll need to manually install Alpine.js yourself:

*   [npm](#tab-panel-3191)
*   [pnpm](#tab-panel-3192)
*   [Yarn](#tab-panel-3193)

Terminal window

    npm install alpinejs @types/alpinejs

Terminal window

    pnpm add alpinejs @types/alpinejs

Terminal window

    yarn add alpinejs @types/alpinejs

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import alpinejs from '@astrojs/alpinejs';
    export default defineConfig({  // ...  integrations: [alpinejs()],});

Configuration Options
---------------------

[Section titled Configuration Options](#configuration-options)

### `entrypoint`

[Section titled entrypoint](#entrypoint)

You can extend Alpine by setting the `entrypoint` option to a root-relative import specifier (e.g. `entrypoint: "/src/entrypoint"`).

The default export of this file should be a function that accepts an Alpine instance prior to starting. This allows the use of custom directives, plugins and other customizations for advanced use cases.

astro.config.mjs

    import { defineConfig } from 'astro/config';import alpine from '@astrojs/alpinejs';
    export default defineConfig({  // ...  integrations: [alpine({ entrypoint: '/src/entrypoint' })],});

src/entrypoint.ts

    import type { Alpine } from 'alpinejs'import intersect from '@alpinejs/intersect'
    export default (Alpine: Alpine) => {    Alpine.plugin(intersect)}

Usage
-----

[Section titled Usage](#usage)

Once the integration is installed, you can use [Alpine.js](https://alpinejs.dev/) directives and syntax inside any Astro component. The Alpine.js script is automatically added and enabled on every page of your website so no client directives are needed. Add plugin scripts to the page `<head>`.

The following example adds [Alpine’s Collapse plugin](https://alpinejs.dev/plugins/collapse) to expand and collapse paragraph text:

src/pages/index.astro

    ------<html>  <head>    <!-- ... -->    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>  </head>  <body>    <!-- ... -->    <div x-data="{ expanded: false }">      <button @click="expanded = ! expanded">Toggle Content</button>
          <p id="foo" x-show="expanded" x-collapse>        Lorem ipsum      </p>    </div>  </body></html>

Intellisense for TypeScript
---------------------------

[Section titled Intellisense for TypeScript](#intellisense-for-typescript)

The `@astrojs/alpine` integration adds `Alpine` to the global window object. For IDE autocompletion, add the following to your `src/env.d.ts`:

src/env.d.ts

    interface Window {  Alpine: import('alpinejs').Alpine;}

Examples
--------

[Section titled Examples](#examples)

*   The [Astro Alpine.js example](https://github.com/withastro/astro/tree/main/examples/framework-alpine) shows how to use Alpine.js in an Astro project.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/alpinejs.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Integrations overview](/en/guides/integrations-guide/) [Next  
Preact](/en/guides/integrations-guide/preact/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/cloudflare
@astrojs/ cloudflare
====================

v12.5.3 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare/) [npm](https://www.npmjs.com/package/@astrojs/cloudflare) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare/CHANGELOG.md)

This adapter allows Astro to deploy your [on-demand rendered routes and features](/en/guides/on-demand-rendering/) to [Cloudflare](https://www.cloudflare.com/), including [server islands](/en/guides/server-islands/), [actions](/en/guides/actions/), and [sessions](/en/guides/sessions/).

If you’re using Astro as a static site builder, you don’t need an adapter.

Learn how to deploy your Astro site in our [Cloudflare deployment guide](/en/guides/deploy/cloudflare/).

Why Astro Cloudflare
--------------------

[Section titled Why Astro Cloudflare](#why-astro-cloudflare)

Cloudflare’s [Developer Platform](https://developers.cloudflare.com/) lets you develop full-stack applications with access to resources such as storage and AI, all deployed to a global edge network. This adapter builds your Astro project for deployment through Cloudflare.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Add the Cloudflare adapter to enable server-rendering in your Astro project with the `astro add` command. This will install `@astrojs/cloudflare` and make the appropriate changes to your `astro.config.mjs` file in one step.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3202)
*   [pnpm](#tab-panel-3203)
*   [Yarn](#tab-panel-3204)

Terminal window

    npx astro add cloudflare

Terminal window

    pnpm astro add cloudflare

Terminal window

    yarn astro add cloudflare

Now, you can enable [on-demand rendering per page](/en/guides/on-demand-rendering/#enabling-on-demand-rendering), or set your build output configuration to `output: 'server'` to [server-render all your pages by default](/en/guides/on-demand-rendering/#server-mode).

### Manual Install

[Section titled Manual Install](#manual-install)

First, add the `@astrojs/cloudflare` adapter to your project’s dependencies using your preferred package manager.

*   [npm](#tab-panel-3205)
*   [pnpm](#tab-panel-3206)
*   [Yarn](#tab-panel-3207)

Terminal window

    npm install @astrojs/cloudflare

Terminal window

    pnpm add @astrojs/cloudflare

Terminal window

    yarn add @astrojs/cloudflare

Then, add the adapter to your `astro.config.mjs` file:

astro.config.mjs

    import { defineConfig } from 'astro/config';import cloudflare from '@astrojs/cloudflare';
    export default defineConfig({  adapter: cloudflare(),});

Options
-------

[Section titled Options](#options)

The Cloudflare adapter accepts the following options:

### `cloudflareModules`

[Section titled cloudflareModules](#cloudflaremodules)

**Type:** `boolean`  
**Default:** `true`

Enables [imports of `.wasm`, `.bin`, and `.txt` modules](#cloudflare-module-imports).

This functionality is enabled by default. If you’d like to disable, set `cloudflareModules` to `false`.

### `imageService`

[Section titled imageService](#imageservice)

**Type:** `'passthrough' | 'cloudflare' | 'compile' | 'custom'`  
**Default:** `'compile'`

Determines which image service is used by the adapter. The adapter will default to `compile` mode when an incompatible image service is configured. Otherwise, it will use the globally configured image service:

*   **`cloudflare`:** Uses the [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing/) service.
*   **`passthrough`:** Uses the existing [`noop`](/en/guides/images/#configure-no-op-passthrough-service) service.
*   **`compile`:** Uses Astro’s default service (sharp), but only on pre-rendered routes at build time. For pages rendered on-demand, all `astro:assets` features are disabled.
*   **`custom`:** Always uses the image service configured in [Image Options](/en/reference/configuration-reference/#image-options). **This option will not check to see whether the configured image service works in Cloudflare’s `workerd` runtime.**

astro.config.mjs

    import { defineConfig } from "astro/config";import cloudflare from '@astrojs/cloudflare';
    export default defineConfig({  adapter: cloudflare({     imageService: 'cloudflare'  }),})

### `platformProxy`

[Section titled platformProxy](#platformproxy)

Determines whether and how the Cloudflare runtime is added to `astro dev`. It contains proxies to local `workerd` bindings and emulations of Cloudflare specific values, allowing the emulation of the runtime in the Node.js dev process. Read more about the [Cloudflare Runtime](#cloudflare-runtime).

Note

Proxies provided by this are a best effort emulation of the real production. Although they are designed to be as close as possible to the real thing, there might be a slight differences and inconsistencies between the two.

#### `platformProxy.enabled`

[Section titled platformProxy.enabled](#platformproxyenabled)

**Type:** `boolean`  
**Default:** `true`

Determines whether to enable the Cloudflare runtime in development mode.

#### `platformProxy.configPath`

[Section titled platformProxy.configPath](#platformproxyconfigpath)

**Type:** `string`  
**Default:** `undefined`

Defines the path to the Wrangler configuration file. If no value is set, it tracks `wrangler.toml`, `wrangler.json`, and `wrangler.jsonc` in the project root.

#### `platformProxy.environment`

[Section titled platformProxy.environment](#platformproxyenvironment)

**Type:** `string`  
**Default:** `undefined`

Sets the [Cloudflare environment](https://developers.cloudflare.com/workers/wrangler/environments/) to use. You must select an environment defined in the Wrangler configuration file, otherwise an error occurs.

#### `platformProxy.persist`

[Section titled platformProxy.persist](#platformproxypersist)

**Type:** `boolean | { path: string }`  
**Default:** `true`

Sets whether and where to save binding data locally to the file system.

*   If set to `true`, binding data is stored in `.wrangler/state/v3/`. It is the same as the default setting for wrangler.
*   If set to `false`, binding data is not stored in file system.
*   If set to `{ path: string }`, binding data is stored in the specified path.

Note

`wrangler`’s `--persist-to` option adds a sub directory called `v3` under the hood while the `@astrojs/cloudflare` `persist` property does not. For example, to reuse the same location as running `wrangler dev --persist-to ./my-directory`, you must specify: `persist: { path: "./my-directory/v3" }`.

The following configuration shows an example of enabling the Cloudflare runtime when running the development server, as well as using a `wrangler.json` config file. It also specifies a custom location for persisting data to the filesystem:

    import cloudflare from '@astrojs/cloudflare';import { defineConfig } from 'astro/config';
    export default defineConfig({  adapter: cloudflare({    platformProxy: {      enabled: true,      configPath: 'wrangler.json',      persist: {        path: './.cache/wrangler/v3'      },    },  }),});

### `routes.extend`

[Section titled routes.extend](#routesextend)

On Cloudflare Workers, this option is not applicable. Refer to [Routing on Cloudflare Workers](#routing-on-cloudflare-workers) for more information.

On Cloudflare Pages, this option allows you to add or exclude custom patterns (e.g. `/fonts/*`) to the generated `_routes.json` file that determines which routes are generated on-demand. This can be useful if you need to add route patterns which cannot be automatically generated, or exclude prerendered routes.

More information about the custom route patterns can be found in [Cloudflare’s routing docs](https://developers.cloudflare.com/pages/functions/routing/#functions-invocation-routes). Any routes specified are not automatically deduplicated and will be appended to the existing routes as is.

#### `routes.extend.include`

[Section titled routes.extend.include](#routesextendinclude)

**Type:** `{ pattern: string }[]`  
**Default:** `undefined`

Configures additional routes to be generated on demand by the Cloudflare adapter in the `routes.extend.include` array.

#### `routes.extend.exclude`

[Section titled routes.extend.exclude](#routesextendexclude)

**Type:** `{ pattern: string }[]`  
**Default:** `undefined`

Configures routes to be excluded from on-demand rendering in the `routes.extend.exclude` array. These routes will be prerendered and served statically instead, and will not invoke the server function. Additionally you can use this option to serve any static asset (e.g. images, fonts, css, js, html, txt, json, etc.) files directly without routing the request through the server function.

astro.config.mjs

    export default defineConfig({  adapter: cloudflare({    routes: {      extend: {        include: [{ pattern: '/static' }], // Route a prerended page to the server function for on-demand rendering        exclude: [{ pattern: '/pagefind/*' }], // Use Starlight's pagefind search, which is generated statically at build time      }    },  }),});

### `sessionKVBindingName`

[Section titled sessionKVBindingName](#sessionkvbindingname)

**Type:** `string`  
**Default:** `SESSION`

**Added in:** `astro@5.6.0`

The `sessionKVBindingName` option allows you to specify the name of the KV binding used for session storage. By default, this is set to `SESSION`, but you can change it to match your own KV binding name. See [Sessions](#sessions) for more information.

astro.config.mjs

    export default defineConfig({  adapter: cloudflare({    sessionKVBindingName: 'MY_SESSION_BINDING',  }),});

Cloudflare runtime
------------------

[Section titled Cloudflare runtime](#cloudflare-runtime)

### Usage

[Section titled Usage](#usage)

The Cloudflare runtime gives you access to environment variables and bindings to Cloudflare resources. The Cloudflare runtime uses bindings found in the `wrangler.toml`/`wrangler.json` configuration file.

You can access the bindings from `Astro.locals.runtime`:

src/pages/index.astro

    ---const { env } = Astro.locals.runtime;---

You can access the runtime from API endpoints through `context.locals`:

src/pages/api/someFile.js

    export function GET(context) {  const runtime = context.locals.runtime;
      return new Response('Some body');}

See the [list of all supported bindings](https://developers.cloudflare.com/workers/wrangler/api/#supported-bindings) in the Cloudflare documentation.

### Environment variables and secrets

[Section titled Environment variables and secrets](#environment-variables-and-secrets)

The Cloudflare runtime treats environment variables as a type of binding.

For example, you can define an [environment variable](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-wrangler) in `wrangler.json` as follows:

wrangler.json

    {  "vars" : {    "MY_VARIABLE": "test"  }}

Secrets are a special type of environment variable that allow you to attach encrypted text values to your Worker. They need to be defined differently to ensure they are not visible after you set them.

To define `secrets`, add them through the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) rather than in your Wrangler config file.

Terminal window

    npx wrangler secret put <KEY>

To set secrets for local development, you also need to add a `.dev.vars` file to the root of the Astro project:

.dev.vars

    DB_PASSWORD=myPassword

You can then access environment variables, including secrets, from the `env` object available from `Astro.locals.runtime`:

src/pages/index.astro

    ---const { env } = Astro.locals.runtime;const myVariable = env.MY_VARIABLE;const secret = env.DB_PASSWORD;---

Cloudflare environment variables and secrets are compatible with the [`astro:env` API](/en/guides/environment-variables/#type-safe-environment-variables).

### Typing

[Section titled Typing](#typing)

`wrangler` provides a `types` command to generate TypeScript types for the bindings. This allows you to type locals without the need to manually type them. Refer to the [Cloudflare documentation](https://developers.cloudflare.com/workers/wrangler/commands/#types) for more information.

Every time you change your configuration files (e.g. `wrangler.toml`, `.dev.vars`) you need to run `wrangler types`.

Note

You can create a pnpm script to run `wrangler types` automatically before other commands.

package.json

    {  "scripts": {    "dev": "wrangler types && astro dev",    "start": "wrangler types && astro dev",    "build": "wrangler types && astro check && astro build",    "preview": "wrangler types && astro preview",    "astro": "astro"  }}

You can type the `runtime` object using `Runtime`:

src/env.d.ts

    type Runtime = import('@astrojs/cloudflare').Runtime<Env>;
    declare namespace App {  interface Locals extends Runtime {    otherLocals: {      test: string;    };  }}

Cloudflare Platform
-------------------

[Section titled Cloudflare Platform](#cloudflare-platform)

### Headers

[Section titled Headers](#headers)

You can attach [custom headers](https://developers.cloudflare.com/pages/platform/headers/) to your responses by adding a `_headers` file in your Astro project’s `public/` folder. This file will be copied to your build output directory.

This is available on Cloudflare Workers and Pages.

### Assets

[Section titled Assets](#assets)

Assets built by Astro are all named with a hash and therefore can be given long cache headers. By default, Astro on Cloudflare will add such a header for these files.

### Redirects

[Section titled Redirects](#redirects)

You can declare [custom redirects](https://developers.cloudflare.com/pages/platform/redirects/) to redirect requests to a different URL. To do so, add a `_redirects` file in your Astro project’s `public/` folder. This file will be copied to your build output directory.

This is available on Cloudflare Workers and Pages.

### Routes

[Section titled Routes](#routes)

#### Routing on Cloudflare Workers

[Section titled Routing on Cloudflare Workers](#routing-on-cloudflare-workers)

Routing for static assets is based on the file structure in the build directory (e.g. `./dist`). If no match is found, this will fall back to the Worker for on-demand rendering. Read more about [static asset routing with Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/routing/).

Unlike [Cloudflare Pages](#routing-on-cloudflare-pages), with Workers, you do not need a `_routes.json` file.

Currently, the Cloudflare adapter always generates this file. To work around this, create a `.assetsignore` file in your `public/` folder, and add the following lines to it:

public/.assetsignore

    _worker.js_routes.json

#### Routing on Cloudflare Pages

[Section titled Routing on Cloudflare Pages](#routing-on-cloudflare-pages)

For Cloudflare Pages, [routing](https://developers.cloudflare.com/pages/platform/functions/routing/#functions-invocation-routes) uses a `_routes.json` file to determine which requests are routed to the server function and which are served as static assets. By default, a `_routes.json` file will be automatically generated for your project based on its files and configuration.

You can [specify additional routing patterns to follow](#routesextend) in your adapter config, or create your own custom `_routes.json` file to fully override the automatic generation.

Creating a custom `public/_routes.json` will override the automatic generation. See [Cloudflare’s documentation on creating a custom `_routes.json`](https://developers.cloudflare.com/pages/platform/functions/routing/#create-a-_routesjson-file) for more details.

Sessions
--------

[Section titled Sessions](#sessions)

The Astro [Sessions API](/en/guides/sessions/) allows you to easily store user data between requests. This can be used for things like user data and preferences, shopping carts, and authentication credentials. Unlike cookie storage, there are no size limits on the data, and it can be restored on different devices.

Astro automatically configures [Workers KV](https://developers.cloudflare.com/kv/) for session storage when using the Cloudflare adapter. Before using sessions, you need to create a KV namespace to store the data and configure a KV binding in your Wrangler config file. By default, Astro expects the KV binding to be named `SESSION`, but you can choose a different name if you prefer by setting the [`sessionKVBindingName`](#sessionkvbindingname) option in the adapter config.

1.  Create a KV namespace using the Wrangler CLI and make note of the ID of the new namespace:
    
    Terminal window
    
        npx wrangler kv namespace create "SESSION"
    
2.  Declare the KV namespace in your Wrangler config, setting the namespace ID to the one returned by the previous command:
    
    *   [wrangler.json](#tab-panel-3200)
    *   [wrangler.toml](#tab-panel-3201)
    
    wrangler.json
    
        {  "kv_namespaces": [    {      "binding": "SESSION",      "id": "<KV_NAMESPACE_ID>"    }  ]}
    
    wrangler.toml
    
        kv_namespaces = [  { binding = "SESSION", id = "<KV_NAMESPACE_ID>" }]
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
3.  You can then use sessions in your server code:
    
    src/components/CartButton.astro
    
        ---export const prerender = false;const cart = await Astro.session?.get('cart');---
        <a href="/checkout">🛒 {cart?.length ?? 0} items</a>
    

Note

Writes to Cloudflare KV are [eventually consistent](https://developers.cloudflare.com/kv/concepts/how-kv-works/#consistency) between regions. This means that changes are available immediately within the same region but may take up to 60 seconds to propagate globally. This won’t affect most users as they are unlikely to switch regions between requests, but it may be a consideration for some use cases, such as VPN users.

Cloudflare Module Imports
-------------------------

[Section titled Cloudflare Module Imports](#cloudflare-module-imports)

The Cloudflare `workerd` runtime supports imports of some [non-standard module types](https://developers.cloudflare.com/workers/wrangler/bundling/#including-non-javascript-modules). Most additional file types are also available in Astro:

*   `.wasm` or `.wasm?module`: exports a [`WebAssembly.Module`](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Module) that can then be instantiated
*   `.bin`: exports an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) of the raw binary contents of the file
*   `.txt`: exports a string of the file contents

All module types export a single default value. Modules can be imported both from server-side rendered pages, or from prerendered pages for static site generation.

The following is an example of importing a Wasm module that then responds to requests by adding the request’s number parameters together.

pages/add/\[a\]/\[b\].js

    // Import the WebAssembly moduleimport mod from '../util/add.wasm';
    // Instantiate first in order to use itconst addModule: any = new WebAssembly.Instance(mod);
    export async function GET(context) {  const a = Number.parseInt(context.params.a);  const b = Number.parseInt(context.params.b);  return new Response(`${addModule.exports.add(a, b)}`);}

While this example is trivial, Wasm can be used to accelerate computationally intensive operations which do not involve significant I/O such as embedding an image processing library, or embedding a small pre-indexed database for search over a read-only dataset.

Node.js compatibility
---------------------

[Section titled Node.js compatibility](#nodejs-compatibility)

Out of the box, Cloudflare does not support the Node.js runtime APIs. With some configuration, Cloudflare does support a subset of the Node.js runtime APIs. You can find supported Node.js runtime APIs in Cloudflare’s [documentation](https://developers.cloudflare.com/workers/runtime-apis/nodejs).

To use these APIs, your page or endpoint must be server-side rendered (not pre-rendered) and must use the `import {} from 'node:*'` import syntax.

pages/api/endpoint.js

    export const prerender = false;import { Buffer } from 'node:buffer';

You’ll also need to modify the `vite` configuration in your Astro config to allow for the `node:*` import syntax:

astro.config.mjs

    import {defineConfig} from "astro/config";import cloudflare from '@astrojs/cloudflare';
    export default defineConfig({  adapter: cloudflare({}),  vite: {    ssr: {      external: ['node:buffer'],    },  },})

Additionally, you’ll need to follow Cloudflare’s documentation on how to enable support. For detailed guidance, please refer to the [Cloudflare documentation on enabling Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).

Package Compatibility Implications

If a project imports a package into the server that uses the Node.js runtime APIs, this can cause issues when deploying to Cloudflare. This issue arises with package that do not use the `node:*` import syntax. It is recommended that you contact the authors of the package to determine if the package supports the above import syntax. If the package does not support this, you may need to use a different package.

Preview with Wrangler
---------------------

[Section titled Preview with Wrangler](#preview-with-wrangler)

To use [`wrangler`](https://developers.cloudflare.com/workers/wrangler/) to run your application locally, update the preview script.

For Workers:

package.json

    "preview": "wrangler dev ./dist"

For Pages:

package.json

    "preview": "wrangler pages dev ./dist"

Developing with [`wrangler`](https://developers.cloudflare.com/workers/wrangler/) gives you access to [Cloudflare bindings](https://developers.cloudflare.com/pages/platform/functions/bindings), [environment variables](https://developers.cloudflare.com/pages/platform/functions/bindings/#environment-variables), and the [cf object](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties). Getting hot reloading of the Astro dev server to work with Wrangler might require custom setup. See [community examples](https://github.com/withastro/roadmap/discussions/590).

### Meaningful error messages

[Section titled Meaningful error messages](#meaningful-error-messages)

Currently, errors during running your application in Wrangler are not very useful, due to the minification of your code. For better debugging, you can add `vite.build.minify = false` setting to your `astro.config.mjs`.

astro.config.mjs

    export default defineConfig({  adapter: cloudflare(),  vite: {    build: {      minify: false,    },  },});

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/cloudflare.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Vue](/en/guides/integrations-guide/vue/) [Next  
Netlify](/en/guides/integrations-guide/netlify/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/db
@astrojs/ db
============

v0.14.14 [GitHub](https://github.com/withastro/astro/tree/main/packages/db/) [npm](https://www.npmjs.com/package/@astrojs/db) [Changelog](https://github.com/withastro/astro/tree/main/packages/db/CHANGELOG.md)

Astro DB is a fully-managed SQL database designed for the Astro ecosystem: develop locally in Astro and deploy to any [libSQL-compatible database](/en/guides/astro-db/).

With Astro DB you have a powerful, local, type-safe tool to query and model content as a relational database.

See the [Astro DB guide](/en/guides/astro-db/) for full usage and examples.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-installation) instead.

Run one of the following commands in a new terminal window.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3194)
*   [pnpm](#tab-panel-3195)
*   [Yarn](#tab-panel-3196)

Terminal window

    npx astro add db

Terminal window

    pnpm astro add db

Terminal window

    yarn astro add db

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

#### Manual Installation

[Section titled Manual Installation](#manual-installation)

If you prefer to set things up from scratch yourself, skip `astro add` and follow these instructions to install Astro DB yourself.

##### 1\. Install the integration from npm via a package manager

[Section titled 1. Install the integration from npm via a package manager](#1-install-the-integration-from-npm-via-a-package-manager)

*   [npm](#tab-panel-3197)
*   [pnpm](#tab-panel-3198)
*   [Yarn](#tab-panel-3199)

Terminal window

    npm install @astrojs/db

Terminal window

    pnpm add @astrojs/db

Terminal window

    yarn add @astrojs/db

##### 2\. Add the integration to `astro.config.mjs`

[Section titled 2. Add the integration to astro.config.mjs](#2-add-the-integration-to-astroconfigmjs)

astro.config.mjs

    import { defineConfig } from 'astro/config';import db from '@astrojs/db';
    export default defineConfig({  integrations: [   db()  ]});

##### 3\. Configure your database

[Section titled 3. Configure your database](#3-configure-your-database)

Create a `db/config.ts` file at the root of your project. This is a special file that Astro will automatically load and use to configure your database tables.

db/config.ts

    import { defineDb } from 'astro:db';
    export default defineDb({  tables: {},})

Table configuration reference
-----------------------------

[Section titled Table configuration reference](#table-configuration-reference)

### `columns`

[Section titled columns](#columns)

Table columns are configured using the `columns` object:

    import { defineTable, column, NOW } from 'astro:db';
    const Comment = defineTable({  columns: {    id: column.number({ primaryKey: true }),    author: column.text(),    content: column.text({ optional: true }),    published: column.date({ default: NOW }),  },});

Columns are configured using the `column` utility. `column` supports the following types:

*   **`column.text(...)`** - store either plain or rich text content
*   **`column.number(...)`** - store integer and floating point values
*   **`column.boolean(...)`** - store true / false values
*   **`column.date(...)`** - store `Date` objects, parsed as ISO strings for data storage
*   **`column.json(...)`** - store arbitrary JSON blobs, parsed as stringified JSON for data storage

There are a few shared configuration values across all columns:

*   `primaryKey` - Set a `number` or `text` column as the unique identifier.
*   `optional` - Astro DB uses `NOT NULL` for all columns by default. Set `optional` to `true` to allow null values.
*   `default` - Set the default value for newly inserted entries. This accepts either a static value or a string of `sql` for generated values like timestamps.
*   `unique` - Mark a column as unique. This prevents duplicate values across entries in the table.
*   `references` - Reference a related table by column. This establishes a foreign key constraint, meaning each column value must have a matching value in the referenced table.

### `indexes`

[Section titled indexes](#indexes)

Table indexes are used to improve lookup speeds on a given column or combination of columns. The `indexes` property accepts an array of configuration objects specifying the columns to index:

db/config.ts

    import { defineTable, column } from 'astro:db';
    const Comment = defineTable({  columns: {    authorId: column.number(),    published: column.date(),    body: column.text(),  },  indexes: [    { on: ["authorId", "published"], unique: true },  ]});

This will generate a unique index on the `authorId` and `published` columns with the name `Comment_authorId_published_idx`.

The following configuration options are available for each index:

*   `on`: `string | string[]` - A single column or array of column names to index.
*   `unique`: `boolean` - Set to `true` to enforce unique values across the indexed columns.
*   `name`: `string` (optional) - A custom name for the unique index. This will override Astro’s generated name based on the table and column names being indexed (e.g. `Comment_authorId_published_idx`). Custom names are global, so ensure index names do not conflict between tables.

### `foreignKeys`

[Section titled foreignKeys](#foreignkeys)

Tip

`foreignKeys` is an advanced API for relating multiple table columns. If you only need to reference a single column, try using [the column `references` property.](#columns)

Foreign keys are used to establish a relationship between two tables. The `foreignKeys` property accepts an array of configuration objects that may relate one or more columns between tables:

db/config.ts

    import { defineTable, column } from 'astro:db';
    const Author = defineTable({  columns: {    firstName: column.text(),    lastName: column.text(),  },});
    const Comment = defineTable({  columns: {    authorFirstName: column.text(),    authorLastName: column.text(),    body: column.text(),  },  foreignKeys: [    {      columns: ["authorFirstName", "authorLastName"],      references: () => [Author.columns.firstName, Author.columns.lastName],    },  ],});

Each foreign key configuration object accepts the following properties:

*   `columns`: `string[]` - An array of column names to relate to the referenced table.
*   `references`: `() => Column[]` - A function that returns an array of columns from the referenced table.

Astro DB CLI reference
----------------------

[Section titled Astro DB CLI reference](#astro-db-cli-reference)

Astro DB includes a set of CLI commands to interact with your local and libSQL-compatible database.

These commands are called automatically when using a GitHub CI action, and can be called manually using the `astro db` CLI.

### `astro db push`

[Section titled astro db push](#astro-db-push)

**Flags:**

*   `--force-reset` Reset all production data if a breaking schema change is required.

Safely push database configuration changes to your project database. This will check for any risk of data loss and guide you on any recommended migration steps. If a breaking schema change must be made, use the `--force-reset` flag to reset all production data.

### `astro db verify`

[Section titled astro db verify](#astro-db-verify)

Check for any differences between your local and remote database configurations. This is automatically run by `astro db push`. `verify` will compare your local `db/config.ts` file with the remote database and warn if changes are detected.

### `astro db execute <file-path>`

[Section titled astro db execute &lt;file-path&gt;](#astro-db-execute-file-path)

**Flags:**

*   `--remote` Run against your libSQL-compatible database. Omit to run against your development server.

Execute a `.ts` or `.js` file to read or write to your database. This accepts a file path as an argument, and supports usage of the `astro:db` module to write type-safe queries. Use the `--remote` flag to run against your libSQL-compatible database, or omit the flag to run against your development server. See how to [seed development data](/en/guides/astro-db/#seed-your-database-for-development) for an example file.

### `astro db shell --query <sql-string>`

[Section titled astro db shell --query &lt;sql-string&gt;](#astro-db-shell---query-sql-string)

**Flags:**

*   `--query` Raw SQL query to execute.
*   `--remote` Run against your libSQL-compatible database. Omit to run against your development server.

Execute a raw SQL query against your database. Use the `--remote` flag to run against your libSQL-compatible database, or omit the flag to run against your development server.

Astro DB utility reference
--------------------------

[Section titled Astro DB utility reference](#astro-db-utility-reference)

### `isDbError()`

[Section titled isDbError()](#isdberror)

The `isDbError()` function checks if an error is a libSQL database exception. This may include a foreign key constraint error when using references, or missing fields when inserting data. You can combine `isDbError()` with a try / catch block to handle database errors in your application:

src/pages/api/comment/\[id\].ts

    import { db, Comment, isDbError } from 'astro:db';import type { APIRoute } from 'astro';
    export const POST: APIRoute = (ctx) => {  try {    await db.insert(Comment).values({      id: ctx.params.id,      content: 'Hello, world!'    });  } catch (e) {    if (isDbError(e)) {      return new Response(`Cannot insert comment with id ${id}\n\n${e.message}`, { status: 400 });    }    return new Response('An unexpected error occurred', { status: 500 });  }
      return new Response(null, { status: 201 });};

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/db.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Vercel](/en/guides/integrations-guide/vercel/) [Next  
Markdoc](/en/guides/integrations-guide/markdoc/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/deno
@deno/astro-adapter
===================

The Deno adapter allows Astro to deploy your SSR site to Deno targets including Deno Deploy.

The Deno adapter was previously maintained by Astro but now is maintained by Deno directly. Usage is now documented [in the Deno adapter repository](https://github.com/denoland/deno-astro-adapter).

If you are currently using this Astro adapter, you will need to migrate to the new Deno version or to [add another adapter](/en/guides/on-demand-rendering/) to continue using SSR in your project.

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/deno.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/lit
Lit
===

Deprecated

This Astro integration to enable on-demand rendering and client-side hydration for your [Lit](https://lit.dev/) custom elements was deprecated in Astro 5.0.

You can continue to use Lit for client components by adding a client-side script tag. For example:

    <script>  import "../components/MyTabs";</script>
    <my-tabs title="These are my tabs">...</my-tabs>

If you’re interested in maintaining a Lit integration yourself, you may wish to use the [last published version of `@astrojs/lit`](https://github.com/withastro/astro/tree/astro%404.13.0/packages/integrations/lit) as a starting point and upgrade the relevant packages.

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/lit.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/markdoc
@astrojs/ markdoc
=================

v0.15.0 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/markdoc/) [npm](https://www.npmjs.com/package/@astrojs/markdoc) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/markdoc/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** enables the usage of [Markdoc](https://markdoc.dev/) to create components, pages, and content collection entries.

Why Markdoc?
------------

[Section titled Why Markdoc?](#why-markdoc)

Markdoc allows you to enhance your Markdown with [Astro components](/en/basics/astro-components/). If you have existing content authored in Markdoc, this integration allows you to bring those files to your Astro project using content collections.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Run one of the following commands in a new terminal window.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3229)
*   [pnpm](#tab-panel-3230)
*   [Yarn](#tab-panel-3231)

Terminal window

    npx astro add markdoc

Terminal window

    pnpm astro add markdoc

Terminal window

    yarn astro add markdoc

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/markdoc` package:

*   [npm](#tab-panel-3232)
*   [pnpm](#tab-panel-3233)
*   [Yarn](#tab-panel-3234)

Terminal window

    npm install @astrojs/markdoc

Terminal window

    pnpm add @astrojs/markdoc

Terminal window

    yarn add @astrojs/markdoc

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import markdoc from '@astrojs/markdoc';export default defineConfig({  // ...  integrations: [markdoc()],});

### VS Code Editor Integration

[Section titled VS Code Editor Integration](#vs-code-editor-integration)

If you are using VS Code, there is an official [Markdoc language extension](https://marketplace.visualstudio.com/items?itemName=Stripe.markdoc-language-support) that includes syntax highlighting and autocomplete for configured tags. [See the language server on GitHub](https://github.com/markdoc/language-server.git) for more information.

To set up the extension, create a `markdoc.config.json` file in the project root with following content:

markdoc.config.json

    [  {    "id": "my-site",    "path": "src/content",    "schema": {      "path": "markdoc.config.mjs",      "type": "esm",      "property": "default",      "watch": true    }  }]

Set `markdoc.config.mjs` as your configuration file with the `schema` object, and define where your Markdoc files are stored using the `path` property. Since Markdoc is specific to content collections, you can use `src/content`.

Usage
-----

[Section titled Usage](#usage)

Markdoc files can only be used within content collections. Add entries to any content collection using the `.mdoc` extension:

*   Directorysrc/
    
    *   Directorycontent/
        
        *   Directorydocs/
            
            *   why-markdoc.mdoc
            *   quick-start.mdoc
            
        
    

Then, query your collection using the [Content Collection APIs](/en/guides/content-collections/#querying-collections):

src/pages/why-markdoc.astro

    ---import { getEntry, render } from 'astro:content';
    const entry = await getEntry('docs', 'why-markdoc');const { Content } = await render(entry);---
    <!--Access frontmatter properties with `data`--><h1>{entry.data.title}</h1><!--Render Markdoc contents with the Content component--><Content />

See the [Astro Content Collection docs](/en/guides/content-collections/) for more information.

Pass Markdoc variables
----------------------

[Section titled Pass Markdoc variables](#pass-markdoc-variables)

You may need to pass [variables](https://markdoc.dev/docs/variables) to your content. This is useful when passing SSR parameters like A/B tests.

Variables can be passed as props via the `Content` component:

src/pages/why-markdoc.astro

    ---import { getEntry, render } from 'astro:content';
    const entry = await getEntry('docs', 'why-markdoc');const { Content } = await render(entry);---
    <!--Pass the `abTest` param as a variable--><Content abTestGroup={Astro.params.abTestGroup} />

Now, `abTestGroup` is available as a variable in `docs/why-markdoc.mdoc`:

src/content/docs/why-markdoc.mdoc

    {% if $abTestGroup === 'image-optimization-lover' %}
    Let me tell you about image optimization...
    {% /if %}

To make a variable global to all Markdoc files, you can use the `variables` attribute from your `markdoc.config.mjs|ts`:

markdoc.config.mjs

    import { defineMarkdocConfig } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  variables: {    environment: process.env.IS_PROD ? 'prod' : 'dev',  },});

### Access frontmatter from your Markdoc content

[Section titled Access frontmatter from your Markdoc content](#access-frontmatter-from-your-markdoc-content)

To access frontmatter, you can pass the entry `data` property as a variable where you render your content:

src/pages/why-markdoc.astro

    ---import { getEntry, render } from 'astro:content';
    const entry = await getEntry('docs', 'why-markdoc');const { Content } = await render(entry);---
    <Content frontmatter={entry.data} />

This can now be accessed as `$frontmatter` in your Markdoc.

Render components
-----------------

[Section titled Render components](#render-components)

`@astrojs/markdoc` offers configuration options to use all of Markdoc’s features and connect UI components to your content.

### Use Astro components as Markdoc tags

[Section titled Use Astro components as Markdoc tags](#use-astro-components-as-markdoc-tags)

You can configure [Markdoc tags](https://markdoc.dev/docs/tags) that map to `.astro` components. You can add a new tag by creating a `markdoc.config.mjs|ts` file at the root of your project and configuring the `tag` attribute.

This example renders an `Aside` component, and allows a `type` prop to be passed as a string:

markdoc.config.mjs

    import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  tags: {    aside: {      render: component('./src/components/Aside.astro'),      attributes: {        // Markdoc requires type defs for each attribute.        // These should mirror the `Props` type of the component        // you are rendering.        // See Markdoc's documentation on defining attributes        // https://markdoc.dev/docs/attributes#defining-attributes        type: { type: String },      },    },  },});

This component can now be used in your Markdoc files with the `{% aside %}` tag. Children will be passed to your component’s default slot:

    # Welcome to Markdoc 👋
    {% aside type="tip" %}
    Use tags like this fancy "aside" to add some _flair_ to your docs.
    {% /aside %}

### Use client-side UI components

[Section titled Use client-side UI components](#use-client-side-ui-components)

Tags and nodes are restricted to `.astro` files. To embed client-side UI components in Markdoc, [use a wrapper `.astro` component that renders a framework component](/en/guides/framework-components/#nesting-framework-components) with your desired `client:` directive.

This example wraps a React `Aside.tsx` component with a `ClientAside.astro` component:

src/components/ClientAside.astro

    ---import Aside from './Aside';---
    <Aside {...Astro.props} client:load />

This Astro component can now be passed to the `render` prop for any [tag](https://markdoc.dev/docs/tags) or [node](https://markdoc.dev/docs/nodes) in your config:

markdoc.config.mjs

    import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  tags: {    aside: {      render: component('./src/components/ClientAside.astro'),      attributes: {        type: { type: String },      },    },  },});

### Use Astro components from npm packages and TypeScript files

[Section titled Use Astro components from npm packages and TypeScript files](#use-astro-components-from-npm-packages-and-typescript-files)

You may need to use Astro components exposed as named exports from TypeScript or JavaScript files. This is common when using npm packages and design systems.

You can pass the import name as the second argument to the `component()` function:

markdoc.config.mjs

    import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  tags: {    tabs: {      render: component('@astrojs/starlight/components', 'Tabs'),    },  },});

This generates the following import statement internally:

    import { Tabs } from '@astrojs/starlight/components';

Markdoc Partials
----------------

[Section titled Markdoc Partials](#markdoc-partials)

The `{% partial /%}` tag allows you to render other `.mdoc` files inside your Markdoc content.

This is useful for reusing content across multiple documents, and allows you to have `.mdoc` content files that do not follow your collection schema.

Tip

Use an underscore `_` prefix for partial files or directories. This excludes partials from content collection queries.

This example shows a Markdoc partial for a footer to be used inside blog collection entries:

src/content/blog/\_footer.mdoc

    Social links:
    - [Twitter / X](https://twitter.com/astrodotbuild)- [Discord](https://astro.build/chat)- [GitHub](https://github.com/withastro/astro)

Use the `{% partial /%}` tag with to render the footer at the bottom of a blog post entry. Apply the `file` attribute with the path to the file, using either a relative path or an import alias:

src/content/blog/post.mdoc

    # My Blog Post
    {% partial file="./_footer.mdoc" /%}

Syntax highlighting
-------------------

[Section titled Syntax highlighting](#syntax-highlighting)

`@astrojs/markdoc` provides [Shiki](https://shiki.style) and [Prism](https://github.com/PrismJS) extensions to highlight your code blocks.

### Shiki

[Section titled Shiki](#shiki)

Apply the `shiki()` extension to your Markdoc config using the `extends` property. You can optionally pass a shiki configuration object:

markdoc.config.mjs

    import { defineMarkdocConfig } from '@astrojs/markdoc/config';import shiki from '@astrojs/markdoc/shiki';
    export default defineMarkdocConfig({  extends: [    shiki({      // Choose from Shiki's built-in themes (or add your own)      // Default: 'github-dark'      // https://shiki.style/themes      theme: 'dracula',      // Enable word wrap to prevent horizontal scrolling      // Default: false      wrap: true,      // Pass custom languages      // Note: Shiki has countless langs built-in, including `.astro`!      // https://shiki.style/languages      langs: [],    }),  ],});

### Prism

[Section titled Prism](#prism)

Apply the `prism()` extension to your Markdoc config using the `extends` property.

markdoc.config.mjs

    import { defineMarkdocConfig } from '@astrojs/markdoc/config';import prism from '@astrojs/markdoc/prism';
    export default defineMarkdocConfig({  extends: [prism()],});

To learn about configuring Prism stylesheets, [see our syntax highlighting guide](/en/guides/syntax-highlighting/#add-a-prism-stylesheet).

Custom Markdoc nodes / elements
-------------------------------

[Section titled Custom Markdoc nodes / elements](#custom-markdoc-nodes--elements)

You may want to render standard Markdown elements, such as paragraphs and bolded text, as Astro components. For this, you can configure a [Markdoc node](https://markdoc.dev/docs/nodes). If a given node receives attributes, they will be available as component props.

This example renders blockquotes with a custom `Quote.astro` component:

markdoc.config.mjs

    import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  nodes: {    blockquote: {      ...nodes.blockquote, // Apply Markdoc's defaults for other options      render: component('./src/components/Quote.astro'),    },  },});

See the [Markdoc nodes documentation](https://markdoc.dev/docs/nodes#built-in-nodes) to learn about all the built-in nodes and attributes.

### Custom headings

[Section titled Custom headings](#custom-headings)

`@astrojs/markdoc` automatically adds anchor links to your headings, and [generates a list of `headings` via the content collections API](/en/guides/content-collections/#rendering-body-content). To further customize how headings are rendered, you can apply an Astro component [as a Markdoc node](https://markdoc.dev/docs/nodes).

This example renders a `Heading.astro` component using the `render` property:

markdoc.config.mjs

    import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  nodes: {    heading: {      ...nodes.heading, // Preserve default anchor link generation      render: component('./src/components/Heading.astro'),    },  },});

All Markdown headings will render the `Heading.astro` component and pass the following `attributes` as component props:

*   `level: number` The heading level 1 - 6
*   `id: string` An `id` generated from the heading’s text contents. This corresponds to the `slug` generated by the [content `render()` function](/en/guides/content-collections/#rendering-body-content).

For example, the heading `### Level 3 heading!` will pass `level: 3` and `id: 'level-3-heading'` as component props.

### Custom image components

[Section titled Custom image components](#custom-image-components)

Astro’s `<Image />` component cannot be used directly in Markdoc. However, you can configure an Astro component to override the default image node every time the native `![]()` image syntax is used, or as a custom Markdoc tag to allow you to specify additional image attributes.

#### Override Markdoc’s default image node

[Section titled Override Markdoc’s default image node](#override-markdocs-default-image-node)

To override the default image node, you can configure an `.astro` component to be rendered in place of a standard `<img>`.

1.  Build a custom `MarkdocImage.astro` component to pass the required `src` and `alt` properties from your image to the `<Image />` component:
    
    src/components/MarkdocImage.astro
    
        ---import { Image } from "astro:assets";interface Props {  src: ImageMetadata;  alt: string;}const { src, alt } = Astro.props;---<Image src={src} alt={alt} />
    
2.  The `<Image />` component requires a `width` and `height` for remote images which cannot be provided using the `![]()` syntax. To avoid errors when using remote images, update your component to render a standard HTML `<img>` tag when a remote URL `src` is found:
    
    src/components/MarkdocImage.astro
    
        ---import { Image } from "astro:assets";interface Props {  src: ImageMetadata | string;  alt: string;}const { src, alt } = Astro.props;---<Image src={src} alt={alt} />{  typeof src === 'string' ? <img src={src} alt={alt} /> : <Image src={src} alt={alt} />}
    
3.  Configure Markdoc to override the default image node and render `MarkdocImage.astro`:
    
    markdoc.config.mjs
    
        import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
        export default defineMarkdocConfig({  nodes: {    image: {      ...nodes.image, // Apply Markdoc's defaults for other options      render: component('./src/components/MarkdocImage.astro'),    },  },});
    
4.  The native image syntax in any `.mdoc` file will now use the `<Image />` component to optimize your local images. Remote images may still be used, but will not be rendered by Astro’s `<Image />` component.
    
    src/content/blog/post.mdoc
    
        <!-- Optimized by <Image /> -->![A picture of a cat](/cat.jpg)
        <!-- Unoptimized <img> -->![A picture of a dog](https://example.com/dog.jpg)
    

#### Create a custom Markdoc image tag

[Section titled Create a custom Markdoc image tag](#create-a-custom-markdoc-image-tag)

A Markdoc `image` tag allows you to set additional attributes on your image that are not possible with the `![]()` syntax. For example, custom image tags allow you to use Astro’s `<Image />` component for remote images that require a `width` and `height`.

The following steps will create a custom Markdoc image tag to display a `<figure>` element with a caption, using the Astro `<Image />` component to optimize the image.

1.  Create a `MarkdocFigure.astro` component to receive the necessary props and render an image with a caption:
    
    src/components/MarkdocFigure.astro
    
        ---// src/components/MarkdocFigure.astroimport { Image } from "astro:assets";
        interface Props {  src: ImageMetadata | string;  alt: string;  width: number;  height: number;  caption: string;}
        const { src, alt, width, height, caption } = Astro.props;---<figure>    <Image {src} {alt} {width} {height}  />    {caption && <figcaption>{caption}</figcaption>}</figure>
    
2.  Configure your custom image tag to render your Astro component:
    
    markdoc.config.mjs
    
        import { component, defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';
        export default defineMarkdocConfig({  tags: {    image: {      attributes: {        width: {          type: String,        },        height: {          type: String,        },        caption: {          type: String,        },        ...nodes.image.attributes      },      render: component('./src/components/MarkdocFigure.astro'),    },  },});
    
3.  Use the `image` tag in Markdoc files to display a figure with caption, providing all the necessary attributes for your component:
    
        {% image src="./astro-logo.png" alt="Astro Logo" width="100" height="100" caption="a caption!" /%}
    

Advanced Markdoc configuration
------------------------------

[Section titled Advanced Markdoc configuration](#advanced-markdoc-configuration)

The `markdoc.config.mjs|ts` file accepts [all Markdoc configuration options](https://markdoc.dev/docs/config), including [tags](https://markdoc.dev/docs/tags) and [functions](https://markdoc.dev/docs/functions).

You can pass these options from the default export in your `markdoc.config.mjs|ts` file:

markdoc.config.mjs

    import { defineMarkdocConfig } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  functions: {    getCountryEmoji: {      transform(parameters) {        const [country] = Object.values(parameters);        const countryToEmojiMap = {          japan: '🇯🇵',          spain: '🇪🇸',          france: '🇫🇷',        };        return countryToEmojiMap[country] ?? '🏳';      },    },  },});

Now, you can call this function from any Markdoc content entry:

    ¡Hola {% getCountryEmoji("spain") %}!

[See the Markdoc documentation](https://markdoc.dev/docs/functions#creating-a-custom-function) for more on using variables or functions in your content.

### Set the root HTML element

[Section titled Set the root HTML element](#set-the-root-html-element)

Markdoc wraps documents with an `<article>` tag by default. This can be changed from the `document` Markdoc node. This accepts an HTML element name or `null` if you prefer to remove the wrapper element:

markdoc.config.mjs

    import { defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  nodes: {    document: {      ...nodes.document, // Apply defaults for other options      render: null, // default 'article'    },  },});

Integration config options
--------------------------

[Section titled Integration config options](#integration-config-options)

The Astro Markdoc integration handles configuring Markdoc options and capabilities that are not available through the `markdoc.config.js` file.

### `allowHTML`

[Section titled allowHTML](#allowhtml)

Enables writing HTML markup alongside Markdoc tags and nodes.

By default, Markdoc will not recognize HTML markup as semantic content.

To achieve a more Markdown-like experience, where HTML elements can be included alongside your content, set `allowHTML:true` as a `markdoc` integration option. This will enable HTML parsing in Markdoc markup.

astro.config.mjs

      import { defineConfig } from 'astro/config';  import markdoc from '@astrojs/markdoc';
      export default defineConfig({    // ...    integrations: [markdoc({ allowHTML: true })],  });

Caution

When `allowHTML` is enabled, HTML markup inside Markdoc documents will be rendered as actual HTML elements (including `<script>`), making attack vectors like XSS possible. Ensure that any HTML markup comes from trusted sources.

### `ignoreIndentation`

[Section titled ignoreIndentation](#ignoreindentation)

By default, any content that is indented by four spaces is treated as a code block. Unfortunately, this behavior makes it difficult to use arbitrary levels of indentation to improve the readability of documents with complex structure.

When using nested tags in Markdoc, it can be helpful to indent the content inside of tags so that the level of depth is clear. To support arbitrary indentation, we have to disable the indent-based code blocks and modify several other markdown-it parsing rules that account for indent-based code blocks. These changes can be applied by enabling the ignoreIndentation option.

astro.config.mjs

      import { defineConfig } from 'astro/config';  import markdoc from '@astrojs/markdoc';
      export default defineConfig({    // ...    integrations: [markdoc({ ignoreIndentation: true })],  });

    # Welcome to Markdoc with indented tags 👋
    # Note: Can use either spaces or tabs for indentation
    {% custom-tag %}{% custom-tag %} ### Tags can be indented for better readability
        {% another-custom-tag %}      This is easier to follow when there is a lot of nesting    {% /another-custom-tag %}
    {% /custom-tag %}{% /custom-tag %}

Examples
--------

[Section titled Examples](#examples)

*   The [Astro Markdoc starter template](https://github.com/withastro/astro/tree/latest/examples/with-markdoc) shows how to use Markdoc files in your Astro project.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/markdoc.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
DB](/en/guides/integrations-guide/db/) [Next  
MDX](/en/guides/integrations-guide/mdx/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/mdx
@astrojs/ mdx
=============

v4.3.0 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/) [npm](https://www.npmjs.com/package/@astrojs/mdx) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** enables the usage of [MDX](https://mdxjs.com/) components and allows you to create pages as `.mdx` files.

Why MDX?
--------

[Section titled Why MDX?](#why-mdx)

MDX allows you to use variables, JSX expressions and components within Markdown content in Astro. If you have existing content authored in MDX, this integration allows you to bring those files to your Astro project.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Run one of the following commands in a new terminal window.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3235)
*   [pnpm](#tab-panel-3236)
*   [Yarn](#tab-panel-3237)

Terminal window

    npx astro add mdx

Terminal window

    pnpm astro add mdx

Terminal window

    yarn astro add mdx

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/mdx` package:

*   [npm](#tab-panel-3238)
*   [pnpm](#tab-panel-3239)
*   [Yarn](#tab-panel-3240)

Terminal window

    npm install @astrojs/mdx

Terminal window

    pnpm add @astrojs/mdx

Terminal window

    yarn add @astrojs/mdx

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  // ...  integrations: [mdx()],});

### Editor Integration

[Section titled Editor Integration](#editor-integration)

For editor support in [VS Code](https://code.visualstudio.com/), install the [official MDX extension](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx).

For other editors, use the [MDX language server](https://github.com/mdx-js/mdx-analyzer/tree/main/packages/language-server).

Usage
-----

[Section titled Usage](#usage)

Visit the [MDX docs](https://mdxjs.com/docs/what-is-mdx/) to learn about using standard MDX features.

MDX in Astro
------------

[Section titled MDX in Astro](#mdx-in-astro)

Adding the MDX integration enhances your Markdown authoring with JSX variables, expressions and components.

It also adds extra features to standard MDX, including support for Markdown-style frontmatter in MDX. This allows you to use most of [Astro’s built-in Markdown features](/en/guides/markdown-content/).

`.mdx` files must be written in [MDX syntax](https://mdxjs.com/docs/what-is-mdx/#mdx-syntax) rather than Astro’s HTML-like syntax.

### Using MDX with content collections

[Section titled Using MDX with content collections](#using-mdx-with-content-collections)

To include MDX files in a content collection, make sure that your [collection loader](/en/guides/content-collections/#defining-the-collection-loader) is configured to load content from `.mdx` files:

src/content.config.ts

    import { defineCollection, z } from 'astro:content';import { glob } from 'astro/loaders';
    const blog = defineCollection({  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),  schema: z.object({    title: z.string(),    description: z.string(),    pubDate: z.coerce.date(),  })});
    export const collections = { blog };

### Using Exported Variables in MDX

[Section titled Using Exported Variables in MDX](#using-exported-variables-in-mdx)

MDX supports using `export` statements to add variables to your MDX content or to export data to a component that imports it.

For example, you can export a `title` field from an MDX page or component to use as a heading with `{JSX expressions}`:

/src/blog/posts/post-1.mdx

    export const title = 'My first MDX post'
    # {title}

Or you can use that exported `title` in your page using `import` and `import.meta.glob()` statements:

src/pages/index.astro

    ---const matches = import.meta.glob('./posts/*.mdx', { eager: true });const posts = Object.values(matches);---
    {posts.map(post => <p>{post.title}</p>)}

#### Exported Properties

[Section titled Exported Properties](#exported-properties)

The following properties are available to a `.astro` component when using an `import` statement or `import.meta.glob()`:

*   **`file`** - The absolute file path (e.g. `/home/user/projects/.../file.mdx`).
*   **`url`** - The URL of the page (e.g. `/en/guides/markdown-content`).
*   **`frontmatter`** - Contains any data specified in the file’s YAML/TOML frontmatter.
*   **`getHeadings()`** - An async function that returns an array of all headings (`<h1>` to `<h6>`) in the file with the type: `{ depth: number; slug: string; text: string }[]`. Each heading’s `slug` corresponds to the generated ID for a given heading and can be used for anchor links.
*   **`<Content />`** - A component that returns the full, rendered contents of the file.
*   **(any `export` value)** - MDX files can also export data with an `export` statement.

### Using Frontmatter Variables in MDX

[Section titled Using Frontmatter Variables in MDX](#using-frontmatter-variables-in-mdx)

The Astro MDX integration includes support for using frontmatter in MDX by default. Add frontmatter properties just as you would in Markdown files, and these variables are available to use in the template, and as named properties when importing the file somewhere else.

/src/blog/posts/post-1.mdx

    ---title: 'My first MDX post'author: 'Houston'---
    # {frontmatter.title}
    Written by: {frontmatter.author}

### Using Components in MDX

[Section titled Using Components in MDX](#using-components-in-mdx)

After installing the MDX integration, you can import and use both [Astro components](/en/basics/astro-components/) and [UI framework components](/en/guides/framework-components/#using-framework-components) in MDX (`.mdx`) files just as you would use them in any other Astro component.

Don’t forget to include a `client:directive` on your UI framework components, if necessary!

See more examples of using import and export statements in the [MDX docs](https://mdxjs.com/docs/what-is-mdx/#esm).

src/blog/post-1.mdx

    ---title: My first post---import ReactCounter from '../components/ReactCounter.jsx';
    I just started my new Astro blog!
    Here is my counter component, working in MDX:<ReactCounter client:load />

#### Custom components with imported MDX

[Section titled Custom components with imported MDX](#custom-components-with-imported-mdx)

When rendering imported MDX content, [custom components](#assigning-custom-components-to-html-elements) can be passed via the `components` prop.

src/pages/page.astro

    ---import { Content, components } from '../content.mdx';import Heading from '../Heading.astro';---<!-- Creates a custom <h1> for the # syntax, _and_ applies any custom components defined in `content.mdx` --><Content components={{...components, h1: Heading }} />

Note

Custom components defined and exported in an MDX file must be imported and then passed back to the `<Content />` component via the `components` property.

#### Assigning Custom Components to HTML elements

[Section titled Assigning Custom Components to HTML elements](#assigning-custom-components-to-html-elements)

With MDX, you can map Markdown syntax to custom components instead of their standard HTML elements. This allows you to write in standard Markdown syntax, but apply special component styling to selected elements.

Import your custom component into your `.mdx` file, then export a `components` object that maps the standard HTML element to your custom component:

src/blog/posts/post-1.mdx

    import Blockquote from '../components/Blockquote.astro';export const components = {blockquote: Blockquote}
    > This quote will be a custom Blockquote

src/components/Blockquote.astro

    ---const props = Astro.props;---<blockquote {...props} class="bg-blue-50 p-4">  <span class="text-4xl text-blue-600 mb-2">“</span>  <slot /> <!-- Be sure to add a `<slot/>` for child content! --></blockquote>

Visit the [MDX website](https://mdxjs.com/table-of-components/) for a full list of HTML elements that can be overwritten as custom components.

Configuration
-------------

[Section titled Configuration](#configuration)

Once the MDX integration is installed, no configuration is necessary to use `.mdx` files in your Astro project.

You can configure how your MDX is rendered with the following options:

*   [Options inherited from Markdown config](#options-inherited-from-markdown-config)
*   [`extendMarkdownConfig`](#extendmarkdownconfig)
*   [`recmaPlugins`](#recmaplugins)
*   [`optimize`](#optimize)

### Options inherited from Markdown config

[Section titled Options inherited from Markdown config](#options-inherited-from-markdown-config)

All [`markdown` configuration options](/en/reference/configuration-reference/#markdown-options) can be configured separately in the MDX integration. This includes remark and rehype plugins, syntax highlighting, and more. Options will default to those in your Markdown config ([see the `extendMarkdownConfig` option](#extendmarkdownconfig) to modify this).

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';import remarkToc from 'remark-toc';import rehypePresetMinify from 'rehype-preset-minify';
    export default defineConfig({  // ...  integrations: [    mdx({      syntaxHighlight: 'shiki',      shikiConfig: { theme: 'dracula' },      remarkPlugins: [remarkToc],      rehypePlugins: [rehypePresetMinify],      remarkRehype: { footnoteLabel: 'Footnotes' },      gfm: false,    }),  ],});

Caution

MDX does not support passing remark and rehype plugins as a string. You should install, import, and apply the plugin function instead.

See the [Markdown Options reference](/en/reference/configuration-reference/#markdown-options) for a complete list of options.

### `extendMarkdownConfig`

[Section titled extendMarkdownConfig](#extendmarkdownconfig)

*   **Type:** `boolean`
*   **Default:** `true`

MDX will extend [your project’s existing Markdown configuration](/en/reference/configuration-reference/#markdown-options) by default. To override individual options, you can specify their equivalent in your MDX configuration.

For example, say you need to disable GitHub-Flavored Markdown and apply a different set of remark plugins for MDX files. You can apply these options like so, with `extendMarkdownConfig` enabled by default:

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  // ...  markdown: {    syntaxHighlight: 'prism',    remarkPlugins: [remarkPlugin1],    gfm: true,  },  integrations: [    mdx({      // `syntaxHighlight` inherited from Markdown
          // Markdown `remarkPlugins` ignored,      // only `remarkPlugin2` applied.      remarkPlugins: [remarkPlugin2],      // `gfm` overridden to `false`      gfm: false,    }),  ],});

You may also need to disable `markdown` config extension in MDX. For this, set `extendMarkdownConfig` to `false`:

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  // ...  markdown: {    remarkPlugins: [remarkPlugin1],  },  integrations: [    mdx({      // Markdown config now ignored      extendMarkdownConfig: false,      // No `remarkPlugins` applied    }),  ],});

### `recmaPlugins`

[Section titled recmaPlugins](#recmaplugins)

These are plugins that modify the output [estree](https://github.com/estree/estree) directly. This is useful for modifying or injecting JavaScript variables in your MDX files.

We suggest [using AST Explorer](https://astexplorer.net/) to play with estree outputs, and trying [`estree-util-visit`](https://unifiedjs.com/explore/package/estree-util-visit/) for searching across JavaScript nodes.

### `optimize`

[Section titled optimize](#optimize)

*   **Type:** `boolean | { ignoreElementNames?: string[] }`

This is an optional configuration setting to optimize the MDX output for faster builds and rendering via an internal rehype plugin. This may be useful if you have many MDX files and notice slow builds. However, this option may generate some unescaped HTML, so make sure your site’s interactive parts still work correctly after enabling it.

This is disabled by default. To enable MDX optimization, add the following to your MDX integration configuration:

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  // ...  integrations: [    mdx({      optimize: true,    }),  ],});

#### `ignoreElementNames`

[Section titled ignoreElementNames](#ignoreelementnames)

*   **Type:** `string[]`

**Added in:** `@astrojs/mdx@3.0.0`

Previously known as `customComponentNames`.

An optional property of `optimize` to prevent the MDX optimizer from handling certain element names, like [custom components passed to imported MDX content via the components prop](/en/guides/integrations-guide/mdx/#custom-components-with-imported-mdx).

You will need to exclude these components from optimization as the optimizer eagerly converts content into a static string, which will break custom components that needs to be dynamically rendered.

For example, the intended MDX output of the following is `<Heading>...</Heading>` in place of every `"<h1>...</h1>"`:

    ---import { Content, components } from '../content.mdx';import Heading from '../Heading.astro';---
    <Content components={{ ...components, h1: Heading }} />

To configure optimization for this using the `ignoreElementNames` property, specify an array of HTML element names that should be treated as custom components:

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  // ...  integrations: [    mdx({      optimize: {        // Prevent the optimizer from handling `h1` elements        ignoreElementNames: ['h1'],      },    }),  ],});

Note that if your MDX file [configures custom components using `export const components = { ... }`](/en/guides/integrations-guide/mdx/#assigning-custom-components-to-html-elements), then you do not need to manually configure this option. The optimizer will automatically detect them.

Examples
--------

[Section titled Examples](#examples)

*   The [Astro MDX starter template](https://github.com/withastro/astro/tree/latest/examples/with-mdx) shows how to use MDX files in your Astro project.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/mdx.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Markdoc](/en/guides/integrations-guide/markdoc/) [Next  
Partytown](/en/guides/integrations-guide/partytown/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/netlify
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

# Aggregated from ./pages/guides/integrations-guide/node
@astrojs/ node
==============

v9.2.2 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/node/) [npm](https://www.npmjs.com/package/@astrojs/node) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/node/CHANGELOG.md)

This adapter allows Astro to deploy your [on-demand rendered routes and features](/en/guides/on-demand-rendering/) to Node targets, including [server islands](/en/guides/server-islands/), [actions](/en/guides/actions/), and [sessions](/en/guides/sessions/).

If you’re using Astro as a static site builder, you don’t need an adapter.

Why Astro Node.js
-----------------

[Section titled Why Astro Node.js](#why-astro-nodejs)

[Node.js](https://nodejs.org/en/) is a JavaScript runtime for server-side code. @astrojs/node can be used either in standalone mode or as middleware for other http servers, such as [Express](https://expressjs.com/).

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Add the Node adapter to enable on-demand rendering in your Astro project with the `astro add` command. This will install `@astrojs/node` and make the appropriate changes to your `astro.config.*` file in one step.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3247)
*   [pnpm](#tab-panel-3248)
*   [Yarn](#tab-panel-3249)

Terminal window

    npx astro add node

Terminal window

    pnpm astro add node

Terminal window

    yarn astro add node

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Now, you can enable [on-demand rendering per page](/en/guides/on-demand-rendering/#enabling-on-demand-rendering), or set your build output configuration to `output: 'server'` to [server-render all your pages by default](/en/guides/on-demand-rendering/#server-mode).

### Manual Install

[Section titled Manual Install](#manual-install)

First, add the Node adapter to your project’s dependencies using your preferred package manager.

*   [npm](#tab-panel-3250)
*   [pnpm](#tab-panel-3251)
*   [Yarn](#tab-panel-3252)

Terminal window

    npm install @astrojs/node

Terminal window

    pnpm add @astrojs/node

Terminal window

    yarn add @astrojs/node

Then, add the adapter to your `astro.config.*` file:

astro.config.mjs

    import { defineConfig } from 'astro/config';import node from '@astrojs/node';
    export default defineConfig({  adapter: node({    mode: 'standalone',  }),});

Configuration
-------------

[Section titled Configuration](#configuration)

@astrojs/node can be configured by passing options into the adapter function. The following options are available:

### `mode`

[Section titled mode](#mode)

**Type:** `'middleware' | 'standalone'`  

Controls whether the adapter builds to `middleware` or `standalone` mode.

*   `middleware` mode allows the built output to be used as middleware for another Node.js server, like Express.js or Fastify.
*   `standalone` mode builds a server that automatically starts when the entry module is run. This allows you to more easily deploy your build to a host without needing additional code.

astro.config.mjs

    import { defineConfig } from 'astro/config';import node from '@astrojs/node';
    export default defineConfig({  adapter: node({    mode: 'middleware',  }),});

Usage
-----

[Section titled Usage](#usage)

First, [performing a build](/en/guides/deploy/#building-your-site-locally). Depending on which `mode` selected (see above) follow the appropriate steps below:

### Middleware

[Section titled Middleware](#middleware)

The server entrypoint is built to `./dist/server/entry.mjs` by default. This module exports a `handler` function that can be used with any framework that supports the Node `request` and `response` objects.

For example, with Express:

run-server.mjs

    import express from 'express';import { handler as ssrHandler } from './dist/server/entry.mjs';
    const app = express();// Change this based on your astro.config.mjs, `base` option.// They should match. The default value is "/".const base = '/';app.use(base, express.static('dist/client/'));app.use(ssrHandler);
    app.listen(8080);

Or, with Fastify (>4):

run-server.mjs

    import Fastify from 'fastify';import fastifyMiddie from '@fastify/middie';import fastifyStatic from '@fastify/static';import { fileURLToPath } from 'node:url';import { handler as ssrHandler } from './dist/server/entry.mjs';
    const app = Fastify({ logger: true });
    await app  .register(fastifyStatic, {    root: fileURLToPath(new URL('./dist/client', import.meta.url)),  })  .register(fastifyMiddie);app.use(ssrHandler);
    app.listen({ port: 8080 });

Additionally, you can also pass in an object to be accessed with `Astro.locals` or in Astro middleware:

run-server.mjs

    import express from 'express';import { handler as ssrHandler } from './dist/server/entry.mjs';
    const app = express();app.use(express.static('dist/client/'));app.use((req, res, next) => {  const locals = {    title: 'New title',  };
      ssrHandler(req, res, next, locals);});
    app.listen(8080);

Note that middleware mode does not do file serving. You’ll need to configure your HTTP framework to do that for you. By default the client assets are written to `./dist/client/`.

### Standalone

[Section titled Standalone](#standalone)

In standalone mode a server starts when the server entrypoint is run. By default it is built to `./dist/server/entry.mjs`. You can run it with:

Terminal window

    node ./dist/server/entry.mjs

For standalone mode the server handles file serving in addition to the page and API routes.

#### Custom host and port

[Section titled Custom host and port](#custom-host-and-port)

You can override the host and port the standalone server runs on by passing them as environment variables at runtime:

Terminal window

    HOST=0.0.0.0 PORT=4321 node ./dist/server/entry.mjs

#### HTTPS

[Section titled HTTPS](#https)

By default the standalone server uses HTTP. This works well if you have a proxy server in front of it that does HTTPS. If you need the standalone server to run HTTPS itself you need to provide your SSL key and certificate.

You can pass the path to your key and certification via the environment variables `SERVER_CERT_PATH` and `SERVER_KEY_PATH`. This is how you might pass them in bash:

Terminal window

    SERVER_KEY_PATH=./private/key.pem SERVER_CERT_PATH=./private/cert.pem node ./dist/server/entry.mjs

#### Runtime environment variables

[Section titled Runtime environment variables](#runtime-environment-variables)

If an `.env` file containing environment variables is present when the build process is run, these values will be hard-coded in the output, just as when generating a static website.

During the build, the runtime variables must be absent from the `.env` file, and you must provide Astro with every environment variable to expect at run-time: `VARIABLE_1=placeholder astro build`. This signals to Astro that the actual value will be available when the built application is run. The placeholder value will be ignored by the build process, and Astro will use the value provided at run-time.

In the case of multiple run-time variables, store them in a separate file (e.g. `.env.runtime`) from `.env`. Start the build with the following command:

Terminal window

    export $(cat .env.runtime) && astro build

#### Assets

[Section titled Assets](#assets)

In standalone mode, assets in your `dist/client/` folder are served via the standalone server. You might be deploying these assets to a CDN, in which case the server will never actually be serving them. But in some cases, such as intranet sites, it’s fine to serve static assets directly from the application server.

Assets in the `dist/client/_astro/` folder are the ones that Astro has built. These assets are all named with a hash and therefore can be given long cache headers. Internally the adapter adds this header for these assets:

    Cache-Control: public, max-age=31536000, immutable

Sessions
--------

[Section titled Sessions](#sessions)

The Astro [Sessions API](/en/guides/sessions/) allows you to easily store user data between requests. This can be used for things like user data and preferences, shopping carts, and authentication credentials. Unlike cookie storage, there are no size limits on the data, and it can be restored on different devices.

Astro uses the local filesystem for session storage when using the Node adapter. If you would prefer to use a different session storage driver, you can specify it in your Astro config. See [the `session` configuration reference](/en/reference/configuration-reference/#sessiondriver) for more details.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/node.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Netlify](/en/guides/integrations-guide/netlify/) [Next  
Vercel](/en/guides/integrations-guide/vercel/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/partytown
@astrojs/ partytown
===================

v2.1.4 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/partytown/) [npm](https://www.npmjs.com/package/@astrojs/partytown) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/partytown/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** enables [Partytown](https://partytown.builder.io/) in your Astro project.

Why Astro Partytown
-------------------

[Section titled Why Astro Partytown](#why-astro-partytown)

Partytown is a lazy-loaded library to help relocate resource intensive scripts into a [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), and off of the [main thread](https://developer.mozilla.org/en-US/docs/Glossary/Main_thread).

If you’re using third-party scripts for things like analytics or ads, Partytown is a great way to make sure that they don’t slow down your site.

The Astro Partytown integration installs Partytown for you and makes sure it’s enabled on all of your pages.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Run one of the following commands in a new terminal window.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3253)
*   [pnpm](#tab-panel-3254)
*   [Yarn](#tab-panel-3255)

Terminal window

    npx astro add partytown

Terminal window

    pnpm astro add partytown

Terminal window

    yarn astro add partytown

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/partytown` package:

*   [npm](#tab-panel-3256)
*   [pnpm](#tab-panel-3257)
*   [Yarn](#tab-panel-3258)

Terminal window

    npm install @astrojs/partytown

Terminal window

    pnpm add @astrojs/partytown

Terminal window

    yarn add @astrojs/partytown

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import partytown from '@astrojs/partytown';
    export default defineConfig({  // ...  integrations: [partytown()],});

Usage
-----

[Section titled Usage](#usage)

Partytown should be ready to go with zero config. If you have an existing 3rd party script on your site, try adding the `type="text/partytown"` attribute:

    <script type="text/partytown" src="fancy-analytics.js"></script>

If you open the “Network” tab from [your browser’s dev tools](https://developer.chrome.com/docs/devtools/open/), you should see the `partytown` proxy intercepting this request.

Configuration
-------------

[Section titled Configuration](#configuration)

To configure this integration, pass a ‘config’ object to the `partytown()` function call in `astro.config.mjs`.

astro.config.mjs

    export default defineConfig({  // ...  integrations: [    partytown({      config: {        // options go here      },    }),  ],});

This mirrors the [Partytown config object](https://partytown.builder.io/configuration).

### config.debug

[Section titled config.debug](#configdebug)

Partytown ships with a `debug` mode; enable or disable it by passing `true` or `false` to `config.debug`. If [`debug` mode](https://partytown.builder.io/debugging) is enabled, it will output detailed logs to the browser console.

If this option isn’t set, `debug` mode will be on by default in [dev](/en/reference/cli-reference/#astro-dev) or [preview](/en/reference/cli-reference/#astro-preview) mode.

astro.config.mjs

    export default defineConfig({  // ...  integrations: [    partytown({      // Example: Disable debug mode.      config: { debug: false },    }),  ],});

### config.forward

[Section titled config.forward](#configforward)

Third-party scripts typically add variables to the `window` object so that you can communicate with them throughout your site. But when a script is loaded in a web-worker, it doesn’t have access to that global `window` object.

To solve this, Partytown can “patch” variables to the global window object and forward them to the appropriate script.

You can specify which variables to forward with the `config.forward` option. [Read more in Partytown’s documentation.](https://partytown.builder.io/forwarding-events)

astro.config.mjs

    export default defineConfig({  // ...  integrations: [    partytown({      // Example: Add dataLayer.push as a forwarding-event.      config: {        forward: ['dataLayer.push'],      },    }),  ],});

Examples
--------

[Section titled Examples](#examples)

*   [Browse projects with Astro Partytown on GitHub](https://github.com/search?q=%22%40astrojs%2Fpartytown%22+path%3A**%2Fpackage.json&type=code) for more examples!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/partytown.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
MDX](/en/guides/integrations-guide/mdx/) [Next  
Sitemap](/en/guides/integrations-guide/sitemap/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/preact
@astrojs/ preact
================

v4.1.0 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/preact/) [npm](https://www.npmjs.com/package/@astrojs/preact) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/preact/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** enables rendering and client-side hydration for your [Preact](https://preactjs.com/) components.

Why Preact?
-----------

[Section titled Why Preact?](#why-preact)

Preact is a library that lets you build interactive UI components for the web. If you want to build interactive features on your site using JavaScript, you may prefer using its component format instead of using browser APIs directly.

Preact is also a great choice if you have previously used React. Preact provides the same API as React, but in a much smaller 3kB package. It even supports rendering many React components using the `compat` configuration option (see below).

**Want to learn more about Preact before using this integration?**  
Check out [“Learn Preact”](https://preactjs.com/tutorial), an interactive tutorial on their website.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

To install `@astrojs/preact`, run the following from your project directory and follow the prompts:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3259)
*   [pnpm](#tab-panel-3260)
*   [Yarn](#tab-panel-3261)

Terminal window

    npx astro add preact

Terminal window

    pnpm astro add preact

Terminal window

    yarn astro add preact

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/preact` package:

*   [npm](#tab-panel-3262)
*   [pnpm](#tab-panel-3263)
*   [Yarn](#tab-panel-3264)

Terminal window

    npm install @astrojs/preact

Terminal window

    pnpm add @astrojs/preact

Terminal window

    yarn add @astrojs/preact

Most package managers will install associated peer dependencies as well. If you see a `Cannot find package 'preact'` (or similar) warning when you start up Astro, you’ll need to install Preact:

*   [npm](#tab-panel-3265)
*   [pnpm](#tab-panel-3266)
*   [Yarn](#tab-panel-3267)

Terminal window

    npm install preact

Terminal window

    pnpm add preact

Terminal window

    yarn add preact

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import preact from '@astrojs/preact';
    export default defineConfig({  // ...  integrations: [preact()],});

And add the following code to the `tsconfig.json` file.

tsconfig.json

    {  "extends": "astro/tsconfigs/strict",  "include": [".astro/types.d.ts", "**/*"],  "exclude": ["dist"],  "compilerOptions": {    "jsx": "react-jsx",    "jsxImportSource": "preact"  }}

Usage
-----

[Section titled Usage](#usage)

To use your first Preact component in Astro, head to our [UI framework documentation](/en/guides/framework-components/#using-framework-components). You’ll explore:

*   📦 how framework components are loaded,
*   💧 client-side hydration options, and
*   🤝 opportunities to mix and nest frameworks together

Also check our [Astro Integration Documentation](/en/guides/integrations-guide/) for more on integrations.

Configuration
-------------

[Section titled Configuration](#configuration)

The Astro Preact integration handles how Preact components are rendered and it has its own options. Change these in the `astro.config.mjs` file which is where your project’s integration settings live.

For basic usage, you do not need to configure the Preact integration.

### compat

[Section titled compat](#compat)

You can enable `preact/compat`, Preact’s compatibility layer for rendering React components without needing to install or ship React’s larger libraries to your users’ web browsers.

To do so, pass an object to the Preact integration and set `compat: true`.

astro.config.mjs

    import { defineConfig } from 'astro/config';import preact from '@astrojs/preact';
    export default defineConfig({  integrations: [preact({ compat: true })],});

With the `compat` option enabled, the Preact integration will render React components as well as Preact components in your project and also allow you to import React components inside Preact components. Read more in [“Switching to Preact (from React)”](https://preactjs.com/guide/v10/switching-to-preact) on the Preact website.

When importing React component libraries, in order to swap out the `react` and `react-dom` dependencies as `preact/compat`, you can use [`overrides`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides) to do so.

package.json

    {  "overrides": {    "react": "npm:@preact/compat@latest",    "react-dom": "npm:@preact/compat@latest"  }}

Check out the [`pnpm` overrides](https://pnpm.io/package_json#pnpmoverrides) and [`yarn` resolutions](https://yarnpkg.com/configuration/manifest#resolutions) docs for their respective overrides features.

Note

Currently, the `compat` option only works for React libraries that export code as ESM. If an error happens during build-time, try adding the library to `vite.ssr.noExternal: ['the-react-library']` in your `astro.config.mjs` file.

### devtools

[Section titled devtools](#devtools)

**Added in:** `@astrojs/preact@3.3.0`

You can enable [Preact devtools](https://preactjs.github.io/preact-devtools/) in development by passing an object with `devtools: true` to your `preact()` integration config:

astro.config.mjs

    import { defineConfig } from 'astro/config';import preact from '@astrojs/preact';
    export default defineConfig({  // ...  integrations: [preact({ devtools: true })],});

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
    export default defineConfig({  // Enable many frameworks to support all different kinds of components.  // No `include` is needed if you are only using a single JSX framework!  integrations: [    preact({      include: ['**/preact/*'],    }),    react({      include: ['**/react/*'],    }),    solid({      include: ['**/solid/*'],    }),  ],});

Examples
--------

[Section titled Examples](#examples)

*   The [Astro Preact example](https://github.com/withastro/astro/tree/latest/examples/framework-preact) shows how to use an interactive Preact component in an Astro project.
*   The [Astro Nanostores example](https://github.com/withastro/astro/tree/latest/examples/with-nanostores) shows how to share state between different components — and even different frameworks! — in an Astro project.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/preact.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Alpine.js](/en/guides/integrations-guide/alpinejs/) [Next  
React](/en/guides/integrations-guide/react/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/prefetch
@astrojs/prefetch
=================

Removed

`@astrojs/prefetch` has been replaced by the [built-in `prefetch` feature](/en/guides/prefetch/) introduced in Astro 3.5. See the [migration guide](/en/guides/prefetch/#migrating-from-astrojsprefetch) for instructions on updating an older project.

If you are still using this integration in a pre-v3.5 Astro project, you can read an archived copy of [the `@astrojs/prefetch` README](https://github.com/withastro/astro/blob/c47478bbf6b21973419f25234c68efb59466b368/packages%2Fintegrations%2Fprefetch%2FREADME.md) on GitHub.

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/prefetch.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/react
@astrojs/ react
===============

v4.3.0 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/react/) [npm](https://www.npmjs.com/package/@astrojs/react) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/react/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** enables rendering and client-side hydration for your [React](https://react.dev/) components.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

To install `@astrojs/react`, run the following from your project directory and follow the prompts:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3268)
*   [pnpm](#tab-panel-3269)
*   [Yarn](#tab-panel-3270)

Terminal window

    npx astro add react

Terminal window

    pnpm astro add react

Terminal window

    yarn astro add react

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/react` package:

*   [npm](#tab-panel-3271)
*   [pnpm](#tab-panel-3272)
*   [Yarn](#tab-panel-3273)

Terminal window

    npm install @astrojs/react

Terminal window

    pnpm add @astrojs/react

Terminal window

    yarn add @astrojs/react

Most package managers will install associated peer dependencies as well. If you see a `Cannot find package 'react'` (or similar) warning when you start up Astro, you’ll need to install `react` and `react-dom` with its type definitions:

*   [npm](#tab-panel-3274)
*   [pnpm](#tab-panel-3275)
*   [Yarn](#tab-panel-3276)

Terminal window

    npm install react react-dom @types/react @types/react-dom

Terminal window

    pnpm add react react-dom @types/react @types/react-dom

Terminal window

    yarn add react react-dom @types/react @types/react-dom

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import react from '@astrojs/react';
    export default defineConfig({  // ...  integrations: [react()],});

And add the following code to the `tsconfig.json` file.

tsconfig.json

    {  "extends": "astro/tsconfigs/strict",  "include": [".astro/types.d.ts", "**/*"],  "exclude": ["dist"],  "compilerOptions": {    "jsx": "react-jsx",    "jsxImportSource": "react"  }}

Getting started
---------------

[Section titled Getting started](#getting-started)

To use your first React component in Astro, head to our [UI framework documentation](/en/guides/framework-components/#using-framework-components). You’ll explore:

*   📦 how framework components are loaded,
*   💧 client-side hydration options, and
*   🤝 opportunities to mix and nest frameworks together

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
    export default defineConfig({  // Enable many frameworks to support all different kinds of components.  // No `include` is needed if you are only using a single JSX framework!  integrations: [    preact({      include: ['**/preact/*'],    }),    react({      include: ['**/react/*'],    }),    solid({      include: ['**/solid/*'],    }),  ],});

### Children parsing

[Section titled Children parsing](#children-parsing)

Children passed into a React component from an Astro component are parsed as plain strings, not React nodes.

For example, the `<ReactComponent />` below will only receive a single child element:

    ---import ReactComponent from './ReactComponent';---
    <ReactComponent>  <div>one</div>  <div>two</div></ReactComponent>

If you are using a library that _expects_ more than one child element to be passed, for example so that it can slot certain elements in different places, you might find this to be a blocker.

You can set the experimental flag `experimentalReactChildren` to tell Astro to always pass children to React as React virtual DOM nodes. There is some runtime cost to this, but it can help with compatibility.

You can enable this option in the configuration for the React integration:

astro.config.mjs

    import { defineConfig } from 'astro/config';import react from '@astrojs/react';
    export default defineConfig({  // ...  integrations: [    react({      experimentalReactChildren: true,    }),  ],});

### Disable streaming (experimental)

[Section titled Disable streaming (experimental)](#disable-streaming-experimental)

Astro streams the output of React components by default. However, you can disable this behavior by enabling the `experimentalDisableStreaming` option. This is particularly helpful for supporting libraries that don’t work well with streaming, like some CSS-in-JS solutions.

To disable streaming for all React components in your project, configure `@astrojs/react` with `experimentalDisableStreaming: true`:

astro.config.mjs

    import { defineConfig } from 'astro/config';import react from '@astrojs/react';
    export default defineConfig({  // ...  integrations: [    react({      experimentalDisableStreaming: true,    }),  ],});

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/react.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Preact](/en/guides/integrations-guide/preact/) [Next  
SolidJS](/en/guides/integrations-guide/solid-js/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/sitemap
@astrojs/ sitemap
=================

v3.4.0 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap/) [npm](https://www.npmjs.com/package/@astrojs/sitemap) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** generates a sitemap based on your pages when you build your Astro project.

Why Astro Sitemap
-----------------

[Section titled Why Astro Sitemap](#why-astro-sitemap)

A Sitemap is an XML file that outlines all of the pages, videos, and files on your site. Search engines like Google read this file to crawl your site more efficiently. [See Google’s own advice on sitemaps](https://developers.google.com/search/docs/advanced/sitemaps/overview) to learn more.

A sitemap file is recommended for large multi-page sites. If you don’t use a sitemap, most search engines will still be able to list your site’s pages, but a sitemap is a great way to ensure that your site is as search engine friendly as possible.

With Astro Sitemap, you don’t have to worry about creating this XML file yourself: the Astro Sitemap integration will crawl your statically-generated routes and create the sitemap file, including [dynamic routes](/en/guides/routing/#dynamic-routes) like `[...slug]` or `src/pages/[lang]/[version]/info.astro` generated by `getStaticPaths()`.

This integration cannot generate sitemap entries for dynamic routes in [SSR mode](/en/guides/on-demand-rendering/).

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Run one of the following commands in a new terminal window.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3277)
*   [pnpm](#tab-panel-3278)
*   [Yarn](#tab-panel-3279)

Terminal window

    npx astro add sitemap

Terminal window

    pnpm astro add sitemap

Terminal window

    yarn astro add sitemap

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/sitemap` package using your package manager.

*   [npm](#tab-panel-3280)
*   [pnpm](#tab-panel-3281)
*   [Yarn](#tab-panel-3282)

Terminal window

    npm install @astrojs/sitemap

Terminal window

    pnpm add @astrojs/sitemap

Terminal window

    yarn add @astrojs/sitemap

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  // ...  integrations: [sitemap()],});

Usage
-----

[Section titled Usage](#usage)

`@astrojs/sitemap` needs to know your site’s deployed URL to generate a sitemap.

Add your site’s URL as the [`site`](/en/reference/configuration-reference/#site) option in `astro.config.mjs`. This must begin with `http://` or `https://`.

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  site: 'https://stargazers.club',  integrations: [sitemap()],  // ...});

With the sitemap integration configured, `sitemap-index.xml` and `sitemap-0.xml` files will be added to your output directory when building your site.

`sitemap-index.xml` links to all the numbered sitemap files. `sitemap-0.xml` lists the pages on your site. For extremely large sites, there may also be additional numbered files like `sitemap-1.xml` and `sitemap-2.xml`.

Example of generated files for a two-page website

sitemap-index.xml

    <?xml version="1.0" encoding="UTF-8"?>  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">  <sitemap>    <loc>https://stargazers.club/sitemap-0.xml</loc>  </sitemap></sitemapindex>

sitemap-0.xml

    <?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">  <url>    <loc>https://stargazers.club/</loc>  </url>  <url>    <loc>https://stargazers.club/second-page/</loc>  </url></urlset>

### Sitemap discovery

[Section titled Sitemap discovery](#sitemap-discovery)

You can make it easier for crawlers to find your sitemap with links in your site’s `<head>` and `robots.txt` file.

#### Sitemap link in `<head>`

[Section titled Sitemap link in &lt;head&gt;](#sitemap-link-in-head)

Add a `<link rel="sitemap">` element to your site’s `<head>` pointing to the sitemap index file:

src/layouts/Layout.astro

    <head>  <link rel="sitemap" href="/sitemap-index.xml" /></head>

#### Sitemap link in `robots.txt`

[Section titled Sitemap link in robots.txt](#sitemap-link-in-robotstxt)

If you have a `robots.txt` for your website, you can add the URL for the sitemap index to help crawlers:

public/robots.txt

    User-agent: *Allow: /
    Sitemap: https://<YOUR SITE>/sitemap-index.xml

If you want to reuse the `site` value from `astro.config.mjs`, you can also generate `robots.txt` dynamically. Instead of using a static file in the `public/` directory, create a `src/pages/robots.txt.ts` file and add the following code:

src/pages/robots.txt.ts

    import type { APIRoute } from 'astro';
    const getRobotsTxt = (sitemapURL: URL) => `User-agent: *Allow: /
    Sitemap: ${sitemapURL.href}`;
    export const GET: APIRoute = ({ site }) => {  const sitemapURL = new URL('sitemap-index.xml', site);  return new Response(getRobotsTxt(sitemapURL));};

Configuration
-------------

[Section titled Configuration](#configuration)

To configure this integration, pass an object to the `sitemap()` function in `astro.config.mjs`.

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  integrations: [    sitemap({      // configuration options    }),  ],});

### filter

[Section titled filter](#filter)

All pages are included in your sitemap by default. By adding a custom `filter` function, you can filter included pages by URL.

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  site: 'https://stargazers.club',  integrations: [    sitemap({      filter: (page) => page !== 'https://stargazers.club/secret-vip-lounge/',    }),  ],});

The function will be called for every page on your site. The `page` function parameter is the full URL of the page currently under consideration, including your `site` domain. Return `true` to include the page in your sitemap, and `false` to leave it out.

To filter multiple pages, add arguments with target URLs.

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  site: 'https://stargazers.club',  integrations: [    sitemap({      filter: (page) =>        page !== 'https://stargazers.club/secret-vip-lounge-1/' &&        page !== 'https://stargazers.club/secret-vip-lounge-2/' &&        page !== 'https://stargazers.club/secret-vip-lounge-3/' &&        page !== 'https://stargazers.club/secret-vip-lounge-4/',    }),  ],});

### customPages

[Section titled customPages](#custompages)

In some cases, a page might be part of your deployed site but not part of your Astro project. If you’d like to include a page in your sitemap that _isn’t_ created by Astro, you can use this option.

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  site: 'https://stargazers.club',  integrations: [    sitemap({      customPages: ['https://stargazers.club/external-page', 'https://stargazers.club/external-page2'],    }),  ],});

### entryLimit

[Section titled entryLimit](#entrylimit)

The maximum number entries per sitemap file. The default value is 45000. A sitemap index and multiple sitemaps are created if you have more entries. See this [explanation of splitting up a large sitemap](https://developers.google.com/search/docs/advanced/sitemaps/large-sitemaps).

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  site: 'https://stargazers.club',  integrations: [    sitemap({      entryLimit: 10000,    }),  ],});

### changefreq, lastmod, and priority

[Section titled changefreq, lastmod, and priority](#changefreq-lastmod-and-priority)

These options correspond to the `<changefreq>`, `<lastmod>`, and `<priority>` tags in the [Sitemap XML specification.](https://www.sitemaps.org/protocol.html)

Note that `changefreq` and `priority` are ignored by Google.

Note

Due to limitations of Astro’s [Integration API](/en/reference/integrations-reference/), this integration can’t analyze a given page’s source code. This configuration option can set `changefreq`, `lastmod` and `priority` on a _site-wide_ basis; see the next option **serialize** for how you can set these values on a per-page basis.

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  site: 'https://stargazers.club',  integrations: [    sitemap({      changefreq: 'weekly',      priority: 0.7,      lastmod: new Date('2022-02-24'),    }),  ],});

### serialize

[Section titled serialize](#serialize)

A function called for each sitemap entry just before writing to a disk. This function can be asynchronous.

It receives as its parameter a `SitemapItem` object that can have these properties:

*   `url` (absolute page URL). This is the only property that is guaranteed to be on `SitemapItem`.
*   `changefreq`
*   `lastmod` (ISO formatted date, `String` type)
*   `priority`
*   `links`.

This `links` property contains a `LinkItem` list of alternate pages including a parent page.

The `LinkItem` type has two fields: `url` (the fully-qualified URL for the version of this page for the specified language) and `lang` (a supported language code targeted by this version of the page).

The `serialize` function should return `SitemapItem`, touched or not.

The example below shows the ability to add sitemap specific properties individually.

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  site: 'https://stargazers.club',  integrations: [    sitemap({      serialize(item) {        if (/exclude-from-sitemap/.test(item.url)) {          return undefined;        }        if (/your-special-page/.test(item.url)) {          item.changefreq = 'daily';          item.lastmod = new Date();          item.priority = 0.9;        }        return item;      },    }),  ],});

### i18n

[Section titled i18n](#i18n)

To localize a sitemap, pass an object to this `i18n` option.

This object has two required properties:

*   `defaultLocale`: `String`. Its value must exist as one of `locales` keys.
*   `locales`: `Record<String, String>`, key/value - pairs. The key is used to look for a locale part in a page path. The value is a language attribute, only English alphabet and hyphen allowed.

[Read more about language attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang).

[Read more about localization](https://developers.google.com/search/docs/advanced/crawling/localized-versions#all-method-guidelines).

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  site: 'https://stargazers.club',  integrations: [    sitemap({      i18n: {        defaultLocale: 'en', // All urls that don't contain `es` or `fr` after `https://stargazers.club/` will be treated as default locale, i.e. `en`        locales: {          en: 'en-US', // The `defaultLocale` value must present in `locales` keys          es: 'es-ES',          fr: 'fr-CA',        },      },    }),  ],});

The resulting sitemap looks like this:

sitemap-0.xml

    ...  <url>    <loc>https://stargazers.club/</loc>    <xhtml:link rel="alternate" hreflang="en-US" href="https://stargazers.club/"/>    <xhtml:link rel="alternate" hreflang="es-ES" href="https://stargazers.club/es/"/>    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://stargazers.club/fr/"/>  </url>  <url>    <loc>https://stargazers.club/es/</loc>    <xhtml:link rel="alternate" hreflang="en-US" href="https://stargazers.club/"/>    <xhtml:link rel="alternate" hreflang="es-ES" href="https://stargazers.club/es/"/>    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://stargazers.club/fr/"/>  </url>  <url>    <loc>https://stargazers.club/fr/</loc>    <xhtml:link rel="alternate" hreflang="en-US" href="https://stargazers.club/"/>    <xhtml:link rel="alternate" hreflang="es-ES" href="https://stargazers.club/es/"/>    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://stargazers.club/fr/"/>  </url>  <url>    <loc>https://stargazers.club/es/second-page/</loc>    <xhtml:link rel="alternate" hreflang="es-ES" href="https://stargazers.club/es/second-page/"/>    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://stargazers.club/fr/second-page/"/>    <xhtml:link rel="alternate" hreflang="en-US" href="https://stargazers.club/second-page/"/>  </url>...

### xslURL

[Section titled xslURL](#xslurl)

The URL of an XSL stylesheet to style and prettify your sitemap.

The value set can be either a path relative to your configured `site` URL for a local stylesheet, or can be an absolute URL link to an external stylesheet.

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  site: 'https://example.com',  integrations: [    sitemap({      xslURL: '/sitemap.xsl'    }),  ],});

### filenameBase

[Section titled filenameBase](#filenamebase)

The name prefix string used when generating the sitemap XML files. The default value is `sitemap`.

This option may be useful when integrating an Astro site into a domain with preexisting sitemap files.

astro.config.mjs

    import { defineConfig } from 'astro/config';import sitemap from '@astrojs/sitemap';
    export default defineConfig({  site: 'https://stargazers.club',  integrations: [    sitemap({      filenameBase: 'astronomy-sitemap'    }),  ],});

The given configuration will generate sitemap files at `https://stargazers.club/astronomy-sitemap-0.xml` and `https://stargazers.club/astronomy-sitemap-index.xml`.

Examples
--------

[Section titled Examples](#examples)

*   The official Astro website uses Astro Sitemap to generate [its sitemap](https://astro.build/sitemap-index.xml).
*   [Browse projects with Astro Sitemap on GitHub](https://github.com/search?q=%22%40astrojs%2Fsitemap%22+path%3Apackage.json&type=Code) for more examples!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/sitemap.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Partytown](/en/guides/integrations-guide/partytown/) [Next  
Publish to NPM](/en/reference/publish-to-npm/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/solid-js
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

# Aggregated from ./pages/guides/integrations-guide/svelte
@astrojs/ svelte
================

v7.1.0 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/svelte/) [npm](https://www.npmjs.com/package/@astrojs/svelte) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/svelte/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** enables rendering and client-side hydration for your [Svelte](https://svelte.dev/) 5 components. For Svelte 3 and 4 support, install `@astrojs/svelte@5` instead.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

To install `@astrojs/svelte`, run the following from your project directory and follow the prompts:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3295)
*   [pnpm](#tab-panel-3296)
*   [Yarn](#tab-panel-3297)

Terminal window

    npx astro add svelte

Terminal window

    pnpm astro add svelte

Terminal window

    yarn astro add svelte

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/svelte` package:

*   [npm](#tab-panel-3298)
*   [pnpm](#tab-panel-3299)
*   [Yarn](#tab-panel-3300)

Terminal window

    npm install @astrojs/svelte

Terminal window

    pnpm add @astrojs/svelte

Terminal window

    yarn add @astrojs/svelte

Most package managers will install associated peer dependencies as well. If you see a `Cannot find package 'svelte'` (or similar) warning when you start up Astro, you’ll need to install Svelte and TypeScript:

*   [npm](#tab-panel-3301)
*   [pnpm](#tab-panel-3302)
*   [Yarn](#tab-panel-3303)

Terminal window

    npm install svelte typescript

Terminal window

    pnpm add svelte typescript

Terminal window

    yarn add svelte typescript

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import svelte from '@astrojs/svelte';
    export default defineConfig({  // ...  integrations: [svelte()],});

And create a new file called `svelte.config.js` in your project root directory and add the following code:

svelte.config.js

    import { vitePreprocess } from '@astrojs/svelte';
    export default {  preprocess: vitePreprocess(),}

Getting started
---------------

[Section titled Getting started](#getting-started)

To use your first Svelte component in Astro, head to our [UI framework documentation](/en/guides/framework-components/#using-framework-components). You’ll explore:

*   📦 how framework components are loaded,
*   💧 client-side hydration options, and
*   🤝 opportunities to mix and nest frameworks together

Options
-------

[Section titled Options](#options)

This integration is powered by `@sveltejs/vite-plugin-svelte`. To customize the Svelte compiler, options can be provided to the integration. See the [`@sveltejs/vite-plugin-svelte` docs](https://github.com/sveltejs/vite-plugin-svelte/blob/HEAD/docs/config.md) for more details.

You can set options either by passing them to the `svelte` integration in `astro.config.mjs` or in `svelte.config.js`. The options in `astro.config.mjs` will take precedence over the options in `svelte.config.js` if both are present:

astro.config.mjs

    import { defineConfig } from 'astro/config';import svelte from '@astrojs/svelte';
    export default defineConfig({  integrations: [svelte({ extensions: ['.svelte'] })],});

svelte.config.js

    export default {  extensions: ['.svelte'],};

Preprocessors
-------------

[Section titled Preprocessors](#preprocessors)

**Added in:** `@astrojs/svelte@2.0.0`

If you’re using SCSS or Stylus in your Svelte files, you can create a `svelte.config.js` file so that they are preprocessed by Svelte, and the Svelte IDE extension can correctly parse the Svelte files.

svelte.config.js

    import { vitePreprocess } from '@astrojs/svelte';
    export default {  preprocess: vitePreprocess(),};

This config file will be automatically added for you when you run `astro add svelte`. See the [`@sveltejs/vite-plugin-svelte` docs](https://github.com/sveltejs/vite-plugin-svelte/blob/HEAD/docs/preprocess.md) for more details about `vitePreprocess`.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/svelte.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
SolidJS](/en/guides/integrations-guide/solid-js/) [Next  
Vue](/en/guides/integrations-guide/vue/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/tailwind
@astrojs/tailwind
=================

Deprecated

Tailwind CSS now offers a Vite plugin which is the preferred way to use Tailwind 4 in Astro.

To use Tailwind in Astro, follow the [styling guide for Tailwind](/en/guides/styling/#tailwind).

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/tailwind.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/integrations-guide/vercel
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

# Aggregated from ./pages/guides/integrations-guide/vue
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

