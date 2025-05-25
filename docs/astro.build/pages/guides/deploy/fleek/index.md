Deploy your Astro Site to Fleek
===============================

You can use [Fleek](http://fleek.xyz/) to deploy a static Astro site to their edge-optimized decentralized network.

This guide gives a complete walkthrough of deploying your Astro site to Fleek using the Fleek UI and CLI.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

Your Astro project can be deployed to Fleek as a static site.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

You can deploy to Fleek through the website UI or using Fleek’s CLI (command line interface).

### Platform UI Deployment

[Section titled Platform UI Deployment](#platform-ui-deployment)

1.  Create a [Fleek](https://app.fleek.xyz) account.
    
2.  Push your code to your online Git repository (GitHub).
    
3.  Import your project into Fleek.
    
4.  Fleek will automatically detect Astro and then you can configure the correct settings.
    
5.  Your application is deployed!
    

### Fleek CLI

[Section titled Fleek CLI](#fleek-cli)

1.  Install the Fleek CLI.
    
    Terminal window
    
        # You need to have Nodejs >= 18.18.2npm install -g @fleek-platform/cli
    
2.  Log in to your Fleek account from your terminal.
    
    Terminal window
    
        fleek login
    
3.  Run the build command to generate the static files. By default, these will be located in the `dist/` directory.
    
    Terminal window
    
        npm run build
    
4.  Initialize your project. This will generate a configuration file.
    
    Terminal window
    
        fleek sites init
    
5.  You will be prompted to either create a new Fleek Site or use an existing one. Give the site a name and select the directory where your project is located.
    
6.  Deploy your site.
    
    Terminal window
    
        fleek sites deploy
    

Learn more
----------

[Section titled Learn more](#learn-more)

[Deploy site from Fleek UI](https://fleek.xyz/docs/platform/deployments/)

[Deploy site from Fleek CLI](https://fleek.xyz/docs/cli/hosting/)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/fleek.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Edgio](/en/guides/deploy/edgio/) [Next  
Flightcontrol](/en/guides/deploy/flightcontrol/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)