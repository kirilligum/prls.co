Keystatic & Astro
=================

[Keystatic](https://keystatic.com/) is an open source, headless content-management system that allows you to structure your content and sync it with GitHub.

Tip

If you’re starting a **new Astro + Keystatic project from scratch**, you can use the [Keystatic CLI](https://keystatic.com/docs/quick-start#keystatic-cli) to generate a new project in seconds:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3080)
*   [pnpm](#tab-panel-3081)
*   [Yarn](#tab-panel-3082)

Terminal window

    npm create @keystatic@latest

Terminal window

    pnpm create @keystatic@latest

Terminal window

    yarn create @keystatic

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Select the Astro template, and you’ll be ready to [deploy](#deploying-keystatic--astro)!

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

*   An existing Astro project [with an adapter configured](/en/guides/on-demand-rendering/).

Note

If you intend to sync Keystatic’s data with GitHub, you will also need **a GitHub account with `write` permissions** on the repository for this project.

Installing dependencies
-----------------------

[Section titled Installing dependencies](#installing-dependencies)

Add both the Markdoc (for content entries) and the React (for the Keystatic Admin UI Dashboard) integrations to your Astro project, using the `astro add` command for your package manager.

*   [npm](#tab-panel-3083)
*   [pnpm](#tab-panel-3084)
*   [Yarn](#tab-panel-3085)

Terminal window

    npx astro add react markdoc

Terminal window

    pnpm astro add react markdoc

Terminal window

    yarn astro add react markdoc

You will also need two Keystatic packages:

*   [npm](#tab-panel-3086)
*   [pnpm](#tab-panel-3087)
*   [Yarn](#tab-panel-3088)

Terminal window

    npm install @keystatic/core @keystatic/astro

Terminal window

    pnpm add @keystatic/core @keystatic/astro

Terminal window

    yarn add @keystatic/core @keystatic/astro

Adding the Astro integration
----------------------------

[Section titled Adding the Astro integration](#adding-the-astro-integration)

Add the Astro integration from `@keystatic/astro` in your Astro config file:

astro.config.mjs

    import { defineConfig } from 'astro/config'
    import react from '@astrojs/react'import markdoc from '@astrojs/markdoc'import keystatic from '@keystatic/astro'
    // https://astro.build/configexport default defineConfig({  integrations: [react(), markdoc(), keystatic()],  output: 'static',})

Creating a Keystatic config file
--------------------------------

[Section titled Creating a Keystatic config file](#creating-a-keystatic-config-file)

A Keystatic config file is required to define your content schema. This file will also allow you to connect a project to a specific GitHub repository (if you decide to do so).

Create a file called `keystatic.config.ts` in the root of the project and add the following code to define both your storage type (`local`) and a single content collection (`posts`):

keystatic.config.ts

    import { config, fields, collection } from '@keystatic/core';
    export default config({  storage: {    kind: 'local',  },
      collections: {    posts: collection({      label: 'Posts',      slugField: 'title',      path: 'src/content/posts/*',      format: { contentField: 'content' },      schema: {        title: fields.slug({ name: { label: 'Title' } }),        content: fields.markdoc({          label: 'Content',        }),      },    }),  },});

Already using content collections?

If you are already using [content collections](/en/guides/content-collections/) in your Astro project, then update the schema above to exactly match the collection(s) defined in your existing schema.

Keystatic is now configured to manage your content based on your schema.

Running Keystatic locally
-------------------------

[Section titled Running Keystatic locally](#running-keystatic-locally)

To launch your Keystatic Admin UI dashboard, start Astro’s dev server:

Terminal window

    npm run dev

Visit `http://127.0.0.1:4321/keystatic` in the browser to see the Keystatic Admin UI running.

Creating a new post
-------------------

[Section titled Creating a new post](#creating-a-new-post)

1.  In the Keystatic Admin UI dashboard, click on the “Posts” collection.
    
2.  Use the button to create a new post. Add the title “My First Post” and some content, then save the post.
    
3.  This post should now be visible from your “Posts” collection. You can view and edit your individual posts from this dashboard page.
    
4.  Return to view your Astro project files. You will now find a new `.mdoc` file inside the `src/content/posts` directory for this new post:
    
    *   Directorysrc/
        
        *   Directorycontent/
            
            *   Directoryposts/
                
                *   **my-first-post.mdoc**
                
            
        
    
5.  Navigate to that file in your code editor and verify that you can see the Markdown content you entered. For example:
    
        ---title: My First Post---
        This is my very first post. I am **super** excited!
    

Rendering Keystatic content
---------------------------

[Section titled Rendering Keystatic content](#rendering-keystatic-content)

Use Astro’s Content Collections API to [query and display your posts and collections](/en/guides/content-collections/#querying-collections), just as you would in any Astro project.

### Displaying a collection list

[Section titled Displaying a collection list](#displaying-a-collection-list)

The following example displays a list of each post title, with a link to an individual post page.

    ---import { getCollection } from 'astro:content'
    const posts = await getCollection('posts')---<ul>  {posts.map(post => (    <li>      <a href={`/posts/${post.slug}`}>{post.data.title}</a>    </li>  ))}</ul>

### Displaying a single entry

[Section titled Displaying a single entry](#displaying-a-single-entry)

To display content from an individual post, you can import and use the `<Content />` component to [render your content to HTML](/en/guides/content-collections/#rendering-body-content):

    ---import { getEntry } from 'astro:content'
    const post = await getEntry('posts', 'my-first-post')const { Content } = await post.render()---
    <main>  <h1>{post.data.title}</h1>  <Content /></main>

For more information on querying, filtering, displaying your collections content and more, see the full content [collections documentation](/en/guides/content-collections/).

Deploying Keystatic + Astro
---------------------------

[Section titled Deploying Keystatic + Astro](#deploying-keystatic--astro)

To deploy your website, visit our [deployment guides](/en/guides/deploy/) and follow the instructions for your preferred hosting provider.

You’ll also probably want to [connect Keystatic to GitHub](https://keystatic.com/docs/connect-to-github) so you can manage content on the deployed instance of the project.

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   Check out [the official Keystatic guide](https://keystatic.com/docs/installation-astro)
*   [Keystatic starter template](https://github.com/Thinkmill/keystatic/tree/main/templates/astro)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/keystatic.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Hygraph](/en/guides/cms/hygraph/) [Next  
KeystoneJS](/en/guides/cms/keystonejs/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)