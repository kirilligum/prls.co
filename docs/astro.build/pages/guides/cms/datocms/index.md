DatoCMS & Astro
===============

[DatoCMS](https://datocms.com/) is a web-based, headless CMS to manage digital content for your sites and apps.

Integrating with Astro
----------------------

[Section titled Integrating with Astro](#integrating-with-astro)

In this guide, you will fetch content data from DatoCMS in your Astro project, then display it on a page.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

To get started, you will need to have the following:

*   **An Astro project** - If you don’t have an Astro project yet, you can follow the instructions in our [Installation guide](/en/install-and-setup/).
*   **A DatoCMS account and project** - If you don’t have an account, you can [sign up for a free account](https://dashboard.datocms.com/signup).
*   **The read-only API Key for your DatoCMS project** - You can find it in the admin dashboard of your project, under “Settings” > “API Tokens”.

Setting up the credentials
--------------------------

[Section titled Setting up the credentials](#setting-up-the-credentials)

Create a new file (if one does not already exist) named `.env` in the root of your Astro project. Add a new environment variable as follows, using the API key found in your DatoCMS admin dashboard:

.env

    DATOCMS_API_KEY=YOUR_API_KEY

For TypeScript support, declare the typing of this environment variable in the `env.d.ts` file in the `src/` folder. If this file does not exist, you can create it and add the following:

src/env.d.ts

    interface ImportMetaEnv {  readonly DATOCMS_API_KEY: string;}

Your root directory should now include these files:

*   Directorysrc/
    
    *   **env.d.ts**
    
*   **.env**
*   astro.config.mjs
*   package.json

Create a Model in DatoCMS
-------------------------

[Section titled Create a Model in DatoCMS](#create-a-model-in-datocms)

In the DatoCMS admin dashboard of your project, navigate to “Settings” > “Models” and create a new Model called “Home” with the “Single Instance” toggle selected. This will create a home page for your project. In this model, add a new text field for the page title.

Navigate to the “Content” tab in your project and click on your newly-created home page. You can now add a title. Save the page, and continue.

Fetching data
-------------

[Section titled Fetching data](#fetching-data)

In your Astro project, navigate to the page that will fetch and display your CMS content. Add the following query to fetch the content for `home` using the DatoCMS GraphQL API.

This example displays the page title from DatoCMS on `src/pages/index.astro`:

src/pages/index.astro

    ---const response = await fetch('https://graphql.datocms.com/', {  method: 'POST',  headers: {    'Content-Type': 'application/json',    Accept: 'application/json',    Authorization: `Bearer ${import.meta.env.DATOCMS_API_KEY}`,  },  body: JSON.stringify({    query: `query Homepage {          home {            title          }        }      `,  }),});
    const json = await response.json();const data = json.data.home;---
    <h1>{data.title}</h1>

This GraphQL query will fetch the `title` field in the `home` page from your DatoCMS Project. When you refresh your browser, you should see the title on your page.

Adding Dynamic modular content blocks
-------------------------------------

[Section titled Adding Dynamic modular content blocks](#adding-dynamic-modular-content-blocks)

If your DatosCMS project includes [modular content](https://www.datocms.com/docs/content-modelling/modular-content), then you will need to build a corresponding `.astro` component for each block of content (e.g. a text section, a video, a quotation block, etc.) that the modular field allows in your project.

The example below is a `<Text />` Astro component for displaying a “Multiple-paragraph text” block from DatoCMS.

src/components/Text.astro

    ---export interface TextProps {  text: string}
    export interface Props {  item: TextProps}
    const { item } = Astro.props;---
    <div set:html={item.text} />

To fetch these blocks, edit your GraphQL query to include the modular content block you created in DatoCMS.

In this example, the modular content block is named **content** in DatoCMS. This query also includes the unique `_modelApiKey` of each item to check which block should be displayed in the modular field, based on which block was chosen by the content author in the DatoCMS editor. Use a switch statement in the Astro template to allow for dynamic rendering based on the data received from the query.

The following example represents a DatoCMS modular content block that allows an author to choose between a text field (`<Text />`) and an image (`<Image />`) rendered on the home page:

src/pages/index.astro

    ---import Image from '../components/Image.astro';import Text from '../components/Text.astro';
    const response = await fetch('https://graphql.datocms.com/', {  method: 'POST',  headers: {    'Content-Type': 'application/json',    Accept: 'application/json',    Authorization: `Bearer ${import.meta.env.DATOCMS_API_KEY}`,  },  body: JSON.stringify({    query: `query Homepage {          home {            title            content {              ... on ImageRecord {                _modelApiKey               image{                url               }              }              ... on TextRecord {                _modelApiKey                text(markdown: true)              }            }          }        }      `,  }),});
    const json = await response.json();const data = json.data.home;---
    <h1>{data.title}</h1>{  data.content.map((item: any) => {    switch (item._modelApiKey) {      case 'image':        return <Image item={item} />;      case 'text':        return <Text item={item} />;      default:        return null;    }  })}

Publishing your site
--------------------

[Section titled Publishing your site](#publishing-your-site)

To deploy your website, visit our [deployment guides](/en/guides/deploy/) and follow the instructions for your preferred hosting provider.

Publish on DatoCMS content changes
----------------------------------

[Section titled Publish on DatoCMS content changes](#publish-on-datocms-content-changes)

If your project is using Astro’s default static mode, you will need to set up a webhook to trigger a new build when your content changes. If you are using Netlify or Vercel as your hosting provider, you can use its webhook feature to trigger a new build when you change content in DatoCMS.

### Netlify

[Section titled Netlify](#netlify)

To set up a webhook in Netlify:

1.  Go to your site dashboard and click on **Build & deploy**.
    
2.  Under the **Continuous Deployment** tab, find the **Build hooks** section and click on **Add build hook**.
    
3.  Provide a name for your webhook and select the branch you want to trigger the build on. Click on **Save** and copy the generated URL.
    

### Vercel

[Section titled Vercel](#vercel)

To set up a webhook in Vercel:

1.  Go to your project dashboard and click on **Settings**.
    
2.  Under the **Git** tab, find the **Deploy Hooks** section.
    
3.  Provide a name for your webhook and the branch you want to trigger the build on. Click **Add** and copy the generated URL.
    

### Adding a webhook to DatoCMS

[Section titled Adding a webhook to DatoCMS](#adding-a-webhook-to-datocms)

In your DatoCMS project admin dashboard, navigate to the **Settings** tab and click **Webhooks**. Click the plus icon to create a new webhook and give it a name. In the URL field, paste the URL generated by your preferred hosting service. As Trigger, select whichever option suits your needs. (For example: build every time a new record is published.)

Starter project
---------------

[Section titled Starter project](#starter-project)

You can also check out the [Astro blog template](https://www.datocms.com/marketplace/starters/astro-template-blog) on the DatoCMS marketplace to learn how to create a blog with Astro and DatoCMS.

More CMS guides
---------------

*   ![](/logos/apostrophecms.svg)
    
    ### [Apostrophe](/en/guides/cms/apostrophecms/)
    
*   ![](/logos/builderio.svg)
    
    ### [Builder.io](/en/guides/cms/builderio/)
    
*   ![](/logos/buttercms.svg)
    
    ### [ButterCMS](/en/guides/cms/buttercms/)
    
*   ![](/logos/caisy.svg)
    
    ### [Caisy](/en/guides/cms/caisy/)
    
*   ![](/logos/cloudcannon.svg)
    
    ### [CloudCannon](/en/guides/cms/cloudcannon/)
    
*   ![](/logos/contentful.svg)
    
    ### [Contentful](/en/guides/cms/contentful/)
    
*   ![](/logos/cosmic.svg)
    
    ### [Cosmic](/en/guides/cms/cosmic/)
    
*   ![](/logos/craft-cms.svg)
    
    ### [Craft CMS](/en/guides/cms/craft-cms/)
    
*   ![](/logos/crystallize.svg)
    
    ### [Crystallize](/en/guides/cms/crystallize/)
    
*   ![](/logos/datocms.svg)
    
    ### [DatoCMS](/en/guides/cms/datocms/)
    
*   ![](/logos/decap-cms.svg)
    
    ### [Decap CMS](/en/guides/cms/decap-cms/)
    
*   ![](/logos/directus.svg)
    
    ### [Directus](/en/guides/cms/directus/)
    
*   ![](/logos/drupal.svg)
    
    ### [Drupal](/en/guides/cms/drupal/)
    
*   ![](/logos/flotiq.svg)
    
    ### [Flotiq](/en/guides/cms/flotiq/)
    
*   ![](/logos/frontmatter-cms.svg)
    
    ### [Front Matter CMS](/en/guides/cms/frontmatter-cms/)
    
*   ![](/logos/ghost.png)
    
    ### [Ghost](/en/guides/cms/ghost/)
    
*   ![](/logos/gitcms.svg)
    
    ### [GitCMS](/en/guides/cms/gitcms/)
    
*   ![](/logos/hashnode.png)
    
    ### [Hashnode](/en/guides/cms/hashnode/)
    
*   ![](/logos/hygraph.svg)
    
    ### [Hygraph](/en/guides/cms/hygraph/)
    
*   ![](/logos/keystatic.svg)
    
    ### [Keystatic](/en/guides/cms/keystatic/)
    
*   ![](/logos/keystonejs.svg)
    
    ### [KeystoneJS](/en/guides/cms/keystonejs/)
    
*   ![](/logos/kontent-ai.svg)
    
    ### [Kontent.ai](/en/guides/cms/kontent-ai/)
    
*   ![](/logos/microcms.svg)
    
    ### [microCMS](/en/guides/cms/microcms/)
    
*   ![](/logos/payload.svg)
    
    ### [Payload CMS](/en/guides/cms/payload/)
    
*   ![](/logos/preprcms.svg)
    
    ### [Prepr CMS](/en/guides/cms/preprcms/)
    
*   ![](/logos/prismic.svg)
    
    ### [Prismic](/en/guides/cms/prismic/)
    
*   ![](/logos/sanity.svg)
    
    ### [Sanity](/en/guides/cms/sanity/)
    
*   ![](/logos/sitecore.svg)
    
    ### [Sitecore XM](/en/guides/cms/sitecore/)
    
*   ![](/logos/spinal.svg)
    
    ### [Spinal](/en/guides/cms/spinal/)
    
*   ![](/logos/statamic.svg)
    
    ### [Statamic](/en/guides/cms/statamic/)
    
*   ![](/logos/storyblok.svg)
    
    ### [Storyblok](/en/guides/cms/storyblok/)
    
*   ![](/logos/strapi.svg)
    
    ### [Strapi](/en/guides/cms/strapi/)
    
*   ![](/logos/studiocms.svg)
    
    ### [StudioCMS](/en/guides/cms/studiocms/)
    
*   ![](/logos/tina-cms.svg)
    
    ### [Tina CMS](/en/guides/cms/tina-cms/)
    
*   ![](/logos/umbraco.svg)
    
    ### [Umbraco](/en/guides/cms/umbraco/)
    
*   ![](/logos/wordpress.svg)
    
    ### [WordPress](/en/guides/cms/wordpress/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/cms/datocms.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Crystallize](/en/guides/cms/crystallize/) [Next  
Decap CMS](/en/guides/cms/decap-cms/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)