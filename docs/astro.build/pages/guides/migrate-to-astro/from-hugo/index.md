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