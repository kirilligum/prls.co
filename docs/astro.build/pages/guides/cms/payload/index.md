Payload CMS & Astro
===================

[PayloadCMS](https://payloadcms.com/) is a headless open-source content management system that can be used to provide content for your Astro project.

Integrating with Astro
----------------------

[Section titled Integrating with Astro](#integrating-with-astro)

### Prerequisites

[Section titled Prerequisites](#prerequisites)

1.  **An Astro project** - If you don’t have an Astro project yet, our [Installation guide](/en/install-and-setup/) will get you up and running in no time.
2.  **A MongoDB database** - PayloadCMS will ask you for a MongoDB connection string when creating a new project. You can set one up locally or use [MongoDBAtlas](https://www.mongodb.com/) to host a database on the web for free.
3.  **A PayloadCMS REST API** - Create a [PayloadCMS](https://payloadcms.com/docs/getting-started/installation) project and connect it to your MongoDB database during the setup.

Choosing a template

During the PayloadCMS installation, you will be asked if you want to use a template.

Choosing any of the available templates at this step (such as ‘blog’) automatically generates additional collections for you to use. Otherwise, you will need to manually create your PayloadCMS collections.

### Configuring Astro for your PayloadCMS collection

[Section titled Configuring Astro for your PayloadCMS collection](#configuring-astro-for-your-payloadcms-collection)

Your Payload project template will contain a file called Posts.ts in `src/collections/`. If you did not choose a template during installation that created a content collection for you, you can create a new Payload CMS Collection by adding this configuration file manually. The example below shows this file for a collection called `posts` that requires `title`, `content`, and `slug` fields:

src/collections/Posts.ts

    import { CollectionConfig } from "payload/types";
    const Posts: CollectionConfig = {  slug: "posts",  admin: {    useAsTitle: "title",  },  access: {    read: () => true,  },
      fields: [    {      name: "title",      type: "text",      required: true,    },    {      name: "content",      type: "text",      required: true,    },    {      name: "slug",      type: "text",      required: true,    },  ],};
    export default Posts;

1.  Import and add both `Users` (available in all PayloadCMS projects) and any other collections (e.g. `Posts`) to the available collections in the `payload.config.ts` file.
    
    src/payload.config.ts
    
        import { buildConfig } from "payload/config";import path from "path";
        import Users from "./collections/Users";import Posts from "./collections/Posts";
        export default buildConfig({  serverURL: "http://localhost:4321",  admin: {    user: Users.slug,  },  collections: [Users, Posts],  typescript: {    outputFile: path.resolve(__dirname, "payload-types.ts"),  },  graphQL: {    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),  },});
    
    This will make a new collection called “Posts” appear in your PayloadCMS Dashboard next to the “Users” collection.
    
2.  Enter the “Posts” collection and create a new post. After saving it, you will notice the API URL appear in the bottom right corner.
    
3.  With the dev server running, open `http://localhost:4321/api/posts` in your browser. You should see a JSON file containing the post you have created as an object.
    
        {  "docs":[      {        "id":"64098b16483b0f06a7e20ed4",        "title":"Astro & PayloadCMS Title 🚀",        "content":"Astro & PayloadCMS Content",        "slug":"astro-payloadcms-slug",        "createdAt":"2023-03-09T07:30:30.837Z",        "updatedAt":"2023-03-09T07:30:30.837Z"      }  ],  "totalDocs":1,  "limit":10,  "totalPages":1,  "page":1,  "pagingCounter":1,  "hasPrevPage":false,  "hasNextPage":false,  "prevPage":null,  "nextPage":null}
    

Tip

By default, both Astro and PayloadCMS will use port 4321. You might want to change the PayloadCMS port in the `src/server.ts` file. Don’t forget to update the `serverURL` in `src/payload.config.ts` as well.

### Fetching Data

[Section titled Fetching Data](#fetching-data)

Fetch your PayloadCMS data through your site’s unique REST API URL and the route for your content. (By default, PayloadCMS will mount all routes through `/api`.) Then, you can render your data properties using Astro’s `set:html=""` directive.

Together with your post, PayloadCMS will return some top-level metadata. The actual documents are nested within the `docs` array.

For example, to display a list of post titles and their content:

src/pages/index.astro

    ---import HomeLayout from "../layouts/HomeLayout.astro";
    const res = await fetch("http://localhost:5000/api/posts") // http://localhost:4321/api/posts by defaultconst posts = await res.json()---
    <HomeLayout title='Astro Blog'>  {    posts.docs.map((post) => (        <h2 set:html={post.title} />        <p set:html={post.content} />    ))  }</HomeLayout>

Building a blog with PayloadCMS and Astro
-----------------------------------------

[Section titled Building a blog with PayloadCMS and Astro](#building-a-blog-with-payloadcms-and-astro)

Create a blog index page `src/pages/index.astro` to list each of your posts with a link to its own page.

Fetching via the API returns an array of objects (posts) that include, among others, the following properties:

*   `title`
*   `content`
*   `slug`

src/pages/index.astro

    ---import HomeLayout from "../layouts/HomeLayout.astro";
    const res = await fetch("http://localhost:5000/api/posts") // http://localhost:4321/api/posts by defaultconst posts = await res.json()---
    <HomeLayout title='Astro Blog'>  <h1>Astro + PayloadCMS 🚀</h1>  <h2>Blog posts list:</h2>  <ul>    {      posts.docs.map((post) =>(        <li>          <a href={`posts/${post.slug}`} set:html={post.title} />        </li>      ))    }  </ul></HomeLayout>

### Using the PayloadCMS API to generate pages

[Section titled Using the PayloadCMS API to generate pages](#using-the-payloadcms-api-to-generate-pages)

Create a page `src/pages/posts/[slug].astro` to [dynamically generate a page](/en/guides/routing/#dynamic-routes) for each post.

src/pages/posts/\[slug\].astro

    ---import PostLayout from "../../layouts/PostLayout.astro"
    const {title, content} = Astro.props
    // The getStaticPaths() is required for static Astro sites.// If using SSR, you will not need this function.export async function getStaticPaths() {    let data = await fetch("http://localhost:5000/api/posts")    let posts = await data.json()
        return posts.docs.map((post) => {        return {            params: {slug: post.slug},            props: {title: post.title, content: post.content},        };    });}---<PostLayout title={title}>    <article>        <h1 set:html={title} />        <p set:html={content} />    </article></PostLayout>

### Publishing your site

[Section titled Publishing your site](#publishing-your-site)

To deploy your site visit our [deployment guide](/en/guides/deploy/) and follow the instructions for your preferred hosting provider.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   Check out the [official Astro Payload CMS integration](https://github.com/payloadcms/payload/tree/main/examples/astro).
*   Try this [Payload CMS & Astro Template](https://github.com/Lambdo-Labs/payloadcms-astro-template).
*   Check out [Astroad](https://github.com/mooxl/astroad) for easy development and VPS deployment with Docker.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/payload.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
microCMS](/en/guides/cms/microcms/) [Next  
Prepr CMS](/en/guides/cms/preprcms/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)