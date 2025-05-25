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