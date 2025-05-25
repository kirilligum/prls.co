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