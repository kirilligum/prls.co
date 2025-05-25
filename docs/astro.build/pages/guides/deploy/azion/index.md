Deploy your Astro Site to Azion
===============================

You can deploy your Astro project on [Azion](https://console.azion.com/), a platform for frontend developers to collaborate and deploy static (JAMstack) and SSR websites.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

To get started, you will need:

*   An [Azion account](https://www.azion.com/). If you don’t have one, you can sign up for a free account.
*   Your app code stored in a [GitHub](https://github.com/) repository.
*   [Azion CLI](https://www.azion.com/en/documentation/products/azion-cli/overview/) installed for faster project setup and deployment.

How to Deploy through Azion Console Dashboard
---------------------------------------------

[Section titled How to Deploy through Azion Console Dashboard](#how-to-deploy-through-azion-console-dashboard)

To start building, follow these steps:

1.  Access [Azion Console](https://console.azion.com).
2.  On the homepage, click the **\+ Create** button.
    *   This opens a modal with the options to create new applications and resources.
3.  Select the **Import from GitHub** option and click the card.
    *   This action opens the settings page.
4.  Connect your Azion account with GitHub.
    *   A pop-up window will appear asking for authorization.
5.  Select the repository you want to import from GitHub.
6.  Configure the build settings:
    *   **Framework preset:** Select the appropriate framework (e.g., `Astro`).
    *   **Root Directory:** This refers to the directory in which your code is located. Your code must be located at the root directory, not a subdirectory. A ./ symbol appears in this field, indicating it’s a root directory.
    *   **Install Command:** the command that compiles your settings to build for production. Build commands are executed through scripts. For example: npm run build or npm install for an NPM package.
7.  Click **Save and Deploy**.
8.  Monitor the deployment using **Azion Real-Time Metrics** and verify your site is live on the edge.

How to Deploy a Static Site Using the Azion CLI
-----------------------------------------------

[Section titled How to Deploy a Static Site Using the Azion CLI](#how-to-deploy-a-static-site-using-the-azion-cli)

1.  **Install the Azion CLI:**
    
    *   Download and install the [Azion CLI](https://www.azion.com/en/documentation/products/azion-cli/overview/) for easier management and deployment.
    
    Caution
    
    The Azion CLI does not currently support native Windows environments. However, you can use it on Windows through the Windows Subsystem for Linux (WSL). Follow the [WSL installation guide](https://docs.microsoft.com/en-us/windows/wsl/install) to set up a Linux environment on your Windows machine.
    
2.  **Authenticate the CLI:**
    
    *   Run the following command to authenticate your CLI with your Azion account.
    
    Terminal window
    
        azion login
    
3.  **Set Up Your Application:**
    
    *   Use the following commands to initialize and configure your project:
    
    Terminal window
    
        azion init
    
4.  **Build Your Astro Project:**
    
    *   Run your build command locally:
    
    Terminal window
    
        azion build
    
5.  **Deploy Your Static Files:**
    
    *   Deploy your static files using the Azion CLI:
    
    Terminal window
    
        azion deploy
    

This guide provides an overview of deploying static applications.

Enabling Local Development Using Azion CLI
------------------------------------------

[Section titled Enabling Local Development Using Azion CLI](#enabling-local-development-using-azion-cli)

For the preview to work, you must execute the following command:

Terminal window

    azion dev

Once you’ve initialized the local development server, the application goes through the `build` process.

Terminal window

    Building your Edge Application. This process may take a few minutesRunning build step command:...

Then, when the build is complete, the access to the application is prompted:

Terminal window

    [Azion Bundler] [Server] › ✔  success   Function running on port http://localhost:3000

Troubleshooting
---------------

[Section titled Troubleshooting](#troubleshooting)

### Node.js runtime APIs

[Section titled Node.js runtime APIs](#nodejs-runtime-apis)

A project using an NPM package fails to build with an error message such as `[Error] Could not resolve "XXXX. The package "XXXX" wasn't found on the file system but is built into node.`:

This means that a package or import you are using is not compatible with Azion’s runtime APIs.

If you are directly importing a Node.js runtime API, please refer to the [Azion Node.js compatibility](https://www.azion.com/en/documentation/products/azion-edge-runtime/compatibility/node/) for further steps on how to resolve this.

If you are importing a package that imports a Node.js runtime API, check with the author of the package to see if they support the `node:*` import syntax. If they do not, you may need to find an alternative package.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/azion.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
AWS](/en/guides/deploy/aws/) [Next  
Buddy](/en/guides/deploy/buddy/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)