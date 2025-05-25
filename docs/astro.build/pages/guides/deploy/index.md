# Aggregated from ./pages/guides/deploy/aws
Deploy your Astro Site to AWS
=============================

[AWS](https://aws.amazon.com/) is a full-featured web app hosting platform that can be used to deploy an Astro site.

Deploying your project to AWS requires using the [AWS console](https://aws.amazon.com/console/). (Most of these actions can also be done using the [AWS CLI](https://aws.amazon.com/cli/)). This guide will walk you through the steps to deploy your site to AWS using [AWS Amplify](https://aws.amazon.com/amplify/), [S3 static website hosting](https://aws.amazon.com/s3/), and [CloudFront](https://aws.amazon.com/cloudfront/).

AWS Amplify
-----------

[Section titled AWS Amplify](#aws-amplify)

AWS Amplify is a set of purpose-built tools and features that lets frontend web and mobile developers quickly and easily build full-stack applications on AWS. You can either deploy your Astro project as a static site, or as a server-rendered site.

### Static Site

[Section titled Static Site](#static-site)

Your Astro project is a static site by default.

1.  Create a new Amplify Hosting project.
    
2.  Connect your repository to Amplify.
    
3.  Modify your build settings to match your project’s build process.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3107)
    *   [pnpm](#tab-panel-3108)
    *   [Yarn](#tab-panel-3109)
    
        version: 1frontend:  phases:    preBuild:      commands:        - npm ci    build:      commands:        - npm run build  artifacts:    baseDirectory: /dist    files:      - '**/*'  cache:    paths:      - node_modules/**/*
    
        version: 1frontend:  phases:    preBuild:      commands:        - npm i -g pnpm        - pnpm config set store-dir .pnpm-store        - pnpm i    build:      commands:        - pnpm run build  artifacts:    baseDirectory: /dist    files:      - '**/*'  cache:    paths:      - .pnpm-store/**/*
    
        version: 1frontend:  phases:    preBuild:      commands:        - yarn install    build:      commands:        - yarn build  artifacts:    baseDirectory: /dist    files:      - '**/*'  cache:    paths:      - node_modules/**/*
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Amplify will automatically deploy your website and update it when you push a commit to your repository.

### Adapter for on-demand rendering

[Section titled Adapter for on-demand rendering](#adapter-for-on-demand-rendering)

In order to deploy your project as a server-rendered site, you will need to use the third-party, [community-maintained AWS Amplify adapter](https://github.com/alexnguyennz/astro-aws-amplify) and make some changes to your config.

First, install the Amplify adapter.

*   [npm](#tab-panel-3110)
*   [pnpm](#tab-panel-3111)
*   [Yarn](#tab-panel-3112)

Terminal window

    npm install astro-aws-amplify

Terminal window

    pnpm add astro-aws-amplify

Terminal window

    yarn add astro-aws-amplify

Then, in your `astro.config.*` file, add the adapter and set the output to `server`.

astro.config.mjs

    import { defineConfig } from 'astro/config';import awsAmplify from 'astro-aws-amplify';
    export default defineConfig({  // ...  output: "server",  adapter: awsAmplify(),});

Once the adapter has been installed, you can set up your Amplify project.

1.  Create a new Amplify Hosting project.
    
2.  Connect your repository to Amplify.
    
3.  Modify your build settings to match the adapter’s build process by either editing the build settings in the AWS console, or by adding an `amplify.yaml` in the root of your project.
    
    *   [npm](#tab-panel-3113)
    *   [pnpm](#tab-panel-3114)
    *   [Yarn](#tab-panel-3115)
    
        version: 1frontend:  phases:    preBuild:      commands:        - npm ci --cache .npm --prefer-offline    build:      commands:        - npm run build        - mv node_modules ./.amplify-hosting/compute/default  artifacts:    baseDirectory: .amplify-hosting    files:      - '**/*'  cache:    paths:      - .npm/**/*
    
        version: 1frontend:  phases:    preBuild:      commands:        - npm i -g pnpm        - pnpm config set store-dir .pnpm-store        - pnpm i    build:      commands:        - pnpm run build        - mv node_modules ./.amplify-hosting/compute/default  artifacts:    baseDirectory: .amplify-hosting    files:      - '**/*'  cache:    paths:      - .pnpm-store/**/*
    
        version: 1frontend:  phases:    preBuild:      commands:        - yarn install    build:      commands:        - yarn build        - mv node_modules ./.amplify-hosting/compute/default  artifacts:    baseDirectory: .amplify-hosting    files:      - '**/*'  cache:    paths:      - node_modules/**/*
    

Amplify will automatically deploy your website and update it when you push a commit to your repository.

See [AWS’s Astro deployment guide](https://docs.aws.amazon.com/amplify/latest/userguide/get-started-astro.html) for more info.

S3 static website hosting
-------------------------

[Section titled S3 static website hosting](#s3-static-website-hosting)

S3 is the starting point of any application. It is where your project files and other assets are stored. S3 charges for file storage and number of requests. You can find more information about S3 in the [AWS documentation](https://aws.amazon.com/s3/).

1.  Create an S3 bucket with your project’s name.
    
    Tip
    
    The bucket name should be globally unique. We recommend a combination of your project name and the domain name of your site.
    
2.  Disable **“Block all public access”**. By default, AWS sets all buckets to be private. To make it public, you need to uncheck the “Block public access” checkbox in the bucket’s properties.
    
3.  Upload your built files located in `dist` to S3. You can do this manually in the console or use the AWS CLI. If you use the AWS CLI, use the following command after [authenticating with your AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html):
    
        aws s3 cp dist/ s3://<BUCKET_NAME>/ --recursive
    
4.  Update your bucket policy to allow public access. You can find this setting in the bucket’s **Permissions > Bucket policy**.
    
        {  "Version": "2012-10-17",  "Statement": [    {      "Sid": "PublicReadGetObject",      "Effect": "Allow",      "Principal": "*",      "Action": "s3:GetObject",      "Resource": "arn:aws:s3:::<BUCKET_NAME>/*"    }  ]}
    
    Caution
    
    Do not forget to replace `<BUCKET_NAME>` with the name of your bucket.
    
5.  Enable website hosting for your bucket. You can find this setting in the bucket’s **Properties > Static website hosting**. Set your index document to `index.html` and your error document to `404.html`. Finally, you can find your new website URL in the bucket’s **Properties > Static website hosting**.
    
    Note
    
    If you are deploying a single-page application (SPA), set your error document to `index.html`.
    

S3 with CloudFront
------------------

[Section titled S3 with CloudFront](#s3-with-cloudfront)

CloudFront is a web service that provides content delivery network (CDN) capabilities. It is used to cache content of a web server and distribute it to end users. CloudFront charges for the amount of data transferred. Adding CloudFront to your S3 bucket is more cost-effective and provides a faster delivery.

To connect S3 with CloudFront, create a CloudFront distribution with the following values:

*   **Origin domain:** Your S3 bucket static website endpoint. You can find your endpoint in your S3 bucket’s **Properties > Static website hosting**. Alternative, you can select your s3 bucket and click on the callout to replace your bucket address with your bucket static endpoint.
*   **Viewer protocol policy:** “Redirect to HTTPS”

This configuration will serve your site using the CloudFront CDN network. You can find your CloudFront distribution URL in the bucket’s **Distributions > Domain name**.

Note

When connecting CloudFront to an S3 static website endpoint, you rely on S3 bucket policies for access control. See [S3 static website hosting](#s3-static-website-hosting) section for more information about bucket policies.

Continuous deployment with GitHub Actions
-----------------------------------------

[Section titled Continuous deployment with GitHub Actions](#continuous-deployment-with-github-actions)

There are many ways to set up continuous deployment for AWS. One possibility for code hosted on GitHub is to use [GitHub Actions](https://github.com/features/actions) to deploy your website every time you push a commit.

1.  Create a new policy in your AWS account using [IAM](https://aws.amazon.com/iam/) with the following permissions. This policy will allow you to upload built files to your S3 bucket and invalidate the CloudFront distribution files when you push a commit.
    
        {  "Version": "2012-10-17",  "Statement": [      {          "Sid": "VisualEditor0",          "Effect": "Allow",          "Action": [              "s3:PutObject",              "s3:ListBucket",              "s3:DeleteObject",              "cloudfront:CreateInvalidation"          ],          "Resource": [              "<DISTRIBUTION_ARN>",              "arn:aws:s3:::<BUCKET_NAME>/*",              "arn:aws:s3:::<BUCKET_NAME>"          ]      }  ]}
    
    Caution
    
    Do not forget to replace `<DISTRIBUTION_ARN>` and `<BUCKET_NAME>`. You can find the DISTRIBUTION\_ARN in **CloudFront > Distributions > Details**.
    
2.  Create a new IAM user and attach the policy to the user. This will provide your `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID`.
    
3.  Add this sample workflow to your repository at `.github/workflows/deploy.yml` and push it to GitHub. You will need to add `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `BUCKET_ID`, and `DISTRIBUTION_ID` as “secrets” to your repository on GitHub under **Settings** > **Secrets** > **Actions**. Click New repository secret to add each one.
    
        name: Deploy Website
        on:  push:    branches:      - main
        jobs:  deploy:    runs-on: ubuntu-latest    steps:      - name: Checkout        uses: actions/checkout@v4      - name: Configure AWS Credentials        uses: aws-actions/configure-aws-credentials@v1        with:          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}          aws-region: us-east-1      - name: Install modules        run: npm ci      - name: Build application        run: npm run build      - name: Deploy to S3        run: aws s3 sync --delete ./dist/ s3://${{ secrets.BUCKET_ID }}      - name: Create CloudFront invalidation        run: aws cloudfront create-invalidation --distribution-id ${{ secrets.DISTRIBUTION_ID }} --paths "/*"
    
    Note
    
    Your `BUCKET_ID` is the name of your S3 bucket. Your `DISTRIBUTION_ID` is your CloudFront distribution ID. You can find your CloudFront distribution ID in **CloudFront > Distributions > ID**
    

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [Deploy Astro to AWS Amplify](https://www.launchfa.st/blog/deploy-astro-aws-amplify)
*   [Deploy Astro to AWS Elastic Beanstalk](https://www.launchfa.st/blog/deploy-astro-aws-elastic-beanstalk)
*   [Deploy Astro to Amazon ECS on AWS Fargate](https://www.launchfa.st/blog/deploy-astro-aws-fargate)
*   [Troubleshooting SSR Amplify Deployments](https://docs.aws.amazon.com/amplify/latest/userguide/troubleshooting-ssr-deployment.html)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/aws.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Deployment overview](/en/guides/deploy/) [Next  
Azion](/en/guides/deploy/azion/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/azion
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

# Aggregated from ./pages/guides/deploy/buddy
Deploy your Astro Site with Buddy
=================================

You can deploy your Astro project using [Buddy](https://buddy.works/), a CI/CD solution that can build your site and push it to many different deploy targets including FTP servers and cloud hosting providers.

Note

Buddy itself will not host your site. Instead, it helps you manage the build process and deliver the result to a deploy platform of your choice.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  [Create a **Buddy** account](https://buddy.works/sign-up).
    
2.  Create a new project and connect it with a git repository (GitHub, GitLab, BitBucket, any private Git Repository or you can use Buddy Git Hosting).
    
3.  Add a new pipeline.
    
4.  In the newly created pipeline add a **[Node.js](https://buddy.works/actions/node-js)** action.
    
5.  In this action add:
    
    Terminal window
    
        npm installnpm run build
    
6.  Add a deployment action — there are many to choose from, you can browse them in [Buddy’s actions catalog](https://buddy.works/actions). Although their settings can differ, remember to set the **Source path** to `dist`.
    
7.  Press the **Run** button.
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/buddy.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Azion](/en/guides/deploy/azion/) [Next  
Cleavr](/en/guides/deploy/cleavr/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/cleavr
Deploy your Astro Site with Cleavr
==================================

You can deploy your Astro project to your own Virtual Private Server (VPS) using [Cleavr](https://cleavr.io/), a server and app deployment management tool.

Tip

Check out [the Astro guide in Cleavr’s docs](https://docs.cleavr.io/guides/astro)!

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

To get started, you will need:

*   A Cleavr account
*   A server on your VPS provider using Cleavr

Add your site
-------------

[Section titled Add your site](#add-your-site)

1.  In Cleavr, navigate to the server you want to add your Astro project to.
    
2.  Select **Add Site** and fill in the details for your application, such as domain name.
    
3.  For **App Type**, select ‘NodeJS Static’ or ‘NodeJS SSR’ according to how you are setting up your Astro app.
    
4.  For Static apps, set **Artifact Folder** to `dist`.
    
5.  For SSR apps:
    
    *   Set **Entry Point** to `entry.mjs`.
    *   Set **Artifact Folder** to `dist/server`.
6.  Select **Add** to add the site to your server.
    

Setup and deploy
----------------

[Section titled Setup and deploy](#setup-and-deploy)

1.  Once your new site is added, click **Setup and deploy**.
    
2.  Select the **VC Profile**, **Repo**, and **Branch** for your Astro Project.
    
3.  Make any additional configurations necessary for your project.
    
4.  Click on the **Deployments** tab and then click on **Deploy**.
    

Congratulations, you’ve just deployed your Astro app!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/cleavr.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Buddy](/en/guides/deploy/buddy/) [Next  
Clever Cloud](/en/guides/deploy/clever-cloud/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/clever-cloud
Deploy your Astro Site to Clever Cloud
======================================

[Clever Cloud](https://clever-cloud.com) is a European cloud platform that provides automated, scalable services.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

You can deploy both fully static and on-demand rendered Astro projects on Clever Cloud. Regardless of your `output` mode (pre-rendered or [on-demand](/en/guides/on-demand-rendering/)), you can choose to deploy as a **static application** which runs using a post-build hook, or as a **Node.js** application, which requires some manual configuration in your `package.json`.

### Scripts

[Section titled Scripts](#scripts)

If you’re running an on-demand Node.js application, update your `start` script to run the Node server. Applications on Clever Cloud listen on port **8080**.

package.json

    "scripts": {  "start": "node ./dist/server/entry.mjs --host 0.0.0.0 --port 8080",}

Deploy Astro from the Console
-----------------------------

[Section titled Deploy Astro from the Console](#deploy-astro-from-the-console)

To deploy your Astro project to Clever Cloud, you will need to **create a new application**. The application wizard will walk you through the necessary configuration steps.

1.  From the lateral menubar, click **Create** > **An application**
    
2.  Choose how to deploy:
    
    *   **Create a brand new app**: to deploy from a local repository with Git
    
    or
    
    *   **Select a GitHub repository**: to deploy from GitHub
3.  Select a **Node.js** application, or a **static** one.
    
4.  Set up the minimal size for your instance and scalability options. Astro sites can typically be deployed using the **Nano** instance. Depending on your project’s specifications and dependencies, you may need to adjust accordingly as you watch the metrics from the **Overview** page.
    
5.  Select a **region** to deploy your instance.
    
6.  Skip [connecting **Add-ons** to your Clever application](https://www.clever-cloud.com/developers/doc/addons/) unless you’re using a database or Keycloak.
    
7.  Inject **environment variables**:
    
    *   For **Node.js**, no specific environment variable is needed to deploy Astro if you’re using **npm**. If you’re using **yarn** or **pnpm**, set the following environment variables:
    
    *   [pnpm](#tab-panel-3141)
    *   [yarn](#tab-panel-3142)
    
    Terminal window
    
        CC_NODE_BUILD_TOOL="custom"CC_PRE_BUILD_HOOK="npm install -g pnpm && pnpm install"CC_CUSTOM_BUILD_TOOL="pnpm run astro telemetry disable && pnpm build"
    
    Terminal window
    
        CC_NODE_BUILD_TOOL="yarn"CC_PRE_BUILD_HOOK="yarn && yarn run astro telemetry disable && yarn build"
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
    
    *   For a **static** application, add these variables:
    
    *   [npm](#tab-panel-3143)
    *   [pnpm](#tab-panel-3144)
    *   [yarn](#tab-panel-3145)
    
    Terminal window
    
        CC_POST_BUILD_HOOK="npm run build"CC_PRE_BUILD_HOOK="npm install && npm run astro telemetry disable"CC_WEBROOT="/dist"
    
    Terminal window
    
        CC_POST_BUILD_HOOK="pnpm build"CC_PRE_BUILD_HOOK="npm install -g pnpm && pnpm install && pnpm run astro telemetry disable"CC_WEBROOT="/dist"
    
    Terminal window
    
        CC_POST_BUILD_HOOK="yarn build"CC_PRE_BUILD_HOOK="yarn && yarn run astro telemetry disable"CC_WEBROOT="/dist"
    
8.  **Deploy!** If you’re deploying from **GitHub**, your deployment should start automatically. If you’re using **Git**, copy the remote and push on the **master** branch.
    

Other Branches

To deploy from branches other than `master`, use `git push clever <branch>:master`.

For example, if you want to deploy your local `main` branch without renaming it, use `git push clever main:master`.

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   [Clever Cloud documentation for deploying a Node.js application](https://www.clever-cloud.com/developers/doc/applications/javascript/nodejs/)
*   [Clever Cloud documentation for deploying Astro as a static application](https://www.clever-cloud.com/developers/guides/astro/)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/clever-cloud.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Cleavr](/en/guides/deploy/cleavr/) [Next  
Cloudflare](/en/guides/deploy/cloudflare/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/cloudflare
Deploy your Astro Site to Cloudflare
====================================

You can deploy full-stack applications, including front-end static assets and back-end APIs, as well as on-demand rendered sites, to both [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) and [Cloudflare Pages](https://pages.cloudflare.com/).

This guide includes:

*   [How to deploy to Cloudflare Workers](#cloudflare-workers)
*   [How to deploy to Cloudflare Pages](#cloudflare-pages)

Note

Cloudflare recommends using Cloudflare Workers for new projects. For existing Pages projects, refer to [Cloudflare’s migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) and [compatibility matrix](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/#compatibility-matrix).

Read more about [using the Cloudflare runtime](/en/guides/integrations-guide/cloudflare/) in your Astro project.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

To get started, you will need:

*   A Cloudflare account. If you don’t already have one, you can create a free Cloudflare account during the process.

Cloudflare Workers
------------------

[Section titled Cloudflare Workers](#cloudflare-workers)

### How to deploy with Wrangler

[Section titled How to deploy with Wrangler](#how-to-deploy-with-wrangler)

1.  Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/).
    
    Terminal window
    
        npm install wrangler@latest --save-dev
    
2.  If your site uses on demand rendering, install the [`@astrojs/cloudflare` adapter](/en/guides/integrations-guide/cloudflare/).
    
    This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.
    
    Terminal window
    
        npx astro add cloudflare
    
    Then, create a `.assetsignore` file in your `public/` folder, and add the following lines to it:
    
    public/.assetsignore
    
        _worker.js_routes.json
    
    Read more about [on-demand rendering in Astro](/en/guides/on-demand-rendering/).
    
3.  Create a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [Static](#tab-panel-3116)
    *   [On demand](#tab-panel-3117)
    
    wrangler.jsonc
    
        {  "$schema": "node_modules/wrangler/config-schema.json",  "name": "my-astro-app",  // Update to today's date  "compatibility_date": "2025-03-25",  "assets": {    "directory": "./dist"  }}
    
    wrangler.jsonc
    
        {  "$schema": "node_modules/wrangler/config-schema.json",  "name": "my-astro-app",  "main": "./dist/_worker.js/index.js",  // Update to today's date  "compatibility_date": "2025-03-25",  "compatibility_flags": ["nodejs_compat"],  "assets": {    "binding": "ASSETS",    "directory": "./dist"  },  "observability": {    "enabled": true  }}
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
4.  Preview your project locally with Wrangler.
    
    Terminal window
    
        npx astro build && npx wrangler dev
    
5.  Deploy using `npx wrangler deploy`.
    
    Terminal window
    
        npx astro build && npx wrangler deploy
    

After your assets are uploaded, Wrangler will give you a preview URL to inspect your site.

Read more about using [Cloudflare runtime APIs](/en/guides/integrations-guide/cloudflare/) such as bindings.

### How to deploy with CI/CD

[Section titled How to deploy with CI/CD](#how-to-deploy-with-cicd)

You can also use a CI/CD system such as [Workers Builds (BETA)](https://developers.cloudflare.com/workers/ci-cd/builds/) to automatically build and deploy your site on push.

If you’re using Workers Builds:

1.  Follow Steps 1-3 from the Wrangler section above.
    
2.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to `Workers & Pages`. Select `Create`.
    
3.  Under `Import a repository`, select a Git account and then the repository containing your Astro project.
    
4.  Configure your project with:
    
    *   Build command: `npx astro build`
    *   Deploy command: `npx wrangler deploy`
5.  Click `Save and Deploy`. You can now preview your Worker at its provided `workers.dev` subdomain.
    

Cloudflare Pages
----------------

[Section titled Cloudflare Pages](#cloudflare-pages)

### How to deploy with Wrangler

[Section titled How to deploy with Wrangler](#how-to-deploy-with-wrangler-1)

1.  Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/).
    
    Terminal window
    
        npm install wrangler@latest --save-dev
    
2.  If your site uses on demand rendering, install the [`@astrojs/cloudflare` adapter](/en/guides/integrations-guide/cloudflare/).
    
    This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.
    
    Terminal window
    
        npx astro add cloudflare
    
    Read more about [on demand rendering in Astro](/en/guides/on-demand-rendering/).
    
3.  Preview your project locally with Wrangler.
    
    Terminal window
    
        npx astro build && npx wrangler pages dev ./dist
    
4.  Deploy using `npx wrangler deploy`.
    
    Terminal window
    
        npx astro build && npx wrangler pages deploy ./dist
    

After your assets are uploaded, Wrangler will give you a preview URL to inspect your site.

### How to deploy a site with Git

[Section titled How to deploy a site with Git](#how-to-deploy-a-site-with-git)

1.  Push your code to your git repository (e.g. GitHub, GitLab).
    
2.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to **Compute (Workers) > Workers & Pages**. Select **Create** and then select the **Pages** tab. Connect your git repository.
    
3.  Configure your project with:
    
    *   **Framework preset**: `Astro`
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`
    *   **Environment variables:** Set the `NODE_VERSION` variable to `20` or `22`. By default, Cloudflare Pages builds sites using Node.js `v18.17.1`, which is not compatible with the latest version of Astro.
4.  Click the **Save and Deploy** button.
    

Troubleshooting
---------------

[Section titled Troubleshooting](#troubleshooting)

### Client-side hydration

[Section titled Client-side hydration](#client-side-hydration)

Client-side hydration may fail as a result of Cloudflare’s Auto Minify setting. If you see `Hydration completed but contains mismatches` in the console, make sure to disable Auto Minify under Cloudflare settings.

### Node.js runtime APIs

[Section titled Node.js runtime APIs](#nodejs-runtime-apis)

If you are building a project that is using on-demand rendering with [the Cloudflare adapter](/en/guides/integrations-guide/cloudflare/) and the server fails to build with an error message such as `[Error] Could not resolve "XXXX. The package "XXXX" wasn't found on the file system but is built into node.`:

*   This means that a package or import you are using in the server-side environment is not compatible with the [Cloudflare runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).
    
*   If you are directly importing a Node.js runtime API, please refer to the Astro documentation on Cloudflare’s [Node.js compatibility](/en/guides/integrations-guide/cloudflare/#nodejs-compatibility) for further steps on how to resolve this.
    
*   If you are importing a package that imports a Node.js runtime API, check with the author of the package to see if they support the `node:*` import syntax. If they do not, you may need to find an alternative package.
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/cloudflare.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Clever Cloud](/en/guides/deploy/clever-cloud/) [Next  
Deno](/en/guides/deploy/deno/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/deno
Deploy your Astro Site with Deno
================================

You can deploy a static or on-demand rendered Astro site using Deno, either on your own server, or to [Deno Deploy](https://deno.com/deploy), a distributed system that runs JavaScript, TypeScript, and WebAssembly at the edge, worldwide.

This guide includes instructions for running your Astro site on your own server with Deno, and deploying to Deno Deploy through GitHub Actions or the Deno Deploy CLI.

Requirements
------------

[Section titled Requirements](#requirements)

This guide assumes you already have [Deno](https://deno.com/) installed.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

Your Astro project can be deployed as a static site, or as an on-demand rendered site.

### Static Site

[Section titled Static Site](#static-site)

Your Astro project is a static site by default. You don’t need any extra configuration to deploy a static Astro site with Deno, or to Deno Deploy.

### Adapter for on-demand rendering

[Section titled Adapter for on-demand rendering](#adapter-for-on-demand-rendering)

To enable on-demand rendering in your Astro project using Deno, and to deploy on Deno Deploy:

1.  Install [the `@deno/astro-adapter` adapter](https://github.com/denoland/deno-astro-adapter) to your project’s dependencies using your preferred package manager:
    
    *   [npm](#tab-panel-3126)
    *   [pnpm](#tab-panel-3127)
    *   [Yarn](#tab-panel-3128)
    
    Terminal window
    
        npm install @deno/astro-adapter
    
    Terminal window
    
        pnpm install @deno/astro-adapter
    
    Terminal window
    
        yarn add @deno/astro-adapter
    
2.  Update your `astro.config.mjs` project configuration file with the changes below.
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';import deno from '@deno/astro-adapter';
        export default defineConfig({  output: 'server',  adapter: deno(),});
    
3.  Update your `preview` script in `package.json` with the change below.
    
    package.json
    
        {  // ...  "scripts": {    "dev": "astro dev",    "start": "astro dev",    "build": "astro build",    "preview": "astro preview"    "preview": "deno run --allow-net --allow-read --allow-env ./dist/server/entry.mjs"  }}
    
    You can now use this command to preview your production Astro site locally with Deno.
    
    *   [npm](#tab-panel-3129)
    *   [pnpm](#tab-panel-3130)
    *   [Yarn](#tab-panel-3131)
    
    Terminal window
    
        npm run preview
    
    Terminal window
    
        pnpm run preview
    
    Terminal window
    
        yarn run preview
    

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

You can run your Astro site on your own server, or deploy to Deno Deploy through GitHub Actions or using Deno Deploy’s CLI (command line interface).

### On your own server

[Section titled On your own server](#on-your-own-server)

1.  Copy your project onto your server.
    
2.  Install the project dependencies using your preferred package manager:
    
    *   [npm](#tab-panel-3132)
    *   [pnpm](#tab-panel-3133)
    *   [Yarn](#tab-panel-3134)
    
    Terminal window
    
        npm install
    
    Terminal window
    
        pnpm install
    
    Terminal window
    
        yarn
    
3.  Build your Astro site with your preferred package manager:
    
    *   [npm](#tab-panel-3135)
    *   [pnpm](#tab-panel-3136)
    *   [Yarn](#tab-panel-3137)
    
    Terminal window
    
        npm run build
    
    Terminal window
    
        pnpm run build
    
    Terminal window
    
        yarn run build
    
4.  Start your application with the following command:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [Static](#tab-panel-3118)
    *   [On demand](#tab-panel-3119)
    
    Terminal window
    
        deno run -A jsr:@std/http/file-server dist
    
    Terminal window
    
        deno run -A ./dist/server/entry.mjs
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### GitHub Actions Deployment

[Section titled GitHub Actions Deployment](#github-actions-deployment)

If your project is stored on GitHub, the [Deno Deploy website](https://dash.deno.com/) will guide you through setting up GitHub Actions to deploy your Astro site.

1.  Push your code to a public or private GitHub repository.
    
2.  Sign in on [Deno Deploy](https://dash.deno.com/) with your GitHub account, and click on [New Project](https://dash.deno.com).
    
3.  Select your repository, the branch you want to deploy from, and select **GitHub Action** mode. (Your Astro site requires a build step, and cannot use Automatic mode.)
    
4.  In your Astro project, create a new file at `.github/workflows/deploy.yml` and paste in the YAML below. This is similar to the YAML given by Deno Deploy, with the additional steps needed for your Astro site.
    
    *   [Static](#tab-panel-3120)
    *   [On demand](#tab-panel-3121)
    
    .github/workflows/deploy.yml
    
        name: Deployon: [push]
        jobs:  deploy:    name: Deploy    runs-on: ubuntu-latest    permissions:      id-token: write # Needed for auth with Deno Deploy      contents: read # Needed to clone the repository
            steps:      - name: Clone repository        uses: actions/checkout@v4
              # Not using npm? Change `npm ci` to `yarn install` or `pnpm i`      - name: Install dependencies        run: npm ci
              # Not using npm? Change `npm run build` to `yarn build` or `pnpm run build`      - name: Build Astro        run: npm run build
              - name: Upload to Deno Deploy        uses: denoland/deployctl@v1        with:          project: my-deno-project # TODO: replace with Deno Deploy project name          entrypoint: jsr:@std/http/file-server          root: dist
    
    .github/workflows/deploy.yml
    
        name: Deployon: [push]
        jobs:  deploy:    name: Deploy    runs-on: ubuntu-latest    permissions:      id-token: write # Needed for auth with Deno Deploy      contents: read # Needed to clone the repository
            steps:      - name: Clone repository        uses: actions/checkout@v4
              # Not using npm? Change `npm ci` to `yarn install` or `pnpm i`      - name: Install dependencies        run: npm ci
              # Not using npm? Change `npm run build` to `yarn build` or `pnpm run build`      - name: Build Astro        run: npm run build
              - name: Upload to Deno Deploy        uses: denoland/deployctl@v1        with:          project: my-deno-project # TODO: replace with Deno Deploy project name          entrypoint: dist/server/entry.mjs
    
5.  After committing this YAML file, and pushing to GitHub on your configured deploy branch, the deploy should begin automatically!
    
    You can track the progress using the “Actions” tab on your GitHub repository page, or on [Deno Deploy](https://dash.deno.com).
    

### CLI Deployment

[Section titled CLI Deployment](#cli-deployment)

1.  Install the [Deno Deploy CLI](https://docs.deno.com/deploy/manual/deployctl).
    
    Terminal window
    
        deno install -gArf jsr:@deno/deployctl
    
2.  Build your Astro site with your preferred package manager:
    
    *   [npm](#tab-panel-3138)
    *   [pnpm](#tab-panel-3139)
    *   [Yarn](#tab-panel-3140)
    
    Terminal window
    
        npm run build
    
    Terminal window
    
        pnpm run build
    
    Terminal window
    
        yarn run build
    
3.  Run `deployctl` to deploy!
    
    *   [Static](#tab-panel-3122)
    *   [On demand](#tab-panel-3123)
    
    Terminal window
    
        cd dist && deployctl deploy jsr:@std/http/file-server
    
    Terminal window
    
        deployctl deploy ./dist/server/entry.mjs
    
    You can track all your deploys on [Deno Deploy](https://dash.deno.com).
    
4.  (Optional) To simplify the build and deploy into one command, add a `deploy-deno` script in `package.json`.
    
    *   [Static](#tab-panel-3124)
    *   [On demand](#tab-panel-3125)
    
    package.json
    
        {  // ...  "scripts": {  "dev": "astro dev",  "start": "astro dev",  "build": "astro build",  "preview": "astro preview",  "deno-deploy": "npm run build && cd dist && deployctl deploy jsr:@std/http/file-server"  }}
    
    package.json
    
        {  // ...  "scripts": {    "dev": "astro dev",    "start": "astro dev",    "build": "astro build",    "preview": "deno run --allow-net --allow-read --allow-env ./dist/server/entry.mjs",    "deno-deploy": "npm run build && deployctl deploy ./dist/server/entry.mjs"  }}
    
    Then you can use this command to build and deploy your Astro site in one step.
    
    Terminal window
    
        npm run deno-deploy
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/deno.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Cloudflare](/en/guides/deploy/cloudflare/) [Next  
Edgio](/en/guides/deploy/edgio/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/edgio
Deploy your Astro Site to Edgio
===============================

You can deploy your Astro project to [Edgio](https://www.edg.io/), an edge and CDN platform to deploy, protect and accelerate websites and APIs.

Tip

Check out [the Astro guide in Edgio’s docs](https://docs.edg.io/guides/astro)!

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  Install [the Edgio CLI](https://docs.edg.io/guides/cli) globally from the Terminal, if you haven’t already.
    
    Terminal window
    
        npm install -g @edgio/cli
    
2.  Add Edgio to your Astro site
    
    Terminal window
    
        edgio init
    
3.  (Optional) Enable Server Side Rendering
    
    After you’ve set up [@astrojs/node with Astro](/en/guides/integrations-guide/node/), specify the server file path in `edgio.config.js` as below:
    
    edgio.config.js
    
        import { join } from 'path'
        module.exports = {  astro: {    // The path of the standalone server that runs Astro SSR.    // The dependencies for this file are automatically bundled.    appPath: join(process.cwd(), 'dist', 'server', 'entry.mjs'),  },};
    
4.  Deploy to Edgio
    
    Terminal window
    
        edgio deploy
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/edgio.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Deno](/en/guides/deploy/deno/) [Next  
Fleek](/en/guides/deploy/fleek/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/fleek
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

# Aggregated from ./pages/guides/deploy/flightcontrol
Deploy your Astro Site to AWS with Flightcontrol
================================================

You can deploy an Astro site using [Flightcontrol](https://www.flightcontrol.dev?ref=astro), which provides fully-automated deployments to your AWS account.

Supports both static and SSR Astro sites.

How to Deploy
-------------

[Section titled How to Deploy](#how-to-deploy)

1.  Create a Flightcontrol account at [app.flightcontrol.dev/signup](https://app.flightcontrol.dev/signup?ref=astro)
    
2.  Go to [app.flightcontrol.dev/projects/new/1](https://app.flightcontrol.dev/projects/new/1)
    
3.  Connect your GitHub account and select your repo
    
4.  Select your desired “Config Type”:
    
    *   `GUI` (all config managed through Flightcontrol dashboard) where you will select the `Astro Static` or `Astro SSR` preset
    *   `flightcontrol.json` (“infrastructure as code” option where all config is in your repo) where you will select an Astro example config, then add it to your codebase as `flightcontrol.json`
5.  Adjust any configuration as needed
    
6.  Click “Create Project” and complete any required steps (like linking your AWS account).
    

### SSR Setup

[Section titled SSR Setup](#ssr-setup)

To deploy with SSR support, make sure you first set up the [`@astrojs/node`](/en/guides/integrations-guide/node/) adapter. Then, follow the steps above, choosing the appropriate configurations for Astro SSR.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/flightcontrol.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Fleek](/en/guides/deploy/fleek/) [Next  
Fly.io](/en/guides/deploy/flyio/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/flyio
Deploy your Astro Site to Fly.io
================================

You can deploy your Astro project to [Fly.io](https://fly.io/), a platform for running full stack apps and databases close to your users.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

Your Astro project can be deployed to Fly.io as a static site, or as a server-side rendered site (SSR).

### Static Site

[Section titled Static Site](#static-site)

Your Astro project is a static site by default. You don’t need any extra configuration to deploy a static Astro site to Fly.io.

### Adapter for SSR

[Section titled Adapter for SSR](#adapter-for-ssr)

To enable on-demand rendering in your Astro project and deploy on Fly.io, add [the Node.js adapter](/en/guides/integrations-guide/node/).

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  [Sign up for Fly.io](https://fly.io/docs/getting-started/log-in-to-fly/#first-time-or-no-fly-account-sign-up-for-fly) if you haven’t already.
    
2.  [Install `flyctl`](https://fly.io/docs/hands-on/install-flyctl/), your Fly.io app command center.
    
3.  Run the following command in your terminal.
    
    Terminal window
    
        fly launch
    
    `flyctl` will automatically detect Astro, configure the correct settings, build your image, and deploy it to the Fly.io platform.
    

Generating your Astro Dockerfile
--------------------------------

[Section titled Generating your Astro Dockerfile](#generating-your-astro-dockerfile)

If you don’t already have a Dockerfile, `fly launch` will generate one for you, as well as prepare a `fly.toml` file. For pages rendered on demand, this Dockerfile will include the appropriate start command and environment variables.

You can instead create your own Dockerfile using [Dockerfile generator](https://www.npmjs.com/package/@flydotio/dockerfile) and then run using the command `npx dockerfile` for Node applications or `bunx dockerfile` for Bun applications.

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   Check out [the official Fly.io docs](https://fly.io/docs/js/frameworks/astro/)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/flyio.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Flightcontrol](/en/guides/deploy/flightcontrol/) [Next  
GitHub Pages](/en/guides/deploy/github/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/github
Deploy your Astro Site to GitHub Pages
======================================

You can use [GitHub Pages](https://pages.github.com/) to host an Astro website directly from a repository on [GitHub.com](https://github.com/).

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

You can deploy an Astro site to GitHub Pages by using [GitHub Actions](https://github.com/features/actions) to automatically build and deploy your site. To do this, your source code must be hosted on GitHub.

Astro maintains the official `withastro/action` to deploy your project with very little configuration. Follow the instructions below to deploy your Astro site to GitHub pages, and see [the package README](https://github.com/withastro/action) if you need more information.

Configure Astro for GitHub Pages
--------------------------------

[Section titled Configure Astro for GitHub Pages](#configure-astro-for-github-pages)

### Deploying to a `github.io` URL

[Section titled Deploying to a github.io URL](#deploying-to-a-githubio-url)

Set the [`site`](/en/reference/configuration-reference/#site) and [`base`](/en/reference/configuration-reference/#base) options in `astro.config.mjs`.

astro.config.mjs

    import { defineConfig } from 'astro/config'
    export default defineConfig({  site: 'https://astronaut.github.io',  base: 'my-repo',})

#### `site`

[Section titled site](#site)

The value for `site` must be one of the following:

*   The following URL based on your username: `https://<username>.github.io`
*   The random URL autogenerated for a [GitHub Organization’s private page](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site): `https://<random-string>.pages.github.io/`

#### `base`

[Section titled base](#base)

A value for `base` may be required so that Astro will treat your repository name (e.g. `/my-repo`) as the root of your website.

Note

Don’t set a `base` parameter if:

*   Your page is served from the root folder.
*   Your repository is located at `https://github.com/<USERNAME>/<USERNAME>.github.io`.

The value for `base` should be your repository’s name starting with a forward slash, for example `/my-blog`. This is so that Astro understands your website’s root is `/my-repo`, rather than the default `/`.

Caution

When this value is configured, all of your internal page links must be prefixed with your `base` value:

    <a href="/my-repo/about">About</a>

See more about [configuring a `base` value](/en/reference/configuration-reference/#base)

### Using GitHub pages with a custom domain

[Section titled Using GitHub pages with a custom domain](#using-github-pages-with-a-custom-domain)

Set up a custom domain

You can set up a custom domain by adding the following `./public/CNAME` file to your project:

public/CNAME

    sub.mydomain.com

This will deploy your site at your custom domain instead of `user.github.io`. Don’t forget to also [configure DNS for your domain provider](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain).

To configure Astro for using GitHub pages with a custom domain, set your domain as the value for `site`. Do not set a value for `base`:

astro.config.mjs

    import { defineConfig } from 'astro/config'
    export default defineConfig({  site: 'https://example.com',})

Configure a GitHub Action
-------------------------

[Section titled Configure a GitHub Action](#configure-a-github-action)

1.  Create a new file in your project at `.github/workflows/deploy.yml` and paste in the YAML below.
    
    deploy.yml
    
        name: Deploy to GitHub Pages
        on:  # Trigger the workflow every time you push to the `main` branch  # Using a different branch name? Replace `main` with your branch’s name  push:    branches: [ main ]  # Allows you to run this workflow manually from the Actions tab on GitHub.  workflow_dispatch:
        # Allow this job to clone the repo and create a page deploymentpermissions:  contents: read  pages: write  id-token: write
        jobs:  build:    runs-on: ubuntu-latest    steps:      - name: Checkout your repository using git        uses: actions/checkout@v4      - name: Install, build, and upload your site        uses: withastro/action@v3        # with:          # path: . # The root location of your Astro project inside the repository. (optional)          # node-version: 20 # The specific version of Node that should be used to build your site. Defaults to 20. (optional)          # package-manager: pnpm@latest # The Node package manager that should be used to install dependencies and build your site. Automatically detected based on your lockfile. (optional)
          deploy:    needs: build    runs-on: ubuntu-latest    environment:      name: github-pages      url: ${{ steps.deployment.outputs.page_url }}    steps:      - name: Deploy to GitHub Pages        id: deployment        uses: actions/deploy-pages@v4
    
    Note
    
    The astro action takes a few optional inputs. These can be provided by uncommenting the `with:` line and the input you want to use.
    
    Caution
    
    The official Astro [action](https://github.com/withastro/action) scans for a lockfile to detect your preferred package manager (`npm`, `yarn`, `pnpm`, or `bun`). You should commit your package manager’s automatically generated `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, or `bun.lockb` file to your repository.
    
2.  On GitHub, go to your repository’s **Settings** tab and find the **Pages** section of the settings.
    
3.  Choose **GitHub Actions** as the **Source** of your site.
    
4.  Commit the new workflow file and push it to GitHub.
    

Your site should now be published! When you push changes to your Astro project’s repository, the GitHub Action will automatically deploy them for you.

Examples
--------

[Section titled Examples](#examples)

*   [Github Pages Deployment](https://github.com/hkbertoson/github-pages)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/github.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Fly.io](/en/guides/deploy/flyio/) [Next  
GitLab Pages](/en/guides/deploy/gitlab/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/gitlab
Deploy your Astro Site to GitLab Pages
======================================

You can use [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) to host an Astro site for your [GitLab](https://about.gitlab.com/) projects, groups, or user account.

Looking for an example?

Check out [the official GitLab Pages Astro example project](https://gitlab.com/pages/astro)!

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

You can deploy an Astro site to GitLab Pages by using GitLab CI/CD to automatically build and deploy your site. To do this, your source code must be hosted on GitLab and you need to make the following changes to your Astro project:

1.  Set up [`site`](/en/reference/configuration-reference/#site) and [`base`](/en/reference/configuration-reference/#base) options in `astro.config.mjs`.
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';
        export default defineConfig({  site: 'https://<username>.gitlab.io',  base: '/<my-repo>',  outDir: 'public',  publicDir: 'static',});
    
    `site`
    
    The value for `site` must be one of the following:
    
    *   The following URL based on your username: `https://<username>.gitlab.io`
    *   The following URL based on your group name: `https://<groupname>.gitlab.io`
    *   Your custom domain if you have it configured in your GitLab project’s settings: `https://example.com`
    
    For GitLab self-managed instances, replace `gitlab.io` with your instance’s Pages domain.
    
    `base`
    
    A value for `base` may be required so that Astro will treat your repository name (e.g. `/my-repo`) as the root of your website.
    
    Note
    
    Don’t set a `base` parameter if your page is served from the root folder.
    
    The value for `base` should be your repository’s name starting with a forward slash, for example `/my-blog`. This is so that Astro understands your website’s root is `/my-repo`, rather than the default `/`.
    
    Caution
    
    When this value is configured, all of your internal page links must be prefixed with your `base` value:
    
        <a href="/my-repo/about">About</a>
    
    See more about [configuring a `base` value](/en/reference/configuration-reference/#base)
    
2.  Rename the `public/` directory to `static/`.
    
3.  Set `outDir: 'public'` in `astro.config.mjs`. This setting instructs Astro to put the static build output in a folder called `public`, which is the folder required by GitLab Pages for exposed files.
    
    If you were using the [`public/` directory](/en/basics/project-structure/#public) as a source of static files in your Astro project, rename it and use that new folder name in `astro.config.mjs` for the value of `publicDir`.
    
    For example, here are the correct `astro.config.mjs` settings when the `public/` directory is renamed to `static/`:
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';
        export default defineConfig({  outDir: 'public',  publicDir: 'static',});
    
4.  Change the build output in `.gitignore`. In our example we need to change `dist/` to `public/`:
    
    .gitignore
    
        # build outputdist/public/
    
5.  Create a file called `.gitlab-ci.yml` in the root of your project with the content below. This will build and deploy your site whenever you make changes to your content:
    
    .gitlab-ci.yml
    
        pages:  # The Docker image that will be used to build your app  image: node:lts
          before_script:    - npm ci
          script:    # Specify the steps involved to build your app here    - npm run build
          artifacts:    paths:      # The folder that contains the built files to be published.      # This must be called "public".      - public
          only:    # Trigger a new build and deploy only when there is a push to the    # branch(es) below    - main
    
6.  Commit your changes and push them to GitLab.
    
7.  On GitLab, go to your repository’s **Deploy** menu and select **Pages**. Here you will see the full URL of your GitLab Pages website. To make sure you are using the URL format `https://username.gitlab.io/my-repo`, uncheck the **Use unique domain** setting on this page.
    

Your site should now be published! When you push changes to your Astro project’s repository, the GitLab CI/CD pipeline will automatically deploy them for you.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/gitlab.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
GitHub Pages](/en/guides/deploy/github/) [Next  
Google Cloud](/en/guides/deploy/google-cloud/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/google-cloud
Deploy your Astro Site to Google Cloud
======================================

[Google Cloud](https://cloud.google.com/) is a full-featured web app hosting platform that can be used to deploy an Astro site.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

### Cloud Storage (static only)

[Section titled Cloud Storage (static only)](#cloud-storage-static-only)

1.  [Create a new GCP project](https://console.cloud.google.com/projectcreate), or select one you already have.
    
2.  Create a new bucket under [Cloud Storage](https://cloud.google.com/storage).
    
3.  Give it a name and the other required settings.
    
4.  Upload your `dist` folder into it or upload using [Cloud Build](https://cloud.google.com/build).
    
5.  Enable public access by adding a new permission to `allUsers` called `Storage Object Viewer`.
    
6.  Edit the website configuration and add `ìndex.html` as the entrypoint and `404.html` as the error page.
    

### Cloud Run (SSR and static)

[Section titled Cloud Run (SSR and static)](#cloud-run-ssr-and-static)

Cloud Run is a serverless platform that allows you to run a container without having to manage any infrastructure. It can be used to deploy both static and SSR sites.

#### Prepare the Service

[Section titled Prepare the Service](#prepare-the-service)

1.  [Create a new GCP project](https://console.cloud.google.com/projectcreate), or select one you already have.
    
2.  Make sure the [Cloud Run API](https://console.cloud.google.com/apis/library/run.googleapis.com) is enabled.
    
3.  Create a new service.
    

#### Create Dockerfile & Build the Container

[Section titled Create Dockerfile &amp; Build the Container](#create-dockerfile--build-the-container)

Before you can deploy your Astro site to Cloud Run, you need to create a Dockerfile that will be used to build the container. Find more information about [how to use Docker with Astro](/en/recipes/docker/#creating-a-dockerfile) in our recipe section.

Once the Dockerfile is created, build it into an image and push it to Google Cloud. There are a few ways to accomplish this:

**Build locally using Docker**:

Use the `docker build` command to build the image, `docker tag` to give it a tag, then `docker push` to push it to a registry. In the case of Google Cloud, [`Artifact Registry`](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling) is the easiest option, but you can also use [Docker Hub](https://hub.docker.com/).

Terminal window

    # build your containerdocker build .
    docker tag SOURCE_IMAGE HOSTNAME/PROJECT-ID/TARGET-IMAGE:TAG
    # Push your image to a registrydocker push HOSTNAME/PROJECT-ID/IMAGE:TAG

Change the following values in the commands above to match your project:

*   `SOURCE_IMAGE`: the local image name or image ID.
*   `HOSTNAME`: the registry host (`gcr.io`, `eu.gcr.io`, `asia.gcr.io`, `us.gcr.io`, `docker.io`).
*   `PROJECT`: your Google Cloud project ID.
*   `TARGET-IMAGE`: the name for the image when it’s stored in the registry.
*   `TAG` is the version associated with the image.

[Read more in the Google Cloud docs.](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling)

**Using another tool**:

You can use a CI/CD tool that supports Docker, like [GitHub Actions](https://github.com/marketplace/actions/push-to-gcr-github-action).

**Build using [Cloud Build](https://cloud.google.com/build)**:

Instead of building the Dockerfile locally, you can instruct Google Cloud to build the image remotely. See the [Google Cloud Build documentation here](https://cloud.google.com/build/docs/build-push-docker-image).

#### Deploying the container

[Section titled Deploying the container](#deploying-the-container)

Deployment can be handled manually in your terminal [using `gcloud`](https://cloud.google.com/run/docs/deploying#service) or automatically using [Cloud Build](https://cloud.google.com/build) or any other CI/CD system.

Need public access?

Don’t forget to add the permission `Cloud Run Invoker` to the `allUsers` group in the Cloud Run permissions settings!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/google-cloud.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
GitLab Pages](/en/guides/deploy/gitlab/) [Next  
Google Firebase](/en/guides/deploy/google-firebase/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/google-firebase
Deploy your Astro Site to Google’s Firebase Hosting
===================================================

[Firebase Hosting](https://firebase.google.com/products/hosting) is a service provided by Google’s [Firebase](https://firebase.google.com/) app development platform, which can be used to deploy an Astro site.

See our separate guide for [adding Firebase backend services](/en/guides/backend/google-firebase/) such as databases, authentication, and storage.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

Your Astro project can be deployed to Firebase as a static site, or as a server-side rendered site (SSR).

### Static Site

[Section titled Static Site](#static-site)

Your Astro project is a static site by default. You don’t need any extra configuration to deploy a static Astro site to Firebase.

### Adapter for SSR

[Section titled Adapter for SSR](#adapter-for-ssr)

To enable SSR in your Astro project and deploy on Firebase add the [Node.js adapter](/en/guides/integrations-guide/node/).

Note

Deploying an SSR Astro site to Firebase requires the [Blaze plan](https://firebase.google.com/pricing) or higher.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  Install the [Firebase CLI](https://github.com/firebase/firebase-tools). This is a command-line tool that allows you to interact with Firebase from the terminal.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3146)
    *   [pnpm](#tab-panel-3147)
    *   [Yarn](#tab-panel-3148)
    
    Terminal window
    
        npm install firebase-tools
    
    Terminal window
    
        pnpm add firebase-tools
    
    Terminal window
    
        yarn add firebase-tools
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Authenticate the Firebase CLI with your Google account. This will open a browser window where you can log in to your Google account.
    
    *   [npm](#tab-panel-3149)
    *   [pnpm](#tab-panel-3150)
    *   [Yarn](#tab-panel-3151)
    
    Terminal window
    
        npx firebase login
    
    Terminal window
    
        pnpm exec firebase login
    
    Terminal window
    
        yarn firebase login
    
3.  Enable experimental web frameworks support. This is an experimental feature that allows the Firebase CLI to detect and configure your deployment settings for Astro.
    
    *   [npm](#tab-panel-3152)
    *   [pnpm](#tab-panel-3153)
    *   [Yarn](#tab-panel-3154)
    
    Terminal window
    
        npx firebase experiments:enable webframeworks
    
    Terminal window
    
        pnpm exec firebase experiments:enable webframeworks
    
    Terminal window
    
        yarn firebase experiments:enable webframeworks
    
4.  Initialize Firebase Hosting in your project. This will create a `firebase.json` and `.firebaserc` file in your project root.
    
    *   [npm](#tab-panel-3155)
    *   [pnpm](#tab-panel-3156)
    *   [Yarn](#tab-panel-3157)
    
    Terminal window
    
        npx firebase init hosting
    
    Terminal window
    
        pnpm exec firebase init hosting
    
    Terminal window
    
        yarn firebase init hosting
    
5.  Deploy your site to Firebase Hosting. This will build your Astro site and deploy it to Firebase.
    
    *   [npm](#tab-panel-3158)
    *   [pnpm](#tab-panel-3159)
    *   [Yarn](#tab-panel-3160)
    
    Terminal window
    
        npx firebase deploy --only hosting
    
    Terminal window
    
        pnpm exec firebase deploy --only hosting
    
    Terminal window
    
        yarn firebase deploy --only hosting
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/google-firebase.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Google Cloud](/en/guides/deploy/google-cloud/) [Next  
Heroku](/en/guides/deploy/heroku/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/heroku
Deploy your Astro Site to Heroku
================================

[Heroku](https://www.heroku.com/) is a platform-as-a-service for building, running, and managing modern apps in the cloud. You can deploy an Astro site to Heroku using this guide.

Danger

The following instructions use [the deprecated `heroku-static-buildpack`](https://github.com/heroku/heroku-buildpack-static#warning-heroku-buildpack-static-is-deprecated). Please see [Heroku’s documentation for using `heroku-buildpack-nginx`](https://github.com/dokku/heroku-buildpack-nginx) instead.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
    
2.  Create a Heroku account by [signing up](https://signup.heroku.com/).
    
3.  Run `heroku login` and fill in your Heroku credentials:
    
    Terminal window
    
        $ heroku login
    
4.  Create a file called `static.json` in the root of your project with the below content:
    
    static.json
    
        {  "root": "./dist"}
    
    This is the configuration of your site; read more at [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static).
    
5.  Set up your Heroku git remote:
    
    Terminal window
    
        # version change$ git init$ git add .$ git commit -m "My site ready for deployment."
        # creates a new app with a specified name$ heroku apps:create example
        # set buildpack for static sites$ heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
    
6.  Deploy your site:
    
    Terminal window
    
        # publish site$ git push heroku master
        # opens a browser to view the Dashboard version of Heroku CI$ heroku open
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/heroku.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Google Firebase](/en/guides/deploy/google-firebase/) [Next  
Kinsta](/en/guides/deploy/kinsta/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/kinsta
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

# Aggregated from ./pages/guides/deploy/microsoft-azure
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

# Aggregated from ./pages/guides/deploy/netlify
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

# Aggregated from ./pages/guides/deploy/render
Deploy your Astro Site to Render
================================

You can deploy your Astro project to [Render](https://render.com/), a service to build websites with free TLS certificates, a global CDN, DDoS protection, private networks, and auto deploys from Git.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  Create a [render.com account](https://dashboard.render.com/) and sign in
    
2.  Click the **New +** button from your dashboard and select **Static Site**
    
3.  Connect your [GitHub](https://github.com/) or [GitLab](https://about.gitlab.com/) repository or alternatively enter the public URL of a public repository
    
4.  Give your website a name, select the branch and specify the build command and publish directory
    
    *   **Build Command:** `npm run build`
    *   **Publish Directory:** `dist`, for static sites; `dist/client` if you have any pages rendered on demand.
5.  Click the **Create Static Site** button
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/render.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Netlify](/en/guides/deploy/netlify/) [Next  
SST](/en/guides/deploy/sst/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/sst
Deploy your Astro Site to AWS with SST
======================================

You can deploy an Astro site to AWS using [SST](https://sst.dev), an open-source framework for deploying modern full-stack applications with SSG and SSR support.

You can also use any additional SST components like cron jobs, Buckets, Queues, etc while maintaining type-safety.

Quickstart
----------

[Section titled Quickstart](#quickstart)

1.  Create an astro project.
    
2.  Run `npx sst@latest init`.
    
3.  It should detect that you are using Astro and ask you to confirm.
    
4.  Once you’re ready for deployment you can run `npx sst deploy --stage production`.
    

You can also read [the full Astro on AWS with SST tutorial](https://sst.dev/docs/start/aws/astro) that will guide you through the steps.

### SST components

[Section titled SST components](#sst-components)

To use any [additional SST components](https://sst.dev/docs/), add them to `sst.config.ts`.

sst.config.ts

    const bucket = new sst.aws.Bucket("MyBucket", {  access: "public",});new sst.aws.Astro("MyWeb", {  link: [bucket],});

And then access them in your `.astro` file.

    ---import { Resource } from "sst"console.log(Resource.MyBucket.name)---

Consult the [SST docs on linking resources](https://sst.dev/docs/linking) to learn more.

If you have any questions, you can [ask in the SST Discord](https://discord.gg/sst).

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/sst.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Render](/en/guides/deploy/render/) [Next  
Stormkit](/en/guides/deploy/stormkit/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/stormkit
Deploy your Astro Site to Stormkit
==================================

You can deploy your Astro project to [Stormkit](https://stormkit.io/), a deployment platform for static websites, single-page applications (SPAs), and serverless functions.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  [Log in to Stormkit](https://app.stormkit.io/auth).
    
2.  Using the user interface, import your Astro project from one of the three supported Git providers (GitHub, GitLab, or Bitbucket).
    
3.  Navigate to the project’s production environment in Stormkit or create a new environment if needed.
    
4.  Verify the build command in your [Stormkit configuration](https://stormkit.io/docs/deployments/configuration). By default, Stormkit CI will run `npm run build` but you can specify a custom build command on this page.
    
5.  Click the “Deploy Now” button to deploy your site.
    

Read more in the [Stormkit Documentation](https://stormkit.io/docs).

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/stormkit.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
SST](/en/guides/deploy/sst/) [Next  
Surge](/en/guides/deploy/surge/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/surge
Deploy your Astro Site to Surge
===============================

You can deploy your Astro project to [Surge](https://surge.sh/), a single-command web publishing platform designed for front-end developers.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  Install [the Surge CLI](https://www.npmjs.com/package/surge) globally from the terminal, if you haven’t already.
    
    Terminal window
    
        npm install -g surge
    
2.  Build your Astro site from your project’s root directory.
    
    Terminal window
    
        npm run build
    
3.  Deploy to Surge using the CLI.
    
    Terminal window
    
        surge dist
    
    You can [use a custom domain with Surge](http://surge.sh/help/adding-a-custom-domain) when deploying by running `surge dist yourdomain.com`.
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/surge.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Stormkit](/en/guides/deploy/stormkit/) [Next  
Vercel](/en/guides/deploy/vercel/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/vercel
Deploy your Astro Site to Vercel
================================

You can use [Vercel](http://vercel.com/) to deploy an Astro site to their global edge network with zero configuration.

This guide includes instructions for deploying to Vercel through the website UI or Vercel’s CLI.

Project configuration
---------------------

[Section titled Project configuration](#project-configuration)

Your Astro project can be deployed to Vercel as a static site, or a server-rendered site.

### Static site

[Section titled Static site](#static-site)

Your Astro project is a static site by default. You don’t need any extra configuration to deploy a static Astro site to Vercel.

### Adapter for on-demand rendering

[Section titled Adapter for on-demand rendering](#adapter-for-on-demand-rendering)

Add [the Vercel adapter](/en/guides/integrations-guide/vercel/) to enable [on-demand rendering](/en/guides/on-demand-rendering/) in your Astro project with the following `astro add` command. This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3167)
*   [pnpm](#tab-panel-3168)
*   [Yarn](#tab-panel-3169)

Terminal window

    npx astro add vercel

Terminal window

    pnpm astro add vercel

Terminal window

    yarn astro add vercel

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

See the [Vercel adapter guide](/en/guides/integrations-guide/vercel/) to install manually instead, or for more configuration options, such as deploying your project’s Astro middleware using Vercel Edge Functions.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

You can deploy to Vercel through the website UI or using Vercel’s CLI (command line interface). The process is the same for both static and on-demand rendered Astro sites.

### Website UI deployment

[Section titled Website UI deployment](#website-ui-deployment)

1.  Push your code to your online Git repository (GitHub, GitLab, BitBucket).
    
2.  [Import your project](https://vercel.com/new) into Vercel.
    
3.  Vercel will automatically detect Astro and configure the right settings.
    
4.  Your application is deployed! (e.g. [astro.vercel.app](https://astro.vercel.app/))
    

After your project has been imported and deployed, all subsequent pushes to branches will generate [Preview Deployments](https://vercel.com/docs/concepts/deployments/preview-deployments), and all changes made to the Production Branch (commonly “main”) will result in a [Production Deployment](https://vercel.com/docs/concepts/deployments/environments#production).

Learn more about Vercel’s [Git Integration](https://vercel.com/docs/concepts/git).

### CLI deployment

[Section titled CLI deployment](#cli-deployment)

1.  Install the [Vercel CLI](https://vercel.com/cli) and run `vercel` to deploy.
    
    *   [npm](#tab-panel-3170)
    *   [pnpm](#tab-panel-3171)
    *   [Yarn](#tab-panel-3172)
    
    Terminal window
    
        npm install -g vercelvercel
    
    Terminal window
    
        pnpm add -g vercelvercel
    
    Terminal window
    
        yarn global add vercelvercel
    
2.  Vercel will automatically detect Astro and configure the right settings.
    
3.  When asked `Want to override the settings? [y/N]`, choose `N`.
    
4.  Your application is deployed! (e.g. [astro.vercel.app](https://astro.vercel.app/))
    

### Project config with `vercel.json`

[Section titled Project config with vercel.json](#project-config-with-verceljson)

You can use `vercel.json` to override the default behavior of Vercel and to configure additional settings. For example, you may wish to attach headers to HTTP responses from your Deployments.

Learn more about [Vercel’s project configuration](https://vercel.com/docs/project-configuration).

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/vercel.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Surge](/en/guides/deploy/surge/) [Next  
Zeabur](/en/guides/deploy/zeabur/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/guides/deploy/zeabur
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

# Aggregated from ./pages/guides/deploy/zerops
Deploy your Astro Site to Zerops
================================

[Zerops](https://zerops.io/) is a dev-first cloud platform that can be used to deploy both Static and SSR Astro site.

This guide will walk you through setting up and deploying both Static and SSR Astro sites on Zerops.

Astro x Zerops Quickrun

Want to test running Astro on Zerops without installing or setting up anything? Using repositories [Zerops x Astro - Static](https://github.com/zeropsio/recipe-astro-static) or [Zerops x Astro - SSR on Node.js](https://github.com/zeropsio/recipe-astro-nodejs) you can deploy example Astro site with a single click.

Running apps on Zerops requires two steps:

1.  Creating a project
2.  Triggering build & deploy pipeline

Note

One Zerops project can contain multiple Astro sites.

Astro Static site on Zerops
---------------------------

[Section titled Astro Static site on Zerops](#astro-static-site-on-zerops)

### Creating a project and a service for Astro Static

[Section titled Creating a project and a service for Astro Static](#creating-a-project-and-a-service-for-astro-static)

Projects and services can be added either through a [`Project add`](https://app.zerops.io/dashboard/project-add) wizard or imported using a yaml structure:

    # see https://docs.zerops.io/references/import for full referenceproject:  name: recipe-astroservices:  - hostname: app    type: static

This will create a project called `recipe-astro` with a Zerops Static service called `app`.

### Deploying your Astro Static site

[Section titled Deploying your Astro Static site](#deploying-your-astro-static-site)

To tell Zerops how to build and run your site, add a `zerops.yml` to your repository:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3173)
*   [pnpm](#tab-panel-3174)
*   [Yarn](#tab-panel-3175)

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - npm i        - npm build      deployFiles:        - dist/~    run:      base: static

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - pnpm i        - pnpm build      deployFiles:        - dist/~    run:      base: static

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - yarn        - yarn build      deployFiles:        - dist/~    run:      base: static

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Now you can [trigger the build & deploy pipeline using the Zerops CLI](#trigger-the-pipeline-using-zerops-cli-zcli) or by connecting the `app` service with your [GitHub](https://docs.zerops.io/references/github-integration/) / [GitLab](https://docs.zerops.io/references/gitlab-integration) repository from inside the service detail.

Astro SSR site on Zerops
------------------------

[Section titled Astro SSR site on Zerops](#astro-ssr-site-on-zerops)

### Update scripts

[Section titled Update scripts](#update-scripts)

Update your `start` script to run the server output from the Node adapter.

package.json

    "scripts": {  "start": "node ./dist/server/entry.mjs",}

### Creating a project and a service for Astro SSR (Node.js)

[Section titled Creating a project and a service for Astro SSR (Node.js)](#creating-a-project-and-a-service-for-astro-ssr-nodejs)

Projects and services can be added either through a [`Project add`](https://app.zerops.io/dashboard/project-add) wizard or imported using a yaml structure:

    # see https://docs.zerops.io/references/import for full referenceproject:  name: recipe-astroservices:  - hostname: app    type: nodejs@20

This will create a project called `recipe-astro` with Zerops Node.js service called `app`.

### Deploying your Astro SSR site

[Section titled Deploying your Astro SSR site](#deploying-your-astro-ssr-site)

To tell Zerops how to build and run your site using the official [Astro Node.js adapter](/en/guides/integrations-guide/node/) in `standalone` mode, add a `zerops.yml` file to your repository:

*   [npm](#tab-panel-3176)
*   [pnpm](#tab-panel-3177)
*   [Yarn](#tab-panel-3178)

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - npm i        - npm run build      deployFiles:        - dist        - package.json        - node_modules    run:      base: nodejs@20      ports:        - port: 3000          httpSupport: true      envVariables:        PORT: 3000        HOST: 0.0.0.0      start: npm start

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - pnpm i        - pnpm run build      deployFiles:        - dist        - package.json        - node_modules    run:      base: nodejs@20      ports:        - port: 3000          httpSupport: true      envVariables:        PORT: 3000        HOST: 0.0.0.0      start: pnpm start

zerops.yml

    # see https://docs.zerops.io/zerops-yml/specification for full referencezerops:  - setup: app    build:      base: nodejs@20      buildCommands:        - yarn        - yarn build      deployFiles:        - dist        - package.json        - node_modules    run:      base: nodejs@20      ports:        - port: 3000          httpSupport: true      envVariables:        PORT: 3000        HOST: 0.0.0.0      start: yarn start

Now you can [trigger the build & deploy pipeline using the Zerops CLI](#trigger-the-pipeline-using-zerops-cli-zcli) or by connecting the `app` service with your [GitHub](https://docs.zerops.io/references/github-integration/) / [GitLab](https://docs.zerops.io/references/gitlab-integration) repository from inside the service detail.

Trigger the pipeline using Zerops CLI (zcli)
--------------------------------------------

[Section titled Trigger the pipeline using Zerops CLI (zcli)](#trigger-the-pipeline-using-zerops-cli-zcli)

1.  Install the Zerops CLI.
    
    Terminal window
    
        # To download the zcli binary directly,# use https://github.com/zeropsio/zcli/releasesnpm i -g @zerops/zcli
    
2.  Open [`Settings > Access Token Management`](https://app.zerops.io/settings/token-management) in the Zerops app and generate a new access token.
    
3.  Log in using your access token with the following command:
    
    Terminal window
    
        zcli login <token>
    
4.  Navigate to the root of your app (where `zerops.yml` is located) and run the following command to trigger the deploy:
    
    Terminal window
    
        zcli push
    

Resources
---------

[Section titled Resources](#resources)

### Official

[Section titled Official](#official)

*   [Create Zerops account](https://app.zerops.io/registration)
*   [Zerops Documentation](https://docs.zerops.io)
*   [Zerops Astro recipe](https://app.zerops.io/recipe/astro)

### Community

[Section titled Community](#community)

*   [Deploying Astro to Zerops in 3 mins](https://medium.com/@arjunaditya/how-to-deploy-astro-to-zerops-4230816a62b4)
*   [Deploying Astro SSG with Node.js on Zerops with One Click Deploy](https://youtu.be/-4KTa4VWtBE)
*   [Deploying Astro SSR with Node.js on Zerops with One Click Deploy](https://youtu.be/eR6b_JnDH6g)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/zerops.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Zeabur](/en/guides/deploy/zeabur/) [Next  
CMS overview](/en/guides/cms/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

