Migrating from Gatsby
=====================

Here are some key concepts and migration strategies to help you get started. Use the rest of our docs and our [Discord community](https://astro.build/chat) to keep going!

Key Similarities between Gatsby and Astro
-----------------------------------------

[Section titled Key Similarities between Gatsby and Astro](#key-similarities-between-gatsby-and-astro)

Gatsby and Astro share some similarities that will help you migrate your project:

*   The [syntax of `.astro` files is similar to JSX](/en/reference/astro-syntax/#jsx-like-expressions). Writing Astro should feel familiar.
    
*   Astro has built-in support for [Markdown](/en/guides/markdown-content/) and an integration for using MDX files. Also, you can configure and continue to use many of your existing Markdown plugins.
    
*   Astro also has an [official integration for using React components](/en/guides/integrations-guide/react/). Note that in Astro, React files **must** have a `.jsx` or `.tsx` extension.
    
*   Astro has support for [installing NPM packages](/en/guides/imports/#npm-packages), including React libraries. Many of your existing dependencies will work in Astro.
    
*   Like Gatsby, Astro projects can be SSG or [SSR with page-level prerendering](/en/guides/on-demand-rendering/).
    

Key Differences between Gatsby and Astro
----------------------------------------

[Section titled Key Differences between Gatsby and Astro](#key-differences-between-gatsby-and-astro)

When you rebuild your Gatsby site in Astro, you will notice some important differences:

*   Gatsby projects are React single-page apps and use `index.js` as your project’s root. Astro projects are multi-page sites, and `index.astro` is your home page.
    
*   [Astro components](/en/basics/astro-components/) are not written as exported functions that return page templating. Instead, you’ll split your code into a “code fence” for your JavaScript and a body exclusively for the HTML you generate.
    
*   [Local file data](/en/guides/imports/): Gatsby uses GraphQL to retrieve data from your project files. Astro uses ESM imports and top-level await functions (e.g. [`import.meta.glob()`](/en/guides/imports/#importmetaglob), [`getCollection()`](/en/guides/content-collections/#querying-collections)) to import data from your project files. You can manually add GraphQL to your Astro project but it is not included by default.
    

Convert your Gatsby Project
---------------------------

[Section titled Convert your Gatsby Project](#convert-your-gatsby-project)

Each project migration will look different, but there are some common actions you will perform when converting from Gatsby to Astro.

### Create a new Astro project

[Section titled Create a new Astro project](#create-a-new-astro-project)

Use the `create astro` command for your package manager to launch Astro’s CLI wizard or choose a community theme from the [Astro Theme Showcase](https://astro.build/themes).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters (e.g. `docs`, `blog`, `portfolio`). Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

*   [npm](#tab-panel-3353)
*   [pnpm](#tab-panel-3354)
*   [Yarn](#tab-panel-3355)

Terminal window

    # launch the Astro CLI Wizardnpm create astro@latest
    # create a new project with an official examplenpm create astro@latest -- --template <example-name>

Terminal window

    # launch the Astro CLI Wizardpnpm create astro@latest
    # create a new project with an official examplepnpm create astro@latest --template <example-name>

Terminal window

    # launch the Astro CLI Wizardyarn create astro@latest
    # create a new project with an official exampleyarn create astro@latest --template <example-name>

Then, copy your existing Gatsby project files over to your new Astro project into a separate folder outside of `src`.

Tip

Visit [https://astro.new](https://astro.new) for the full list of official starter templates, and links for opening a new project in IDX, StackBlitz, CodeSandbox, or Gitpod.

### Install integrations (optional)

[Section titled Install integrations (optional)](#install-integrations-optional)

You may find it useful to install some of [Astro’s optional integrations](/en/guides/integrations-guide/) to use while converting your Gatsby project to Astro:

*   **@astrojs/react**: to reuse some existing React UI components in your new Astro site or keep writing with React components.
    
*   **@astrojs/mdx**: to bring existing MDX files from your Gatsby project, or to use MDX in your new Astro site.
    

### Put your code in `src`

[Section titled Put your code in src](#put-your-code-in-src)

Following [Astro’s project structure](/en/basics/project-structure/):

1.  **Delete** Gatsby’s `public/` folder.
    
    Gatsby uses the `public/` directory for its build output, so you can safely discard this folder. You will no longer need a built version of your Gatsby site. (Astro uses `dist/` by default for the build output.)
    
2.  **Rename** Gatsby’s `static/` folder to `public/`, and use it as Astro’s `public/` folder.
    
    Astro uses a folder called `public/` for static assets. You can alternatively copy the contents of `static/` into your existing Astro `public/` folder.
    
3.  **Copy or Move** Gatsby’s other files and folders (e.g. `components`, `pages`, etc.) as needed into your Astro `src/` folder as you rebuild your site, following [Astro’s project structure](/en/basics/project-structure/).
    
    Astro’s `src/pages/` folder is a special folder used for file-based routing to create your site’s pages and posts from `.astro`, `.md` and `.mdx` files. You will not have to configure any routing behavior for your Astro, Markdown, and MDX files.
    
    All other folders are optional, and you can organize the contents of your `src/` folder any way you like. Other common folders in Astro projects include `src/layouts/`, `src/components`, `src/styles`, and `src/scripts`.
    

### Tips: Convert JSX files to `.astro` files

[Section titled Tips: Convert JSX files to .astro files](#tips-convert-jsx-files-to-astro-files)

Here are some tips for converting a Gatsby `.js` component into a `.astro` component:

1.  Use only the `return()` of the existing Gatsby component function as your HTML template.
    
2.  Change any [Gatsby or JSX syntax to Astro syntax](#reference-convert-to-astro-syntax) or to HTML web standards. This includes `<Link to="">`, `{children}`, and `className`, for example.
    
3.  Move any necessary JavaScript, including import statements, into a [“code fence” (`---`)](/en/basics/astro-components/#the-component-script). Note: JavaScript to [conditionally render content](/en/reference/astro-syntax/#dynamic-html) is often written inside the HTML template directly in Astro.
    
4.  Use [`Astro.props`](/en/reference/api-reference/#props) to access any additional props that were previously passed to your Gatsby function.
    
5.  Decide whether any imported components also need to be converted to Astro. With the official React integration installed, you can [use existing React components in your Astro files](/en/guides/framework-components/). But, you may want to convert them to `.astro` components, especially if they do not need to be interactive!
    
6.  Remove any GraphQL queries. Instead, use import and [`import.meta.glob()`](/en/guides/imports/#importmetaglob) statements to query your local files.
    

See [an example from Gatsby’s Blog starter template converted step-by-step](#guided-example-gatsby-layout-to-astro)

#### Compare: `.jsx` vs `.astro`

[Section titled Compare: .jsx vs .astro](#compare-jsx-vs-astro)

Compare the following Gatsby component and a corresponding Astro component:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [JSX](#tab-panel-3351)
*   [Astro](#tab-panel-3352)

component.jsx

    import * as React from "react"import { useStaticQuery, graphql } from "gatsby"import Header from "./header"import Footer from "./footer"import "./layout.css"
    const Component = ({ message, children }) => {  const data = useStaticQuery(graphql`    query SiteTitleQuery {      site {        siteMetadata {          title        }      }    }  `)  return (    <>      <Header siteTitle={data.site.siteMetadata.title} />      <div style={{ margin: `0`, maxWidth: `960`}}>{message}</div>      <main>{children}</main>      <Footer siteTitle={data.site.siteMetadata} />    </>  )}
    export default Component

component.astro

    ---import Header from "./Header.astro"import Footer from "./Footer.astro"import "../styles/stylesheet.css"import { site } from "../data/siteMetaData.js"const { message } = Astro.props---<Header siteTitle={site.title} />  <div style="margin: 0; max-width: 960;">{message}</div>  <main>    <slot />  </main><Footer siteTitle={site.title} />

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### Migrating Layout Files

[Section titled Migrating Layout Files](#migrating-layout-files)

You may find it helpful to start by converting your Gatsby layouts and templates into [Astro layout components](/en/basics/layouts/).

Each Astro page explicitly requires `<html>`, `<head>`, and `<body>` tags to be present, so it is common to reuse a layout file across pages. Astro uses a [`<slot />`](/en/basics/astro-components/#slots) instead of React’s `{children}` prop for page content, with no import statement required. Your Gatsby `layout.js` and templates will not include these.

Note the standard HTML templating, and direct access to `<head>`:

src/layouts/Layout.astro

    <html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <!-- Wrap the slot element with your existing layout templating -->    <slot />  </body></html>

You may also wish to reuse code from Gatsby’s `src/components/seo.js` to include additional site metadata. Notice that Astro uses neither `<Helmet>` nor `<Header>` but instead creates `<head>` directly. You may import and use components, even within `<head>`, to separate and organize your page content.

### Migrating Pages and Posts

[Section titled Migrating Pages and Posts](#migrating-pages-and-posts)

In Gatsby, your [pages and posts](/en/basics/astro-pages/) may exist in `src/pages/` or outside of `src` in another folder, like `content`. In Astro, all your page content must live within `src/` unless you are using [content collections](/en/guides/content-collections/).

#### React Pages

[Section titled React Pages](#react-pages)

Your existing Gatsby JSX (`.js`) pages will need to be [converted from JSX files to `.astro` pages](#tips-convert-jsx-files-to-astro-files). You cannot use an existing JSX page file in Astro.

These [`.astro` pages](/en/basics/astro-pages/) must be located within `src/pages/` and will have page routes generated automatically based on their file path.

#### Markdown and MDX pages

[Section titled Markdown and MDX pages](#markdown-and-mdx-pages)

Astro has built-in support for Markdown and an optional integration for MDX files. Your existing [Markdown and MDX files](/en/guides/markdown-content/) can be reused but may require some adjustments to their frontmatter, such as adding [Astro’s special `layout` frontmatter property](/en/basics/layouts/#markdown-layouts). They can also be placed within `src/pages/` to take advantage of automatic file-based routing.

Alternatively, you can use [content collections](/en/guides/content-collections/) in Astro to store and manage your content. You will retrieve the content yourself and [generate those pages dynamically](/en/guides/content-collections/#generating-routes-from-content).

### Migrating Tests

[Section titled Migrating Tests](#migrating-tests)

As Astro outputs raw HTML, it is possible to write end-to-end tests using the output of the build step. Any end-to-end tests written previously might work out-of-the-box if you have been able to match the markup of the older Gatsby site. Testing libraries such as Jest and React Testing Library can be imported and used in Astro to test your React components.

See Astro’s [testing guide](/en/guides/testing/) for more.

### Repurpose config files

[Section titled Repurpose config files](#repurpose-config-files)

Gatsby has several top-level configuration files that also include site and page metadata and are used for routing. You will not use any of these `gatsby-*.js` files in your Astro project, but there may be some content that you can reuse as you build your Astro project:

*   `gatsby-config.js`: Move your `siteMetadata: {}` into `src/data/siteMetadata.js` (or `siteMetadata.json`) to import data about your site (title, description, social accounts, etc.) into page layouts.
    
*   `gatsby-browser.js`: Consider adding anything used here directly into your [main layout](#migrating-layout-files)’s `<head>` tag.
    
*   `gatsby-node.js`: You will not need to create your own nodes in Astro, but viewing the schema in this file may help you with defining types in your Astro project.
    
*   `gatsby-ssr.js`: If you choose to use SSR in Astro, you will [add and configure the SSR adapter](/en/guides/on-demand-rendering/) of your choice directly in `astro.config.mjs`.
    

Reference: Convert to Astro Syntax
----------------------------------

[Section titled Reference: Convert to Astro Syntax](#reference-convert-to-astro-syntax)

The following are some examples of Gatsby-specific syntax that you will need to convert to Astro. See more [differences between Astro and JSX](/en/reference/astro-syntax/#differences-between-astro-and-jsx) in the guide to writing Astro components.

### Gatsby Links to Astro

[Section titled Gatsby Links to Astro](#gatsby-links-to-astro)

Convert any Gatsby `<Link to="">`, `<NavLink>` etc. components to HTML `<a href="">` tags.

    <Link to="/blog">Blog</Link><a href="/blog">Blog</a>

Astro does not use any special component for links, although you are welcome to build your own `<Link>` component. You can then import and use this `<Link>` just as you would any other component.

src/components/Link.astro

    ---const { to } = Astro.props---<a href={to}><slot /></a>

### Gatsby Imports to Astro

[Section titled Gatsby Imports to Astro](#gatsby-imports-to-astro)

If necessary, update any [file imports](/en/guides/imports/) to reference relative file paths exactly. This can be done using [import aliases](/en/guides/typescript/#import-aliases), or by writing out a relative path in full.

Note that `.astro` and several other file types must be imported with their full file extension.

src/pages/authors/Fred.astro

    ---import Card from `../../components/Card.astro`;---<Card />

### Gatsby Children Props to Astro

[Section titled Gatsby Children Props to Astro](#gatsby-children-props-to-astro)

Convert any instances of `{children}` to an Astro `<slot />`. Astro does not need to receive `{children}` as a function prop and will automatically render child content in a `<slot />`.

src/components/MyComponent

    ------export default function MyComponent(props) {    return (      <div>        {props.children}      </div>    );}
    <div>  <slot /></div>

React components that pass multiple sets of children can be migrated to an Astro component using [named slots](/en/basics/astro-components/#named-slots).

See more about [specific `<slot />` usage in Astro](/en/basics/astro-components/#slots).

### Gatsby Styling to Astro

[Section titled Gatsby Styling to Astro](#gatsby-styling-to-astro)

You may need to replace any [CSS-in-JS libraries](https://github.com/withastro/astro/issues/4432) (e.g. styled-components) with other available CSS options in Astro.

If necessary, convert any inline style objects (`style={{ fontWeight: "bold" }}`) to inline HTML style attributes (`style="font-weight:bold;"`). Or, use an [Astro `<style>` tag](/en/guides/styling/#styling-in-astro) for scoped CSS styles.

src/components/Card.astro

    <div style={{backgroundColor: `#f4f4f4`, padding: `1em`}}>{message}</div><div style="background-color: #f4f4f4; padding: 1em;">{message}</div>

Tailwind is supported after installing the [Tailwind Vite plugin](/en/guides/styling/#tailwind). No changes to your existing Tailwind code are required!

Global styling is achieved in Gatsby using CSS imports in `gatsby-browser.js`. In Astro, you will import `.css` files directly into a main layout component to achieve global styles.

See more about [Styling in Astro](/en/guides/styling/).

### Gatsby Image Plugin to Astro

[Section titled Gatsby Image Plugin to Astro](#gatsby-image-plugin-to-astro)

Convert Gatsby’s `<StaticImage />` and `<GatsbyImage />` components to [Astro’s own image integration components](/en/guides/images/), or to a [standard HTML `<img>` / JSX `<img />`](/en/guides/images/#images-in-ui-framework-components) tag as appropriate in your React components.

src/pages/index.astro

    ---import { Image } from 'astro:assets';import rocket from '../assets/rocket.png';---<Image src={rocket} alt="A rocketship in space." /><img src={rocket.src} alt="A rocketship in space.">

Astro’s `<Image />` component works in `.astro` and `.mdx` files only. See a [full list of its component attributes](/en/reference/modules/astro-assets/#image-properties) and note that several will differ from Gatsby’s attributes.

To continue using [images in Markdown (`.md`) files](/en/guides/images/#images-in-markdown-files) using standard Markdown syntax (`![]()`), you may need to update the link. Using the HTML `<img>` tag directly is not supported in `.md` files for local images, and must be converted to Markdown syntax.

src/pages/post-1.md

    # My Markdown Page
    <!-- Local image stored at src/assets/stars.png -->![A starry night sky.](../assets/stars.png)

In React (`.jsx`) components, use standard JSX image syntax (`<img />`). Astro will not optimize these images, but you can install and use NPM packages for more flexibility.

You can learn more about [using images in Astro](/en/guides/images/) in the Images Guide.

### Gatsby GraphQL to Astro

[Section titled Gatsby GraphQL to Astro](#gatsby-graphql-to-astro)

Remove all references to GraphQL queries, and instead use [`import.meta.glob()`](/en/guides/imports/#importmetaglob) to access data from your local files.

Or, if using content collections, query your Markdown and MDX files using [`getEntry()` and `getCollection()`](/en/guides/content-collections/#generating-routes-from-content).

These data requests are made in the frontmatter of the Astro component using the data.

src/pages/index.astro

    ---import { graphql } from "gatsby"import { getCollection } from 'astro:content';
    // Get all `src/content/blog/` entriesconst allBlogPosts = await getCollection('blog');
    // Get all `src/pages/posts/` entriesconst allPosts = Object.values(import.meta.glob('../pages/post/*.md', { eager: true }));---
    export const pageQuery = graphql`  {    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {      nodes {        excerpt        fields {          slug        }        frontmatter {          date(formatString: "MMMM DD, YYYY")          title          description        }      }    }  }`

Guided example: Gatsby layout to Astro
--------------------------------------

[Section titled Guided example: Gatsby layout to Astro](#guided-example-gatsby-layout-to-astro)

This example converts the main project layout (`layout.js`) from Gatsby’s blog starter to `src/layouts/Layout.astro`.

This page layout shows one header when visiting the home page, and a different header with a link back to Home for all other pages.

1.  Identify the `return()` JSX.
    
    layout.js
    
        import * as React from "react"import { Link } from "gatsby"const Layout = ({ location, title, children }) => {  const rootPath = `${__PATH_PREFIX__}/`  const isRootPath = location.pathname === rootPath  let header  if (isRootPath) {    header = (      <h1 className="main-heading">        <Link to="/">{title}</Link>      </h1>    )  } else {    header = (      <Link className="header-link-home" to="/">        Home      </Link>    )  }  return (    <div className="global-wrapper" data-is-root-path={isRootPath}>      <header className="global-header">{header}</header>      <main>{children}</main>      <footer>        © {new Date().getFullYear()}, Built with        {` `}        <a href="https://www.gatsbyjs.com">Gatsby</a>      </footer>    </div>  )}export default Layout
    
2.  Create `Layout.astro` and add this `return` value, [converted to Astro syntax](#reference-convert-to-astro-syntax).
    
    Note that:
    
    *   `{new Date().getFullYear()}` just works 🎉
    *   `{children}` becomes `<slot />` 🦥
    *   `className` becomes `class` 📛
    *   `Gatsby` becomes `Astro` 🚀
    
    src/layouts/Layout.astro
    
        ------<div class="global-wrapper" data-is-root-path={isRootPath}>  <header class="global-header">{header}</header>  <main><slot /></main>  <footer>    © {new Date().getFullYear()}, Built with    {` `}    <a href="https://www.astro.build">Astro</a>  </footer></div>
    
3.  Add a page shell so that your layout provides each page with the necessary parts of an HTML document:
    
    src/layouts/Layout.astro
    
        ------<html>  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <div class="global-wrapper" data-is-root-path={isRootPath}>      <header class="global-header">{header}</header>      <main>        <slot />      </main>      <footer>        &#169; {new Date().getFullYear()}, Built with        {` `}        <a href="https://www.astro.build">Astro</a>      </footer>    </div>  </body></html>
    
4.  Add any needed imports, props, and JavaScript
    
    To conditionally render a header based on the page route and title in Astro:
    
    *   Provide the props via `Astro.props`. (Remember: your Astro templating accesses props from its frontmatter, not passed into a function.)
    *   Use a ternary operator to show one heading if this is the home page, and a different heading otherwise.
    *   Remove variables for `{header}` and `{isRootPath}` as they are no longer needed.
    *   Replace Gatsby’s `<Link/>` tags with `<a>` anchor tags.
    *   Use `class` instead of `className`.
    *   Import a local stylesheet from your project for the class names to take effect.
    
    src/layouts/Layout.astro
    
        ---import '../styles/style.css';const { title, pathname } = Astro.props---<html>  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <div class="global-wrapper">      <header class="global-header">        { pathname === "/"        ?          <h1 class="main-heading">          <a href="/">{title}</a>          </h1>        :          <h1 class="main-heading">          <a class="header-link-home" href="/">Home</a>          </h1>        }      </header>      <main>        <slot />      </main>      <footer>        &#169; {new Date().getFullYear()}, Built with        {` `}        <a href="https://www.astro.build">Astro</a>      </footer>    </div>  </body></html>
    
5.  Update `index.astro` to use this new layout and pass it the necessary `title` and `pathname` props:
    
    src/pages/index.astro
    
        ---import Layout from '../layouts/Layout.astro';const pagePathname = Astro.url.pathname---<Layout title="Home Page" pathname={pagePathname}>    <p>Astro</p></Layout>
    
    Tip
    
    You can [get the current page’s path using `Astro.url`](/en/reference/api-reference/#url).
    
6.  To test the conditional header, create a second page, `about.astro` using the same pattern:
    
    src/pages/about.astro
    
        ---import Layout from '../layouts/Layout.astro';const pagePathname = Astro.url.pathname---<Layout title="About" pathname={pagePathname}>    <p>About</p></Layout>
    
    You should see a link to “Home” only when visiting the About page.
    

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[Migrating from Gatsby to Astro](https://loige.co/migrating-from-gatsby-to-astro/) How and why I migrated this blog from Gatsby to Astro and what I learned in the process.

[Migrating to Astro was EZ](https://joelhooks.com/migrating-to-astro-was-ez) This is about the process of migrating from Gatsby to Astro, and why I chose Astro.

[My Switch from Gatsby to Astro](https://www.joshfinnie.com/blog/my-switch-from-gatsby-to-astro/) The switch to Astro is definitely worth a blog post! It’s revolutionizing the static web development scene for the better.

[Why I moved to Astro from Gatsby](https://dev.to/askrodney/why-i-moved-to-astro-from-gatsby-3fck) Taking a quick look at what made me want to switch and why Astro was a good fit.

[Another Migration: From Gatsby to Astro](https://logarithmicspirals.com/blog/migrating-from-gatsby-to-astro/) Learn about how I transitioned my personal website from Gatsby to Astro as I share insights and experiences from the migration process.

[From Gatsby gridlock to Astro bliss: my personal site redesign](https://jwn.gr/posts/migrating-from-gatsby-to-astro/) Gatsby has shown its age and I found myself seeking a modern alternative. Enter Astro — a framework that has breathed some new life into this site.

[Why and how I moved my blog away from Gatsby and React to Astro Js and Preact](https://www.helmerdavila.com/blog/en/why-and-how-i-moved-my-blog-away-from-gatsby-and-react-to-astro-js-and-preact) All is about simplicity and power at the same time.

[How I rewrote my HUGE Gatsby site in Astro and learned to love it in the process](https://dunedinsound.com/blog/how_i_rewrote_my_huge_gatsby_site_in_astro_and_learned_to_love_it_in_the_process/) Everything is faster. Happier. More productive.

[How I switched from Gatsby to Astro (While Keeping Drupal in the Mix)](https://albert.skibinski.nl/en/blog/how-i-switched-gatsby-astro-while-keeping-drupal-mix/) I came across the relatively new Astro, which ticked all the boxes.

[Migrating my website from Gatsby to Astro](https://dev.to/flashblaze/migrating-my-website-from-gatsby-to-astro-2ej5) Astro has entered the chat.

[Gatsby to Astro](https://alvin.codes/writing/gatsby-to-astro) Why and how I migrated this website from Gatsby to Astro.

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a Gatsby site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-gatsby.mdx)!

More migration guides
---------------------

*   ![](/logos/create-react-app.svg)
    
    ### [Create React App](/en/guides/migrate-to-astro/from-create-react-app/)
    
*   ![](/logos/docusaurus.svg)
    
    ### [Docusaurus](/en/guides/migrate-to-astro/from-docusaurus/)
    
*   ![](/logos/eleventy.svg)
    
    ### [Eleventy](/en/guides/migrate-to-astro/from-eleventy/)
    
*   ![](/logos/gatsby.svg)
    
    ### [Gatsby](/en/guides/migrate-to-astro/from-gatsby/)
    
*   ![](/logos/gitbook.svg)
    
    ### [GitBook](/en/guides/migrate-to-astro/from-gitbook/)
    
*   ![](/logos/gridsome.svg)
    
    ### [Gridsome](/en/guides/migrate-to-astro/from-gridsome/)
    
*   ![](/logos/hugo.svg)
    
    ### [Hugo](/en/guides/migrate-to-astro/from-hugo/)
    
*   ![](/logos/jekyll.png)
    
    ### [Jekyll](/en/guides/migrate-to-astro/from-jekyll/)
    
*   ![](/logos/nextjs.svg)
    
    ### [Next.js](/en/guides/migrate-to-astro/from-nextjs/)
    
*   ![](/logos/nuxtjs.svg)
    
    ### [NuxtJS](/en/guides/migrate-to-astro/from-nuxtjs/)
    
*   ![](/logos/pelican.svg)
    
    ### [Pelican](/en/guides/migrate-to-astro/from-pelican/)
    
*   ![](/logos/sveltekit.svg)
    
    ### [SvelteKit](/en/guides/migrate-to-astro/from-sveltekit/)
    
*   ![](/logos/vuepress.png)
    
    ### [VuePress](/en/guides/migrate-to-astro/from-vuepress/)
    
*   ![](/logos/wordpress.svg)
    
    ### [WordPress](/en/guides/migrate-to-astro/from-wordpress/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-gatsby.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Eleventy](/en/guides/migrate-to-astro/from-eleventy/) [Next  
GitBook](/en/guides/migrate-to-astro/from-gitbook/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)