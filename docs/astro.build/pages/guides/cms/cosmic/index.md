Cosmic & Astro
==============

[Cosmic](https://www.cosmicjs.com/) is a [headless CMS](https://www.cosmicjs.com/headless-cms) that provides an admin dashboard to manage content and an API that can integrate with a diverse range of frontend tools.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

1.  **An Astro project**\- If you’d like to start with a fresh Astro project, read the [installation guide](/en/install-and-setup/). This guide follows a simplified version of the [Astro Headless CMS Theme](https://astro.build/themes/details/cosmic-cms-blog/) with [Tailwind CSS](https://tailwindcss.com/) for styling.
2.  **A Cosmic account and Bucket** - [Create a free Cosmic account](https://app.cosmicjs.com/signup) if you don’t have one. After creating your account, you’ll be prompted to create a new empty project. There’s also a [Simple Astro Blog template](https://www.cosmicjs.com/marketplace/templates/simple-astro-blog) available (this is the same template as the Astro Headless CMS Theme) to automatically import all of the content used in this guide.
3.  **Your Cosmic API keys** - From your Cosmic dashboard, you will need to locate both the **Bucket slug** and **Bucket read key** in order to connect to Cosmic.

Integrating Cosmic with Astro
-----------------------------

[Section titled Integrating Cosmic with Astro](#integrating-cosmic-with-astro)

### Installing Necessary Dependencies

[Section titled Installing Necessary Dependencies](#installing-necessary-dependencies)

Add the [Cosmic JavaScript SDK](https://www.npmjs.com/package/@cosmicjs/sdk) to fetch data from your Cosmic Bucket.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3059)
*   [pnpm](#tab-panel-3060)
*   [Yarn](#tab-panel-3061)

Terminal window

    npm install @cosmicjs/sdk

Terminal window

    pnpm add @cosmicjs/sdk

Terminal window

    yarn add @cosmicjs/sdk

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### Configuring API Keys

[Section titled Configuring API Keys](#configuring-api-keys)

Create a `.env` file at the root of your Astro project (if it does not already exist). Add both the **Bucket slug** and **Bucket read key** available from your Cosmic dashboard as public environment variables.

.env

    PUBLIC_COSMIC_BUCKET_SLUG=YOUR_BUCKET_SLUGPUBLIC_COSMIC_READ_KEY=YOUR_READ_KEY

Fetching Data from Cosmic
-------------------------

[Section titled Fetching Data from Cosmic](#fetching-data-from-cosmic)

1.  Create a new file called `cosmic.js`. Place this file inside of the `src/lib` folder in your project.
    
2.  Add the following code to fetch data from Cosmic using the SDK and your environment variables.
    
    The example below creates a function called `getAllPosts()` to fetch metadata from Cosmic `posts` objects:
    
    src/lib/cosmic.js
    
        import { createBucketClient } from '@cosmicjs/sdk'
        const cosmic = createBucketClient({  bucketSlug: import.meta.env.PUBLIC_COSMIC_BUCKET_SLUG,  readKey: import.meta.env.PUBLIC_COSMIC_READ_KEY})
        export async function getAllPosts() {  const data = await cosmic.objects    .find({      type: 'posts'    })    .props('title,slug,metadata,created_at')  return data.objects}
    
    Read more about [queries in the Cosmic documentation](https://www.cosmicjs.com/docs/api/queries).
    
3.  Import your query function in a `.astro` component. After fetching data, the results from the query can be used in your Astro template.
    
    The following example shows fetching metadata from Cosmic `posts` and passing these values as props to a `<Card />` component to create a list of blog posts:
    
    src/pages/index.astro
    
        ---import Card from '../components/Card.astro'import { getAllPosts } from '../lib/cosmic'
        const data = await getAllPosts()---
        <section>  <ul class="grid gap-8 md:grid-cols-2">    {      data.map((post) => (        <Card          title={post.title}          href={post.slug}          body={post.metadata.excerpt}          tags={post.metadata.tags.map((tag) => tag)}        />      ))    }  </ul></section>
    
    [View source code for the Card component](https://github.com/cosmicjs/simple-astro-blog/blob/main/src/components/Card.astro)
    

Building a Blog with Astro and Cosmic
-------------------------------------

[Section titled Building a Blog with Astro and Cosmic](#building-a-blog-with-astro-and-cosmic)

You can manage your Astro blog’s content using Cosmic and create webhooks to automatically redeploy your website when you update or add new content.

### Cosmic Content Objects

[Section titled Cosmic Content Objects](#cosmic-content-objects)

The following instructions assume that you have an **Object Type** in Cosmic called **posts**. Each individual blog post is a `post` that is defined in the Cosmic dashboard with the following Metafields:

1.  **Text input** - Author
2.  **Image** - Cover Image
3.  **Repeater** - Tags
    *   **Text input** - Title
4.  **Text area** - Excerpt
5.  **Rich Text** - Content

### Displaying a List of Blog Posts in Astro

[Section titled Displaying a List of Blog Posts in Astro](#displaying-a-list-of-blog-posts-in-astro)

Using the same [data-fetching method](#fetching-data-from-cosmic) as above, import the `getAllPosts()` query from your script file and await the data. This function provides metadata about each `post` which can be displayed dynamically.

The example below passes these values to a `<Card />` component to display a formatted list of blog posts:

src/pages/index.astro

    ---import Card from '../components/Card.astro'import { getAllPosts } from '../lib/cosmic'
    const data = await getAllPosts()---
    <section>  <ul class="grid gap-8 md:grid-cols-2">    {      data.map((post) => (        <Card          title={post.title}          href={post.slug}          body={post.metadata.excerpt}          tags={post.metadata.tags.map((tag) => tag)}        />      ))    }  </ul></section>

### Generating Individual Blog Posts with Astro

[Section titled Generating Individual Blog Posts with Astro](#generating-individual-blog-posts-with-astro)

To generate an individual page with full content for each blog post, create a [dynamic routing page](/en/guides/routing/#dynamic-routes) at `src/pages/blog/[slug].astro`.

This page will export a `getStaticPaths()` function to generate a page route at the `slug` returned from each `post` object. This function is called at build time and generates and renders all of your blog posts at once.

To access your data from Cosmic:

*   Query Cosmic inside of `getStaticPaths()` to fetch data about each post and provide it to the function.
*   Use each `post.slug` as a route parameter, creating the URLs for each blog post.
*   Return each `post` inside of `Astro.props`, making the post data available to HTML template portion of the page component for rendering.

The HTML markup below uses various data from Cosmic, such as the post title, cover image, and the **rich text content** (full blog post content). Use [set:html](/en/reference/directives-reference/#sethtml) on the element displaying the rich text content from Cosmic to render HTML elements on the page exactly as fetched from Cosmic.

src/pages/blog/\[slug\].astro

    ---import { getAllPosts } from '../../lib/cosmic'import { Image } from 'astro:assets'
    export async function getStaticPaths() {  const data = (await getAllPosts()) || []
      return data.map((post) => {    return {      params: { slug: post.slug },      props: { post }    }  })}
    const { post } = Astro.props---
    <article class="mx-auto max-w-screen-md pt-20">  <section class="border-b pb-8">    <h1 class="text-4xl font-bold">{post.title}</h1>    <div class="my-4"></div>    <span class="text-sm font-semibold">{post.metadata.author?.title}</span>  </section>  {    post.metadata.cover_image && (      <Image        src={post.metadata.cover_image.imgix_url}        format="webp"        width={1200}        height={675}        aspectRatio={16 / 9}        quality={50}        alt={`Cover image for the blog ${post.title}`}        class={'my-12 rounded-md shadow-lg'}      />    )  }  <div set:html={post.metadata.content} /></article>

### Publishing your site

[Section titled Publishing your site](#publishing-your-site)

To deploy your website, visit the [deployment guides](/en/guides/deploy/) and follow the instructions for your preferred hosting provider.

#### Rebuild on Cosmic content updates

[Section titled Rebuild on Cosmic content updates](#rebuild-on-cosmic-content-updates)

You can set up a webhook in Cosmic directly to trigger a redeploy of your site on your hosting platform (e.g. Vercel) whenever you update or add content Objects.

Under “Settings” > “webhooks”, add the URL endpoint from Vercel and select the Object Type you would like to trigger the webhook. Click “Add webhook” to save it.

##### Netlify

[Section titled Netlify](#netlify)

To set up a webhook in Netlify:

1.  Go to your site dashboard and click on **Build & deploy**.
    
2.  Under the **Continuous Deployment** tab, find the **Build hooks** section and click on **Add build hook**.
    
3.  Provide a name for your webhook and select the branch you want to trigger the build on. Click on **Save** and copy the generated URL.
    

##### Vercel

[Section titled Vercel](#vercel)

To set up a webhook in Vercel:

1.  Go to your project dashboard and click on **Settings**.
    
2.  Under the **Git** tab, find the **Deploy Hooks** section.
    
3.  Provide a name for your webhook and the branch you want to trigger the build on. Click **Add** and copy the generated URL.
    

Themes
------

[Section titled Themes](#themes)

*    [![](/_astro/simple-astro-blog.Dl86rePH_ZijHC7.webp) Astro Headless CMS Blog](https://astro.build/themes/details/cosmic-cms-blog/)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/cosmic.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Contentful](/en/guides/cms/contentful/) [Next  
Craft CMS](/en/guides/cms/craft-cms/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)