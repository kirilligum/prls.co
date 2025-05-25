Deploy your Astro Site with Deno
================================

You can deploy a static or on-demand rendered Astro site using Deno, either on your own server, or to [Deno Deploy](https://deno.com/deploy), a distributed system that runs JavaScript, TypeScript, and WebAssembly at the edge, worldwide.

This guide includes instructions for running your Astro site on your own server with Deno, and deploying to Deno Deploy through GitHub Actions or the Deno Deploy CLI.

Requirements
------------

[Section titled Requirements](#requirements)

This guide assumes you already have [Deno](https://deno.com/) installed.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

Your Astro project can be deployed as a static site, or as an on-demand rendered site.

### Static Site

[Section titled Static Site](#static-site)

Your Astro project is a static site by default. You don’t need any extra configuration to deploy a static Astro site with Deno, or to Deno Deploy.

### Adapter for on-demand rendering

[Section titled Adapter for on-demand rendering](#adapter-for-on-demand-rendering)

To enable on-demand rendering in your Astro project using Deno, and to deploy on Deno Deploy:

1.  Install [the `@deno/astro-adapter` adapter](https://github.com/denoland/deno-astro-adapter) to your project’s dependencies using your preferred package manager:
    
    *   [npm](#tab-panel-3126)
    *   [pnpm](#tab-panel-3127)
    *   [Yarn](#tab-panel-3128)
    
    Terminal window
    
        npm install @deno/astro-adapter
    
    Terminal window
    
        pnpm install @deno/astro-adapter
    
    Terminal window
    
        yarn add @deno/astro-adapter
    
2.  Update your `astro.config.mjs` project configuration file with the changes below.
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';import deno from '@deno/astro-adapter';
        export default defineConfig({  output: 'server',  adapter: deno(),});
    
3.  Update your `preview` script in `package.json` with the change below.
    
    package.json
    
        {  // ...  "scripts": {    "dev": "astro dev",    "start": "astro dev",    "build": "astro build",    "preview": "astro preview"    "preview": "deno run --allow-net --allow-read --allow-env ./dist/server/entry.mjs"  }}
    
    You can now use this command to preview your production Astro site locally with Deno.
    
    *   [npm](#tab-panel-3129)
    *   [pnpm](#tab-panel-3130)
    *   [Yarn](#tab-panel-3131)
    
    Terminal window
    
        npm run preview
    
    Terminal window
    
        pnpm run preview
    
    Terminal window
    
        yarn run preview
    

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

You can run your Astro site on your own server, or deploy to Deno Deploy through GitHub Actions or using Deno Deploy’s CLI (command line interface).

### On your own server

[Section titled On your own server](#on-your-own-server)

1.  Copy your project onto your server.
    
2.  Install the project dependencies using your preferred package manager:
    
    *   [npm](#tab-panel-3132)
    *   [pnpm](#tab-panel-3133)
    *   [Yarn](#tab-panel-3134)
    
    Terminal window
    
        npm install
    
    Terminal window
    
        pnpm install
    
    Terminal window
    
        yarn
    
3.  Build your Astro site with your preferred package manager:
    
    *   [npm](#tab-panel-3135)
    *   [pnpm](#tab-panel-3136)
    *   [Yarn](#tab-panel-3137)
    
    Terminal window
    
        npm run build
    
    Terminal window
    
        pnpm run build
    
    Terminal window
    
        yarn run build
    
4.  Start your application with the following command:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [Static](#tab-panel-3118)
    *   [On demand](#tab-panel-3119)
    
    Terminal window
    
        deno run -A jsr:@std/http/file-server dist
    
    Terminal window
    
        deno run -A ./dist/server/entry.mjs
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### GitHub Actions Deployment

[Section titled GitHub Actions Deployment](#github-actions-deployment)

If your project is stored on GitHub, the [Deno Deploy website](https://dash.deno.com/) will guide you through setting up GitHub Actions to deploy your Astro site.

1.  Push your code to a public or private GitHub repository.
    
2.  Sign in on [Deno Deploy](https://dash.deno.com/) with your GitHub account, and click on [New Project](https://dash.deno.com).
    
3.  Select your repository, the branch you want to deploy from, and select **GitHub Action** mode. (Your Astro site requires a build step, and cannot use Automatic mode.)
    
4.  In your Astro project, create a new file at `.github/workflows/deploy.yml` and paste in the YAML below. This is similar to the YAML given by Deno Deploy, with the additional steps needed for your Astro site.
    
    *   [Static](#tab-panel-3120)
    *   [On demand](#tab-panel-3121)
    
    .github/workflows/deploy.yml
    
        name: Deployon: [push]
        jobs:  deploy:    name: Deploy    runs-on: ubuntu-latest    permissions:      id-token: write # Needed for auth with Deno Deploy      contents: read # Needed to clone the repository
            steps:      - name: Clone repository        uses: actions/checkout@v4
              # Not using npm? Change `npm ci` to `yarn install` or `pnpm i`      - name: Install dependencies        run: npm ci
              # Not using npm? Change `npm run build` to `yarn build` or `pnpm run build`      - name: Build Astro        run: npm run build
              - name: Upload to Deno Deploy        uses: denoland/deployctl@v1        with:          project: my-deno-project # TODO: replace with Deno Deploy project name          entrypoint: jsr:@std/http/file-server          root: dist
    
    .github/workflows/deploy.yml
    
        name: Deployon: [push]
        jobs:  deploy:    name: Deploy    runs-on: ubuntu-latest    permissions:      id-token: write # Needed for auth with Deno Deploy      contents: read # Needed to clone the repository
            steps:      - name: Clone repository        uses: actions/checkout@v4
              # Not using npm? Change `npm ci` to `yarn install` or `pnpm i`      - name: Install dependencies        run: npm ci
              # Not using npm? Change `npm run build` to `yarn build` or `pnpm run build`      - name: Build Astro        run: npm run build
              - name: Upload to Deno Deploy        uses: denoland/deployctl@v1        with:          project: my-deno-project # TODO: replace with Deno Deploy project name          entrypoint: dist/server/entry.mjs
    
5.  After committing this YAML file, and pushing to GitHub on your configured deploy branch, the deploy should begin automatically!
    
    You can track the progress using the “Actions” tab on your GitHub repository page, or on [Deno Deploy](https://dash.deno.com).
    

### CLI Deployment

[Section titled CLI Deployment](#cli-deployment)

1.  Install the [Deno Deploy CLI](https://docs.deno.com/deploy/manual/deployctl).
    
    Terminal window
    
        deno install -gArf jsr:@deno/deployctl
    
2.  Build your Astro site with your preferred package manager:
    
    *   [npm](#tab-panel-3138)
    *   [pnpm](#tab-panel-3139)
    *   [Yarn](#tab-panel-3140)
    
    Terminal window
    
        npm run build
    
    Terminal window
    
        pnpm run build
    
    Terminal window
    
        yarn run build
    
3.  Run `deployctl` to deploy!
    
    *   [Static](#tab-panel-3122)
    *   [On demand](#tab-panel-3123)
    
    Terminal window
    
        cd dist && deployctl deploy jsr:@std/http/file-server
    
    Terminal window
    
        deployctl deploy ./dist/server/entry.mjs
    
    You can track all your deploys on [Deno Deploy](https://dash.deno.com).
    
4.  (Optional) To simplify the build and deploy into one command, add a `deploy-deno` script in `package.json`.
    
    *   [Static](#tab-panel-3124)
    *   [On demand](#tab-panel-3125)
    
    package.json
    
        {  // ...  "scripts": {  "dev": "astro dev",  "start": "astro dev",  "build": "astro build",  "preview": "astro preview",  "deno-deploy": "npm run build && cd dist && deployctl deploy jsr:@std/http/file-server"  }}
    
    package.json
    
        {  // ...  "scripts": {    "dev": "astro dev",    "start": "astro dev",    "build": "astro build",    "preview": "deno run --allow-net --allow-read --allow-env ./dist/server/entry.mjs",    "deno-deploy": "npm run build && deployctl deploy ./dist/server/entry.mjs"  }}
    
    Then you can use this command to build and deploy your Astro site in one step.
    
    Terminal window
    
        npm run deno-deploy
    

More Deployment Guides
----------------------

*   ![](/logos/netlify.svg)
    
    ### [Netlify](/en/guides/deploy/netlify/)
    
*   ![](/logos/vercel.svg)
    
    ### [Vercel](/en/guides/deploy/vercel/)
    
*   ![](/logos/deno.svg)
    
    ### [Deno Deploy](/en/guides/deploy/deno/)
    
*   ![](/logos/github.svg)
    
    ### [GitHub Pages](/en/guides/deploy/github/)
    
*   ![](/logos/gitlab.svg)
    
    ### [GitLab Pages](/en/guides/deploy/gitlab/)
    
*   ![](/logos/cloudflare-pages.svg)
    
    ### [Cloudflare Pages](/en/guides/deploy/cloudflare/)
    
*   ![](/logos/aws.svg)
    
    ### [AWS](/en/guides/deploy/aws/)
    
*   ![](/logos/flightcontrol.svg)
    
    ### [AWS via Flightcontrol](/en/guides/deploy/flightcontrol/)
    
*   ![](/logos/sst.svg)
    
    ### [AWS via SST](/en/guides/deploy/sst/)
    
*   ![](/logos/clever-cloud.svg)
    
    ### [Clever Cloud](/en/guides/deploy/clever-cloud/)
    
*   ![](/logos/azion.svg)
    
    ### [Azion](/en/guides/deploy/azion/)
    
*   ![](/logos/google-cloud.svg)
    
    ### [Google Cloud](/en/guides/deploy/google-cloud/)
    
*   ![](/logos/firebase.svg)
    
    ### [Google Firebase](/en/guides/deploy/google-firebase/)
    
*   ![](/logos/heroku.svg)
    
    ### [Heroku](/en/guides/deploy/heroku/)
    
*   ![](/logos/microsoft-azure.svg)
    
    ### [Microsoft Azure](/en/guides/deploy/microsoft-azure/)
    
*   ![](/logos/buddy.svg)
    
    ### [Buddy](/en/guides/deploy/buddy/)
    
*   ![](/logos/edgio.svg)
    
    ### [Edgio](/en/guides/deploy/edgio/)
    
*   ![](/logos/fleek.svg)
    
    ### [Fleek](/en/guides/deploy/fleek/)
    
*   ![](/logos/flyio.svg)
    
    ### [Fly.io](/en/guides/deploy/flyio/)
    
*   ![](/logos/render.svg)
    
    ### [Render](/en/guides/deploy/render/)
    
*   ![](/logos/stormkit.svg)
    
    ### [Stormkit](/en/guides/deploy/stormkit/)
    
*   ![](/logos/surge.svg)
    
    ### [Surge](/en/guides/deploy/surge/)
    
*   ![](/logos/cleavr.svg)
    
    ### [Cleavr](/en/guides/deploy/cleavr/)
    
*   ![](/logos/kinsta.svg)
    
    ### [Kinsta](/en/guides/deploy/kinsta/)
    
*   ![](/logos/zeabur.svg)
    
    ### [Zeabur](/en/guides/deploy/zeabur/)
    
*   ![](/logos/zerops.svg)
    
    ### [Zerops](/en/guides/deploy/zerops/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/deno.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Cloudflare](/en/guides/deploy/cloudflare/) [Next  
Edgio](/en/guides/deploy/edgio/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)