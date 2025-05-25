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