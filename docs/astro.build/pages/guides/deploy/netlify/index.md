Deploy your Astro Site to Netlify
=================================

[Netlify](https://netlify.com) offers hosting and serverless backend services for web applications and static websites. Any Astro site can be hosted on Netlify!

This guide includes instructions for deploying to Netlify through the website UI or Netlify’s CLI.

Project configuration
---------------------

[Section titled Project configuration](#project-configuration)

Your Astro project can be deployed to Netlify in three different ways: as a static site, a server-rendered site, or an edge-rendered site.

### Static site

[Section titled Static site](#static-site)

Your Astro project is a static site by default. You don’t need any extra configuration to deploy a static Astro site to Netlify.

### Adapter for on-demand rendering

[Section titled Adapter for on-demand rendering](#adapter-for-on-demand-rendering)

Add [the Netlify adapter](/en/guides/integrations-guide/netlify/) to enable on-demand rendering in your Astro project and deploy to Netlify with the following `astro add` command. This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.

Terminal window

    npx astro add netlify

See the [Netlify adapter guide](/en/guides/integrations-guide/netlify/) to install manually instead, or for more configuration options, such as deploying your project’s Astro middleware using Netlify’s Edge Functions.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

You can deploy to Netlify through the website UI or using Netlify’s CLI (command line interface). The process is the same for both static and on-demand rendered Astro sites.

### Website UI deployment

[Section titled Website UI deployment](#website-ui-deployment)

If your project is stored in GitHub, GitLab, BitBucket, or Azure DevOps, you can use the Netlify website UI to deploy your Astro site.

1.  Click Add a new site in your [Netlify dashboard](https://app.netlify.com/)
    
2.  Choose Import an existing project
    
    When you import your Astro repository from your Git provider, Netlify should automatically detect and pre-fill the correct configuration settings for you.
    
3.  Make sure that the following settings are entered, then press the Deploy button:
    
    *   **Build Command:** `astro build` or `npm run build`
    *   **Publish directory:** `dist`
    
    After deploying, you will be redirected to the site overview page. There, you can edit the details of your site.
    

Any future changes to your source repository will trigger preview and production deploys based on your deployment configuration.

#### `netlify.toml` file

[Section titled netlify.toml file](#netlifytoml-file)

You can optionally create a new `netlify.toml` file at the top level of your project repository to configure your build command and publish directory, as well as other project settings including environment variables and redirects. Netlify will read this file and automatically configure your deployment.

To configure the default settings, create a `netlify.toml` file with the following contents:

    [build]  command = "npm run build"  publish = "dist"

More info at [“Deploying an existing Astro Git repository”](https://www.netlify.com/blog/how-to-deploy-astro/#deploy-an-existing-git-repository-to-netlify) on Netlify’s blog

### CLI deployment

[Section titled CLI deployment](#cli-deployment)

You can also create a new site on Netlify and link up your Git repository by installing and using the [Netlify CLI](https://cli.netlify.com/).

1.  Install Netlify’s CLI globally
    
    Terminal window
    
        npm install --global netlify-cli
    
2.  Run `netlify login` and follow the instructions to log in and authorize Netlify
    
3.  Run `netlify init` and follow the instructions
    
4.  Confirm your build command (`astro build`)
    
    The CLI will automatically detect the build settings (`astro build`) and deploy directory (`dist`), and will offer to automatically generate [a `netlify.toml` file](#netlifytoml-file) with those settings.
    
5.  Build and deploy by pushing to Git
    
    The CLI will add a deploy key to the repository, which means your site will be automatically rebuilt on Netlify every time you `git push`.
    

More details from Netlify on [Deploy an Astro site using the Netlify CLI](https://www.netlify.com/blog/how-to-deploy-astro/#link-your-astro-project-and-deploy-using-the-netlify-cli)

### Set a Node.js version

[Section titled Set a Node.js version](#set-a-nodejs-version)

If you are using a legacy [build image](https://docs.netlify.com/configure-builds/get-started/#build-image-selection) (Xenial) on Netlify, make sure that your Node.js version is set. Astro requires `v18.20.8` or `v20.3.0` or higher.

You can [specify your Node.js version in Netlify](https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript) using:

*   a [`.nvmrc`](https://github.com/nvm-sh/nvm#nvmrc) file in your base directory.
*   a `NODE_VERSION` environment variable in your site’s settings using the Netlify project dashboard.

Using Netlify Functions
-----------------------

[Section titled Using Netlify Functions](#using-netlify-functions)

No special configuration is required to use Netlify Functions with Astro. Add a `netlify/functions` directory to your project root and follow [the Netlify Functions documentation](https://docs.netlify.com/functions/overview/) to get started!

Examples
--------

[Section titled Examples](#examples)

*   [Deploy An Astro site with Forms, Serverless Functions, and Redirects](https://www.netlify.com/blog/deploy-an-astro-site-with-forms-serverless-functions-and-redirects/) — Netlify Blog
*   [Deployment Walkthrough Video](https://youtu.be/GrSLYq6ZTes) — Netlify YouTube channel

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/netlify.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Microsoft Azure](/en/guides/deploy/microsoft-azure/) [Next  
Render](/en/guides/deploy/render/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)