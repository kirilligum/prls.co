Deploy your Astro Site to Zeabur
================================

[Zeabur](https://zeabur.com) offers hosting for full-stack web applications. Astro sites can be hosted as both SSR or static output.

This guide includes instructions for deploying to Zeabur through the website UI.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

### Static Site

[Section titled Static Site](#static-site)

Astro outputs a static site by default. There is no need for any extra configuration to deploy a static Astro site to Zeabur.

### Adapter for SSR

[Section titled Adapter for SSR](#adapter-for-ssr)

To enable SSR in your Astro project and deploy on Zeabur:

1.  Install [the `@zeabur/astro-adapter` adapter](https://www.npmjs.com/package/@zeabur/astro-adapter) to your project’s dependencies using your preferred package manager. If you’re using npm or aren’t sure, run this in the terminal:
    
    Terminal window
    
          npm install @zeabur/astro-adapter
    
2.  Add two new lines to your `astro.config.mjs` project configuration file.
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';import zeabur from '@zeabur/astro-adapter/serverless';
        export default defineConfig({  output: 'server',  adapter: zeabur(),});
    

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

You can deploy your Astro site to Zeabur if the project is stored in GitHub.

1.  Click Create new project in the [Zeabur dashboard](https://dash.zeabur.com).
    
2.  Configure GitHub installation and import the repository.
    
3.  Zeabur will automatically detect that your project is an Astro project and will build it using the `astro build` command.
    
4.  Once the build is complete, you can bind a domain to your site and visit it.
    

After your project has been imported and deployed, all subsequent pushes to branches will generate new builds.

Learn more about Zeabur’s [Deployment Guide](https://zeabur.com/docs/get-started/).

More Deployment Guides
----------------------

*   ![](/logos/netlify.svg)
    
    ### [Netlify](/en/guides/deploy/netlify/)
    
*   ![](/logos/vercel.svg)
    
    ### [Vercel](/en/guides/deploy/vercel/)
    
*   ![](/logos/deno.svg)
    
    ### [Deno Deploy](/en/guides/deploy/deno/)
    
*   ![](/logos/github.svg)
    
    ### [GitHub Pages](/en/guides/deploy/github/)
    
*   ![](/logos/gitlab.svg)
    
    ### [GitLab Pages](/en/guides/deploy/gitlab/)
    
*   ![](/logos/cloudflare-pages.svg)
    
    ### [Cloudflare Pages](/en/guides/deploy/cloudflare/)
    
*   ![](/logos/aws.svg)
    
    ### [AWS](/en/guides/deploy/aws/)
    
*   ![](/logos/flightcontrol.svg)
    
    ### [AWS via Flightcontrol](/en/guides/deploy/flightcontrol/)
    
*   ![](/logos/sst.svg)
    
    ### [AWS via SST](/en/guides/deploy/sst/)
    
*   ![](/logos/clever-cloud.svg)
    
    ### [Clever Cloud](/en/guides/deploy/clever-cloud/)
    
*   ![](/logos/azion.svg)
    
    ### [Azion](/en/guides/deploy/azion/)
    
*   ![](/logos/google-cloud.svg)
    
    ### [Google Cloud](/en/guides/deploy/google-cloud/)
    
*   ![](/logos/firebase.svg)
    
    ### [Google Firebase](/en/guides/deploy/google-firebase/)
    
*   ![](/logos/heroku.svg)
    
    ### [Heroku](/en/guides/deploy/heroku/)
    
*   ![](/logos/microsoft-azure.svg)
    
    ### [Microsoft Azure](/en/guides/deploy/microsoft-azure/)
    
*   ![](/logos/buddy.svg)
    
    ### [Buddy](/en/guides/deploy/buddy/)
    
*   ![](/logos/edgio.svg)
    
    ### [Edgio](/en/guides/deploy/edgio/)
    
*   ![](/logos/fleek.svg)
    
    ### [Fleek](/en/guides/deploy/fleek/)
    
*   ![](/logos/flyio.svg)
    
    ### [Fly.io](/en/guides/deploy/flyio/)
    
*   ![](/logos/render.svg)
    
    ### [Render](/en/guides/deploy/render/)
    
*   ![](/logos/stormkit.svg)
    
    ### [Stormkit](/en/guides/deploy/stormkit/)
    
*   ![](/logos/surge.svg)
    
    ### [Surge](/en/guides/deploy/surge/)
    
*   ![](/logos/cleavr.svg)
    
    ### [Cleavr](/en/guides/deploy/cleavr/)
    
*   ![](/logos/kinsta.svg)
    
    ### [Kinsta](/en/guides/deploy/kinsta/)
    
*   ![](/logos/zeabur.svg)
    
    ### [Zeabur](/en/guides/deploy/zeabur/)
    
*   ![](/logos/zerops.svg)
    
    ### [Zerops](/en/guides/deploy/zerops/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/zeabur.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Vercel](/en/guides/deploy/vercel/) [Next  
Zerops](/en/guides/deploy/zerops/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)