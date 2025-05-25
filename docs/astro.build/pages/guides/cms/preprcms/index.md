Prepr CMS & Astro
=================

[Prepr CMS](https://www.prepr.io/) is a headless CMS with built-in personalization.

Integrating with Astro
----------------------

[Section titled Integrating with Astro](#integrating-with-astro)

Prepr CMS provides a [GraphQL API](https://docs.prepr.io/reference/graphql/v1/overview) to connect your data to Astro.

### Prerequisites

[Section titled Prerequisites](#prerequisites)

To get started, you will need the following:

*   A new or existing Astro project configured for [on-demand rendering](/en/guides/on-demand-rendering/).
*   [A free Prepr account](https://signup.prepr.io/)
*   [A Prepr environment with existing blog posts](https://docs.prepr.io/account/set-up-environments#create-an-envirntonment). These posts must include a `title` and `content`. Other fields are optional.

### Setting up credentials

[Section titled Setting up credentials](#setting-up-credentials)

To add the Prepr endpoint to your Astro project, create a `.env file` in the root of your project if one does not already exist and add the following variable:

.env

    PREPR_ENDPOINT=YOUR_PREPR_API_URL

You will find your `YOUR_PREPR_API_URL` value from your Prepr account settings:

1.  Go to  **Settings > Access tokens** to view both your Preview and Production access tokens.
    
2.  Use the **API URL** value from the **GraphQL Production** access token to only retrieve published content items for your Astro site.
    

### Configuring the Prepr endpoint

[Section titled Configuring the Prepr endpoint](#configuring-the-prepr-endpoint)

Create a new folder `src/lib/` and add a new file called `prepr.js`. This is where you will configure the Prepr endpoint. Add the following code to fetch your data from Prepr CMS:

src/lib/prepr.js

    export async function Prepr(query, variables) {    const response = await fetch(import.meta.env.PREPR_ENDPOINT, {        method: 'POST',        headers: {            'Content-Type': 'application/json'        },        body: JSON.stringify({ query, variables }),    })    return response}

Your root directory should now include these files:

*   Directorysrc/
    
    *   Directorylib/
        
        *   **prepr.js**
        
    
*   **.env**
*   astro.config.mjs
*   package.json

### Fetching data

[Section titled Fetching data](#fetching-data)

You will fetch your data from Prepr by writing queries to interact with its GraphQL API.

#### Create a GraphQL query to retrieve your blog articles:

[Section titled Create a GraphQL query to retrieve your blog articles:](#create-a-graphql-query-to-retrieve-your-blog-articles)

1.  Create a new folder `src/queries/` and add a file named `get-articles.js`.
    
2.  Add the following query to this file to retrieve all articles:
    
    src/queries/get-articles.js
    
        const GetArticles = `query {    Articles {      items {        _id        _slug        title    }  }}`export default GetArticles
    
3.  To display a linked list of your blog posts on a page, import and execute your query, including the necessary Prepr endpoint. You will then have access to all your posts titles and their slugs to render to the page. (In the next step, you will [create individual pages for your blog posts](#creating-individual-blog-post-pages).)
    
    src/pages/index.astro
    
        ---import Layout from '../layouts/Layout.astro';import { Prepr } from '../lib/prepr.js';import GetArticles from '../queries/get-articles.js';
        const response = await Prepr(GetArticles)const { data } = await response.json()const articles = data.Articles---
        <Layout title="My blog site">  <h1>    My blog site  </h1>  <ul>    {      articles.items.map((post) => (        <li>          <a href={post._slug}>{post.title}</a>        </li>      ))    }  </ul></Layout>
    

Your root directory should include these new files:

*   Directorysrc/
    
    *   Directorylib/
        
        *   prepr.js
        
    *   Directorypages/
        
        *   index.astro
        
    *   Directory**queries** /
        
        *   **get-articles.js**
        
    
*   .env
*   astro.config.mjs
*   package.json

#### Creating individual blog post pages

[Section titled Creating individual blog post pages](#creating-individual-blog-post-pages)

To create a page for each blog post, you will execute a new GraphQL query on a [dynamic routing](/en/guides/routing/#on-demand-dynamic-routes) `.astro` page. This query will fetch a specific article by its slug and a new page will be created for each individual blog post.

1.  Create a file called `get-article-by-slug.js` in the `queries` folder and add the following to query a specific article by its slug and return data such as the article `title` and `content`:
    
    src/lib/queries/get-article-by-slug.js
    
        const GetArticleBySlug = `query ($slug: String) {   Article (slug: $slug) {     _id     title     content {       __typename       ... on Text {         body         text       }       ... on Assets {         items {           url         }       }     }   }}`
        export default GetArticleBySlug
    
    Tip
    
    You can create and [test GraphQL queries](https://docs.prepr.io/reference/graphql/v1/test-queries) using the [Apollo explorer](https://studio.apollographql.com/sandbox/explorer) in Prepr. Open the API Explorer from the _Article_ content item page in Prepr. The Article content is stored in a _Dynamic content field_. Check out the GraphQL docs for more details on [how to fetch the data within this field](https://docs.prepr.io/reference/graphql/v1/schema-field-types-dynamic-content-field).
    
2.  Inside the `src/pages` folder, create a file called `[…slug].astro`. Add the following code to import and execute the query from the previous step and display the retrieved article:
    
    src/pages/\[...slug\].astro
    
        ---import Layout from '../layouts/Layout.astro';import {Prepr} from '../lib/prepr.js';import GetArticleBySlug from '../queries/get-article-by-slug.js';
        const { slug } = Astro.params;const response = await Prepr(GetArticleBySlug, {slug})const { data } = await response.json()const article = data.Article---
        <Layout title={article.title}>  <main>    <h1>{article.title}</h1>    {      article.content.map((content) => (        <div>          {            content.__typename === "Assets" &&            <img src={content.items[0].url} width="300" height="250"/>          }          {            content.__typename === 'Text' &&            <div set:html={content.body}></div>          }        </div>      ))    }  </main></Layout>
    

Your root directory should now include these new files:

*   Directorysrc/
    
    *   Directorylib/
        
        *   prepr.js
        
    *   Directorypages/
        
        *   index.astro
        *   **\[…slug\].astro**
        
    *   Directoryqueries/
        
        *   get-articles.js
        *   **get-article-by-slug.js**
        
    
*   .env
*   astro.config.mjs
*   package.json

Now, when you click an article link from the main list of blog posts, you will be taken to a page with its individual content.

### Publishing your site

[Section titled Publishing your site](#publishing-your-site)

To deploy your Prepr blog, visit our [deployment guides](/en/guides/deploy/) and follow the instructions for your preferred hosting provider.

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   Follow the [Prepr CMS Astro quickstart](https://github.com/preprio/astro-quick-start) guide to make a simple blog with Astro and Prepr CMS. 
*   Check out the [Connecting Prepr CMS to Astro](https://docs.prepr.io/connecting-front-end-apps/astro) for an overview of Astro and Prepr CMS resources.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/preprcms.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Payload CMS](/en/guides/cms/payload/) [Next  
Prismic](/en/guides/cms/prismic/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)