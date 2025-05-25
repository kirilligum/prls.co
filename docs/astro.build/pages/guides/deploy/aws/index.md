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