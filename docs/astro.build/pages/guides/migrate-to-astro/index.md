# Aggregated from ./pages/guides/migrate-to-astro/from-create-react-app
Migrating from Create React App (CRA)
=====================================

Astro’s [React integration](/en/guides/integrations-guide/react/) provides support for [using React components inside Astro components](/en/guides/framework-components/), including entire React apps like Create React App (CRA)!

src/pages/index.astro

    ---// Import your root App componentimport App from '../cra-project/App.jsx';---<!-- Use a client directive to load your app --><App client:load />

See how to [Build a Single Page Application (SPA) with Astro](https://logsnag.com/blog/react-spa-with-astro) External using React Router.

Many apps will “just work” as full React apps when you add them directly to your Astro project with the React integration installed. This is a great way to get your project up and running immediately and keep your app functional while you migrate to Astro.

Over time, you can convert your structure piece-by-piece to a combination of `.astro` and `.jsx` components. You will probably discover you need fewer React components than you think!

Here are some key concepts and migration strategies to help you get started. Use the rest of our docs and our [Discord community](https://astro.build/chat) to keep going!

Key Similarities between CRA and Astro
--------------------------------------

[Section titled Key Similarities between CRA and Astro](#key-similarities-between-cra-and-astro)

*   The [syntax of `.astro` files is similar to JSX](/en/reference/astro-syntax/#differences-between-astro-and-jsx). Writing Astro should feel familiar.
    
*   Astro uses file-based routing, and [allows specially named pages to create dynamic routes](/en/guides/routing/#dynamic-routes).
    
*   Astro is [component-based](/en/basics/astro-components/), and your markup structure will be similar before and after your migration.
    
*   Astro has [official integrations for React, Preact, and Solid](/en/guides/integrations-guide/react/) so you can use your existing JSX components. Note that in Astro, these files **must** have a `.jsx` or `.tsx` extension.
    
*   Astro has support for [installing NPM packages](/en/guides/imports/#npm-packages), including React libraries. Many of your existing dependencies will work in Astro.
    

Key Differences between CRA and Astro
-------------------------------------

[Section titled Key Differences between CRA and Astro](#key-differences-between-cra-and-astro)

When you rebuild your CRA site in Astro, you will notice some important differences:

*   CRA is a single-page application that uses `index.js` as your project’s root. Astro is a multi-page site, and `index.astro` is your home page.
    
*   [`.astro` components](/en/basics/astro-components/) are not written as exported functions that return page templating. Instead, you’ll split your code into a “code fence” for your JavaScript and a body exclusively for the HTML you generate.
    
*   [content-driven](/en/concepts/why-astro/#content-driven): Astro was designed to showcase your content and to allow you to opt-in to interactivity only as needed. An existing CRA app might be built for high client-side interactivity and may require advanced Astro techniques to include items that are more challenging to replicate using `.astro` components, such as dashboards.
    

Add your CRA to Astro
---------------------

[Section titled Add your CRA to Astro](#add-your-cra-to-astro)

Your existing app can be rendered directly inside a new Astro project, often with no changes to your app’s code.

### Create a new Astro project

[Section titled Create a new Astro project](#create-a-new-astro-project)

Use the `create astro` command for your package manager to launch Astro’s CLI wizard and select a new “empty” Astro project.

*   [npm](#tab-panel-3342)
*   [pnpm](#tab-panel-3343)
*   [Yarn](#tab-panel-3344)

Terminal window

    npm create astro@latest

Terminal window

    pnpm create astro@latest

Terminal window

    yarn create astro@latest

### Add integrations and dependencies

[Section titled Add integrations and dependencies](#add-integrations-and-dependencies)

Add the React integration using the `astro add` command for your package manager. If your app uses other packages supported by the `astro add` command, like Tailwind and MDX, you can add them all with one command:

*   [npm](#tab-panel-3345)
*   [pnpm](#tab-panel-3346)
*   [Yarn](#tab-panel-3347)

Terminal window

    npx astro add reactnpx astro add react tailwind mdx

Terminal window

    pnpm astro add reactpnpm astro add react tailwind mdx

Terminal window

    yarn astro add reactyarn astro add react tailwind mdx

If your CRA requires any dependencies (e.g. NPM packages), then install them individually using the command line or by adding them to your new Astro project’s `package.json` manually and then running an install command. Note that many, but not all, React dependencies will work in Astro.

### Add your existing app files

[Section titled Add your existing app files](#add-your-existing-app-files)

Copy your existing Create React App (CRA) project source files and folders (e.g. `components`, `hooks`, `styles`, etc.) into a new folder inside `src/`, keeping its file structure so your app will continue to work. Note that all `.js` file extensions must be renamed to `.jsx` or `.tsx`.

Do not include any configuration files. You will use Astro’s own `astro.config.mjs`, `package.json`, and `tsconfig.json`.

Move the contents of your app’s `public/` folder (e.g. static assets) into Astro’s `public/` folder.

*   Directorypublic/
    
    *   logo.png
    *   favicon.ico
    *   …
    
*   Directorysrc/
    
    *   Directorycra-project/
        
        *   App.jsx
        *   …
        
    *   Directorypages/
        
        *   index.astro
        
    
*   astro.config.mjs
*   package.json
*   tsconfig.json

### Render your app

[Section titled Render your app](#render-your-app)

Import your app’s root component in the frontmatter section of `index.astro`, then render the `<App />` component in your page template:

src/pages/index.astro

    ---import App from '../cra-project/App.jsx';---<App client:load />

Client directives

Your app needs a [client directive](/en/reference/directives-reference/#client-directives) for interactivity. Astro will render your React app as static HTML until you opt-in to client-side JavaScript.

Use `client:load` to ensure your app loads immediately from the server, or `client:only="react"` to skip rendering on the server and run your app entirely client-side.

Convert your CRA to Astro
-------------------------

[Section titled Convert your CRA to Astro](#convert-your-cra-to-astro)

After [adding your existing app to Astro](#add-your-cra-to-astro), you will probably want to convert your app itself to Astro!

You will replicate a similar component-based design [using Astro HTML templating components for your basic structure](/en/basics/astro-components/) while importing and including individual React components (which may themselves be entire apps!) for islands of interactivity.

Every migration will look different and can be done incrementally without disrupting your working app. Convert individual pieces at your own pace so that more and more of your app is powered by Astro components over time.

As you convert your React app, you will decide which React components you will [rewrite as Astro components](#converting-jsx-files-to-astro-files). Your only restriction is that Astro components can import React components, but React components must only import other React components:

src/pages/static-components.astro

    ---import MyReactComponent from '../components/MyReactComponent.jsx';---<html>  <body>    <h1>Use React components directly in Astro!</h1>    <MyReactComponent />  </body></html>

Instead of importing Astro components into React components, you can nest React components inside a single Astro component:

src/pages/nested-components.astro

    ---import MyReactSidebar from '../components/MyReactSidebar.jsx';import MyReactButton from '../components/MyReactButton.jsx';---<MyReactSidebar>  <p>Here is a sidebar with some text and a button.</p>  <div slot="actions">    <MyReactButton client:idle />  </div></MyReactSidebar>

You may find it helpful to learn about [Astro islands](/en/concepts/islands/) and [Astro components](/en/basics/astro-components/) before restructuring your CRA as an Astro project.

### Compare: JSX vs Astro

[Section titled Compare: JSX vs Astro](#compare-jsx-vs-astro)

Compare the following CRA component and a corresponding Astro component:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [JSX](#tab-panel-3340)
*   [Astro](#tab-panel-3341)

StarCount.jsx

    import React, { useState, useEffect } from 'react';import Header from './Header';import Footer from './Footer';
    const Component = () => {const [stars, setStars] = useState(0);const [message, setMessage] = useState('');
    useEffect(() => {    const fetchData = async () => {        const res = await fetch('https://api.github.com/repos/withastro/astro');        const json = await res.json();
            setStars(json.stargazers_count || 0);        setMessage(json.message);    };
        fetchData();}, []);
    return (    <>        <Header />        <p style={{            backgroundColor: `#f4f4f4`,            padding: `1em 1.5em`,            textAlign: `center`,            marginBottom: `1em`        }}>Astro has {stars} 🧑‍🚀</p>        <Footer />    </>)};
    export default Component;

StarCount.astro

    ---import Header from './Header.astro';import Footer from './Footer.astro';import './layout.css';const res = await fetch('https://api.github.com/repos/withastro/astro')const json = await res.json();const message = json.message;const stars = json.stargazers_count || 0;---<Header /><p class="banner">Astro has {stars} 🧑‍🚀</p><Footer /><style>  .banner {    background-color: #f4f4f4;    padding: 1em 1.5em;    text-align: center;    margin-bottom: 1em;  }</style>

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### Converting JSX files to `.astro` files

[Section titled Converting JSX files to .astro files](#converting-jsx-files-to-astro-files)

Here are some tips for converting a CRA `.js` component into a `.astro` component:

1.  Use the returned JSX of the existing CRA component function as the basis for your HTML template.
    
2.  Change any [CRA or JSX syntax to Astro](#reference-convert-cra-syntax-to-astro) or to HTML web standards. This includes `{children}` and `className`, for example.
    
3.  Move any necessary JavaScript, including import statements, into a [“code fence” (`---`)](/en/basics/astro-components/#the-component-script). Note: JavaScript to [conditionally render content](/en/reference/astro-syntax/#dynamic-html) is often written inside the HTML template directly in Astro.
    
4.  Use [`Astro.props`](/en/reference/api-reference/#props) to access any additional props that were previously passed to your CRA function.
    
5.  Decide whether any imported components also need to be converted to Astro. You can keep them as React components for now, or forever. But, you may eventually want to convert them to `.astro` components, especially if they do not need to be interactive!
    
6.  Replace `useEffect()` with import statements or [`import.meta.glob()`](/en/guides/imports/#importmetaglob) to query your local files. Use `fetch()` to fetch external data.
    

### Migrating Tests

[Section titled Migrating Tests](#migrating-tests)

As Astro outputs raw HTML, it is possible to write end-to-end tests using the output of the build step. Any end-to-end tests written previously might work out-of-the-box if you have been able to match the markup of your CRA site. Testing libraries such as Jest and React Testing Library can be imported and used in Astro to test your React components.

See Astro’s [testing guide](/en/guides/testing/) for more.

Reference: Convert CRA Syntax to Astro
--------------------------------------

[Section titled Reference: Convert CRA Syntax to Astro](#reference-convert-cra-syntax-to-astro)

### CRA Imports to Astro

[Section titled CRA Imports to Astro](#cra-imports-to-astro)

Update any [file imports](/en/guides/imports/) to reference relative file paths exactly. This can be done using [import aliases](/en/guides/typescript/#import-aliases), or by writing out a relative path in full.

Note that `.astro` and several other file types must be imported with their full file extension.

src/pages/authors/Fred.astro

    ---import Card from '../../components/Card.astro';---<Card />

### CRA Children Props to Astro

[Section titled CRA Children Props to Astro](#cra-children-props-to-astro)

Convert any instances of `{children}` to an Astro `<slot />`. Astro does not need to receive `{children}` as a function prop and will automatically render child content in a `<slot />`.

src/components/MyComponent.astro

    ------export default function MyComponent(props) {    return (      <div>        {props.children}      </div>    );}
    <div>  <slot /></div>

React components that pass multiple sets of children can be migrated to an Astro component using [named slots](/en/basics/astro-components/#named-slots).

See more about [specific `<slot />` usage in Astro](/en/basics/astro-components/#slots).

### CRA Data Fetching to Astro

[Section titled CRA Data Fetching to Astro](#cra-data-fetching-to-astro)

Fetching data in a Create React App component is similar to Astro, with some slight differences.

You will need to remove any instances of a side effect hook (`useEffect`) for either `import.meta.glob()` or `getCollection()`/`getEntry()` to access data from other files in your project source.

To [fetch remote data](/en/guides/data-fetching/), use `fetch()`.

These data requests are made in the frontmatter of the Astro component and use top-level await.

src/pages/index.astro

    ---import { getCollection } from 'astro:content';
    // Get all `src/content/blog/` entriesconst allBlogPosts = await getCollection('blog');
    // Get all `src/pages/posts/` entriesconst allPosts = Object.values(import.meta.glob('../pages/post/*.md', { eager: true }));
    // Fetch remote dataconst response = await fetch('https://randomuser.me/api/');const data = await response.json();const randomUser = data.results[0];---

See more about local files imports with [`import.meta.glob()`](/en/guides/imports/#importmetaglob), [querying using the Collections API](/en/guides/content-collections/#querying-collections) or [fetching remote data](/en/guides/data-fetching/).

### CRA Styling to Astro

[Section titled CRA Styling to Astro](#cra-styling-to-astro)

You may need to replace any [CSS-in-JS libraries](https://github.com/withastro/astro/issues/4432) (e.g. styled-components) with other available CSS options in Astro.

If necessary, convert any inline style objects (`style={{ fontWeight: "bold" }}`) to inline HTML style attributes (`style="font-weight:bold;"`). Or, use an [Astro `<style>` tag](/en/guides/styling/#styling-in-astro) for scoped CSS styles.

src/components/Card.astro

    <div style={{backgroundColor: `#f4f4f4`, padding: `1em`}}>{message}</div><div style="background-color: #f4f4f4; padding: 1em;">{message}</div>

Tailwind is supported after installing the [Tailwind Vite plugin](/en/guides/styling/#tailwind). No changes to your existing Tailwind code are required!

See more about [Styling in Astro](/en/guides/styling/).

Troubleshooting
---------------

[Section titled Troubleshooting](#troubleshooting)

Your CRA might “just work” in Astro! But, you may likely need to make minor adjustments to duplicate your existing app’s functionality and/or styles.

If you cannot find your answers within these docs, please visit the [Astro Discord](https://astro.build/chat) and ask questions in our support forum!

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[Code Fix: The SIBA Website's Move from Create-React-App to Astro](https://brittanisavery.com/post/move-siba-to-astro)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a Create React App to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-create-react-app.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-create-react-app.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Site migration overview](/en/guides/migrate-to-astro/) [Next  
Docusaurus](/en/guides/migrate-to-astro/from-docusaurus/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-docusaurus
Migrating from Docusaurus
=========================

[Docusaurus](https://Docusaurus.io) is a popular documentation website builder built on React.

Key Similarities between Docusaurus and Astro
---------------------------------------------

[Section titled Key Similarities between Docusaurus and Astro](#key-similarities-between-docusaurus-and-astro)

Docusaurus and Astro share some similarities that will help you migrate your project:

*   Both Astro and Docusaurus are modern, JavaScript-based (Jamstack) site builders intended for [content-driven websites](/en/concepts/why-astro/#content-driven), like documentation sites.
    
*   Both Astro and Docusaurus support [MDX pages](/en/guides/markdown-content/). You should be able to use your existing `.mdx` files to Astro.
    
*   Both Astro and Docusaurus use [file-based routing](/en/guides/routing/) to generate page routes automatically for any MDX file located in `src/pages`. Using Astro’s file structure for your existing content and when adding new pages should feel familiar.
    
*   Astro has an [official integration for using React components](/en/guides/integrations-guide/react/). Note that in Astro, React files **must** have a `.jsx` or `.tsx` extension.
    
*   Astro supports [installing NPM packages](/en/guides/imports/#npm-packages), including several for React. You may be able to keep some or all of your existing React components and dependencies.
    
*   [Astro’s JSX-like syntax](/en/basics/astro-components/#the-component-template) should feel familiar if you are used to writing React.
    

Key Differences between Docusaurus and Astro
--------------------------------------------

[Section titled Key Differences between Docusaurus and Astro](#key-differences-between-docusaurus-and-astro)

When you rebuild your Docusaurus site in Astro, you will notice some important differences:

*   Docusaurus is a React-based single-page application (SPA). Astro sites are multi-page apps built using [`.astro` components](/en/basics/astro-components/), but can also support [React, Preact, Vue.js, Svelte, SolidJS, AlpineJS](/en/guides/framework-components/) and raw HTML templating.
    
*   Docusaurus was designed to build documentation websites and has some built-in, documentation-specific website features that you would have to build yourself in Astro. Instead, Astro offers some of these features through [Starlight: an official docs theme](https://starlight.astro.build). This website was the inspiration for Starlight, and now runs on it! You can also find more [community docs themes](https://astro.build/themes?search=&categories%5B%5D=docs) with built-in features in our Themes Showcase.
    
*   Docusaurus sites use MDX pages for content. Astro’s docs theme uses Markdown (`.md`) files by default and does not require you to use MDX. You can optionally [install Astro’s MDX integration](/en/guides/integrations-guide/mdx/) (included in our Starlight theme by default) and use `.mdx` files in addition to standard Markdown files.
    

Switch from Docusaurus to Astro
-------------------------------

[Section titled Switch from Docusaurus to Astro](#switch-from-docusaurus-to-astro)

To convert a Docusaurus documentation site to Astro, start with our official [Starlight docs theme starter template](https://starlight.astro.build), or explore more community docs themes in our [theme showcase](https://astro.build/themes?search=&categories%5B%5D=docs).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters. Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3348)
*   [pnpm](#tab-panel-3349)
*   [Yarn](#tab-panel-3350)

Terminal window

    npm create astro@latest -- --template starlight

Terminal window

    pnpm create astro@latest --template starlight

Terminal window

    yarn create astro --template starlight

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Astro’s MDX integration is included by default, so you can [bring your existing content files to Starlight](https://starlight.astro.build/getting-started/#add-content) right away.

You can find Astro’s docs starter, and other official templates, on [astro.new](https://astro.new). You’ll find a link to each project’s GitHub repository, as well as one-click links to open a working project in IDX, StackBlitz, CodeSandbox and Gitpod online development environments.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[Speeding up documentation by 10 times (Russian)](https://habr.com/ru/articles/880220/)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a Docusaurus site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-docusaurus.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-docusaurus.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create React App](/en/guides/migrate-to-astro/from-create-react-app/) [Next  
Eleventy](/en/guides/migrate-to-astro/from-eleventy/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-eleventy
Migrating from Eleventy
=======================

[Eleventy](https://11ty.dev) is an open-source static site generator that works with multiple template languages.

Key Similarities between Eleventy (11ty) and Astro
--------------------------------------------------

[Section titled Key Similarities between Eleventy (11ty) and Astro](#key-similarities-between-eleventy-11ty-and-astro)

Eleventy (11ty) and Astro share some similarities that will help you migrate your project:

*   Both Astro and Eleventy are modern, JavaScript-based (Jamstack) site builders.
    
*   Astro and Eleventy both allow you to use a [headless CMS, APIs or Markdown files for data](/en/guides/data-fetching/). You can continue to use your preferred content authoring system, and will be able to keep your existing content.
    

Key Differences between Eleventy (11ty) and Astro
-------------------------------------------------

[Section titled Key Differences between Eleventy (11ty) and Astro](#key-differences-between-eleventy-11ty-and-astro)

When you rebuild your Eleventy (11ty) site in Astro, you will notice some important differences:

*   Eleventy supports a variety of templating languages. Astro supports [including components from several popular JS Frameworks (e.g. React, Svelte, Vue, Solid)](/en/guides/framework-components/), but uses [Astro layouts, pages and components](/en/basics/astro-components/) for most page templating.
    
*   Astro uses a [`src/` directory](/en/basics/project-structure/#src) for all files, including site metadata, that are available for querying and processing during site build. Within this is a [special `src/pages/` folder for file-based routing](/en/basics/astro-pages/).
    
*   Astro uses a [`public/` folder for static assets](/en/basics/project-structure/#public) that do not need to be processed nor transformed during the build.
    
*   In Eleventy, bundling CSS, JavaScript, and other assets needs to be configured manually. [Astro handles this for you out-of-the-box](/en/concepts/why-astro/#easy-to-use).
    

Switch from Eleventy to Astro
-----------------------------

[Section titled Switch from Eleventy to Astro](#switch-from-eleventy-to-astro)

To convert an Eleventy blog to Astro, start with our blog theme starter template, or explore more community blog themes in our [theme showcase](https://astro.build/themes/).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters. Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3356)
*   [pnpm](#tab-panel-3357)
*   [Yarn](#tab-panel-3358)

Terminal window

    npm create astro@latest -- --template blog

Terminal window

    pnpm create astro@latest --template blog

Terminal window

    yarn create astro --template blog

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Bring your existing Markdown (or MDX, with our optional integration) files as content to [create Markdown or MDX pages](/en/guides/markdown-content/).

Your Eleventy project allowed you to use a variety of templating languages to build your site. In an Astro project, your page templating will mostly be achieved with Astro components, which can be used as UI elements, layouts and even full pages. You may want to explore [Astro’s component syntax](/en/basics/astro-components/) to see how to template in Astro using components.

To convert other types of sites, such as a portfolio or documentation site, see more official starter templates on [astro.new](https://astro.new). You’ll find a link to each project’s GitHub repository, as well as one-click links to open a working project in IDX, StackBlitz, CodeSandbox and Gitpod online development environments.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[This Site Is Now Built with Astro](https://aqandrew.com/blog/now-built-with-astro/) Why I switched from Eleventy.

[Website Rewrite: 2025](https://www.welchcanavan.com/posts/site-rewrite-2025/)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting an Eleventy site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-eleventy.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-eleventy.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Docusaurus](/en/guides/migrate-to-astro/from-docusaurus/) [Next  
Gatsby](/en/guides/migrate-to-astro/from-gatsby/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-gatsby
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

# Aggregated from ./pages/guides/migrate-to-astro/from-gitbook
Migrating from GitBook
======================

[GitBook](https://gitbook.com) is a web-based platform for creating and publishing documentation and books in a collaborative manner, with version control integration and customizable features.

Key Similarities between GitBook and Astro
------------------------------------------

[Section titled Key Similarities between GitBook and Astro](#key-similarities-between-gitbook-and-astro)

GitBook and Astro share some similarities that will help you migrate your project:

*   Both Astro and GitBook support [Markdown](/en/guides/markdown-content/). You can migrate all your existing documentation utilizing GitBook’s Git Sync feature.
    
*   Both Astro and GitBook use some form of [file-based routing](/en/guides/routing/). Using Astro’s file structure for your existing content and when adding new pages should feel familiar.
    

Key Differences between GitBook and Astro
-----------------------------------------

[Section titled Key Differences between GitBook and Astro](#key-differences-between-gitbook-and-astro)

When you migrate your GitBook docs to Astro, you will notice some important differences:

*   A GitBook site is edited using an online dashboard. In Astro, you will use a [code editor](/en/editor-setup/) and development environment to maintain your site. You can develop locally on your machine, or choose a cloud editor/development environment like IDX, StackBlitz, CodeSandbox, or Gitpod.
    
*   GitBook stores your content in a database. In Astro, you will have individual files (typically Markdown or MDX) in your [project directory](/en/basics/project-structure/) for each page’s content. Or, you can choose to use a [CMS for your content](/en/guides/cms/) and use Astro to fetch and present the data.
    
*   GitBook uses a custom syntax on top of Markdown for content. Astro supports Markdoc via the optional [Markdoc integration](/en/guides/integrations-guide/markdoc/), which features a similar syntax to the one you would use in GitBook.
    

Switch from GitBook to Astro
----------------------------

[Section titled Switch from GitBook to Astro](#switch-from-gitbook-to-astro)

To convert a GitBook documentation site to Astro, start with our official [Starlight docs theme starter template](https://starlight.astro.build), or explore more community docs themes in our [theme showcase](https://astro.build/themes?search=&categories%5B%5D=docs).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters. Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3359)
*   [pnpm](#tab-panel-3360)
*   [Yarn](#tab-panel-3361)

Terminal window

    npm create astro@latest -- --template starlight

Terminal window

    pnpm create astro@latest --template starlight

Terminal window

    yarn create astro --template starlight

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Once you have a new Astro project, you can sync your existing GitBook content to your new Astro project. GitBook has a [Git Sync feature](https://docs.gitbook.com/product-tour/git-sync) that will automatically sync your GitBook content to a GitHub/GitLab repository.

To sync directly to the docs template’s content collection, specify `src/content/docs/en` or `src/content/docs` as the project directory.

Caution

When enabling Git Sync be sure to specify “**GitBook to GitHub**” as the priority. This will ensure that your GitBook content is synced to your GitHub repository. Otherwise, you will overwrite your existing GitBook content.

After syncing the content, you will now have a copy of your GitBook content in your Astro repository. Disable git sync to prevent future syncing with GitBook.

Note that although you now have your content migrated to your Astro project, it will not be immediately usable. To use this content in your Astro site, you will need to spend some time manually changing GitBook’s syntax into a format compatible with Astro. In particular:

*   Astro’s [Markdoc integration](/en/guides/integrations-guide/markdoc/) requires that the file extension be `.mdoc`. This is to avoid conflicts with other Markdown extensions like `.mdx` and `.md`.
*   GitBook syntax differs from Markdoc where the `/` prefix denoting a closing tag is replaced with `end` for GitBook files. You will need to update this notation throughout your files.
*   Some features of GitBook rely on custom components. These components will not exist in Astro and must be created and added to your project through [Markdoc’s config `tags` attribute](/en/guides/integrations-guide/markdoc/#use-astro-components-as-markdoc-tags) or removed from your files.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a GitBook site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-gitbook.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-gitbook.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Gatsby](/en/guides/migrate-to-astro/from-gatsby/) [Next  
Gridsome](/en/guides/migrate-to-astro/from-gridsome/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-gridsome
Migrating from Gridsome
=======================

[Gridsome](https://gridsome.org) is an open-source static site generator built on Vue and GraphQL.

Key Similarities between Gridsome and Astro
-------------------------------------------

[Section titled Key Similarities between Gridsome and Astro](#key-similarities-between-gridsome-and-astro)

Gridsome and Astro share some similarities that will help you migrate your project:

*   Both Gridsome and Astro are modern JavaScript static-site generators with similar [project file structures](/en/basics/project-structure/#directories-and-files).
    
*   Both Gridsome and Astro use a `src/` folder for your project files and a [special `src/pages/` folder for file-based routing](/en/basics/astro-pages/). Creating and managing pages for your site should feel familiar.
    
*   Astro has [an official integration for using Vue components](/en/guides/integrations-guide/vue/) and supports [installing NPM packages](/en/guides/imports/#npm-packages), including several for Vue. You will be able to write Vue UI components, and may be able to keep some or all of your existing Gridsome Vue components and dependencies.
    
*   Astro and Gridsome both allow you to use a [headless CMS, APIs or Markdown files for data](/en/guides/data-fetching/). You can continue to use your preferred content authoring system, and will be able to keep your existing content.
    

Key Differences between Gridsome and Astro
------------------------------------------

[Section titled Key Differences between Gridsome and Astro](#key-differences-between-gridsome-and-astro)

When you rebuild your Gridsome site in Astro, you will notice some important differences:

*   Gridsome is a Vue-based single-page application (SPA). Astro sites are multi-page apps built using [`.astro` components](/en/basics/astro-components/), but can also support [React, Preact, Vue.js, Svelte, SolidJS, AlpineJS](/en/guides/framework-components/) and raw HTML templating.
    
*   As an SPA, Gridsome uses `vue-router` for SPA routing, and `vue-meta` for managing `<head>`. In Astro, you will create separate HTML pages and control your page `<head>` directly, or in a [layout component](/en/basics/layouts/).
    
*   [Local file data](/en/guides/imports/): Gridsome uses GraphQL to retrieve data from your project files. Astro uses ESM imports and [`import.meta.glob()`](/en/guides/imports/#importmetaglob) to import data from local project files. Remote resources can be loaded using the standard `fetch()` API. GraphQL may be optionally added to your project, but is not included by default.
    

Switch from Gridsome to Astro
-----------------------------

[Section titled Switch from Gridsome to Astro](#switch-from-gridsome-to-astro)

To convert a Gridsome blog to Astro, start with our blog theme starter template, or explore more community blog themes in our [theme showcase](https://astro.build/themes/).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters. Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3362)
*   [pnpm](#tab-panel-3363)
*   [Yarn](#tab-panel-3364)

Terminal window

    npm create astro@latest -- --template blog

Terminal window

    pnpm create astro@latest --template blog

Terminal window

    yarn create astro --template blog

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Bring your existing Markdown (or MDX, with our optional integration) files as content to [create Markdown or MDX pages](/en/guides/markdown-content/).

Since Gridsome’s project structure is similar to Astro’s, you may be able to copy several existing files from your project into the same location in your new Astro project. However, the two project structures are not identical. You may want to examine [Astro’s project structure](/en/basics/project-structure/) to see what the differences are.

Since Astro queries and imports your local files differently than Gridsome, you may want to read about how to load files using [`import.meta.glob()`](/en/guides/imports/#importmetaglob) to understand how to work with your local files.

To convert other types of sites, such as a portfolio or documentation site, see more official starter templates on [astro.new](https://astro.new). You’ll find a link to each project’s GitHub repository, as well as one-click links to open a working project in IDX, StackBlitz, CodeSandbox and Gitpod online development environments.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[Migration from Gridsome to Astro](https://fyodor.io/migration-from-gridsome-to-astro/)

[Hello Astro!](https://thamas.hu/astro-hello)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a Gridsome site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-gridsome.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-gridsome.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
GitBook](/en/guides/migrate-to-astro/from-gitbook/) [Next  
Hugo](/en/guides/migrate-to-astro/from-hugo/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-hugo
Migrating from Hugo
===================

[Hugo](https://gohugo.io) is an open-source static site generator built on Go.

Key Similarities between Hugo and Astro
---------------------------------------

[Section titled Key Similarities between Hugo and Astro](#key-similarities-between-hugo-and-astro)

Hugo and Astro share some similarities that will help you migrate your project:

*   Hugo and Astro are both modern static-site generators, ideally suited to [content-driven websites](/en/concepts/why-astro/#content-driven) like blogs.
    
*   Hugo and Astro both allow you to [author your content in Markdown](/en/guides/markdown-content/). However, Hugo includes several special frontmatter properties and allows you to write frontmatter in YAML, TOML or JSON. Even though many of your existing Hugo frontmatter properties will not be “special” in Astro, you can continue to use your existing Markdown files and YAML (or TOML) frontmatter values.
    
*   Hugo and Astro both allow you to enhance your site with a variety of [integrations and external packages](https://astro.build/integrations/).
    

Key Differences between Hugo and Astro
--------------------------------------

[Section titled Key Differences between Hugo and Astro](#key-differences-between-hugo-and-astro)

When you rebuild your Hugo site in Astro, you will notice some important differences:

*   Hugo uses Go Templating for page templating. [Astro syntax](/en/basics/astro-components/) is a JSX-like superset of HTML.
    
*   Astro does not use shortcodes for dynamic content in standard Markdown files, but [Astro’s MDX integration](/en/guides/integrations-guide/mdx/) does allow you to use JSX and import components in MDX files.
    
*   While Hugo can use “partials” for reusable layout elements, [Astro is entirely component-based](/en/basics/astro-components/). Any `.astro` file can be a component, a layout or an entire page, and can import and render any other Astro components. Astro components can also include [other UI framework components (e.g. React, Svelte, Vue, Solid)](/en/guides/framework-components/) as well as content or metadata from [other files in your project](/en/guides/imports/), such as Markdown or MDX.
    

Switch from Hugo to Astro
-------------------------

[Section titled Switch from Hugo to Astro](#switch-from-hugo-to-astro)

To convert a Hugo blog to Astro, start with our blog theme starter template, or explore more community blog themes in our [theme showcase](https://astro.build/themes/).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters. Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3365)
*   [pnpm](#tab-panel-3366)
*   [Yarn](#tab-panel-3367)

Terminal window

    npm create astro@latest -- --template blog

Terminal window

    pnpm create astro@latest --template blog

Terminal window

    yarn create astro --template blog

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Bring your existing Markdown (or MDX, with our optional integration) files as content to [create Markdown or MDX pages](/en/guides/markdown-content/). Astro allows YAML or TOML frontmatter in these files, so if you are using JSON frontmatter, you will need to convert it.

To continue to use dynamic content such as variables, expressions or UI components within your Markdown content, add Astro’s optional MDX integration and convert your existing Markdown files to [MDX pages](/en/guides/markdown-content/). MDX supports YAML and TOML frontmatter, so you can keep your existing frontmatter properties. But, you must replace any shortcode syntax with [MDX’s own syntax](https://mdxjs.com/docs/what-is-mdx/#mdx-syntax), which allows JSX expressions and/or component imports.

To convert other types of sites, such as a portfolio or documentation site, see more official starter templates on [astro.new](https://astro.new). You’ll find a link to each project’s GitHub repository, as well as one-click links to open a working project in IDX, StackBlitz, CodeSandbox and Gitpod online development environments.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[Elio Struyf's migration story from Hugo to Astro](https://www.eliostruyf.com/migration-story-hugo-astro/)

[Hugo Vs Astro - Which Static Site Generator To Choose In 2023](https://onebite.dev/hugo-vs-astro-which-static-site-generator-to-choose-in-2023/)

[Lessons from an AI-assisted migration to Astro](https://bennet.org/blog/lessons-from-ai-assisted-migration-to-astro/)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a Hugo site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-hugo.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-hugo.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Gridsome](/en/guides/migrate-to-astro/from-gridsome/) [Next  
Jekyll](/en/guides/migrate-to-astro/from-jekyll/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-jekyll
Migrating from Jekyll
=====================

[Jekyll](https://jekyllrb.com) is a static site generator built on Ruby.

Key Similarities between Jekyll and Astro
-----------------------------------------

[Section titled Key Similarities between Jekyll and Astro](#key-similarities-between-jekyll-and-astro)

Jekyll and Astro share some similarities that will help you migrate your project:

*   Both Jekyll and Astro are static-site generators, commonly used to create blogs.
    
*   Both Jekyll and Astro allow you to write your content in Markdown and HTML. Jekyll and Astro both provide some special frontmatter YAML properties for page layout and unpublished draft posts. You can continue to use your existing Markdown files in Astro.
    
*   Both Jekyll and Astro use [file-based routing](/en/guides/routing/) for creating pages from your blog posts. Astro provides a [special `src/pages/` directory for all pages and posts](/en/basics/project-structure/#srcpages). Jekyll uses a similar special folder called `_posts/` for your Markdown blog posts, however your site pages can exist elsewhere. Creating new blog posts should feel familiar.
    

Key Differences between Jekyll and Astro
----------------------------------------

[Section titled Key Differences between Jekyll and Astro](#key-differences-between-jekyll-and-astro)

When you rebuild your Jekyll site in Astro, you will notice some important differences:

*   As Jekyll is primarily a blogging platform, several blog features are built-in that you may have to build yourself in Astro. Or, choose a [blog starter template theme](https://astro.build/themes?search=&categories%5B%5D=blog) that includes these features. For example, Jekyll has built-in support for tags and categories which you will find in several Astro blog themes, but is not included in a minimal Astro project.
    
*   Jekyll uses Liquid templates for reusable layout elements and templating. Astro uses JSX-like [`.astro` files for templating and components](/en/basics/astro-components/). Any `.astro` file can be a component, a layout or an entire page, and can import and render any other Astro components. You can also build using [other UI framework components (e.g. React, Svelte, Vue, Solid)](/en/guides/framework-components/) as well as content or metadata from [other files in your project](/en/guides/imports/), such as Markdown or MDX.
    

Switch from Jekyll to Astro
---------------------------

[Section titled Switch from Jekyll to Astro](#switch-from-jekyll-to-astro)

To convert a Jekyll blog to Astro, start with our blog theme starter template, or explore more community blog themes in our [theme showcase](https://astro.build/themes/).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters. Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3368)
*   [pnpm](#tab-panel-3369)
*   [Yarn](#tab-panel-3370)

Terminal window

    npm create astro@latest -- --template blog

Terminal window

    pnpm create astro@latest --template blog

Terminal window

    yarn create astro --template blog

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Bring your existing Markdown files as content to [create Markdown pages](/en/guides/markdown-content/), using an [Astro Markdown layout](/en/basics/layouts/#markdown-layouts) instead of a Liquid template.

Much of your existing HTML page content can be converted into [Astro pages](/en/basics/astro-pages/), and you will additionally be able to [use variables, JSX-like expressions and component imports directly in your HTML templating](/en/reference/astro-syntax/#jsx-like-expressions).

Astro does not have a `permalink` property that accepts placeholders. You may need to read more about [Astro’s page routing](/en/guides/routing/) if you want to keep your existing URL structure. Or, consider [setting redirects at a host like Netlify](https://docs.netlify.com/routing/redirects/).

To convert other types of sites, such as a portfolio or documentation site, see more official starter templates on [astro.new](https://astro.new). You’ll find a link to each project’s GitHub repository, as well as one-click links to open a working project in IDX, StackBlitz, CodeSandbox and Gitpod online development environments.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[From Jekyll to Astro](https://jackcarey.co.uk/posts/astro-rewrite/)

[Goodbye Jekyll, Hello Astro](https://kiranrao.in/blog/bye-jekyll-hello-astro/)

[Back to the Future: Our Tech Blog's Transition from Jekyll to Astro](https://alasco.tech/2023/09/06/migrating-to-astro)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a Jekyll site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-jekyll.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-jekyll.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Hugo](/en/guides/migrate-to-astro/from-hugo/) [Next  
Next.js](/en/guides/migrate-to-astro/from-nextjs/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-nextjs
Migrating from Next.js
======================

Here are some key concepts and migration strategies to help you get started. Use the rest of our docs and our [Discord community](https://astro.build/chat) to keep going!

Key Similarities between Next.js and Astro
------------------------------------------

[Section titled Key Similarities between Next.js and Astro](#key-similarities-between-nextjs-and-astro)

Next.js and Astro share some similarities that will help you migrate your project:

*   The [syntax of `.astro` files is similar to JSX](/en/reference/astro-syntax/#differences-between-astro-and-jsx). Writing Astro should feel familiar.
*   Astro projects can also be SSG or [SSR with page-level prerendering](/en/guides/on-demand-rendering/).
*   Astro uses file-based routing, and [allows specially named pages to create dynamic routes](/en/guides/routing/#dynamic-routes).
*   Astro is [component-based](/en/basics/astro-components/), and your markup structure will be similar before and after your migration.
*   Astro has [official integrations for React, Preact, and Solid](/en/guides/integrations-guide/react/) so you can use your existing JSX components. Note that in Astro, these files **must** have a `.jsx` or `.tsx` extension.
*   Astro has support for [installing NPM packages](/en/guides/imports/#npm-packages), including React libraries. Many of your existing dependencies will work in Astro.

Key Differences between Next.js and Astro
-----------------------------------------

[Section titled Key Differences between Next.js and Astro](#key-differences-between-nextjs-and-astro)

When you rebuild your Next.js site in Astro, you will notice some important differences:

*   Next.js is a React single-page app, and uses `index.js` as your project’s root. Astro is a multi-page site, and `index.astro` is your home page.
    
*   [`.astro` components](/en/basics/astro-components/) are not written as exported functions that return page templating. Instead, you’ll split your code into a “code fence” for your JavaScript and a body exclusively for the HTML you generate.
    
*   [content-driven](/en/concepts/why-astro/#content-driven): Astro was designed to showcase your content and to allow you to opt-in to interactivity only as needed. An existing Next.js app might be built for high client-side interactivity and may require advanced Astro techniques to include items that are more challenging to replicate using `.astro` components, such as dashboards.
    

Convert your Next.js Project
----------------------------

[Section titled Convert your Next.js Project](#convert-your-nextjs-project)

Each project migration will look different, but there are some common actions you will perform when converting from Next.js to Astro.

### Create a new Astro project

[Section titled Create a new Astro project](#create-a-new-astro-project)

Use the `create astro` command for your package manager to launch Astro’s CLI wizard or choose a community theme from the [Astro Theme Showcase](https://astro.build/themes).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters (e.g. `docs`, `blog`, `portfolio`). Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

*   [npm](#tab-panel-3373)
*   [pnpm](#tab-panel-3374)
*   [Yarn](#tab-panel-3375)

Terminal window

    # launch the Astro CLI Wizardnpm create astro@latest
    # create a new project with an official examplenpm create astro@latest -- --template <example-name>

Terminal window

    # launch the Astro CLI Wizardpnpm create astro@latest
    # create a new project with an official examplepnpm create astro@latest --template <example-name>

Terminal window

    # launch the Astro CLI Wizardyarn create astro@latest
    # create a new project with an official exampleyarn create astro@latest --template <example-name>

Then, copy your existing Next project files over to your new Astro project in a separate folder outside of `src`.

Tip

Visit [https://astro.new](https://astro.new) for the full list of official starter templates, and links for opening a new project in IDX, StackBlitz, CodeSandbox, or Gitpod.

### Install integrations (optional)

[Section titled Install integrations (optional)](#install-integrations-optional)

You may find it useful to install some of [Astro’s optional integrations](/en/guides/integrations-guide/) to use while converting your Next project to Astro:

*   **@astrojs/react**: to reuse some existing React UI components in your new Astro site, or keep writing with React components.
    
*   **@astrojs/mdx**: to bring existing MDX files from your Next project, or to use MDX in your new Astro site.
    

### Put your source code in `src`

[Section titled Put your source code in src](#put-your-source-code-in-src)

Following [Astro’s project structure](/en/basics/project-structure/):

1.  **Keep** Next’s `public/` folder untouched.
    
    Astro uses the `public/` directory for static assets, just like Next. There is no change needed to this folder, nor its contents.
    
2.  **Copy or Move** Next’s other files and folders (e.g. `pages`, `styles` etc.) into Astro’s `src/` folder as you rebuild your site, following [Astro’s project structure](/en/basics/project-structure/).
    
    Like Next, Astro’s `src/pages/` folder is a special folder used for file-based routing. All other folders are optional, and you can organize the contents of your `src/` folder any way you like. Other common folders in Astro projects include `src/layouts/`, `src/components`, `src/styles`, `src/scripts`.
    

### The Astro config file

[Section titled The Astro config file](#the-astro-config-file)

Astro has a configuration file at the root of your project called [`astro.config.mjs`](/en/guides/configuring-astro/). This is used only for configuring your Astro project and any installed integrations, including [SSR adapters](/en/guides/deploy/).

### Tips: Convert JSX files to `.astro` files

[Section titled Tips: Convert JSX files to .astro files](#tips-convert-jsx-files-to-astro-files)

Here are some tips for converting a Next `.js` component into a `.astro` component:

1.  Use the returned JSX of the existing Next.js component function as the basis for your HTML template.
    
2.  Change any [Next or JSX syntax to Astro](#reference-convert-nextjs-syntax-to-astro) or to HTML web standards. This includes `<Link>`, `<Script>`, `{children}`, and `className`, for example.
    
3.  Move any necessary JavaScript, including import statements, into a [“code fence” (`---`)](/en/basics/astro-components/#the-component-script). Note: JavaScript to [conditionally render content](/en/reference/astro-syntax/#dynamic-html) is often written inside the HTML template directly in Astro.
    
4.  Use [`Astro.props`](/en/reference/api-reference/#props) to access any additional props that were previously passed to your Next function.
    
5.  Decide whether any imported components also need to be converted to Astro. With the official integration installed, you can [use existing React components in your Astro file](/en/guides/framework-components/). But, you may want to convert them to `.astro` components, especially if they do not need to be interactive!
    
6.  Replace `getStaticProps()` with import statements or [`import.meta.glob()`](/en/guides/imports/#importmetaglob) to query your local files. Use `fetch()` to fetch external data.
    

See [an example of a Next `.js` file converted step-by-step](#guided-example-next-data-fetching-to-astro).

#### Compare: JSX vs Astro

[Section titled Compare: JSX vs Astro](#compare-jsx-vs-astro)

Compare the following Next component and a corresponding Astro component:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [JSX](#tab-panel-3371)
*   [Astro](#tab-panel-3372)

StarCount.jsx

    import Header from "./header";import Footer from "./footer";import "./layout.css";
    export async function getStaticProps() {    const res = await fetch("https://api.github.com/repos/withastro/astro");    const json = await res.json();    return {        props: { message: json.message, stars: json.stargazers_count || 0 },    }}
    const Component = ({ stars, message }) => {
        return (        <>            <Header />            <p style={{                backgroundColor: `#f4f4f4`,                padding: `1em 1.5em`,                textAlign: `center`,                marginBottom: `1em`            }}>Astro has {stars} 🧑‍🚀</p>            <Footer />        </>    )}
    export default Component;

StarCount.astro

    ---import Header from "./header";import Footer from "./footer";import "./layout.css";
    const res = await fetch("https://api.github.com/repos/withastro/astro");const json = await res.json();const message = json.message;const stars = json.stargazers_count || 0;---<Header /><p class="banner">Astro has {stars} 🧑‍🚀</p><Footer />
    <style>  .banner {    background-color: #f4f4f4;    padding: 1em 1.5em;    text-align: center;    margin-bottom: 1em;  }<style>

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### Migrating Layout Files

[Section titled Migrating Layout Files](#migrating-layout-files)

You may find it helpful to start by converting your Next.js layouts and templates into [Astro layout components](/en/basics/layouts/).

Next has two different methods for creating layout files, each of which handles layouts differently than Astro:

*   The `pages` directory
    
*   [The `/app` directory](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts)
    

Each Astro page explicitly requires `<html>`, `<head>`, and `<body>` tags to be present, so it is common to reuse a layout file across pages. Astro uses a [`<slot />`](/en/basics/astro-components/#slots) for page content, with no import statement required. Note the standard HTML templating, and direct access to `<head>`:

src/layouts/Layout.astro

    ------<html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} />    <title>Astro</title>  </head>  <body>    <!-- Wrap the slot element with your existing layout templating -->    <slot />  </body></html>

#### Migrating from Next.js’ `pages` directory

[Section titled Migrating from Next.js’ pages directory](#migrating-from-nextjs-pages-directory)

Your Next project may have a `pages/_document.jsx` file that imports React components to customize your app’s `<head>`:

pages/\_document.jsx

    import Document, { Html, Head, Main, NextScript } from "next/document";
    export default class MyDocument extends Document {  render() {    return (      <Html lang="en">        <Head>          <link rel="icon" href="/favicon.ico" />        </Head>        <body>          <Main />          <NextScript />        </body>      </Html>    );  }}

1.  Make a new Astro layout file using only the returned JSX.
    
2.  Replace any React components with `<html>`, `<head>`, `<slot>`, and other HTML standard tags.
    
    src/layouts/Document.astro
    
        <html lang="en">  <head>      <link rel="icon" href="/favicon.ico" />  </head>  <body>    <slot/>  </body></html>
    

#### Migrating from Next.js’ `/app` directory

[Section titled Migrating from Next.js’ /app directory](#migrating-from-nextjs-app-directory)

Next.js’ `app/` directory layout files are created with two files: a `layout.jsx` file to customize the `<html>` and `<body>` contents, and a `head.jsx` file to customize the `<head>` element contents.

app/layout.jsx

    export default function Layout({ children }) {  return (    <html lang="en">      <body>{children}</body>    </html>  );}

app/head.jsx

    export default function Head() {  return (    <>      <title>My Page</title>    </>  );}

1.  Make a new Astro layout file using only the returned JSX.
    
2.  Replace both these files with a single Astro layout file that contains a page shell (`<html>`, `<head>`, and `<body>` tags) and a `<slot/>` instead of React’s `{children}` prop:
    
    src/layouts/Layout.astro
    
        <html lang="en">  <head>      <title>My Page</title>  </head>  <body>    <slot/>  </body></html>
    

### Migrating Pages and Posts

[Section titled Migrating Pages and Posts](#migrating-pages-and-posts)

In Next.js, your posts either live in `/pages` or `/app/routeName/page.jsx`.

In Astro, all your page content must live within `src/` unless you are using [content collections](/en/guides/content-collections/).

#### React pages

[Section titled React pages](#react-pages)

Your existing Next JSX (`.js`) pages will need to be [converted from JSX files to `.astro` pages](#tips-convert-jsx-files-to-astro-files). You cannot use an existing JSX page file in Astro.

These [`.astro` pages](/en/basics/astro-pages/) must be located within `src/pages/` and will have page routes generated automatically based on their file path.

#### Markdown and MDX pages

[Section titled Markdown and MDX pages](#markdown-and-mdx-pages)

Astro has built-in support for Markdown and an optional integration for MDX files. You can reuse any existing [Markdown and MDX files](/en/guides/markdown-content/), but they may require some adjustments to their frontmatter, such as adding [Astro’s special `layout` frontmatter property](/en/basics/layouts/#markdown-layouts). You will no longer need to manually create pages for each Markdown-generated route. These files can be placed within `src/pages/` to take advantage of automatic file-based routing.

Alternatively, you can use [content collections](/en/guides/content-collections/) in Astro to store and manage your content. You will retrieve the content yourself and [generate those pages dynamically](/en/guides/content-collections/#generating-routes-from-content).

### Migrating Tests

[Section titled Migrating Tests](#migrating-tests)

As Astro outputs raw HTML, it is possible to write end-to-end tests using the output of the build step. Any end-to-end tests written previously might work out-of-the-box if you have been able to match the markup of your Next site. Testing libraries such as Jest and React Testing Library can be imported and used in Astro to test your React components.

See Astro’s [testing guide](/en/guides/testing/) for more.

Reference: Convert Next.js Syntax to Astro
------------------------------------------

[Section titled Reference: Convert Next.js Syntax to Astro](#reference-convert-nextjs-syntax-to-astro)

### Next Links to Astro

[Section titled Next Links to Astro](#next-links-to-astro)

Convert any Next `<Link to="">`, `<NavLink>` etc. components to HTML `<a href="">` tags.

    <Link to="/blog">Blog</Link><a href="/blog">Blog</a>

Astro does not use any special component for links, although you are welcome to build your own `<Link>` component. You can then import and use this `<Link>` just as you would any other component.

src/components/Link.astro

    ---const { to } = Astro.props;---<a href={to}><slot /></a>

### Next Imports to Astro

[Section titled Next Imports to Astro](#next-imports-to-astro)

Update any [file imports](/en/guides/imports/) to reference relative file paths exactly. This can be done using [import aliases](/en/guides/typescript/#import-aliases), or by writing out a relative path in full.

Note that `.astro` and several other file types must be imported with their full file extension.

src/pages/authors/Fred.astro

    ---import Card from "../../components/Card.astro";---<Card />

### Next Children Props to Astro

[Section titled Next Children Props to Astro](#next-children-props-to-astro)

Convert any instances of `{children}` to an Astro `<slot />`. Astro does not need to receive `{children}` as a function prop and will automatically render child content in a `<slot />`.

src/components/MyComponent.astro

    ------export default function MyComponent(props) {    return (      <div>        {props.children}      </div>    );}
    <div>  <slot /></div>

React components that pass multiple sets of children can be migrated to an Astro component using [named slots](/en/basics/astro-components/#named-slots).

See more about [specific `<slot />` usage in Astro](/en/basics/astro-components/#slots).

### Next Data Fetching to Astro

[Section titled Next Data Fetching to Astro](#next-data-fetching-to-astro)

Convert any instances of `getStaticProps()` to either `import.meta.glob()` or `getCollection()`/`getEntry()` in order to access data from other files in your project source. To [fetch remote data](/en/guides/data-fetching/), use `fetch()`.

These data requests are made in the frontmatter of the Astro component and use top-level await.

src/pages/index.astro

    ---import { getCollection } from 'astro:content';
    // Get all `src/content/blog/` entriesconst allBlogPosts = await getCollection('blog');
    // Get all `src/pages/posts/` entriesconst allPosts = Object.values(import.meta.glob('../pages/posts/*.md', { eager: true }));
    const response = await fetch('https://randomuser.me/api/');const data = await response.json();const randomUser = data.results[0];---

See more about local files imports with [`import.meta.glob()`](/en/guides/imports/#importmetaglob), [querying using the Collections API](/en/guides/content-collections/#querying-collections) or [fetching remote data](/en/guides/data-fetching/).

### Next Styling to Astro

[Section titled Next Styling to Astro](#next-styling-to-astro)

You may need to replace any [CSS-in-JS libraries](https://github.com/withastro/astro/issues/4432) (e.g. styled-components) with other available CSS options in Astro.

If necessary, convert any inline style objects (`style={{ fontWeight: "bold" }}`) to inline HTML style attributes (`style="font-weight:bold;"`). Or, use an [Astro `<style>` tag](/en/guides/styling/#styling-in-astro) for scoped CSS styles.

src/components/Card.astro

    <div style={{backgroundColor: `#f4f4f4`, padding: `1em`}}>{message}</div><div style="background-color: #f4f4f4; padding: 1em;">{message}</div>

Tailwind is supported after installing the [Tailwind Vite plugin](/en/guides/styling/#tailwind). No changes to your existing Tailwind code are required!

See more about [Styling in Astro](/en/guides/styling/).

### Next Image Plugin to Astro

[Section titled Next Image Plugin to Astro](#next-image-plugin-to-astro)

Convert any Next `<Image />` components to [Astro’s own image component](/en/guides/images/) in `.astro` or `.mdx` files, or to a [standard HTML `<img>` / JSX `<img />`](/en/guides/images/#images-in-ui-framework-components) tag as appropriate in your React components.

Astro’s `<Image />` component works in `.astro` and `.mdx` files only. See a [full list of its component attributes](/en/reference/modules/astro-assets/#image-properties) and note that several will differ from Next’s attributes.

src/pages/index.astro

    ---import { Image } from 'astro:assets';import rocket from '../assets/rocket.png';---<Image src={rocket} alt="A rocketship in space." /><img src={rocket.src} alt="A rocketship in space.">

In React (`.jsx`) components, use standard JSX image syntax (`<img />`). Astro will not optimize these images, but you can install and use NPM packages for more flexibility.

You can learn more about [using images in Astro](/en/guides/images/) in the Images Guide.

Guided example: Next data fetching to Astro
-------------------------------------------

[Section titled Guided example: Next data fetching to Astro](#guided-example-next-data-fetching-to-astro)

Here is an example of Next.js Pokédex data fetch converted to Astro.

`pages/index.js` fetches and displays a list of the first 151 Pokémon using [the REST PokéAPI](https://pokeapi.co/).

Here’s how to recreate that in `src/pages/index.astro`, replacing `getStaticProps()` with `fetch()`.

1.  Identify the return() JSX.
    
    pages/index.js
    
        import Link from 'next/link'import styles from '../styles/poke-list.module.css';
        export default function Home({ pokemons }) {    return (        <>            <ul className={`plain-list ${styles.pokeList}`}>                {pokemons.map((pokemon) => (                    <li className={styles.pokemonListItem} key={pokemon.name}>                        <Link className={styles.pokemonContainer} as={`/pokemon/${pokemon.name}`} href="/pokemon/[name]">                            <p className={styles.pokemonId}>No. {pokemon.id}</p>                            <img className={styles.pokemonImage} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={`${pokemon.name} picture`}></img>                            <h2 className={styles.pokemonName}>{pokemon.name}</h2>                        </Link>                    </li>                ))}            </ul>        </>    )}
        export const getStaticProps = async () => {    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")    const resJson = await res.json();    const pokemons = resJson.results.map(pokemon => {        const name = pokemon.name;        // https://pokeapi.co/api/v2/pokemon/1/        const url = pokemon.url;        const id = url.split("/")[url.split("/").length - 2];        return {            name,            url,            id        }    });    return {        props: {            pokemons,        },    }}
    
2.  Create `src/pages/index.astro`
    
    Use the return value of the Next function. Convert any Next or React syntax to Astro, including changing the case of any [HTML global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes).
    
    Note that:
    
    *   `.map` just works!
        
    *   `className` becomes `class`.
        
    *   `<Link>` becomes `<a>`.
        
    *   The `<> </>` fragment is not required in Astro templating.
        
    *   `key` is a React attribute, and is not an attribute of `li` in Astro.
        
    
    src/pages/index.astro
    
        ------<ul class="plain-list pokeList">    {pokemons.map((pokemon) => (        <li class="pokemonListItem">            <a class="pokemonContainer" href={`/pokemon/${pokemon.name}`}>                <p class="pokemonId">No. {pokemon.id}</p>                <img class="pokemonImage" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={`${pokemon.name} picture`}/>                <h2 class="pokemonName">{pokemon.name}</h2>            </a>        </li>    ))}</ul>
    
3.  Add any needed imports, props, and JavaScript
    
    Note that:
    
    *   the `getStaticProps` function is no longer needed. Data from the API is fetched directly in the code fence.
    *   A `<Layout>` component is imported and wraps the page templating.
    
    src/pages/index.astro
    
        ---import Layout from '../layouts/layout.astro';
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");const resJson = await res.json();const pokemons = resJson.results.map(pokemon => {    const name = pokemon.name;    // https://pokeapi.co/api/v2/pokemon/1/    const url = pokemon.url;    const id = url.split("/")[url.split("/").length - 2];    return {        name,        url,        id    }});---
        <Layout>  <ul class="plain-list pokeList">      {pokemons.map((pokemon) => (          <li class="pokemonListItem" key={pokemon.name}>              <a class="pokemonContainer" href={`/pokemon/${pokemon.name}`}>                  <p class="pokemonId">No. {pokemon.id}</p>                  <img class="pokemonImage" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={`${pokemon.name} picture`}/>                  <h2 class="pokemonName">{pokemon.name}</h2>              </a>          </li>      ))}  </ul></Layout>
    

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[Why we switched to Astro (and why it might interest you)](https://www.datocms.com/blog/why-we-switched-to-astro)

[Migrating from Next.js to Astro](https://johnzanussi.com/posts/nextjs-to-astro-migration)

[From NextJS to Astro](https://vanntile.com/blog/next-to-astro)

[Converting Next.js to Astro](https://ericclemmons.com/blog/converting-nextjs-to-astro)

[Migrating to Astro (from Next.js)](https://www.raygesualdo.com/posts/migrating-to-astro-the-beginning/)

[Astro.js as an alternative to Next.js](https://www.railyard.works/blog/astro-as-alternative-to-next)

[Why I Switched My Website from Next.js to Astro](https://praveenjuge.com/blog/why-i-switched-my-website-from-nextjs-to-astro/)

[NextJS to Astro: more control = faster sites](https://www.youtube.com/watch?v=PSzCtdM20Fc)

[How Astro made my site 100x faster](https://www.youtube.com/watch?v=cOxA3kMYtkM)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a Next.js site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-nextjs.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-nextjs.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Jekyll](/en/guides/migrate-to-astro/from-jekyll/) [Next  
NuxtJS](/en/guides/migrate-to-astro/from-nuxtjs/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-nuxtjs
Migrating from NuxtJS
=====================

Here are some key concepts and migration strategies to help you get started. Use the rest of our docs and our [Discord community](https://astro.build/chat) to keep going!

> This guide is referring to [Nuxt 2](https://nuxtjs.org/), not the newer Nuxt 3. While some of the concepts are similar, Nuxt 3 is a newer version of the framework and may require different strategies for parts of your migration.

Key Similarities between Nuxt and Astro
---------------------------------------

[Section titled Key Similarities between Nuxt and Astro](#key-similarities-between-nuxt-and-astro)

Nuxt and Astro share some similarities that will help you migrate your project:

*   Astro projects can also be SSG or [SSR with page level prerendering](/en/guides/on-demand-rendering/).
*   Astro uses file-based routing, and [allows specially named pages to create dynamic routes](/en/guides/routing/#dynamic-routes).
*   Astro is [component-based](/en/basics/astro-components/), and your markup structure will be similar before and after your migration.
*   Astro has [an official integration for using Vue components](/en/guides/integrations-guide/vue/).
*   Astro has support for [installing NPM packages](/en/guides/imports/#npm-packages), including Vue libraries. You may be able to keep some or all of your existing Vue components and dependencies.

Key Differences between Nuxt and Astro
--------------------------------------

[Section titled Key Differences between Nuxt and Astro](#key-differences-between-nuxt-and-astro)

When you rebuild your Nuxt site in Astro, you will notice some important differences:

*   Nuxt is a Vue-based SPA (single-page application). Astro sites are multi-page apps built using `.astro` components, but can also support React, Preact, Vue.js, Svelte, SolidJS, AlpineJS, and raw HTML templating.
    
*   [Page Routing](/en/basics/astro-pages/#file-based-routing): Nuxt uses `vue-router` for SPA routing, and `vue-meta` for managing `<head>`. In Astro, you will create separate HTML page routes and control your page `<head>` directly, or in a layout component.
    
*   [content-driven](/en/concepts/why-astro/#content-driven): Astro was designed to showcase your content and to allow you to opt-in to interactivity only as needed. An existing Nuxt app may be built for high client-side interactivity. Astro has built-in capabilities for working with your content, such as page generation, but may require advanced Astro techniques to include items that are more challenging to replicate using `.astro` components, such as dashboards.
    

Convert your NuxtJS Project
---------------------------

[Section titled Convert your NuxtJS Project](#convert-your-nuxtjs-project)

Each project migration will look different, but there are some common actions you will perform when converting from Nuxt to Astro.

### Create a new Astro project

[Section titled Create a new Astro project](#create-a-new-astro-project)

Use the `create astro` command for your package manager to launch Astro’s CLI wizard or choose a community theme from the [Astro Theme Showcase](https://astro.build/themes).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters (e.g. `docs`, `blog`, `portfolio`). Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

*   [npm](#tab-panel-3381)
*   [pnpm](#tab-panel-3382)
*   [Yarn](#tab-panel-3383)

Terminal window

    # launch the Astro CLI Wizardnpm create astro@latest
    # create a new project with an official examplenpm create astro@latest -- --template <example-name>

Terminal window

    # launch the Astro CLI Wizardpnpm create astro@latest
    # create a new project with an official examplepnpm create astro@latest --template <example-name>

Terminal window

    # launch the Astro CLI Wizardyarn create astro@latest
    # create a new project with an official exampleyarn create astro@latest --template <example-name>

Then, copy your existing Nuxt project files over to your new Astro project in a separate folder outside of `src`.

Tip

Visit [https://astro.new](https://astro.new) for the full list of official starter templates, and links for opening a new project in IDX, StackBlitz, CodeSandbox, or Gitpod.

### Install integrations (optional)

[Section titled Install integrations (optional)](#install-integrations-optional)

You may find it useful to install some of [Astro’s optional integrations](/en/guides/integrations-guide/) to use while converting your Nuxt project to Astro:

*   **@astrojs/vue**: to reuse some existing Vue UI components in your new Astro site, or keep writing with Vue components.
    
*   **@astrojs/mdx**: to bring existing MDX files from your Nuxt project, or to use MDX in your new Astro site.
    

### Put your source code in `src`

[Section titled Put your source code in src](#put-your-source-code-in-src)

1.  **Move** the contents of Nuxt’s `static/` folder into `public/`.
    
    Astro uses the `public/` directory for static assets, similar to Nuxt’s `static/` folder.
    
2.  **Copy or Move** Nuxt’s other files and folders (e.g. `pages`, `layouts` etc.) into Astro’s `src/` folder.
    
    Like Nuxt, Astro’s `src/pages/` folder is a special folder used for file-based routing. All other folders are optional, and you can organize the contents of your `src/` folder any way you like. Other common folders in Astro projects include `src/layouts/`, `src/components`, `src/styles`, `src/scripts`.
    

### Convert Vue SFC pages to `.astro` files

[Section titled Convert Vue SFC pages to .astro files](#convert-vue-sfc-pages-to-astro-files)

Here are some tips for converting a Nuxt `.vue` component into a `.astro` component:

1.  Use the `<template>` of the existing NuxtJS component function as the basis for your HTML template.
    
2.  Change any [Nuxt or Vue syntax to Astro](#reference-convert-nuxtjs-syntax-to-astro) or to HTML web standards. This includes `<NuxtLink>`, `:class`, `{{variable}}`, and `v-if`, for example.
    
3.  Move `<script>` JavaScript, into a “code fence” (`---`). Convert your component’s data-fetching properties to server-side JavaScript - see [Nuxt data fetching to Astro](#nuxt-data-fetching-to-astro).
    
4.  Use `Astro.props` to access any additional props that were previously passed to your Vue component.
    
5.  Decide whether any imported components also need to be converted to Astro. With the official integration installed, you can [use existing Vue components in your Astro file](/en/guides/integrations-guide/vue/). But, you may want to convert them to Astro, especially if they do not need to be interactive!
    

See [an example from a Nuxt app converted step-by-step](#guided-example-see-the-steps).

#### Compare: Vue vs Astro

[Section titled Compare: Vue vs Astro](#compare-vue-vs-astro)

Compare the following Nuxt component and a corresponding Astro component:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [Vue](#tab-panel-3379)
*   [Astro](#tab-panel-3380)

Page.vue

    <template>  <div>    <p v-if="message === 'Not found'">      The repository you're looking up doesn't exist    </p>    <div v-else>      <Header/>      <p class="banner">Astro has {{stars}} 🧑‍🚀</p>      <Footer />    </div>  </div></template>
    <script>import Vue from 'vue'
    export default Vue.extend({  name: 'IndexPage',  async asyncData() {    const res = await fetch('https://api.github.com/repos/withastro/astro')    const json = await res.json();    return {      message: json.message,      stars: json.stargazers_count || 0,    };  }});</script>
    <style scoped>.banner {  background-color: #f4f4f4;  padding: 1em 1.5em;  text-align: center;  margin-bottom: 1em;}<style>

Page.astro

    ---import Header from "./header";import Footer from './footer';import "./layout.css";
    const res = await fetch('https://api.github.com/repos/withastro/astro')const json = await res.json()const message = json.message;const stars = json.stargazers_count || 0;---
    {message === "Not Found" ?      <p>The repository you're looking up doesn't exist</p> :      <>            <Header />            <p class="banner">Astro has {stars} 🧑‍🚀</p>            <Footer />        </>}
    <style>  .banner {    background-color: #f4f4f4;    padding: 1em 1.5em;    text-align: center;    margin-bottom: 1em;  }<style>

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### Migrating Layout Files

[Section titled Migrating Layout Files](#migrating-layout-files)

You may find it helpful to start by converting your Nuxt layouts and templates into [Astro layout components](/en/basics/layouts/).

Each Astro page explicitly requires `<html>`, `<head>`, and `<body>` tags to be present. Your Nuxt `layout.vue` and templates will not include these.

Note the standard HTML templating, and direct access to `<head>`:

src/layouts/Layout.astro

    <html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <!-- Wrap the slot element with your existing layout templating -->    <slot />  </body></html>

You may also wish to reuse code from [your Nuxt’s page’s `head` property](https://nuxtjs.org/docs/configuration-glossary/configuration-head/#the-head-property) to include additional site metadata. Notice that Astro uses neither `vue-meta` nor a component’s `head` property but instead creates `<head>` directly. You may import and use components, even within `<head>`, to separate and organize your page content.

### Migrating Pages and Posts

[Section titled Migrating Pages and Posts](#migrating-pages-and-posts)

In NuxtJS, your [pages](/en/basics/astro-pages/) live in `/pages`. In Astro, all your page content must live within `src/` unless you are using [content collections](/en/guides/content-collections/).

#### Vue Pages

[Section titled Vue Pages](#vue-pages)

Your existing Nuxt Vue (`.vue`) pages will need to be [converted from Vue files to `.astro` pages](#convert-vue-sfc-pages-to-astro-files). You cannot use an existing Vue page file in Astro.

These [`.astro` pages](/en/basics/astro-pages/) must be located within `src/pages/` and will have page routes generated automatically based on their file path.

##### Dynamic File Path Naming

[Section titled Dynamic File Path Naming](#dynamic-file-path-naming)

In Nuxt, your dynamic pages use an underscore to represent a dynamic page property that’s then passed to the page generation:

*   Directorypages/
    
    *   Directorypokemon/
        
        *   \_name.vue
        
    *   index.vue
    
*   nuxt.config.js

To convert to Astro, change this underscored dynamic path property (e.g. `_name.vue`) to be wrapped in a pair of square brackets (e.g. `[name].astro`):

*   Directorysrc/
    
    *   Directorypages/
        
        *   Directorypokemon/
            
            *   \[name\].astro
            
        *   index.astro
        
    
*   astro.config.mjs

#### Markdown and MDX pages

[Section titled Markdown and MDX pages](#markdown-and-mdx-pages)

Astro has built-in support for Markdown and an optional integration for MDX files. You can reuse any existing Markdown and MDX pages, but they may require some adjustments to their frontmatter, such as adding [Astro’s special `layout` frontmatter property](/en/basics/layouts/#markdown-layouts).

You will no longer need to manually create pages for each Markdown-generated route or use an external package like `@nuxt/content`. These files can be placed within `src/pages/` to take advantage of automatic file-based routing.

When part of a [content collection](/en/guides/content-collections/), you will [generate pages dynamically](/en/guides/content-collections/#generating-routes-from-content) from your content entries.

### Migrating Tests

[Section titled Migrating Tests](#migrating-tests)

As Astro outputs raw HTML, it is possible to write end-to-end tests using the output of the build step. Any end-to-end tests written previously might work out-of-the-box, if you have been able to match the markup of your Nuxt site. Testing libraries such as Jest and Vue Testing Library can be imported and used in Astro to test your Vue components.

See Astro’s [testing guide](/en/guides/testing/) for more.

Reference: Convert NuxtJS Syntax to Astro
-----------------------------------------

[Section titled Reference: Convert NuxtJS Syntax to Astro](#reference-convert-nuxtjs-syntax-to-astro)

### Nuxt Local Variables to Astro

[Section titled Nuxt Local Variables to Astro](#nuxt-local-variables-to-astro)

To use local variables in an Astro component’s HTML, change the set of two curly braces to one set of curly braces:

src/components/Component.astro

    ---const message = "Hello!"---<p>{{message}}</p><p>{message}</p>

### Nuxt Property Passing to Astro

[Section titled Nuxt Property Passing to Astro](#nuxt-property-passing-to-astro)

To bind an attribute or component property in an Astro component, change this syntax to the following:

src/components/Component.astro

    ------<p v-bind:aria-label="message">...</p><!-- Or --><p :aria-label="message">...</p><!-- Also support component props --><Header title="Page"/>
    <p aria-label={message}>...</p><!-- Also support component props --><Header title={"Page"}/>

### Nuxt Links to Astro

[Section titled Nuxt Links to Astro](#nuxt-links-to-astro)

Convert any Nuxt `<NuxtLink to="">` components to HTML `<a href="">` tags.

    <NuxtLink to="/blog">Blog</Link><a href="/blog">Blog</a>

Astro does not use any special component for links, although you are welcome to build custom link components. You can then import and use this `<Link>` just as you would any other component.

src/components/Link.astro

    ---const { to } = Astro.props---<a href={to}><slot /></a>

### Nuxt Imports to Astro

[Section titled Nuxt Imports to Astro](#nuxt-imports-to-astro)

If necessary, update any [file imports](/en/guides/imports/) to reference relative file paths exactly. This can be done using [import aliases](/en/guides/typescript/#import-aliases), or by writing out a relative path in full.

Note that `.astro` and several other file types must be imported with their full file extension.

src/pages/authors/Fred.astro

    ---import Card from `../../components/Card.astro`;---<Card />

### Nuxt Dynamic Page Generation to Astro

[Section titled Nuxt Dynamic Page Generation to Astro](#nuxt-dynamic-page-generation-to-astro)

In Nuxt, to generate a dynamic page you either must:

*   Use SSR.
*   [Use the `generate` function in `nuxt.config.js`](https://nuxtjs.org/docs/configuration-glossary/configuration-generate/) to define all possible static routes.

In Astro, you similarly have two choices:

*   [Use SSR](/en/guides/on-demand-rendering/).
*   Export a `getStaticPaths()` function in the frontmatter of an Astro page to tell the framework which [static routes to generate dynamically](/en/guides/routing/#dynamic-routes).

#### Convert a `generate` function in Nuxt to a `getStaticPaths` function in Astro.

[Section titled Convert a generate function in Nuxt to a getStaticPaths function in Astro.](#convert-a-generate-function-in-nuxt-to-a-getstaticpaths-function-in-astro)

To generate multiple pages, replace the function to create routes in your `nuxt.config.js` with `getStaticPaths()` directly inside a dynamic routing page itself:

nuxt.config.js

    {  // ...    generate: {        async routes() {          // Axios is required here unless you're using Node 18          const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")          const pokemons = res.data.results;          return pokemons.map(pokemon => {            return '/pokemon/' + pokemon.name          })        }      }}

src/pages/pokemon/\[name\].astro

    ---export const getStaticPaths = async () => {  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")  const resJson = await res.json();  const pokemons = resJson.results;  return pokemons.map(({ name }) => ({      params: { name },    }))}// ...---<!-- Your template here -->

### Nuxt Data Fetching to Astro

[Section titled Nuxt Data Fetching to Astro](#nuxt-data-fetching-to-astro)

Nuxt has two methods of fetching server-side data:

*   [`asyncData` options API](https://nuxtjs.org/docs/features/data-fetching/#async-data)
*   [`fetch` hook](https://nuxtjs.org/docs/features/data-fetching/#the-fetch-hook)

In Astro, fetch data inside of your page’s code fence.

Migrate the following:

pages/index.vue

    {  // ...  async asyncData() {    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")    const resJson = await res.json();    const pokemons = resJson.results;    return {      pokemons,    }  },}

To a code fence without a wrapper function:

src/pages/index.astro

    ---const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")const resJson = await res.json();const pokemons = resJson.results;---
    <!-- Your template here -->

### Nuxt Styling to Astro

[Section titled Nuxt Styling to Astro](#nuxt-styling-to-astro)

Nuxt utilizes Vue’s component styling to generate a page’s style.

pages/index.vue

    <template>  <!-- Your template here --></template>
    <script>  // Your server logic here</script>
    <style scoped>    .class {        color: red;    }</style>

Similarly, in Astro you can drop in a `<style>` element in your page’s template to provide scoped styles to the component.

src/pages/index.vue

    ---// Your server logic here---
    <style>    .class {        color: red;    }</style>

#### Global Styling

[Section titled Global Styling](#global-styling)

`<style>` tags are `scoped` by default in Astro. To make a `<style>` tag global, mark it with the `is:global` attribute:

src/pages/index.vue

    <style is:global>  p {    color: red;  }</style>

#### Pre-processor support

[Section titled Pre-processor support](#pre-processor-support)

[Astro supports the most popular CSS preprocessors](/en/guides/styling/#css-preprocessors) by installing them as a dev dependency. For example, to use SCSS:

Terminal window

    npm install -D sass

After doing so, you’re then able to use `.scss` or `.sass` styled without modification from your Vue components.

src/layouts/Layout.astro

    <p>Hello, world</p><style lang="scss">p {   color: black;
       &:hover {       color: red;   }}</style>

See more about [Styling in Astro](/en/guides/styling/).

### Nuxt Image Plugin to Astro

[Section titled Nuxt Image Plugin to Astro](#nuxt-image-plugin-to-astro)

Convert any [Nuxt `<nuxt-img/>` or `<nuxt-picture/>` components](https://image.nuxtjs.org/components/nuxt-img) to [Astro’s own image component](/en/guides/images/) in `.astro` or `.mdx` files, or to a [standard HTML `<img>`](/en/guides/images/#images-in-ui-framework-components) or `<picture>` tag as appropriate in your Vue components.

Astro’s `<Image />` component works in `.astro` and `.mdx` files only. See a [full list of its component attributes](/en/reference/modules/astro-assets/#image-properties) and note that several will differ from Nuxt’s attributes.

src/pages/index.astro

    ---import { Image } from 'astro:assets';import rocket from '../assets/rocket.png';---<Image src={rocket} alt="A rocketship in space." /><img src={rocket.src} alt="A rocketship in space.">

In Vue (`.vue`) components within your Astro app, use standard JSX image syntax (`<img />`). Astro will not optimize these images, but you can install and use NPM packages for more flexibility.

You can learn more about [using images in Astro](/en/guides/images/) in the Images Guide.

Guided example: See the steps!
------------------------------

[Section titled Guided example: See the steps!](#guided-example-see-the-steps)

Here is an example of Nuxt Pokédex data fetch converted to Astro.

`pages/index.vue` fetches and displays a list of the first 151 Pokémon using [the REST PokéAPI](https://pokeapi.co/).

Here’s how to recreate that in `src/pages/index.astro`, replacing `asyncData()` with `fetch()`.

1.  Identify the `<template>` and `<style>` in the Vue SFC.
    
    pages/index.vue
    
        <template>  <ul class="plain-list pokeList">            <li v-for="pokemon of pokemons" class="pokemonListItem" :key="pokemon.name">                <NuxtLink class="pokemonContainer" :to="`/pokemon/${pokemon.name}`">                    <p class="pokemonId">No. {{pokemon.id}}</p>                    <img                      class="pokemonImage"                      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"                      :alt="`${pokemon.name} picture`"/>                    <h2 class="pokemonName">{{pokemon.name}}</h2>                </NuxtLink>            </li>    </ul></template>
        <script>import Vue from 'vue'export default Vue.extend({  name: 'IndexPage',  layout: 'default',  async asyncData() {    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")    const resJson = await res.json();    const pokemons = resJson.results.map(pokemon => {        const name = pokemon.name;        // https://pokeapi.co/api/v2/pokemon/1/        const url = pokemon.url;        const id = url.split("/")[url.split("/").length - 2];        return {            name,            url,            id        }    });    return {      pokemons,    }  },  head() {    return {      title: "Pokedex: Generation 1"    }  }});</script>
        <style scoped>.pokeList {  display: grid;  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );  gap: 1rem;}
        /* ... */</style>
    
2.  Create `src/pages/index.astro`
    
    Use the `<template>` and `<style>` tags of the Nuxt SFC. Convert any Nuxt or Vue syntax to Astro.
    
    Note that:
    
    *   `<template>` is removed
        
    *   `<style>` has its `scoped` attribute removed
        
    *   `v-for` becomes `.map`.
        
    *   `:attr="val"` becomes `attr={val}`
        
    *   `<NuxtLink>` becomes `<a>`.
        
    *   The `<> </>` fragment is not required in Astro templating.
        
    
    src/pages/index.astro
    
        ------<ul class="plain-list pokeList">    {pokemons.map((pokemon) => (        <li class="pokemonListItem" key={pokemon.name}>            <a class="pokemonContainer" href={`/pokemon/${pokemon.name}`}>                <p class="pokemonId">No. {pokemon.id}</p>                <img class="pokemonImage" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={`${pokemon.name} picture`}/>                <h2 class="pokemonName">{pokemon.name}</h2>            </a>        </li>    ))}</ul>
        <style>.pokeList {  display: grid;  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );  gap: 1rem;}
        /* ... */</style>
    
3.  Add any needed imports, props and JavaScript
    
    Note that:
    
    *   The `asyncData` function is no longer needed. Data from the API is fetched directly in the code fence.
    *   A `<Layout>` component is imported, and wraps the page templating.
        *   Our `head()` Nuxt method is passed to the `<Layout>` component, which is passed to the `<title>` element as a property.
    
    src/pages/index.astro
    
        ---import Layout from '../layouts/layout.astro';
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");const resJson = await res.json();const pokemons = resJson.results.map(pokemon => {    const name = pokemon.name;    // https://pokeapi.co/api/v2/pokemon/1/    const url = pokemon.url;    const id = url.split("/")[url.split("/").length - 2];    return {        name,        url,        id    }});---
        <Layout title="Pokedex: Generation 1">  <ul class="plain-list pokeList">      {pokemons.map((pokemon) => (          <li class="pokemonListItem" key={pokemon.name}>              <a class="pokemonContainer" href={`/pokemon/${pokemon.name}`}>                  <p class="pokemonId">No. {pokemon.id}</p>                  <img class="pokemonImage" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={`${pokemon.name} picture`}/>                  <h2 class="pokemonName">{pokemon.name}</h2>              </a>          </li>      ))}  </ul></Layout>
        <style>.pokeList {  display: grid;  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );  gap: 1rem;}
        /* ... */</style>
    

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[From Nuxt to Astro - rebuilding with Astro](https://dev.to/lindsaykwardell/from-nuxt-to-astro-rebuilding-with-astro-5ann)

[Nuxt 2 to Astro 3 Replatforming – from Setup to Production](https://stevenwoodson.com/blog/replatforming-from-nuxtjs-2-to-astro/)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a Nuxt site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-nuxtjs.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-nuxtjs.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Next.js](/en/guides/migrate-to-astro/from-nextjs/) [Next  
Pelican](/en/guides/migrate-to-astro/from-pelican/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-pelican
Migrating from Pelican
======================

[Pelican](https://getpelican.com) is an open-source static site generator built on Python.

Key Similarities between Pelican and Astro
------------------------------------------

[Section titled Key Similarities between Pelican and Astro](#key-similarities-between-pelican-and-astro)

Pelican and Astro share some similarities that will help you migrate your project:

*   Pelican and Astro are both static-site generators, ideally suited to [content-driven websites](/en/concepts/why-astro/#content-driven) like blogs.
    
*   Pelican and Astro both have built-in support for [writing in Markdown](/en/guides/markdown-content/), including frontmatter YAML properties for page metadata. However, Astro has very few reserved frontmatter properties compared to Pelican. Even though many of your existing Pelican frontmatter properties will not be “special” in Astro, you can continue to use your existing Markdown files and frontmatter values.
    

Key Differences between Pelican and Astro
-----------------------------------------

[Section titled Key Differences between Pelican and Astro](#key-differences-between-pelican-and-astro)

When you rebuild your Pelican site in Astro, you will notice some important differences:

*   Pelican supports writing content in Markdown and reStructured Text (`.rst`). Astro supports [creating pages from Markdown and MDX](/en/guides/markdown-content/) files, but does not support reStructured Text.
    
*   Pelican uses HTML files and Jinja syntax for templating. [Astro syntax](/en/basics/astro-components/) is a JSX-like superset of HTML. All valid HTML is valid `.astro` syntax.
    
*   Pelican was designed to build content-rich websites like blogs and has some built-in, blog features that you would have to build yourself in Astro. Instead, Astro offers some of these features included in an [official blog theme](https://github.com/withastro/astro/tree/latest/examples/blog).
    

Switch from Pelican to Astro
----------------------------

[Section titled Switch from Pelican to Astro](#switch-from-pelican-to-astro)

To convert a Pelican documentation site to Astro, start with our official [Starlight docs theme starter template](https://starlight.astro.build), or explore more community themes in our [theme showcase](https://astro.build/themes/).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters. Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3376)
*   [pnpm](#tab-panel-3377)
*   [Yarn](#tab-panel-3378)

Terminal window

    npm create astro@latest -- --template starlight

Terminal window

    pnpm create astro@latest --template starlight

Terminal window

    yarn create astro --template starlight

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Bring your existing Markdown content files to [create Markdown pages](/en/guides/markdown-content/). You can still take advantage of [file-based routing](/en/guides/routing/) by copying these documents from Pelican’s `content/` folder into `src/pages/` in Astro. You may wish to read about [Astro’s project structure](/en/basics/project-structure/) to learn where files should be located.

Pelican may have handled much of your site layout and metadata for you. You may wish to read about [building Astro Layouts as Markdown page wrappers](/en/basics/layouts/#markdown-layouts) to see how to manage templating yourself in Astro, including your page `<head>`.

Like Pelican, Astro has many plugins that extend its functionality. Explore the [official list of integrations](/en/guides/integrations-guide/) for adding features such as MDX support, and find hundreds more of community-maintained integrations in the [Astro Integrations Directory](https://astro.build/integrations/). You can even use the [Astro Integration API](/en/reference/integrations-reference/) to build your own custom integration to extend your project’s features.

To convert other types of sites, such as a portfolio or a blog, see more official starter templates on [astro.new](https://astro.new). You’ll find a link to each project’s GitHub repository, as well as one-click links to open a working project in IDX, StackBlitz, CodeSandbox and Gitpod online development environments.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a Pelican site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-pelican.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-pelican.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
NuxtJS](/en/guides/migrate-to-astro/from-nuxtjs/) [Next  
SvelteKit](/en/guides/migrate-to-astro/from-sveltekit/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-sveltekit
Migrating from SvelteKit
========================

[SvelteKit](https://kit.svelte.dev) is a framework for building web applications on top of Svelte.

Key Similarities between SvelteKit and Astro
--------------------------------------------

[Section titled Key Similarities between SvelteKit and Astro](#key-similarities-between-sveltekit-and-astro)

SvelteKit and Astro share some similarities that will help you migrate your project:

*   Both SvelteKit and Astro are modern JavaScript static-site generators and server-side rendering frameworks.
    
*   Both SvelteKit and Astro use a [`src/` folder for your project files](/en/basics/project-structure/#src) and a [special folder for file-based routing](/en/basics/astro-pages/). Creating and managing pages for your site should feel familiar.
    
*   Astro has [an official integration for using Svelte components](/en/guides/integrations-guide/svelte/) and supports [installing NPM packages](/en/guides/imports/#npm-packages), including several for Svelte. You will be able to write Svelte UI components, and may be able to keep some or all of your existing components and dependencies.
    
*   Astro and SvelteKit both allow you to use a [headless CMS, APIs or Markdown files for data](/en/guides/data-fetching/). You can continue to use your preferred content authoring system, and will be able to keep your existing content.
    

Key Differences between SvelteKit and Astro
-------------------------------------------

[Section titled Key Differences between SvelteKit and Astro](#key-differences-between-sveltekit-and-astro)

When you rebuild your SvelteKit site in Astro, you will notice some important differences:

*   Astro sites are multi-page apps, whereas SvelteKit defaults to SPAs (single-page applications) with server-side rendering, but can also create MPAs, traditional SPAs, or you can mix and match these techniques within an app.
    
*   [Components](/en/basics/astro-components/): SvelteKit uses [Svelte](https://svelte.dev). Astro pages are built using [`.astro` components](/en/basics/astro-components/), but can also support [React, Preact, Vue.js, Svelte, SolidJS, AlpineJS](/en/guides/framework-components/) and raw HTML templating.
    
*   [content-driven](/en/concepts/why-astro/#content-driven): Astro was designed to showcase your content and to allow you to opt-in to interactivity only as needed. An existing SvelteKit app might be built for high client-side interactivity. Astro has built-in capabilities for working with your content, such as page generation, but may require advanced Astro techniques to include items that are more challenging to replicate using `.astro` components, such as dashboards.
    
*   [Markdown-ready](/en/guides/markdown-content/): Astro includes built-in Markdown support, and includes a [special frontmatter YAML `layout` property](/en/basics/layouts/#markdown-layouts) used per-file for page templating. If you are converting a SvelteKit Markdown-based blog, you will not have to install a separate Markdown integration and you will not set a layout via a configuration file. You can bring your existing Markdown files, but you may need to reorganize as Astro’s file-based routing does not require a folder for each page route.
    

Switch from SvelteKit to Astro
------------------------------

[Section titled Switch from SvelteKit to Astro](#switch-from-sveltekit-to-astro)

To convert a SvelteKit blog to Astro, start with our blog theme starter template, or explore more community blog themes in our [theme showcase](https://astro.build/themes/).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters. Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3384)
*   [pnpm](#tab-panel-3385)
*   [Yarn](#tab-panel-3386)

Terminal window

    npm create astro@latest -- --template blog

Terminal window

    pnpm create astro@latest --template blog

Terminal window

    yarn create astro --template blog

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Bring your existing Markdown (or MDX, with our optional integration) files as content to [create Markdown or MDX pages](/en/guides/markdown-content/).

While file-based routing and layout components are similar in Astro, you may wish to read about [Astro’s project structure](/en/basics/project-structure/) to learn where files should be located.

To convert other types of sites, such as a portfolio or documentation site, see more official starter templates on [astro.new](https://astro.new). You’ll find a link to each project’s GitHub repository, as well as one-click links to open a working project in IDX, StackBlitz, CodeSandbox and Gitpod online development environments.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[Rewriting my blog from SvelteKit to Astro](https://kharann.com/blog/rewriting-my-blog/)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a SvelteKit site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-sveltekit.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-sveltekit.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Pelican](/en/guides/migrate-to-astro/from-pelican/) [Next  
VuePress](/en/guides/migrate-to-astro/from-vuepress/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-vuepress
Migrating from VuePress
=======================

[VuePress](https://vuePress.vuejs.org) is an open-source static site generator built on Vue.

Key Similarities between VuePress and Astro
-------------------------------------------

[Section titled Key Similarities between VuePress and Astro](#key-similarities-between-vuepress-and-astro)

VuePress and Astro share some similarities that will help you migrate your project:

*   Both VuePress and Astro are modern JavaScript static-site generators with similar project file structures. Both use a [special `src/pages/` folder for file-based routing](/en/basics/astro-pages/). Creating and managing pages for your site should feel familiar.
    
*   Astro and VuePress are both designed for [content-driven websites](/en/concepts/why-astro/#content-driven), with excellent built-in support for Markdown files. Writing in Markdown will feel familiar, and you will be able to keep your existing content.
    
*   Astro has [an official integration for using Vue components](/en/guides/integrations-guide/vue/) and supports [installing NPM packages](/en/guides/imports/#npm-packages), including several for Vue. You will be able to write Vue UI components, and may be able to keep some or all of your existing Vue components and dependencies.
    

Key Differences between VuePress and Astro
------------------------------------------

[Section titled Key Differences between VuePress and Astro](#key-differences-between-vuepress-and-astro)

When you rebuild your VuePress site in Astro, you will notice some important differences.

*   VuePress is a Vue-based single-page application (SPA). Astro sites are multi-page apps built using [`.astro` components](/en/basics/astro-components/), but can also support [React, Preact, Vue.js, Svelte, SolidJS, AlpineJS](/en/guides/framework-components/) and raw HTML templating.
    
*   [Layout templates](/en/basics/layouts/): VuePress sites are created using Markdown (`.md`) files for page content and HTML (`.html`) templates for layout. Astro is component-based, and uses Astro components, which include HTML templating for pages, layouts and individual UI elements. Astro can also create [pages from `.md` and `.mdx` files](/en/guides/markdown-content/), using an Astro layout component for wrapping Markdown content in a page template.
    
*   VuePress was designed to build content-heavy, Markdown-centric sites and has some built-in, documentation-specific website features that you would have to build yourself in Astro. Instead, Astro offers some documentation-specific features through an [official docs theme](https://starlight.astro.build). This website was the inspiration for that template! You can also find more [community docs themes](https://astro.build/themes?search=&categories%5B%5D=docs) with built-in features in our Themes Showcase.
    

Switch from VuePress to Astro
-----------------------------

[Section titled Switch from VuePress to Astro](#switch-from-vuepress-to-astro)

To convert a VuePress documentation site to Astro, start with our official [Starlight docs theme starter template](https://starlight.astro.build), or explore more community docs themes in our [theme showcase](https://astro.build/themes?search=&categories%5B%5D=docs).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters. Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3387)
*   [pnpm](#tab-panel-3388)
*   [Yarn](#tab-panel-3389)

Terminal window

    npm create astro@latest -- --template starlight

Terminal window

    pnpm create astro@latest --template starlight

Terminal window

    yarn create astro --template starlight

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Bring your existing Markdown content files to [create Markdown pages](/en/guides/markdown-content/). You can still take advantage of [file-based routing](/en/guides/routing/) by moving these documents from `docs` in VuePress to `src/pages/` in Astro. Create folders with names that correspond to your existing VuePress project, and you should be able to keep your existing URLs.

VuePress, or any theme you installed, probably handled much of your site layout and metadata for you. You may wish to read about [building Astro Layouts as Markdown page wrappers](/en/basics/layouts/#markdown-layouts) to see how to manage templating yourself in Astro, including your page `<head>`.

You can find Astro’s docs starter, and other templates, on [astro.new](https://astro.new). You’ll find a link to each project’s GitHub repository, as well as one-click links to open a working project in IDX, StackBlitz, CodeSandbox and Gitpod online development environments.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a VuePress site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-vuepress.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-vuepress.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
SvelteKit](/en/guides/migrate-to-astro/from-sveltekit/) [Next  
WordPress](/en/guides/migrate-to-astro/from-wordpress/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/migrate-to-astro/from-wordpress
Migrating from WordPress
========================

[WordPress](https://wordpress.org) is an open-source, personal publishing system built on PHP and MySQL.

Tip

You can [use WordPress as a headless CMS for your Astro project](/en/guides/cms/wordpress/). Follow our guide to use your existing WordPress content in a new Astro project.

Key Similarities between WordPress and Astro
--------------------------------------------

[Section titled Key Similarities between WordPress and Astro](#key-similarities-between-wordpress-and-astro)

WordPress and Astro share some similarities that will help you migrate your project:

*   Both WordPress and Astro are ideal for [content-driven websites](/en/concepts/why-astro/#content-driven) like blogs and support writing your content in Markdown (requires a plugin in WordPress). Although the process for adding new content is different, [writing in Markdown files](/en/guides/markdown-content/) for your Astro blog should feel familiar if you have used Markdown syntax in your WordPress editor.
    
*   Both WordPress and Astro encourage you to [think about the design of your site in “blocks”](/en/concepts/islands/) (components). In Astro you will probably [write more of your own code to create these blocks](/en/basics/astro-components/) rather than rely on pre-built plugins. But thinking about the individual pieces of your site and how they are presented on the page should feel familiar.
    

Key Differences between WordPress and Astro
-------------------------------------------

[Section titled Key Differences between WordPress and Astro](#key-differences-between-wordpress-and-astro)

When you rebuild your WordPress site in Astro, you will notice some important differences:

*   A WordPress site is edited using an online dashboard. In Astro, you will use a [code editor](/en/editor-setup/) and development environment to maintain your site. You can develop locally on your machine, or choose a cloud editor/development environment like IDX, StackBlitz, CodeSandbox or Gitpod.
    
*   WordPress has an extensive plugin and theme market. In Astro, you will find some themes and [integrations](https://astro.build/integrations/) available, but you may now have to build many of your existing features yourself instead of looking for third-party solutions. Or, you can choose to start with an [Astro theme](https://astro.build/themes) with built-in features!
    
*   WordPress stores your content in a database. In Astro, you will have individual files (typically Markdown or MDX) in your [project directory](/en/basics/project-structure/) for each page’s content. Or, you can choose to use a [CMS for your content](/en/guides/cms/), even your existing WordPress site, and use Astro to fetch and present the data.
    

Switch from WordPress to Astro
------------------------------

[Section titled Switch from WordPress to Astro](#switch-from-wordpress-to-astro)

To convert a WordPress blog to Astro, start with our blog theme starter template, or explore more community blog themes in our [theme showcase](https://astro.build/themes).

You can pass a `--template` argument to the `create astro` command to start a new Astro project with one of our official starters. Or, you can [start a new project from any existing Astro repository on GitHub](/en/install-and-setup/#install-from-the-cli-wizard).

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3390)
*   [pnpm](#tab-panel-3391)
*   [Yarn](#tab-panel-3392)

Terminal window

    npm create astro@latest -- --template blog

Terminal window

    pnpm create astro@latest --template blog

Terminal window

    yarn create astro --template blog

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

You can continue to [use your existing WordPress blog as your CMS for Astro](/en/guides/cms/wordpress/), which means you will keep using your WordPress dashboard for writing your posts. Your content will be managed at WordPress, but all other aspects of your Astro site will be built in your code editing environment, and you will [deploy your Astro site](/en/guides/deploy/) separately from your WordPress site. (Be sure to update your domain at your host to keep the same website URL!)

You may wish to take [Astro’s Build a Blog Tutorial](/en/tutorial/0-introduction/) if you are new to working in a code editor and using GitHub to store and deploy your site. It will walk you through all the accounts and setup you need! You will also learn how to [build Astro components yourself](/en/tutorial/3-components/), and it will show you how to [add blog posts directly in Astro](/en/tutorial/2-pages/2/) if you choose not to use WordPress to write your content.

If you want to move all of your existing post content to Astro, you may find this [tool for exporting Markdown from WordPress helpful](https://github.com/lonekorean/wordpress-export-to-markdown). You may need to make some adjustments to the result if you have to [convert a large or complicated WordPress site to Markdown](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown/).

To convert other types of sites, such as a portfolio or documentation site, see more official starter templates on [astro.new](https://astro.new). You’ll find a link to each project’s GitHub repository, as well as one-click links to open a working project in IDX, StackBlitz, CodeSandbox and Gitpod online development environments.

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

[Goodbye Wordpress, hello Astro!](https://trib.tv/posts/2025/wordpress-to-astro/)

[How I Migrated from Wordpress to Astro](https://itsthatlady.dev/blog/migrate-from-wordpress-to-astro/)

[How and Why I Moved My Blog from WordPress to Astro and Markdown](https://levelup.gitconnected.com/how-and-why-i-moved-my-blog-from-wordpress-to-astro-and-markdown-3549672d5a86)

[How I Migrated From Wordpress to Astro: Boosted Pagespeed Scores to 100% and Cut 100% Hosting cost](https://devaradise.com/wordpress-to-static-website-astro/)

[WordPress to Astro site conversion](https://share.transistor.fm/s/d86496cd)

[How to Convert a Wordpress blog to an Astro Static Site](https://blog.okturtles.org/2024/10/convert-wordpress-to-static-site/)

[Why I switched from WordPress to Astro](https://dev.to/fratzinger/why-i-switched-from-wordpress-to-astro-5ge)

[Why I ditched WordPress for Astro](https://vbartalis.xyz/en/blog/why-i-ditched-wordpress-for-astro-js/)

[DeWP: utility to use your WordPress data in Astro projects](https://delucis.github.io/dewp/)

[Astro vs. WordPress: Rendering Patterns of the Modern Web](https://andrewkepson.com/blog/headless-wordpress/astro-vs-wordpress-rendering-patterns/)

Have a resource to share?

If you found (or made!) a helpful video or blog post about converting a WordPress site to Astro, [add it to this list](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-wordpress.mdx)!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/migrate-to-astro/from-wordpress.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
VuePress](/en/guides/migrate-to-astro/from-vuepress/) [Next  
Pages](/en/basics/astro-pages/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

