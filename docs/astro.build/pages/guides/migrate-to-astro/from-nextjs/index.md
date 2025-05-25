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