Deploy your Astro Site to Zerops
================================

[Zerops](https://zerops.io/) is a dev-first cloud platform that can be used to deploy both Static and SSR Astro site.

This guide will walk you through setting up and deploying both Static and SSR Astro sites on Zerops.

Astro x Zerops Quickrun

Want to test running Astro on Zerops without installing or setting up anything? Using repositories [Zerops x Astro - Static](https://github.com/zeropsio/recipe-astro-static) or [Zerops x Astro - SSR on Node.js](https://github.com/zeropsio/recipe-astro-nodejs) you can deploy example Astro site with a single click.

Running apps on Zerops requires two steps:

1.  Creating a project
2.  Triggering build & deploy pipeline

Note

One Zerops project can contain multiple Astro sites.

Astro Static site on Zerops
---------------------------

[Section titled Astro Static site on Zerops](#astro-static-site-on-zerops)

### Creating a project and a service for Astro Static

[Section titled Creating a project and a service for Astro Static](#creating-a-project-and-a-service-for-astro-static)

Projects and services can be added either through a [`Project add`](https://app.zerops.io/dashboard/project-add) wizard or imported using a yaml structure:

    # see https://docs.zerops.io/references/import for full referenceproject:  name: recipe-astroservices:  - hostname: app    type: static

This will create a project called `recipe-astro` with a Zerops Static service called `app`.

### Deploying your Astro Static site

[Section titled Deploying your Astro Static site](#deploying-your-astro-static-site)

To tell Zerops how to build and run your site, add a `zerops.yml` to your repository:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3173)
*   [pnpm](#tab-panel-3174)
*   [Yarn](#tab-panel-3175)

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - npm i        - npm build      deployFiles:        - dist/~    run:      base: static

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - pnpm i        - pnpm build      deployFiles:        - dist/~    run:      base: static

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - yarn        - yarn build      deployFiles:        - dist/~    run:      base: static

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Now you can [trigger the build & deploy pipeline using the Zerops CLI](#trigger-the-pipeline-using-zerops-cli-zcli) or by connecting the `app` service with your [GitHub](https://docs.zerops.io/references/github-integration/) / [GitLab](https://docs.zerops.io/references/gitlab-integration) repository from inside the service detail.

Astro SSR site on Zerops
------------------------

[Section titled Astro SSR site on Zerops](#astro-ssr-site-on-zerops)

### Update scripts

[Section titled Update scripts](#update-scripts)

Update your `start` script to run the server output from the Node adapter.

package.json

    "scripts": {  "start": "node ./dist/server/entry.mjs",}

### Creating a project and a service for Astro SSR (Node.js)

[Section titled Creating a project and a service for Astro SSR (Node.js)](#creating-a-project-and-a-service-for-astro-ssr-nodejs)

Projects and services can be added either through a [`Project add`](https://app.zerops.io/dashboard/project-add) wizard or imported using a yaml structure:

    # see https://docs.zerops.io/references/import for full referenceproject:  name: recipe-astroservices:  - hostname: app    type: nodejs@20

This will create a project called `recipe-astro` with Zerops Node.js service called `app`.

### Deploying your Astro SSR site

[Section titled Deploying your Astro SSR site](#deploying-your-astro-ssr-site)

To tell Zerops how to build and run your site using the official [Astro Node.js adapter](/en/guides/integrations-guide/node/) in `standalone` mode, add a `zerops.yml` file to your repository:

*   [npm](#tab-panel-3176)
*   [pnpm](#tab-panel-3177)
*   [Yarn](#tab-panel-3178)

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - npm i        - npm run build      deployFiles:        - dist        - package.json        - node_modules    run:      base: nodejs@20      ports:        - port: 3000          httpSupport: true      envVariables:        PORT: 3000        HOST: 0.0.0.0      start: npm start

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - pnpm i        - pnpm run build      deployFiles:        - dist        - package.json        - node_modules    run:      base: nodejs@20      ports:        - port: 3000          httpSupport: true      envVariables:        PORT: 3000        HOST: 0.0.0.0      start: pnpm start

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - yarn        - yarn build      deployFiles:        - dist        - package.json        - node_modules    run:      base: nodejs@20      ports:        - port: 3000          httpSupport: true      envVariables:        PORT: 3000        HOST: 0.0.0.0      start: yarn start

Now you can [trigger the build & deploy pipeline using the Zerops CLI](#trigger-the-pipeline-using-zerops-cli-zcli) or by connecting the `app` service with your [GitHub](https://docs.zerops.io/references/github-integration/) / [GitLab](https://docs.zerops.io/references/gitlab-integration) repository from inside the service detail.

Trigger the pipeline using Zerops CLI (zcli)
--------------------------------------------

[Section titled Trigger the pipeline using Zerops CLI (zcli)](#trigger-the-pipeline-using-zerops-cli-zcli)

1.  Install the Zerops CLI.
    
    Terminal window
    
        # To download the zcli binary directly,# use https://github.com/zeropsio/zcli/releasesnpm i -g @zerops/zcli
    
2.  Open [`Settings > Access Token Management`](https://app.zerops.io/settings/token-management) in the Zerops app and generate a new access token.
    
3.  Log in using your access token with the following command:
    
    Terminal window
    
        zcli login <token>
    
4.  Navigate to the root of your app (where `zerops.yml` is located) and run the following command to trigger the deploy:
    
    Terminal window
    
        zcli push
    

Resources
---------

[Section titled Resources](#resources)

### Official

[Section titled Official](#official)

*   [Create Zerops account](https://app.zerops.io/registration)
*   [Zerops Documentation](https://docs.zerops.io)
*   [Zerops Astro recipe](https://app.zerops.io/recipe/astro)

### Community

[Section titled Community](#community)

*   [Deploying Astro to Zerops in 3 mins](https://medium.com/@arjunaditya/how-to-deploy-astro-to-zerops-4230816a62b4)
*   [Deploying Astro SSG with Node.js on Zerops with One Click Deploy](https://youtu.be/-4KTa4VWtBE)
*   [Deploying Astro SSR with Node.js on Zerops with One Click Deploy](https://youtu.be/eR6b_JnDH6g)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/zerops.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Zeabur](/en/guides/deploy/zeabur/) [Next  
CMS overview](/en/guides/cms/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)