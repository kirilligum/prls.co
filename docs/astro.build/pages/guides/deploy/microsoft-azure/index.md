Deploy your Astro Site to Microsoft Azure
=========================================

[Azure](https://azure.microsoft.com/) is a cloud platform from Microsoft. You can deploy your Astro site with Microsoft Azure’s [Static Web Apps](https://aka.ms/staticwebapps) service.

This guide takes you through deploying your Astro site stored in GitHub using Visual Studio Code. Please see Microsoft guides for using an [Azure Pipelines Task](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/azure-static-web-app-v0?view=azure-pipelines) for other setups.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

To follow this guide, you will need:

*   An Azure account and a subscription key. You can create a [free Azure account here](https://azure.microsoft.com/free).
*   Your app code pushed to [GitHub](https://github.com/).
*   The [SWA Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps) in [Visual Studio Code](https://code.visualstudio.com/).

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  Open your project in VS Code.
    
2.  Open the Static Web Apps extension, sign in to Azure, and click the **+** button to create a new Static Web App. You will be prompted to designate which subscription key to use.
    
3.  Follow the wizard started by the extension to give your app a name, choose a framework preset, and designate the app root (usually `/`) and built file location (use `/dist`). Astro is not listed in the built-in templates in Azure so you will need to select `custom`. The wizard will run and will create a [GitHub Action](https://github.com/features/actions) in the `.github` folder of your repo. (This folder will be automatically created if it does not already exist.)
    

The GitHub Action will deploy your app (you can see its progress in your repo’s Actions tab on GitHub). When successfully completed, you can view your app at the address shown in the SWA Extension’s progress window by clicking the **Browse Website** button (this will appear after the GitHub Action has run).

Known Issues
------------

[Section titled Known Issues](#known-issues)

The GitHub action yaml that is created for you assumes the use of node 14. This means the Astro build fails. To resolve this update your projects package.json file with this snippet.

      "engines": {    "node": ">=18.0.0"  },

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   [Microsoft Azure Static Web Apps documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [Deploying an Astro Website to Azure Static Web Apps](https://www.blueboxes.co.uk/deploying-an-astro-website-to-azure-static-web-apps)
*   [Deploying a Static Astro Site to Azure Static Web Apps using GitHub Actions](https://agramont.net/blog/create-static-site-astro-azure-ssg/#automate-deployment-with-github-actions)
*   [Astro site deployment to Azure Static Web Apps with the CLI from GitHub Actions](https://www.eliostruyf.com/deploy-astro-azure-static-web-apps-github-cli/)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/microsoft-azure.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Kinsta](/en/guides/deploy/kinsta/) [Next  
Netlify](/en/guides/deploy/netlify/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)