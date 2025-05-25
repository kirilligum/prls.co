Drupal & Astro
==============

[Drupal](https://www.drupal.org/) is an open-source content management tool.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

To get started, you will need to have the following:

1.  **An Astro project** - If you don’t have an Astro project yet, our [Installation guide](/en/install-and-setup/) will get you up and running in no time.
    
2.  **A Drupal site** - If you haven’t set up a Drupal site, you can follow the official guidelines [Installing Drupal](https://www.drupal.org/docs/getting-started/installing-drupal).
    

Integrating Drupal with Astro
-----------------------------

[Section titled Integrating Drupal with Astro](#integrating-drupal-with-astro)

### Installing the JSON:API Drupal module

[Section titled Installing the JSON:API Drupal module](#installing-the-jsonapi-drupal-module)

To be able to get content from Drupal you need to enable the [Drupal JSON:API module](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module).

1.  Navigate to the Extend page `admin/modules` via the Manage administrative menu
2.  Locate the JSON:API module and check the box next to it
3.  Click Install to install the new module

Now you can make `GET` requests to your Drupal application through JSON:API.

### Adding the Drupal URL in `.env`

[Section titled Adding the Drupal URL in .env](#adding-the-drupal-url-in-env)

To add your Drupal URL to Astro, create a `.env` file in the root of your project (if one does not already exist) and add the following variable:

.env

    DRUPAL_BASE_URL="https://drupal.ddev.site/"

Restart the dev server to use this environment variable in your Astro project.

### Setting up Credentials

[Section titled Setting up Credentials](#setting-up-credentials)

By default, the Drupal JSON:API endpoint is accessible for external data-fetching requests without requiring authentication. This allows you to fetch data for your Astro project without credentials but it does not permit users to modify your data or site settings.

However, if you wish to restrict access and require authentication, Drupal provides [several authentication methods](https://www.drupal.org/docs/contributed-modules/api-authentication) including:

*   [Basic Authentication](https://www.drupal.org/docs/contributed-modules/api-authentication/setup-basic-authentication)
*   [API Key-based authentication](https://www.drupal.org/docs/contributed-modules/api-authentication/api-key-authentication)
*   [Access Token/OAuth-based authentication](https://www.drupal.org/docs/contributed-modules/api-authentication/setup-access-token-oauth-based-authentication)
*   [JWT Token-based authentication](https://www.drupal.org/docs/contributed-modules/api-authentication/jwt-authentication)
*   [Third-Party Provider token authentication](https://www.drupal.org/docs/contributed-modules/api-authentication/rest-api-authentication-using-external-identity-provider)

You can add your credentials to your `.env` file.

.env

    DRUPAL_BASIC_USERNAME="editor"DRUPAL_BASIC_PASSWORD="editor"DRUPAL_JWT_TOKEN="abc123"...

Read more about [using environment variables](/en/guides/environment-variables/) and `.env` files in Astro.

Your root directory should now include this new files:

*   **.env**
*   astro.config.mjs
*   package.json

### Installing dependencies

[Section titled Installing dependencies](#installing-dependencies)

JSON:API requests and responses can often be complex and deeply nested. To simplify working with them, you can use two npm packages that streamline both the requests and the handling of responses:

*   [`JSONA`](https://www.npmjs.com/package/jsona): JSON API v1.0 specification serializer and deserializer for use on the server and in the browser.
*   [`Drupal JSON-API Params`](https://www.npmjs.com/package/drupal-jsonapi-params): This module provides a helper Class to create the required query. While doing so, it also tries to optimise the query by using the short form, whenever possible.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3065)
*   [pnpm](#tab-panel-3066)
*   [Yarn](#tab-panel-3067)

Terminal window

    npm install jsona drupal-jsonapi-params

Terminal window

    pnpm add jsona drupal-jsonapi-params

Terminal window

    yarn add jsona drupal-jsonapi-params

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Fetching data from Drupal
-------------------------

[Section titled Fetching data from Drupal](#fetching-data-from-drupal)

Your content is fetched from a JSON:API URL.

### Drupal JSON:API URL structure

[Section titled Drupal JSON:API URL structure](#drupal-jsonapi-url-structure)

The basic URL structure is: `/jsonapi/{entity_type_id}/{bundle_id}`

The URL is always prefixed by `jsonapi`.

*   The `entity_type_id` refers to the Entity Type, such as node, block, user, etc.
*   The `bundle_id` refers to the Entity Bundles. In the case of a Node entity type, the bundle could be article.
*   In this case, to get the list of all articles, the URL will be `[DRUPAL_BASE_URL]/jsonapi/node/article`.

To retrieve an individual entity, the URL structure will be `/jsonapi/{entity_type_id}/{bundle_id}/{uuid}`, where the uuid is the UUID of the entity. For example the URL to get a specific article will be of the form `/jsonapi/node/article/2ee9f0ef-1b25-4bbe-a00f-8649c68b1f7e`.

#### Retrieving only certain fields

[Section titled Retrieving only certain fields](#retrieving-only-certain-fields)

Retrieve only certain field by adding the Query String field to the request.

GET: `/jsonapi/{entity_type_id}/{bundle_id}?field[entity_type]=field_list`

Examples:

*   `/jsonapi/node/article?fields[node--article]=title,created`
*   `/jsonapi/node/article/2ee9f0ef-1b25-4bbe-a00f-8649c68b1f7e?fields[node--article]=title,created,body`

#### Filtering

[Section titled Filtering](#filtering)

Add a filter to your request by adding the filter Query String.

The simplest, most common filter is a key-value filter:

GET: `/jsonapi/{entity_type_id}/{bundle_id}?filter[field_name]=value&filter[field_other]=value`

Examples:

*   `/jsonapi/node/article?filter[title]=Testing JSON:API&filter[status]=1`
*   `/jsonapi/node/article/2ee9f0ef-1b25-4bbe-a00f-8649c68b1f7e?fields[node--article]=title&filter[title]=Testing JSON:API`

You can find more query options in the [JSON:API Documentation](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module).

### Building a Drupal query

[Section titled Building a Drupal query](#building-a-drupal-query)

Astro components can fetch data from your Drupal site by using `drupal-jsonapi-params` package to build the query.

The following example shows a component with a query for an “article” content type that has a text field for a title and a rich text field for content:

    ---import {Jsona} from "jsona";import {DrupalJsonApiParams} from "drupal-jsonapi-params";import type {TJsonApiBody} from "jsona/lib/JsonaTypes";
    // Get the Drupal base URLexport const baseUrl: string = import.meta.env.DRUPAL_BASE_URL;
    // Generate the JSON:API Query. Get all title and body from published articles.const params: DrupalJsonApiParams = new DrupalJsonApiParams();params.addFields("node--article", [        "title",        "body",    ])    .addFilter("status", "1");// Generates the query string.const path: string = params.getQueryString();const url: string = baseUrl + '/jsonapi/node/article?' + path;
    // Get the articlesconst request: Response = await fetch(url);const json: string | TJsonApiBody = await request.json();// Initiate Jsona.const dataFormatter: Jsona = new Jsona();// Deserialise the response.const articles = dataFormatter.deserialize(json);---<body> {articles?.length ? articles.map((article: any) => (    <section>      <h2>{article.title}</h2>      <article set:html={article.body.value}></article>    </section> )): <div><h1>No Content found</h1></div> }</body>

You can find more querying options in the [Drupal JSON:API Documentation](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/jsonapi)

Making a blog with Astro and Drupal
-----------------------------------

[Section titled Making a blog with Astro and Drupal](#making-a-blog-with-astro-and-drupal)

With the setup above, you are now able to create a blog that uses Drupal as the CMS.

### Prerequisites

[Section titled Prerequisites](#prerequisites-1)

1.  **An Astro project** with [`JSONA`](https://www.npmjs.com/package/jsona) and [`Drupal JSON-API Params`](https://www.npmjs.com/package/drupal-jsonapi-params) installed.
    
2.  **A Drupal site with at least one entry** - For this tutorial we recommend starting with a new Drupal site with Standard installation.
    
    In the **Content** section of your Drupal site, create a new entry by clicking the **Add** button. Then, choose Article and fill in the fields:
    
    *   **Title:** `My first article for Astro!`
    *   **Alias:** `/articles/first-article-for astro`
    *   **Description:** `This is my first Astro article! Let's see what it will look like!`
    
    Click **Save** to create your first Article. Feel free to add as many articles as you want.
    

### Displaying a list of articles

[Section titled Displaying a list of articles](#displaying-a-list-of-articles)

1.  Create `src/types.ts` if it does not already exist and add two new interfaces called `DrupalNode` and `Path` with the following code. These interfaces will match the fields of your article content type in Drupal and the Path fields. You will use it to type your article entries response.
    
    src/types.ts
    
        export interface Path {    alias: string    pid: number    langcode: string}
        export interface DrupalNode extends Record<string, any> {    id: string    type: string    langcode: string    status: boolean    drupal_internal__nid: number    drupal_internal__vid: number    changed: string    created: string    title: string    default_langcode: boolean    sticky: boolean    path: Path}
    
    Your src directory should now include the new file:
    
    *   .env
    *   astro.config.mjs
    *   package.json
    *   Directorysrc/
        
        *   **types.ts**
        
    
2.  Create a new file called `drupal.ts` under `src/api` and add the following code:
    
    src/api/drupal.ts
    
        import {Jsona} from "jsona";import {DrupalJsonApiParams} from "drupal-jsonapi-params";import type {DrupalNode} from "../types.ts";import type {TJsonApiBody} from "jsona/lib/JsonaTypes";
        // Get the Drupal Base Url.export const baseUrl: string = import.meta.env.DRUPAL_BASE_URL;
    
    This will import the required libraries such as `Jsona` to deserialize the response, `DrupalJsonApiParams` to format the request url and the Node and Jsona types. It will also get the `baseUrl` from the `.env` file.
    
    Your src/api directory should now include the new file:
    
    *   .env
    *   astro.config.mjs
    *   package.json
    *   Directorysrc/
        
        *   Directoryapi/
            
            *   **drupal.ts**
            
        *   types.ts
        
    
3.  In that same file, create the `fetchUrl` function to make the fetch request and deserialize the response.
    
    src/api/drupal.ts
    
        import {Jsona} from "jsona";import {DrupalJsonApiParams} from "drupal-jsonapi-params";import type {DrupalNode} from "../types.ts";import type {TJsonApiBody} from "jsona/lib/JsonaTypes";
        // Get the Drupal Base Url.export const baseUrl: string = import.meta.env.DRUPAL_BASE_URL;
        /** * Fetch url from Drupal. * * @param url * * @return Promise<TJsonaModel | TJsonaModel[]> as Promise<any> */export const fetchUrl = async (url: string): Promise<any> => {    const request: Response = await fetch(url);    const json: string | TJsonApiBody = await request.json();    const dataFormatter: Jsona = new Jsona();    return dataFormatter.deserialize(json);}
    
4.  Create the `getArticles()` function to get all published articles.
    
    src/api/drupal.ts
    
        import {Jsona} from "jsona";import {DrupalJsonApiParams} from "drupal-jsonapi-params";import type {DrupalNode} from "../types.ts";import type {TJsonApiBody} from "jsona/lib/JsonaTypes";
        // Get the Drupal Base Url.export const baseUrl: string = import.meta.env.DRUPAL_BASE_URL;
        /** * Fetch url from Drupal. * * @param url * * @return Promise<TJsonaModel | TJsonaModel[]> as Promise<any> */export const fetchUrl = async (url: string): Promise<any> => {    const request: Response = await fetch(url);    const json: string | TJsonApiBody = await request.json();    const dataFormatter: Jsona = new Jsona();    return dataFormatter.deserialize(json);}
        /** * Get all published articles. * * @return Promise<DrupalNode[]> */export const getArticles = async (): Promise<DrupalNode[]> => {    const params: DrupalJsonApiParams = new DrupalJsonApiParams();    params        .addFields("node--article", [            "title",            "path",            "body",            "created",        ])        .addFilter("status", "1");    const path: string = params.getQueryString();    return await fetchUrl(baseUrl + '/jsonapi/node/article?' + path);}
    
    Now you can use the function `getArticles()` in an `.astro` component to get all published articles with data for each title, body, path and creation date.
    
5.  Go to the Astro page where you will fetch data from Drupal. The following example creates an articles landing page at `src/pages/articles/index.astro`.
    
    Import the necessary dependencies and fetch all the entries from Drupal with a content type of `article` using `getArticles()` while passing the `DrupalNode` interface to type your response.
    
    src/pages/articles/index.astro
    
        ---import {Jsona} from "jsona";import {DrupalJsonApiParams} from "drupal-jsonapi-params";import type {TJsonApiBody} from "jsona/lib/JsonaTypes";
        import type { DrupalNode } from "../../types";import {getArticles} from "../../api/drupal";
        // Get all published articles.const articles = await getArticles();---
    
    This fetch call using getArticles() will return a typed array of entries that can be used in your page template.
    
    Your `src/pages/` directory should now include the new file, if you used the same page file:
    
    *   .env
    *   astro.config.mjs
    *   package.json
    *   Directorysrc/
        
        *   Directoryapi/
            
            *   drupal.ts
            
        *   Directorypages/
            
            *   Directoryarticles/
                
                *   **index.astro**
                
            
        *   types.ts
        
    
6.  Add content to your page, such as a title. Use `articles.map()` to show your Drupal entries as line items in a list.
    
    src/pages/articles/index.astro
    
        ---import {Jsona} from "jsona";import {DrupalJsonApiParams} from "drupal-jsonapi-params";import type {TJsonApiBody} from "jsona/lib/JsonaTypes";
        import type { DrupalNode } from "../types";import {getArticles} from "../api/drupal";
        // Get all published articles.const articles = await getArticles();---<html lang="en">  <head>    <title>My news site</title>  </head>  <body>    <h1>My news site</h1>    <ul>      {articles.map((article: DrupalNode) => (        <li>          <a href={article.path.alias.replace("internal:en/", "")}>            <h2>{article.title}</h2>            <p>Published on {article.created}</p>          </a>        </li>      ))}    </ul>  </body></html>
    

### Generating individual blog posts

[Section titled Generating individual blog posts](#generating-individual-blog-posts)

Use the same method to fetch your data from Drupal as above, but this time, on a page that will create a unique page route for each article.

This example uses Astro’s default static mode, and creates [a dynamic routing page file](/en/guides/routing/#dynamic-routes) with the `getStaticPaths()` function. This function will be called at build time to generate the list of paths that become pages.

1.  Create a new file `src/pages/articles/[path].astro` and import the `DrupalNode` interface and `getArticle()` from `src/api/drupal.ts`. Fetch your data inside a `getStaticPaths()` function to create routes for your blog.
    
    src/pages/articles/\[path\].astro
    
        ---import {Jsona} from "jsona";import {DrupalJsonApiParams} from "drupal-jsonapi-params";import type {TJsonApiBody} from "jsona/lib/JsonaTypes";
        import type { DrupalNode } from "../../types";import {getArticles} from "../../api/drupal";
        // Get all published articles.export async function getStaticPaths() {  const articles = await getArticles();}---
    
    Your src/pages/articles directory should now include the new file:
    
    *   .env
    *   astro.config.mjs
    *   package.json
    *   Directorysrc/
        
        *   Directoryapi/
            
            *   drupal.ts
            
        *   Directorypages/
            
            *   Directoryarticles/
                
                *   index.astro
                *   **\[path\].astro**
                
            
        *   types.ts
        
    
2.  In the same file, map each Drupal entry to an object with a `params` and `props` property. The `params` property will be used to generate the URL of the page and the `props` values will be passed to the page component as props.
    
    src/pages/articles/\[path\].astro
    
        ---import {Jsona} from "jsona";import {DrupalJsonApiParams} from "drupal-jsonapi-params";import type {TJsonApiBody} from "jsona/lib/JsonaTypes";
        import type { DrupalNode } from "../../types";import {getArticles} from "../../api/drupal";
        // Get all published articles.export async function getStaticPaths() {    const articles = await getArticles();    return articles.map((article: DrupalNode) => {        return {            params: {                // Choose `path` to match the `[path]` routing value                path: article.path.alias.split('/')[2]            },            props: {                title: article.title,                body: article.body,                date: new Date(article.created).toLocaleDateString('en-EN', {                    day: "numeric",                    month: "long",                    year: "numeric"                })            }        }    });}---
    
    The property inside `params` must match the name of the dynamic route. Since the filename is `[path].astro`, the property name passed to `params` must be `path`.
    
    In our example, the `props` object passes three properties to the page:
    
    *   `title`: a string, representing the title of your post.
    *   `body`: a string, representing the content of your entry.
    *   `date`: a timestamp, based on your file creation date.
3.  Use the page `props` to display your blog post.
    
    src/pages/articles/\[path\].astro
    
        ---import {Jsona} from "jsona";import {DrupalJsonApiParams} from "drupal-jsonapi-params";import type {TJsonApiBody} from "jsona/lib/JsonaTypes";
        import type { DrupalNode } from "../../types";import {getArticles} from "../../api/drupal";
        // Get all published articles.export async function getStaticPaths() {    const articles = await getArticles();    return articles.map((article: DrupalNode) => {        return {            params: {                path: article.path.alias.split('/')[2]            },            props: {                title: article.title,                body: article.body,                date: new Date(article.created).toLocaleDateString('en-EN', {                    day: "numeric",                    month: "long",                    year: "numeric"                })            }        }    });}
        const {title, date, body} = Astro.props;---<html lang="en">  <head>    <title>{title}</title>  </head>  <body>    <h1>{title}</h1>    <time>{date}</time>    <article set:html={body.value} />  </body></html>
    
4.  Navigate to your dev server preview and click on one of your posts to make sure your dynamic route is working.
    

### Publishing your site

[Section titled Publishing your site](#publishing-your-site)

To deploy your website, visit our [deployment guides](/en/guides/deploy/) and follow the instructions for your preferred hosting provider.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[Create a web application with Astro and Drupal](https://www.linkedin.com/pulse/create-web-application-astrojs-website-generator-using-gambino-kx6cf)

Have a resource to share?

If you found (or made!) a helpful video or blog post about using Drupal with Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/drupal.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/drupal.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Directus](/en/guides/cms/directus/) [Next  
Flotiq](/en/guides/cms/flotiq/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)