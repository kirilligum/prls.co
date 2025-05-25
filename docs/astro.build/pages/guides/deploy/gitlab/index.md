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