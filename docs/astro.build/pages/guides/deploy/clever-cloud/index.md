Deploy your Astro Site to Clever Cloud
======================================

[Clever Cloud](https://clever-cloud.com) is a European cloud platform that provides automated, scalable services.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

You can deploy both fully static and on-demand rendered Astro projects on Clever Cloud. Regardless of your `output` mode (pre-rendered or [on-demand](/en/guides/on-demand-rendering/)), you can choose to deploy as a **static application** which runs using a post-build hook, or as a **Node.js** application, which requires some manual configuration in your `package.json`.

### Scripts

[Section titled Scripts](#scripts)

If you’re running an on-demand Node.js application, update your `start` script to run the Node server. Applications on Clever Cloud listen on port **8080**.

package.json

    "scripts": {  "start": "node ./dist/server/entry.mjs --host 0.0.0.0 --port 8080",}

Deploy Astro from the Console
-----------------------------

[Section titled Deploy Astro from the Console](#deploy-astro-from-the-console)

To deploy your Astro project to Clever Cloud, you will need to **create a new application**. The application wizard will walk you through the necessary configuration steps.

1.  From the lateral menubar, click **Create** > **An application**
    
2.  Choose how to deploy:
    
    *   **Create a brand new app**: to deploy from a local repository with Git
    
    or
    
    *   **Select a GitHub repository**: to deploy from GitHub
3.  Select a **Node.js** application, or a **static** one.
    
4.  Set up the minimal size for your instance and scalability options. Astro sites can typically be deployed using the **Nano** instance. Depending on your project’s specifications and dependencies, you may need to adjust accordingly as you watch the metrics from the **Overview** page.
    
5.  Select a **region** to deploy your instance.
    
6.  Skip [connecting **Add-ons** to your Clever application](https://www.clever-cloud.com/developers/doc/addons/) unless you’re using a database or Keycloak.
    
7.  Inject **environment variables**:
    
    *   For **Node.js**, no specific environment variable is needed to deploy Astro if you’re using **npm**. If you’re using **yarn** or **pnpm**, set the following environment variables:
    
    *   [pnpm](#tab-panel-3141)
    *   [yarn](#tab-panel-3142)
    
    Terminal window
    
        CC_NODE_BUILD_TOOL="custom"CC_PRE_BUILD_HOOK="npm install -g pnpm && pnpm install"CC_CUSTOM_BUILD_TOOL="pnpm run astro telemetry disable && pnpm build"
    
    Terminal window
    
        CC_NODE_BUILD_TOOL="yarn"CC_PRE_BUILD_HOOK="yarn && yarn run astro telemetry disable && yarn build"
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
    
    *   For a **static** application, add these variables:
    
    *   [npm](#tab-panel-3143)
    *   [pnpm](#tab-panel-3144)
    *   [yarn](#tab-panel-3145)
    
    Terminal window
    
        CC_POST_BUILD_HOOK="npm run build"CC_PRE_BUILD_HOOK="npm install && npm run astro telemetry disable"CC_WEBROOT="/dist"
    
    Terminal window
    
        CC_POST_BUILD_HOOK="pnpm build"CC_PRE_BUILD_HOOK="npm install -g pnpm && pnpm install && pnpm run astro telemetry disable"CC_WEBROOT="/dist"
    
    Terminal window
    
        CC_POST_BUILD_HOOK="yarn build"CC_PRE_BUILD_HOOK="yarn && yarn run astro telemetry disable"CC_WEBROOT="/dist"
    
8.  **Deploy!** If you’re deploying from **GitHub**, your deployment should start automatically. If you’re using **Git**, copy the remote and push on the **master** branch.
    

Other Branches

To deploy from branches other than `master`, use `git push clever <branch>:master`.

For example, if you want to deploy your local `main` branch without renaming it, use `git push clever main:master`.

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   [Clever Cloud documentation for deploying a Node.js application](https://www.clever-cloud.com/developers/doc/applications/javascript/nodejs/)
*   [Clever Cloud documentation for deploying Astro as a static application](https://www.clever-cloud.com/developers/guides/astro/)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/clever-cloud.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Cleavr](/en/guides/deploy/cleavr/) [Next  
Cloudflare](/en/guides/deploy/cloudflare/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)