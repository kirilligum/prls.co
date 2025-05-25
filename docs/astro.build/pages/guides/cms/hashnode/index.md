Hashnode & Astro
================

[Hashnode](https://hashnode.com/) is a hosted CMS that allows you to create a blog or publication.

Integrating with Astro
----------------------

[Section titled Integrating with Astro](#integrating-with-astro)

The [Hashnode Public API](https://apidocs.hashnode.com/) is a GraphQL API that allows you to interact with Hashnode. This guide uses [`graphql-request`](https://github.com/jasonkuhrt/graphql-request), a minimal GraphQL client that works well with Astro, to bring your Hashnode data into your Astro project.

### Prerequisites

[Section titled Prerequisites](#prerequisites)

To get started you will need to have the following:

1.  **An Astro project** - If you don’t have an Astro project yet, our [Installation guide](/en/install-and-setup/) will get you up and running in no time.
    
2.  **A Hashnode site** - You can create free personal site by visiting [Hashnode](https://hashnode.com/).
    

### Installing dependencies

[Section titled Installing dependencies](#installing-dependencies)

Install the `graphql-request` package using the package manager of your choice:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3077)
*   [pnpm](#tab-panel-3078)
*   [Yarn](#tab-panel-3079)

Terminal window

    npm install graphql-request

Terminal window

    pnpm add graphql-request

Terminal window

    yarn add graphql-request

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Making a blog with Astro and Hashnode
-------------------------------------

[Section titled Making a blog with Astro and Hashnode](#making-a-blog-with-astro-and-hashnode)

This guide uses [`graphql-request`](https://github.com/jasonkuhrt/graphql-request), a minimal GraphQL client that works well with Astro, to bring your Hashnode data into your Astro project.

### Prerequisites

[Section titled Prerequisites](#prerequisites-1)

1.  A Hashnode Blog
2.  An Astro project integrated with the [graphql-request](https://github.com/jasonkuhrt/graphql-request) package installed.

This example will create an index page that lists posts with links to dynamically-generated individual post pages.

### Fetching Data

[Section titled Fetching Data](#fetching-data)

1.  To fetch your site’s data with the `graphql-request` package, make a `src/lib` directory and create two new files `client.ts` & `schema.ts`:
    
    *   Directorysrc/
        
        *   Directorylib/
            
            *   **client.ts**
            *   **schema.ts**
            
        *   Directorypages/
            
            *   index.astro
            
        
    *   astro.config.mjs
    *   package.json
    
2.  Initialize an API instance with the GraphQLClient using the URL from your Hashnode Website.
    
    src/lib/client.ts
    
        import { gql, GraphQLClient } from "graphql-request";import type { AllPostsData, PostData } from "./schema";
        export const getClient = () => {  return new GraphQLClient("https://gql.hashnode.com")}
        const myHashnodeURL = "astroplayground.hashnode.dev";
        export const getAllPosts = async () => {  const client = getClient();
          const allPosts = await client.request<AllPostsData>(    gql`      query allPosts {        publication(host: "${myHashnodeURL}") {          id          title          posts(first: 20) {            pageInfo{              hasNextPage              endCursor            }            edges {              node {                id                author{                  name                  profilePicture                }                title                subtitle                brief                slug                coverImage {                  url                }                tags {                  name                  slug                }                publishedAt                readTimeInMinutes              }            }          }        }      }    `  );
          return allPosts;};
        
        export const getPost = async (slug: string) => {  const client = getClient();
          const data = await client.request<PostData>(    gql`      query postDetails($slug: String!) {        publication(host: "${myHashnodeURL}") {          id          post(slug: $slug) {            id            author{              name              profilePicture            }            publishedAt            title            subtitle            readTimeInMinutes            content{              html            }            tags {              name              slug            }            coverImage {              url            }          }        }      }    `,    { slug: slug }  );
          return data.publication.post;};
    
3.  Configure `schema.ts` to define the shape of the data returned from the Hashnode API.
    
    src/lib/schema.ts
    
        import { z } from "astro/zod";
        export const PostSchema = z.object({    id: z.string(),    author: z.object({        name: z.string(),        profilePicture: z.string(),        }),    publishedAt: z.string(),    title: z.string(),    subtitle: z.string(),    brief: z.string(),    slug: z.string(),    readTimeInMinutes: z.number(),    content: z.object({        html: z.string(),    }),    tags: z.array(z.object({        name: z.string(),        slug: z.string(),    })),    coverImage: z.object({        url: z.string(),    }),})
        export const AllPostsDataSchema = z.object({    id: z.string(),    publication: z.object({        title: z.string(),        posts: z.object({            pageInfo: z.object({                hasNextPage: z.boolean(),                endCursor: z.string(),            }),            edges: z.array(z.object({                node: PostSchema,            })),        }),    }),})
        export const PostDataSchema = z.object({    id: z.string(),    publication: z.object({        title: z.string(),        post: PostSchema,    }),})
        export type Post = z.infer<typeof PostSchema>export type AllPostsData = z.infer<typeof AllPostsDataSchema>export type PostData = z.infer<typeof PostDataSchema>
    

### Displaying a list of posts

[Section titled Displaying a list of posts](#displaying-a-list-of-posts)

Fetching via `getAllPosts()` returns an array of objects containing the properties for each post such as:

*   `title` - the title of the post
*   `brief` - the HTML rendering of the content of the post
*   `coverImage.url` - the source URL of the featured image of the post
*   `slug` - the slug of the post

Use the `posts` array returned from the fetch to display a list of blog posts on the page.

src/pages/index.astro

    ---import { getAllPosts } from '../lib/client';
    const data = await getAllPosts();const allPosts = data.publication.posts.edges;
    ---
    <html lang="en">    <head>        <title>Astro + Hashnode</title>    </head>    <body>
            {            allPosts.map((post) => (                <div>                    <h2>{post.node.title}</h2>                    <p>{post.node.brief}</p>                    <img src={post.node.coverImage.url} alt={post.node.title} />                    <a href={`/post/${post.node.slug}`}>Read more</a>                </div>            ))        }    </body></html>

### Generating pages

[Section titled Generating pages](#generating-pages)

1.  Create the page `src/pages/post/[slug].astro` to [dynamically generate a page](/en/guides/routing/#dynamic-routes) for each post.
    
    *   Directorysrc/
        
        *   Directorylib/
            
            *   client.ts
            *   schema.ts
            
        *   Directorypages/
            
            *   index.astro
            *   Directorypost/
                
                *   **\[slug\].astro**
                
            
        
    *   astro.config.mjs
    *   package.json
    
2.  Import and use `getAllPosts()` and `getPost()` to fetch the data from Hashnode and generate individual page routes for each post.
    
    src/pages/post/\[slug\].astro
    
        ---import { getAllPosts, getPost } from '../../lib/client';
        
        export async function getStaticPaths() {  const data = await getAllPosts();  const allPosts = data.publication.posts.edges;  return allPosts.map((post) => {    return {      params: { slug: post.node.slug },    }  })}const { slug } = Astro.params;const post = await getPost(slug);
        ---
    
3.  Create the template for each page using the properties of each `post` object. The example below shows the post title and reading time, then the full post content:
    
    src/pages/post/\[slug\].astro
    
        ---import { getAllPosts, getPost } from '../../lib/client';
        
        export async function getStaticPaths() {  const data = await getAllPosts();  const allPosts = data.publication.posts.edges;  return allPosts.map((post) => {    return {      params: { slug: post.node.slug },    }  })}const { slug } = Astro.params;const post = await getPost(slug);
        ---<!DOCTYPE html><html lang="en">    <head>        <title>{post.title}</title>    </head>    <body>        <img src={post.coverImage.url} alt={post.title} />
                <h1>{post.title}</h1>        <p>{post.readTimeInMinutes} min read</p>
                <Fragment set:html={post.content.html} />    </body></html>
    
    Note
    
    `<Fragment />` is a built-in Astro component which allows you to avoid an unnecessary wrapper element. This can be especially useful when fetching HTML from a CMS (e.g. Hashnode or [WordPress](/en/guides/cms/wordpress/)).
    

### Publishing your site

[Section titled Publishing your site](#publishing-your-site)

To deploy your site visit our [deployment guide](/en/guides/deploy/) and follow the instructions for your preferred hosting provider.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [`astro-hashnode`](https://github.com/matthiesenxyz/astro-hashnode) on GitHub

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/hashnode.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
GitCMS](/en/guides/cms/gitcms/) [Next  
Hygraph](/en/guides/cms/hygraph/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)