Hygraph & Astro
===============

[Hygraph](https://hygraph.com/) is a federated content management platform. It exposes a GraphQL endpoint for fetching content.

Integrating with Astro
----------------------

[Section titled Integrating with Astro](#integrating-with-astro)

In this section, you’ll create a [Hygraph](https://hygraph.com/) GraphQL endpoint to fetch with Astro.

### Prerequisites

[Section titled Prerequisites](#prerequisites)

To get started, you will need to have the following:

1.  **A Hygraph account and project**. If you don’t have an account, you can [sign up for free](https://app.hygraph.com/signup) and create a new project.
    
2.  **Hygraph access permissions** - In `Project Settings > API Access`, configure Public Content API permissions to allow read requests without authentication. If you haven’t set any permissions, you can click **Yes, initialize defaults** to add the required permissions to use the “High Performance Content API”.
    

### Setting up the endpoint

[Section titled Setting up the endpoint](#setting-up-the-endpoint)

To add your Hygraph endpoint to Astro, create a `.env` file in the root of your project with the following variable:

.env

    HYGRAPH_ENDPOINT=YOUR_HIGH_PERFORMANCE_API

Now, you should be able to use this environment variable in your project.

If you would like to have IntelliSense for your environment variables, you can create a `env.d.ts` file in the `src/` directory and configure `ImportMetaEnv` like this:

src/env.d.ts

    interface ImportMetaEnv {  readonly HYGRAPH_ENDPOINT: string;}

Note

Read more about [using environment variables](/en/guides/environment-variables/) and `.env` files in Astro.

Your root directory should now include these new files:

*   Directorysrc/
    
    *   **env.d.ts**
    
*   **.env**
*   astro.config.mjs
*   package.json

### Fetching data

[Section titled Fetching data](#fetching-data)

Fetch data from your Hygraph project by using the `HYGRAPH_ENDPOINT`.

For example, to fetch entries of a `blogPosts` content type that has a string field `title`, create a GraphQL query to fetch that content. Then, define the type of the content, and set it as the type of the response.

src/pages/index.astro

    ---interface Post {  title: string;}
    const query = {  method: "POST",  headers: { "Content-Type": "application/json" },  body: JSON.stringify({    query: `      {        blogPosts {          title        }      }`,  }),};
    const response = await fetch(import.meta.env.HYGRAPH_ENDPOINT, query);const json = await response.json();const posts: Post[] = json.data.blogPosts;---
    <html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} />    <title>Astro</title>  </head>  <body>    <h1>Astro</h1>    {      posts.map((post) => (        <div>          <h2>{post.title}</h2>        </div>      ))    }  </body></html>

Deploy
------

[Section titled Deploy](#deploy)

### Configuring Netlify Webhook

[Section titled Configuring Netlify Webhook](#configuring-netlify-webhook)

To set up a webhook in Netlify:

1.  Deploy your site to Netlify with [this guide](/en/guides/deploy/netlify/). Remember to add your `HYGRAPH_ENDPOINT` to the environment variables.
    
2.  Then Go to your Hygraph project dashboard and click on **Apps**.
    
3.  Go to the marketplace and search for Netlify and follow the instructions provided.
    
4.  If all went good, now you can deploy your website with a click in the Hygraph interface.
    

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [Hygraph + Astro example with `marked` for markdown parsing](https://github.com/camunoz2/example-astrowithhygraph)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/hygraph.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Hashnode](/en/guides/cms/hashnode/) [Next  
Keystatic](/en/guides/cms/keystatic/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)