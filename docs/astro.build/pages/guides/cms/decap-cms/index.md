Decap CMS & Astro
=================

[Decap CMS](https://www.decapcms.org/) (formerly Netlify CMS) is an open-source, Git-based content management system.

Decap allows you to take full advantage of all of Astro’s features, including image optimization and content collections.

Decap adds a route (typically `/admin`) to your project that will load a React app to allow authorized users to manage content directly from the deployed website. Decap will commit changes directly to your Astro project’s source repository.

Installing DecapCMS
-------------------

[Section titled Installing DecapCMS](#installing-decapcms)

There are two options for adding Decap to Astro:

1.  [Install Decap via a package manager](https://decapcms.org/docs/install-decap-cms/#installing-with-npm) with the following command:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3062)
    *   [pnpm](#tab-panel-3063)
    *   [Yarn](#tab-panel-3064)
    
    Terminal window
    
        npm install decap-cms-app
    
    Terminal window
    
        pnpm add decap-cms-app
    
    Terminal window
    
        yarn add decap-cms-app
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Import the package into a `<script>` tag in your page `<body>`
    
    /admin
    
        <body>  <!-- Include the script that builds the page and powers Decap CMS -->  <script src="https://unpkg.com/decap-cms@^3.1.2/dist/decap-cms.js"></script></body>
    

Configuration
-------------

[Section titled Configuration](#configuration)

1.  Create a static admin folder at `public/admin/`
    
2.  Add `config.yml` to `public/admin/`:
    
    *   Directorypublic
        
        *   Directoryadmin
            
            *   config.yml
            
        
    
3.  To add support for content collections, configure each schema in `config.yml`. The following example configures a `blog` collection, defining a `label` for each entry’s frontmatter property:
    
    /public/admin/config.yml
    
        collections:  - name: "blog" # Used in routes, e.g., /admin/collections/blog    label: "Blog" # Used in the UI    folder: "src/content/blog" # The path to the folder where the documents are stored    create: true # Allow users to create new documents in this collection    fields: # The fields for each document, usually in frontmatter      - { label: "Layout", name: "layout", widget: "hidden", default: "blog" }      - { label: "Title", name: "title", widget: "string" }      - { label: "Publish Date", name: "date", widget: "datetime" }      - { label: "Featured Image", name: "thumbnail", widget: "image" }      - { label: "Rating (scale of 1-5)", name: "rating", widget: "number" }      - { label: "Body", name: "body", widget: "markdown" }
    
4.  Add the `admin` route for your React app in `src/pages/admin.html`.
    
    *   Directorypublic
        
        *   Directoryadmin
            
            *   config.yml
            
        
    *   Directorysrc
        
        *   Directorypages
            
            *   admin.html
            
        
    
    /src/pages/admin.html
    
        <!doctype html><html lang="en">  <head>    <meta charset="utf-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <meta name="robots" content="noindex" />    <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />    <title>Content Manager</title>  </head>  <body>    <script src="https://unpkg.com/decap-cms@^3.1.2/dist/decap-cms.js"></script>  </body></html>
    
5.  To enable media uploads to a specific folder via the Decap editor, add an appropriate path:
    
    /public/admin/config.yml
    
        media_folder: "src/assets/images" # Location where files will be stored in the repopublic_folder: "src/assets/images" # The src attribute for uploaded media
    

See [the Decap CMS configuration documentation](https://decapcms.org/docs/configure-decap-cms/) for full instructions and options.

Usage
-----

[Section titled Usage](#usage)

Navigate to `yoursite.com/admin/` to use the Decap CMS editor.

Authentication
--------------

[Section titled Authentication](#authentication)

### Decap CMS with Netlify Identity

[Section titled Decap CMS with Netlify Identity](#decap-cms-with-netlify-identity)

Decap CMS was originally developed by Netlify and has first class support for [Netlify Identity](https://docs.netlify.com/security/secure-access-to-sites/identity/).

When deploying to Netlify, configure Identity for your project via the Netlify dashboard and include the [Netlify Identity Widget](https://github.com/netlify/netlify-identity-widget) on the `admin` route of your project. Optionally include the Identity Widget on the homepage of your site if you plan to invite new users via email.

### Decap CMS with External OAuth Clients

[Section titled Decap CMS with External OAuth Clients](#decap-cms-with-external-oauth-clients)

When deploying to hosting providers other than Netlify, you must create your own OAuth routes.

In Astro, this can be done with on-demand rendered routes in your project configured with [an adapter](/en/guides/on-demand-rendering/) enabled.

See [Decap’s OAuth Docs](https://decapcms.org/docs/external-oauth-clients/) for a list of compatible community-maintained OAuth clients.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   Netlify Identity Template: [astro-decap-ssg-netlify](https://github.com/OliverSpeir/astro-decap-ssg-netlify-identity)
    
*   On-demand rendering OAuth Routes with Astro Template: [astro-decap-starter-ssr](https://github.com/OliverSpeir/astro-decap-starter-ssr)
    
*   Blog Post: [Author your Astro site’s content with Git-based CMSs](https://aalam.vercel.app/blog/astro-and-git-cms-netlify) by Aftab Alam
    
*   Youtube Tutorial: [Create a Custom Blog with Astro & NetlifyCMS in MINUTES!](https://www.youtube.com/watch?v=3yip2wSRX_4) by Kumail Pirzada
    

Production Sites
----------------

[Section titled Production Sites](#production-sites)

The following sites use Astro + Decap CMS in production:

*   [yunielacosta.com](https://www.yunielacosta.com/) by Yuniel Acosta — [source code on GitHub](https://github.com/yacosta738/yacosta738.github.io) (Netlify CMS)
*   [portfolioris.nl](https://www.portfolioris.nl/) by Joris Hulsbosch – [source code on GitHub](https://github.com/portfolioris/portfolioris.nl)

Themes
------

[Section titled Themes](#themes)

*    [![](/_astro/astros.CA8z6dbD_Z1fUXSm.webp) Astros](https://astro.build/themes/details/astros)
*    [![](/_astro/enhanced-astro-starter.BDAzOMVv_ghcL4.webp) Enhanced Astro Starter](https://astro.build/themes/details/enhanced-astro-starter)
*    [![](/_astro/astro-decap-starter.CuC8RtgM_IaqHQ.webp) Astro Decap CMS Starter](https://astro.build/themes/details/astro-decap-cms-starter)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/decap-cms.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
DatoCMS](/en/guides/cms/datocms/) [Next  
Directus](/en/guides/cms/directus/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)