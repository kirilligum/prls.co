Tina CMS & Astro
================

[Tina CMS](https://tina.io/) is a Git-backed headless content management system.

Integrating with Astro
----------------------

[Section titled Integrating with Astro](#integrating-with-astro)

To get started, you’ll need an existing Astro project.

1.  Run the following command to install Tina into your Astro project.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3101)
    *   [pnpm](#tab-panel-3102)
    *   [Yarn](#tab-panel-3103)
    
    Terminal window
    
        npx @tinacms/cli@latest init
    
    Terminal window
    
        pnpm dlx @tinacms/cli@latest init
    
    Terminal window
    
        yarn dlx @tinacms/cli@latest init
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
    
    *   When prompted for a Cloud ID, press Enter to skip. You’ll generate one later if you want to use Tina Cloud.
    *   When prompted “What framework are you using”, choose **Other**.
    *   When asked where public assets are stored, press Enter.
    
    After this has finished, you should now have a `.tina` folder in the root of your project and a generated `hello-world.md` file at `content/posts`.
    
2.  Change the `dev` script in `package.json`:
    
    *   [npm](#tab-panel-3104)
    *   [pnpm](#tab-panel-3105)
    *   [Yarn](#tab-panel-3106)
    
    package.json
    
        {    "scripts": {        "dev": "astro dev",        "dev": "tinacms dev -c \"astro dev\""    }}
    
    package.json
    
        {    "scripts": {        "dev": "astro dev",        "dev": "tinacms dev -c \"astro dev\""    }}
    
    package.json
    
        {    "scripts": {        "dev": "astro dev",        "dev": "tinacms dev -c \"astro dev\""    }}
    
3.  TinaCMS is now set up in local mode. Test this by running the `dev` script, then navigating to `/admin/index.html#/collections/post`.
    
    Editing the “Hello, World!” post will update the `content/posts/hello-world.md` file in your project directory.
    
4.  Set up your Tina collections by editing the `schema.collections` property in `.tina/config.ts`.
    
    For example, you can add a required “date posted” frontmatter property to our posts:
    
    .tina/config.ts
    
        import { defineConfig } from "tinacms";
        // Your hosting provider likely exposes this as an environment variableconst branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
        export default defineConfig({  branch,  clientId: null, // Get this from tina.io  token: null, // Get this from tina.io  build: {    outputFolder: "admin",    publicFolder: "public",  },  media: {    tina: {      mediaRoot: "images",      publicFolder: "public",    },  },  schema: {    collections: [      {        name: "posts",        label: "Posts",        path: "src/content/posts",        format: 'mdx',        fields: [          {            type: "string",            name: "title",            label: "Title",            isTitle: true,            required: true,          },          {            type: "datetime",            name: "posted",            label: "Date Posted",            required: true,          },          {            type: "rich-text",            name: "body",            label: "Body",            isBody: true,          },        ],      },    ],  },});
    
    Learn more about Tina collections [in the Tina docs](https://tina.io/docs/reference/collections/).
    
5.  In production, TinaCMS can commit changes directly to your GitHub repository. To set up TinaCMS for production, you can choose to use [Tina Cloud](https://tina.io/docs/tina-cloud/) or self-host the [Tina Data Layer](https://tina.io/docs/self-hosted/overview/). You can [read more about registering for Tina Cloud](https://app.tina.io/register) in the Tina Docs.
    

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   [TinaCMS Astro integration guide](https://tina.io/docs/frameworks/astro/).

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [Astro Tina Starter with visual editing](https://github.com/dawaltconley/tina-astro) by Jeff See + Dylan Awalt-Conley
*   [Astro Tina Starter with basic editing](https://github.com/tombennet/astro-tina-starter/tree/main) by Tom Bennet
*   [Using Astro’s Image Optimization with Tina](https://joschua.io/posts/2023/08/16/how-to-use-astro-assets-with-tina-cms/)

Themes
------

[Section titled Themes](#themes)

*    [![](/_astro/resume01.CAukhX1f_183P41.webp) Resume01](https://astro.build/themes/details/resume01/)

More CMS guides
---------------

*   ![](/logos/apostrophecms.svg)
    
    ### [Apostrophe](/en/guides/cms/apostrophecms/)
    
*   ![](/logos/builderio.svg)
    
    ### [Builder.io](/en/guides/cms/builderio/)
    
*   ![](/logos/buttercms.svg)
    
    ### [ButterCMS](/en/guides/cms/buttercms/)
    
*   ![](/logos/caisy.svg)
    
    ### [Caisy](/en/guides/cms/caisy/)
    
*   ![](/logos/cloudcannon.svg)
    
    ### [CloudCannon](/en/guides/cms/cloudcannon/)
    
*   ![](/logos/contentful.svg)
    
    ### [Contentful](/en/guides/cms/contentful/)
    
*   ![](/logos/cosmic.svg)
    
    ### [Cosmic](/en/guides/cms/cosmic/)
    
*   ![](/logos/craft-cms.svg)
    
    ### [Craft CMS](/en/guides/cms/craft-cms/)
    
*   ![](/logos/crystallize.svg)
    
    ### [Crystallize](/en/guides/cms/crystallize/)
    
*   ![](/logos/datocms.svg)
    
    ### [DatoCMS](/en/guides/cms/datocms/)
    
*   ![](/logos/decap-cms.svg)
    
    ### [Decap CMS](/en/guides/cms/decap-cms/)
    
*   ![](/logos/directus.svg)
    
    ### [Directus](/en/guides/cms/directus/)
    
*   ![](/logos/drupal.svg)
    
    ### [Drupal](/en/guides/cms/drupal/)
    
*   ![](/logos/flotiq.svg)
    
    ### [Flotiq](/en/guides/cms/flotiq/)
    
*   ![](/logos/frontmatter-cms.svg)
    
    ### [Front Matter CMS](/en/guides/cms/frontmatter-cms/)
    
*   ![](/logos/ghost.png)
    
    ### [Ghost](/en/guides/cms/ghost/)
    
*   ![](/logos/gitcms.svg)
    
    ### [GitCMS](/en/guides/cms/gitcms/)
    
*   ![](/logos/hashnode.png)
    
    ### [Hashnode](/en/guides/cms/hashnode/)
    
*   ![](/logos/hygraph.svg)
    
    ### [Hygraph](/en/guides/cms/hygraph/)
    
*   ![](/logos/keystatic.svg)
    
    ### [Keystatic](/en/guides/cms/keystatic/)
    
*   ![](/logos/keystonejs.svg)
    
    ### [KeystoneJS](/en/guides/cms/keystonejs/)
    
*   ![](/logos/kontent-ai.svg)
    
    ### [Kontent.ai](/en/guides/cms/kontent-ai/)
    
*   ![](/logos/microcms.svg)
    
    ### [microCMS](/en/guides/cms/microcms/)
    
*   ![](/logos/payload.svg)
    
    ### [Payload CMS](/en/guides/cms/payload/)
    
*   ![](/logos/preprcms.svg)
    
    ### [Prepr CMS](/en/guides/cms/preprcms/)
    
*   ![](/logos/prismic.svg)
    
    ### [Prismic](/en/guides/cms/prismic/)
    
*   ![](/logos/sanity.svg)
    
    ### [Sanity](/en/guides/cms/sanity/)
    
*   ![](/logos/sitecore.svg)
    
    ### [Sitecore XM](/en/guides/cms/sitecore/)
    
*   ![](/logos/spinal.svg)
    
    ### [Spinal](/en/guides/cms/spinal/)
    
*   ![](/logos/statamic.svg)
    
    ### [Statamic](/en/guides/cms/statamic/)
    
*   ![](/logos/storyblok.svg)
    
    ### [Storyblok](/en/guides/cms/storyblok/)
    
*   ![](/logos/strapi.svg)
    
    ### [Strapi](/en/guides/cms/strapi/)
    
*   ![](/logos/studiocms.svg)
    
    ### [StudioCMS](/en/guides/cms/studiocms/)
    
*   ![](/logos/tina-cms.svg)
    
    ### [Tina CMS](/en/guides/cms/tina-cms/)
    
*   ![](/logos/umbraco.svg)
    
    ### [Umbraco](/en/guides/cms/umbraco/)
    
*   ![](/logos/wordpress.svg)
    
    ### [WordPress](/en/guides/cms/wordpress/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/tina-cms.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
StudioCMS](/en/guides/cms/studiocms/) [Next  
Umbraco](/en/guides/cms/umbraco/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)