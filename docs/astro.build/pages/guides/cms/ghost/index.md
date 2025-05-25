Ghost & Astro
=============

[Ghost](https://github.com/TryGhost/Ghost) is an open-source, headless content management system built on Node.js.

Integrating with Astro
----------------------

[Section titled Integrating with Astro](#integrating-with-astro)

In this section, we’ll use the [Ghost content API](https://ghost.org/docs/content-api/) to bring your data into your Astro project.

### Prerequisites

[Section titled Prerequisites](#prerequisites)

To get started you will need to have the following:

1.  **An Astro project** - If you don’t have an Astro project yet, our [Installation guide](/en/install-and-setup/) will get you up and running in no time.
    
2.  **A Ghost site** - It is assumed that you have a site set up with Ghost. If you don’t you can set one up on a [local environment.](https://ghost.org/docs/install/local/)
    
3.  **Content API Key** - You can make an integration under your site’s `Settings > Integrations`. From there you can find your `Content API key`
    

### Setting up credentials

[Section titled Setting up credentials](#setting-up-credentials)

To add your site’s credentials to Astro, create an `.env` file in the root of your project with the following variable:

.env

    CONTENT_API_KEY=YOUR_API_KEY

Now, you should be able to use this environment variable in your project.

If you would like to have IntelliSense for your environment variable, you can create a `env.d.ts` file in the `src/` directory and configure `ImportMetaEnv` like this:

src/env.d.ts

    interface ImportMetaEnv {  readonly CONTENT_API_KEY: string;}

Tip

Read more about [using environment variables](/en/guides/environment-variables/) and `.env` files in Astro.

Your root directory should now include these new files:

*   Directorysrc/
    
    *   **env.d.ts**
    
*   **.env**
*   astro.config.mjs
*   package.json

### Installing dependencies

[Section titled Installing dependencies](#installing-dependencies)

To connect with Ghost, install the official content API wrapper [`@tryghost/content-api`](https://www.npmjs.com/package/@tryghost/content-api) using the command below for your preferred package manager, and optionally, a helpful package containing type definitions if you are using TypeScript:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3074)
*   [pnpm](#tab-panel-3075)
*   [Yarn](#tab-panel-3076)

Terminal window

    npm install @tryghost/content-apinpm install --save @types/tryghost__content-api

Terminal window

    pnpm add @tryghost/content-apipnpm add --save-dev @types/tryghost__content-api

Terminal window

    yarn add @tryghost/content-apiyarn add --dev @types/tryghost__content-api

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Making a blog with Astro and Ghost
----------------------------------

[Section titled Making a blog with Astro and Ghost](#making-a-blog-with-astro-and-ghost)

With the setup above, you are now able to create a blog that uses Ghost as the CMS.

### Prerequisites

[Section titled Prerequisites](#prerequisites-1)

1.  A Ghost blog
2.  An Astro project integrated with the [Ghost content API](https://www.npmjs.com/package/@tryghost/content-api) - See [integrating with Astro](/en/guides/cms/ghost/#integrating-with-astro) for more details on how to set up an Astro project with Ghost.

This example will create an index page that lists posts with links to dynamically-generated individual post pages.

### Fetching Data

[Section titled Fetching Data](#fetching-data)

You can fetch your site’s data with the Ghost content API package.

First, create a `ghost.ts` file under a `lib` directory.

*   Directorysrc/
    
    *   Directorylib/
        
        *   **ghost.ts**
        
    *   Directorypages/
        
        *   index.astro
        
    
*   astro.config.mjs
*   package.json

Initialize an API instance with the Ghost API using the API key from the Ghost dashboard’s Integrations page.

src/lib/ghost.ts

    import GhostContentAPI from '@tryghost/content-api';
    // Create API instance with site credentialsexport const ghostClient = new GhostContentAPI({    url: 'http://127.0.0.1:2368', // This is the default URL if your site is running on a local environment    key: import.meta.env.CONTENT_API_KEY,    version: 'v5.0',});

### Displaying a list of posts

[Section titled Displaying a list of posts](#displaying-a-list-of-posts)

The page `src/pages/index.astro` will display a list of posts, each with a description and link to its own page.

*   Directorysrc/
    
    *   Directorylib/
        
        *   ghost.ts
        
    *   Directorypages/
        
        *   **index.astro**
        
    
*   astro.config.mjs
*   package.json

Import `ghostClient()` in the Astro frontmatter to use the `posts.browse()` method to access blog posts from Ghost. Set `limit: all` to retrieve all posts.

src/pages/index.astro

    ---import { ghostClient } from '../lib/ghost';const posts = await ghostClient.posts    .browse({        limit: 'all',    })    .catch((err) => {        console.error(err);    });---

Fetching via the content API returns an array of objects containing the [properties for each post](https://ghost.org/docs/content-api/#posts) such as:

*   `title` - the title of the post
*   `html` - the HTML rendering of the content of the post
*   `feature_image` - the source URL of the featured image of the post
*   `slug` - the slug of the post

Use the `posts` array returned from the fetch to display a list of blog posts on the page.

src/pages/index.astro

    ---import { ghostClient } from '../lib/ghost';const posts = await ghostClient.posts    .browse({        limit: 'all',    })    .catch((err) => {        console.error(err);    });---
    <html lang="en">    <head>        <title>Astro + Ghost 👻</title>    </head>    <body>
            {            posts.map((post) => (                <a href={`/post/${post.slug}`}>                    <h1> {post.title} </h1>                </a>            ))        }    </body></html>

### Generating pages

[Section titled Generating pages](#generating-pages)

The page `src/pages/post/[slug].astro` [dynamically generates a page](/en/guides/routing/#dynamic-routes) for each post.

*   Directorysrc/
    
    *   Directorylib/
        
        *   ghost.ts
        
    *   Directorypages/
        
        *   index.astro
        *   Directorypost/
            
            *   **\[slug\].astro**
            
        
    
*   astro.config.mjs
*   package.json

Import `ghostClient()` to access blog posts using `posts.browse()` and return a post as props to each of your dynamic routes.

src/pages/post/\[slug\].astro

    ---import { ghostClient } from '../../lib/ghost';
    export async function getStaticPaths() {    const posts = await ghostClient.posts        .browse({            limit: 'all',        })        .catch((err) => {            console.error(err);        });
        return posts.map((post) => {        return {            params: {                slug: post.slug,            },            props: {                post: post,            },        };    });}
    const { post } = Astro.props;---

Create the template for each page using the properties of each `post` object.

src/pages/post/\[slug\].astro

    ---import { ghostClient } from '../../lib/ghost';export async function getStaticPaths() {    const posts = await ghostClient.posts        .browse({            limit: 'all',        })        .catch((err) => {            console.error(err);        });    return posts.map((post) => {        return {            params: {                slug: post.slug,            },            props: {                post: post,            },        };    });}const { post } = Astro.props;---<!DOCTYPE html><html lang="en">    <head>        <title>{post.title}</title>    </head>    <body>        <img src={post.feature_image} alt={post.title} />
            <h1>{post.title}</h1>        <p>{post.reading_time} min read</p>
            <Fragment set:html={post.html} />    </body></html>

Note

`<Fragment />` is a built-in Astro component which allows you to avoid an unnecessary wrapper element. This can be especially useful when fetching HTML from a CMS (e.g. Ghost or [WordPress](/en/guides/cms/wordpress/)).

### Publishing your site

[Section titled Publishing your site](#publishing-your-site)

To deploy your site visit our [deployment guide](/en/guides/deploy/) and follow the instructions for your preferred hosting provider.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[Ghost CMS & Astro Tutorial](https://matthiesen.xyz/blog/astro-ghostcms)

[Astro + Ghost + Tailwind CSS](https://andr.ec/posts/astro-ghost-blog/)

[Building a Corporate site with Astro and Ghost](https://artabric.com/post/building-a-corporate-site-with-astro-and-ghost/)

[\`astro-starter-ghost\`](https://github.com/PhilDL/astro-starter-ghost)

Have a resource to share?

If you found (or made!) a helpful video or blog post about using Ghost with Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/ghost.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/ghost.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Front Matter CMS](/en/guides/cms/frontmatter-cms/) [Next  
GitCMS](/en/guides/cms/gitcms/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)