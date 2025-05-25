ButterCMS & Astro
=================

[ButterCMS](https://buttercms.com/) is a headless CMS and blog engine that allows you to publish structured content to use in your project.

Integrating with Astro
----------------------

[Section titled Integrating with Astro](#integrating-with-astro)

Note

For a full blog site example, see the [Astro + ButterCMS Starter Project](https://buttercms.com/starters/astro-starter-project/).

In this section, we’ll use the [ButterCMS SDK](https://www.npmjs.com/package/buttercms) to bring your data into your Astro project. To get started, you will need to have the following:

### Prerequisites

[Section titled Prerequisites](#prerequisites)

1.  **An Astro project** - If you don’t have an Astro project yet, our [Installation guide](/en/install-and-setup/) will get you up and running in no time.
    
2.  **A ButterCMS account**. If you don’t have an account, you can [sign up](https://buttercms.com/join/) for a free trial.
    
3.  **Your ButterCMS API Token** - You can find your API Token on the [Settings](https://buttercms.com/settings/) page.
    

### Setup

[Section titled Setup](#setup)

1.  Create a `.env` file in the root of your project and add your API token as an environment variable:
    
    .env
    
        BUTTER_TOKEN=YOUR_API_TOKEN_HERE
    
    Tip
    
    Read more about [using environment variables](/en/guides/environment-variables/) and `.env` files in Astro.
    
2.  Install the ButterCMS SDK as a dependency:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3053)
    *   [pnpm](#tab-panel-3054)
    *   [Yarn](#tab-panel-3055)
    
    Terminal window
    
        npm install buttercms
    
    Terminal window
    
        pnpm add buttercms
    
    Terminal window
    
        yarn add buttercms
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
3.  Create a `buttercms.js` file in a new `src/lib/` directory in your project:
    
    src/lib/buttercms.js
    
        import Butter from "buttercms";
        export const butterClient = Butter(import.meta.env.BUTTER_TOKEN);
    

**This authenticates the SDK using your API Token and exports it to be used across your project.**

### Fetching Data

[Section titled Fetching Data](#fetching-data)

To fetch content, import this client and use one of its `retrieve` functions.

In this example, we [retrieve a collection](https://buttercms.com/docs/api/#retrieve-a-collection) that has three fields: a short text `name`, a number `price`, and a WYSIWYG `description`.

src/pages/ShopItem.astro

    ---import { butterClient } from "../lib/buttercms";const response = await butterClient.content.retrieve(["shopitem"]);
    interface ShopItem {  name: string,  price: number,  description: string,}
    const items = response.data.data.shopitem as ShopItem[];---<body>  {items.map(item => <div>    <h2>{item.name} - ${item.price}</h2>    <p set:html={item.description}></p>  </div>)}</body>

The interface mirrors the field types. The WYSIWYG `description` field loads as a string of HTML, and [`set:html`](/en/reference/directives-reference/#sethtml) lets you render it.

Similarly, you can [retrieve a page](https://buttercms.com/docs/api/#get-a-single-page) and display its fields:

src/pages/ShopItem.astro

    ---import { butterClient } from "../lib/buttercms";const response = await butterClient.page.retrieve("*", "simple-page");const pageData = response.data.data;
    interface Fields {  seo_title: string,  headline: string,  hero_image: string,}
    const fields = pageData.fields as Fields;---<html>  <title>{fields.seo_title}</title>  <body>    <h1>{fields.headline}</h1>    <img src={fields.hero_image} />  </body></html>

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   [Astro + ButterCMS Starter Project](https://buttercms.com/starters/astro-starter-project/)
*   The [full ButterCMS API documentation](https://buttercms.com/docs/api/)
*   ButterCMS’s [JavaScript Guide](https://buttercms.com/docs/api-client/javascript/)

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   Add yours!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/buttercms.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Builder.io](/en/guides/cms/builderio/) [Next  
Caisy](/en/guides/cms/caisy/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)