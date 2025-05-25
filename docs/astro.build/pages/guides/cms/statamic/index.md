Headless Statamic & Astro
=========================

[Statamic](https://statamic.com/) is a modern, flat-file CMS. It allows developers to easily create dynamic websites and applications while offering content editors an intuitive and user-friendly interface for managing content.

Integrating with Astro
----------------------

[Section titled Integrating with Astro](#integrating-with-astro)

Statamic comes with a built-in [REST API](https://statamic.dev/rest-api) and [GraphQL API](https://statamic.dev/graphql) to connect your data to Astro.

### Prerequisites

[Section titled Prerequisites](#prerequisites)

To get started, you will need to have the following:

1.  REST API and GraphQL API are only available in a pro version of Statamic. You can try the Pro version free on your [local machine](https://statamic.dev/tips/how-to-enable-statamic-pro#trial-mode).
2.  **An Astro project** - If you still need an Astro project, our [Installation guide](/en/install-and-setup/) will get you up and running quickly.
3.  **A Statamic site** - If you need a Statamic website, [this guide](https://statamic.dev/quick-start-guide) will help you get started. Remember to [enable REST API](https://statamic.dev/rest-api#enable-the-api) or [GraphQL API](https://statamic.dev/graphql#enable-graphql) by adding `STATAMIC_API_ENABLED=true` or `STATAMIC_GRAPHQL_ENABLED=true` in the `.env` file and enable required resources in the API configuration file.

Caution

All the examples assume that your website has a collection called `posts`, that has a blueprint called `post`, and this blueprint has a title field (fieldtype text) and content (fieldtype markdown).

### Fetching Data

[Section titled Fetching Data](#fetching-data)

Caution

If you are using Statamic and Astro on your local machine remember to use `127.0.0.1` instead of `localhost` when fetching the API.

When requesting from the Astro server `localhost` doesn’t resolve correctly like it does in the browser, and any fetch to either API will fail.

#### REST API

[Section titled REST API](#rest-api)

Fetch your Statamic data from your site’s REST API URL. By default, it’s `https://[YOUR-SITE]/api/`. Then, you can render your data properties using Astro’s `set:html={}` directive.

For example, to display a list of titles and their content from a selected [collection](https://statamic.dev/collections):

src/pages/index.astro

    ---const res = await fetch("https://[YOUR-SITE]/api/collections/posts/entries?sort=-date")const posts = await res.json()---<h1>Astro + Statamic 🚀</h1>{  posts.map((post) => (      <h2 set:html={post.title} />      <p set:html={post.content} />  ))}

#### GraphQL

[Section titled GraphQL](#graphql)

Fetch your Statamic data with your site’s GraphQL API URL. By default, it’s `https://[YOUR-SITE]/graphql/`. Then, you can render your data properties using Astro’s `set:html={}` directive.

For example, to display a list of titles and their content from a selected [collection](https://statamic.dev/collections):

src/pages/index.astro

    ---const graphqlQuery = {  query: `    query Entries($page: Int, $locale: String) {      entries(        collection: "posts"        sort: "date asc"        limit: 20        page: $page        filter: { locale: $locale }      ) {        current_page        has_more_pages        data {          title          ... on Entry_Posts_Post {              content            }        }      }    }  `,  variables: {    page: page,    locale: locale,  },};
    const res = await fetch("https://[YOUR-SITE]/graphql", {  method: "POST",  headers: { "Content-Type": "application/json" },  body: JSON.stringify(graphqlQuery),})
    const { data } = await res.json();const entries = data?.entries;---<h1>Astro + Statamic 🚀</h1>{  entries.data.map((post) => (      <h2 set:html={post.title} />      <p set:html={post.content} />  ))}

### Publishing your site

[Section titled Publishing your site](#publishing-your-site)

To deploy your Astro site visit our [deployment guides](/en/guides/deploy/) and follow the instructions for your preferred hosting provider.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [How to build a static site using Statamic as headless CMS](https://buddy.works/guides/statamic-rest-api)
*   [Implementing Astro live previews in headless Statamic](https://maciekpalmowski.dev/implementing-live-previews-in-headless-statamic-when-using-astro/)

Themes
------

[Section titled Themes](#themes)

*    [![](/_astro/creek.CgpBUanV_Z1gsxon.webp) Creek](https://astro.build/themes/details/creek/)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/statamic.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Spinal](/en/guides/cms/spinal/) [Next  
Storyblok](/en/guides/cms/storyblok/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)