Kontent.ai & Astro
==================

[Kontent.ai](https://www.kontent.ai/) is a headless CMS that allows you to manage content in a structured and modular way, supported by AI capabilities.

Integrating with Astro
----------------------

[Section titled Integrating with Astro](#integrating-with-astro)

In this section, you’ll use the [Kontent.ai TypeScript SDK](https://github.com/kontent-ai/delivery-sdk-js) to connect your Kontent.ai project to your Astro application.

### Prerequisites

[Section titled Prerequisites](#prerequisites)

To get started, you’ll need the following:

1.  **Kontent.ai project** - If you don’t have a Kontent.ai account yet, [sign up for free](https://app.kontent.ai/sign-up) and create a new project.
    
2.  **Delivery API keys** - You will need the Environment ID for published content and the Preview API key for fetching drafts (optional). Both keys are located in the **Environment Settings -> API keys** tab in Kontent.ai.
    

### Setting up credentials

[Section titled Setting up credentials](#setting-up-credentials)

To add your Kontent.ai credentials to Astro, create a `.env` file in the root of your project with the following variables:

.env

    KONTENT_ENVIRONMENT_ID=YOUR_ENVIRONMENT_IDKONTENT_PREVIEW_API_KEY=YOUR_PREVIEW_API_KEY

Now, these environment variables can be used in your Astro project.

If you would like to get [TypeScript IntelliSense for these environment variables](/en/guides/environment-variables/#intellisense-for-typescript), you can create a new `env.d.ts` file in the `src/` directory and configure `ImportMetaEnv` like this:

src/env.d.ts

    interface ImportMetaEnv {  readonly KONTENT_ENVIRONMENT_ID: string;  readonly KONTENT_PREVIEW_API_KEY: string;}

Your root directory should now include these new files:

*   Directorysrc/
    
    *   **env.d.ts**
    
*   **.env**
*   astro.config.mjs
*   package.json

### Installing dependencies

[Section titled Installing dependencies](#installing-dependencies)

To connect Astro with your Kontent.ai project, install the [Kontent.ai TypeScript SDK](https://github.com/kontent-ai/delivery-sdk-js):

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3089)
*   [pnpm](#tab-panel-3090)
*   [Yarn](#tab-panel-3091)

Terminal window

      npm install @kontent-ai/delivery-sdk

Terminal window

      pnpm add @kontent-ai/delivery-sdk

Terminal window

      yarn add @kontent-ai/delivery-sdk

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Next, create a new file called `kontent.ts` in the `src/lib/` directory of your Astro project.

src/lib/kontent.ts

    import { createDeliveryClient } from "@kontent-ai/delivery-sdk";
    export const deliveryClient = createDeliveryClient({    environmentId: import.meta.env.KONTENT_ENVIRONMENT_ID,    previewApiKey: import.meta.env.KONTENT_PREVIEW_API_KEY,});

Note

Read more on [getting environment variables in Astro](/en/guides/environment-variables/#getting-environment-variables).

This implementation creates a new `DeliveryClient` object using credentials from the `.env` file.

Previews

The `previewApiKey` is optional. When used, you can [configure each query](https://github.com/kontent-ai/delivery-sdk-js#enable-preview-mode-per-query) to the Delivery API endpoint to return the latest versions of content items regardless of their state in the workflow. Otherwise, only published items are returned.

Finally, the root directory of your Astro project should now include these new files:

*   Directorysrc/
    
    *   Directorylib/
        
        *   **kontent.ts**
        
    *   env.d.ts
    
*   .env
*   astro.config.mjs
*   package.json

### Fetching data

[Section titled Fetching data](#fetching-data)

The `DeliveryClient` is now available to all components. To fetch content, use the `DeliveryClient` and method chaining to define your desired items. This example shows a basic fetch of blog posts and renders their titles in a list:

src/pages/index.astro

    ---import { deliveryClient } from "../lib/kontent";
    const blogPosts = await deliveryClient    .items()    .type("blogPost")    .toPromise()---<html lang="en">  <head>    <meta charset="utf-8" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>        <ul>        {blogPosts.data.items.map(blogPost => (            <li>{blogPost.elements.title.value}</li>        ))}        </ul>    </body></html>

You can find more querying options in the [Kontent.ai documentation](https://kontent.ai/learn/develop/hello-world/get-content/javascript).

Making a blog with Astro and Kontent.ai
---------------------------------------

[Section titled Making a blog with Astro and Kontent.ai](#making-a-blog-with-astro-and-kontentai)

With the setup above, you are now able to create a blog that uses Kontent.ai as the source of content.

### Prerequisites

[Section titled Prerequisites](#prerequisites-1)

1.  **Kontent.ai project** - For this tutorial, using a blank project is recommended. If you already have some content types in your content model, you may use them, but you will need to modify the code snippets to match your content model.
    
2.  **Astro project configured for content fetching from Kontent.ai** - see above for more details on how to set up an Astro project with Kontent.ai
    

### Setting up content model

[Section titled Setting up content model](#setting-up-content-model)

In Kontent.ai, navigate to **Content model** and create a new content type with the following fields and values:

*   **Name:** Blog Post
*   Elements:
    *   Text field
        *   **Name:** Title
        *   **Element Required:** yes
    *   Rich text field
        *   **Name:** Teaser
        *   **Element Required:** yes
        *   **Allowed in this element:** only check Text
    *   Rich text field
        *   **Name:** Content
        *   **Element Required:** yes
    *   Date & time field
        *   **Name:** Date
    *   URL slug field
        *   **Name:** URL slug
        *   **Element Required:** yes
        *   **Auto-generate from:** select “Title”

Then, click on **Save Changes**.

### Creating content

[Section titled Creating content](#creating-content)

Now, navigate to **Content & assets** tab and create a new content item of type **Blog Post**. Fill the fields using these values:

*   **Content item name:** Astro
*   **Title:** Astro is amazing
*   **Teaser:** Astro is an all-in-one framework for building fast websites faster.
*   **Content:** You can use JavaScript to implement the website functionality, but no client bundle is necessary.
*   **Date & time:** select today
*   **URL slug:** astro-is-amazing

When you’re finished, publish the blog post using the **Publish** button at the top.

_Note: Feel free to create as many blog posts as you like before moving to the next step._

### Generating content model in TypeScript

[Section titled Generating content model in TypeScript](#generating-content-model-in-typescript)

Next, you’ll generate TypeScript types out of your content model.

Note

This step is optional but provides a much better developer experience and allows you to discover potential problems at build time rather than at runtime.

First, install the [Kontent.ai JS model generator](https://github.com/kontent-ai/model-generator-js), [ts-node](https://github.com/TypeStrong/ts-node), and [dotenv](https://github.com/motdotla/dotenv):

*   [npm](#tab-panel-3092)
*   [pnpm](#tab-panel-3093)
*   [Yarn](#tab-panel-3094)

Terminal window

      npm install @kontent-ai/model-generator ts-node dotenv

Terminal window

      pnpm add @kontent-ai/model-generator ts-node dotenv

Terminal window

      yarn add @kontent-ai/model-generator ts-node dotenv

Then, add the following script to package.json:

package.json

    {    ...    "scripts": {        ...        "regenerate:models": "ts-node --esm ./generate-models.ts"    },}

Because the types require structural information about your project that is not available in the public API, you also need to add a Content Management API key to the `.env` file. You can generate the key under **Environment settings -> API keys -> Management API**.

.env

    KONTENT_ENVIRONMENT_ID=YOUR_ENVIRONMENT_IDKONTENT_PREVIEW_API_KEY=YOUR_PREVIEW_API_KEYKONTENT_MANAGEMENT_API_KEY=YOUR_MANAGEMENT_API_KEY

Finally, add the script `generate-models.ts` that configures the model generator to generate the models:

generate-models.ts

    import { generateModelsAsync, textHelper } from '@kontent-ai/model-generator'import { rmSync, mkdirSync } from 'fs'
    import * as dotenv from 'dotenv'dotenv.config()
    const runAsync = async () => {  rmSync('./src/models', { force: true, recursive: true })  mkdirSync('./src/models')
      // change working directory to models  process.chdir('./src/models')
      await generateModelsAsync({    sdkType: 'delivery',    apiKey: process.env.KONTENT_MANAGEMENT_API_KEY ?? '',    environmentId: process.env.KONTENT_ENVIRONMENT_ID ?? '',    addTimestamp: false,    isEnterpriseSubscription: false,  })}
    // Self-invocation async function;(async () => {  await runAsync()})().catch(err => {  console.error(err)  throw err})

Now, execute it:

*   [npm](#tab-panel-3095)
*   [pnpm](#tab-panel-3096)
*   [Yarn](#tab-panel-3097)

Terminal window

      npm run regenerate:models

Terminal window

      pnpm run regenerate:models

Terminal window

      yarn run regenerate:models

### Displaying a list of blog posts

[Section titled Displaying a list of blog posts](#displaying-a-list-of-blog-posts)

Now you’re ready to fetch some content. Go to the Astro page where you want to display a list of all blog posts, for example, the homepage `index.astro` in `src/pages`.

Fetch all blog posts in the frontmatter of the Astro page:

src/pages/index.astro

    ---import { deliveryClient } from '../lib/kontent';import type { BlogPost } from '../models';import { contentTypes } from '../models/project/contentTypes';
    const blogPosts = await deliveryClient    .items<BlogPost>    .type(contentTypes.blog_post.codename)    .toPromise()---

If you skipped the model generation, you can also use an untyped object and string literal to define the type:

    const blogPosts = await deliveryClient    .items()    .type("blogPost")    .toPromise()

The fetch call will return a `response` object which contains a list of all blog posts in `data.items`. In the HTML section of the Astro page, you can use the `map()` function to list the blog posts:

src/pages/index.astro

    ---import { deliveryClient } from '../lib/kontent';import type { BlogPost } from '../models';import { contentTypes } from '../models/project/contentTypes';
    const blogPosts = await deliveryClient    .items<BlogPost>    .type(contentTypes.blogPost.codename)    .toPromise()---<html lang="en">    <head>        <meta charset="utf-8" />        <meta name="viewport" content="width=device-width" />        <title>Astro</title>    </head>    <body>        <h1>Blog posts</h1>        <ul>            {blogPosts.data.items.map(blogPost => (                <li>                    <a href={`/blog/${blogPost.elements.url_slug.value}/`} title={blogPost.elements.title.value}>                        {blogPost.elements.title.value}                    </a>                </li>            ))}        </ul>    </body></html>

### Generating individual blog posts

[Section titled Generating individual blog posts](#generating-individual-blog-posts)

The last step of the tutorial is to generate detailed blog post pages.

#### Static site generation

[Section titled Static site generation](#static-site-generation)

In this section, you’ll use the [Static (SSG) Mode](/en/guides/routing/#static-ssg-mode) with Astro.

First, create a file `[slug].astro` in `/src/pages/blog/` which needs to export a function `getStaticPaths` that collects all data from the CMS:

src/pages/blog/\[slug\].astro

    ---import { deliveryClient } from '../../lib/kontent';import type { BlogPost } from '../../models';import { contentTypes } from '../../models/project/contentTypes';
    export async function getStaticPaths() {    const blogPosts = await deliveryClient        .items<BlogPost>()        .type(contentTypes.blog_post.codename)        .toPromise()---

So far, the function fetches all blog posts from Kontent.ai. The code snippet is exactly the same as what you used on the home page.

Next, the function must export paths and data for each blog post. You named the file `[slug].astro`, so the param which represents the URL slug is called `slug`:

src/pages/blog/\[slug\].astro

    ---import { deliveryClient } from '../../lib/kontent';import type { BlogPost } from '../../models';import { contentTypes } from '../../models/project/contentTypes';
    export async function getStaticPaths() {    const blogPosts = await deliveryClient        .items<BlogPost>()        .type(contentTypes.blog_post.codename)        .toPromise()
        return blogPosts.data.items.map(blogPost => ({        params: { slug: blogPost.elements.url_slug.value },        props: { blogPost }    }))}---

The last part is to provide the HTML template and display each blog post:

src/pages/blog/\[slug\].astro

    ---import { deliveryClient } from '../../lib/kontent';import type { BlogPost } from '../../models';import { contentTypes } from '../../models/project/contentTypes';
    export async function getStaticPaths() {    const blogPosts = await deliveryClient        .items<BlogPost>()        .type(contentTypes.blog_post.codename)        .toPromise()
        return blogPosts.data.items.map(blogPost => ({        params: { slug: blogPost.elements.url_slug.value },        props: { blogPost }    }))}
    const blogPost: BlogPost = Astro.props.blogPost---<html lang="en">    <head>        <meta charset="utf-8" />        <meta name="viewport" content="width=device-width" />        <title>{blogPost.elements.title.value}</title>    </head>    <body>        <article>            <h1>{blogPost.elements.title.value}</h1>            <Fragment set:html={blogPost.elements.teaser.value} />            <Fragment set:html={blogPost.elements.content.value} />            <time>{new Date(blogPost.elements.date.value ?? "")}</time>    </body></html>

Navigate to your Astro preview ([http://localhost:4321/blog/astro-is-amazing/](http://localhost:4321/blog/astro-is-amazing/) by default) to see the rendered blog post.

#### On-demand rendering

[Section titled On-demand rendering](#on-demand-rendering)

If your routes are [rendered on demand](/en/guides/on-demand-rendering/), you will use dynamic routes to fetch the page data from Kontent.ai.

Create a new file `[slug].astro` in `/src/pages/blog/` and add the following code. The data fetching is very similar to previous use cases but adds an `equalsFilter` that lets us find the right blog post based on the used URL:

src/pages/blog/\[slug\].astro

    ---import { deliveryClient } from '../../lib/kontent';import type { BlogPost } from '../../models';import { contentTypes } from '../../models/project/contentTypes';
    const { slug } = Astro.paramslet blogPost: BlogPost;try {    const data = await deliveryClient        .items<BlogPost>()        .equalsFilter(contentTypes.blog_post.elements.url_slug.codename, slug ?? '')        .type(contentTypes.blog_post.codename)        .limitParameter(1)        .toPromise()    blogPost = data.data.items[0]} catch (error) {    return Astro.redirect('/404')}---

If you’re not using generated types, you can instead use string literals to define the content item type and the filtered element codename:

    const data = await deliveryClient        .items()        .equalsFilter("url_slug", slug ?? '')        .type("blog_post")        .limitParameter(1)        .toPromise()

Lastly, add the HTML code to render the blog post. This part is the same as with static generation:

src/pages/blog/\[slug\].astro

    ---import { deliveryClient } from '../../lib/kontent';import type { BlogPost } from '../../models';import { contentTypes } from '../../models/project/contentTypes';
    const { slug } = Astro.paramslet blogPost: BlogPost;try {    const data = await deliveryClient        .items<BlogPost>()        .equalsFilter(contentTypes.blog_post.elements.url_slug.codename, slug ?? '')        .type(contentTypes.blog_post.codename)        .limitParameter(1)        .toPromise()    blogPost = data.data.items[0]} catch (error) {    return Astro.redirect('/404')}---<html lang="en">    <head>        <meta charset="utf-8" />        <meta name="viewport" content="width=device-width" />        <title>{blogPost.elements.title.value}</title>    </head>    <body>        <article>            <h1>{blogPost.elements.title.value}</h1>            <Fragment set:html={blogPost.elements.teaser.value} />            <Fragment set:html={blogPost.elements.content.value} />            <time>{new Date(blogPost.elements.date.value ?? '')}</time>    </body></html>

### Publishing your site

[Section titled Publishing your site](#publishing-your-site)

To deploy your website, visit the [deployment guides](/en/guides/deploy/) and follow the instructions for your preferred hosting provider.

#### Rebuild on Kontent.ai changes

[Section titled Rebuild on Kontent.ai changes](#rebuild-on-kontentai-changes)

If your project is using Astro’s default static mode, you will need to set up a webhook to trigger a new build when your content changes. If you are using Netlify or Vercel as your hosting provider, you can use its webhook feature to trigger a new build from Kontent.ai events.

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
    

##### Adding a webhook to Kontent.ai

[Section titled Adding a webhook to Kontent.ai](#adding-a-webhook-to-kontentai)

In the [Kontent.ai app](https://kontent.ai/learn/docs/webhooks/javascript), go to **Environment settings -> Webhooks**. Click on **Create new webhook** and provide a name for your new webhook. Paste in the URL you copied from Netlify or Vercel and select which events should trigger the webhook. By default, for rebuilding your site when published content changes, you only need **Publish** and **Unpublish** events under **Delivery API triggers**. When you’re finished, click on Save.

Now, whenever you publish a new blog post in Kontent.ai, a new build will be triggered and your blog will be updated.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/kontent-ai.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
KeystoneJS](/en/guides/cms/keystonejs/) [Next  
microCMS](/en/guides/cms/microcms/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)