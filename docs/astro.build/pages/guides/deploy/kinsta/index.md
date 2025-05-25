Deploy your Astro Site to Kinsta Application Hosting
====================================================

You can use [Kinsta Application Hosting](https://kinsta.com/application-hosting/) to host an Astro site on their cloud hosting.

Configuring your Astro project
------------------------------

[Section titled Configuring your Astro project](#configuring-your-astro-project)

### Static hosting

[Section titled Static hosting](#static-hosting)

Looking for an example?

Check out [the official Kinsta Application Hosting Starter project for Astro](https://github.com/kinsta/hello-world-astro)!

To host your project on **Kinsta Application Hosting**, you need to:

*   Include a `name` field in your `package.json`. (This can be anything, and will not affect your deployment.)
*   Include a `build` script in your `package.json`. (Your Astro project should already include this.)
*   Install the [`serve`](https://www.npmjs.com/package/serve) package and set the `start` script to `serve dist/`.

Here are the necessary lines in your `package.json` file:

package.json

    {  "name": "anything", // This is required, but the value does not matter.  "scripts": {    "dev": "astro dev",    "start": "serve dist/",    "build": "astro build",    "preview": "astro preview",    "astro": "astro"  },  "dependencies": {    "astro": "^2.2.0",    "serve": "^14.0.1"  },}

### SSR

[Section titled SSR](#ssr)

Looking for an example?

Check out [the official Kinsta Application Hosting Starter project for Astro SSR](https://github.com/kinsta/hello-world-astro-ssr)!

To host your project on **Kinsta Application Hosting**, you need to:

*   Include a `name` field in your `package.json`. (This can be anything, and will not affect your deployment.)
*   Include a `build` script in your `package.json`. (Your Astro project should already include this.)
*   Install the [`@astrojs/node`](https://www.npmjs.com/package/@astrojs/node) package and set the `start` script to `node ./dist/server/entry.mjs`.
*   Set the `astro.config.mjs` to use `@astrojs/node` and to use `host: true`.

Here are the necessary lines in your `package.json` file:

package.json

    {  "name": "anything", // This is required, but the value does not matter.  "scripts": {    "dev": "astro dev",    "start": "node ./dist/server/entry.mjs",    "build": "astro build",    "preview": "astro preview",    "astro": "astro"  },  "dependencies": {    "astro": "^2.2.0",    "@astrojs/node": "^5.1.1"  },}

Here are the necessary lines in your `astro.config.mjs` file:

astro.config.mjs

      import { defineConfig } from 'astro/config';  import node from "@astrojs/node";
      export default defineConfig({    output: 'server',    adapter: node({      mode: "standalone"    }),    server: {      host: true    }  });

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

Once your project’s GitHub repository is connected, you can trigger manual deploys to Kinsta Application Hosting in the **MyKinsta Admin Panel**. You can also set up automatic deployments in your admin panel.

### Configuring a new Kinsta application

[Section titled Configuring a new Kinsta application](#configuring-a-new-kinsta-application)

1.  Go to the [My Kinsta](https://my.kinsta.com/) admin panel.
    
2.  Go to the **Applications** tab.
    
3.  Connect your GitHub repository.
    
4.  Press the **Add service** > **Application** button.
    
5.  Follow the wizard steps.
    
6.  Your application is deployed.
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/kinsta.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Heroku](/en/guides/deploy/heroku/) [Next  
Microsoft Azure](/en/guides/deploy/microsoft-azure/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)