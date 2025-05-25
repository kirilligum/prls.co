Neon Postgres & Astro
=====================

[Neon](https://neon.tech) is a fully managed serverless Postgres database. It separates storage and compute to offer autoscaling, branching, and bottomless storage.

Adding Neon to your Astro project
---------------------------------

[Section titled Adding Neon to your Astro project](#adding-neon-to-your-astro-project)

### Prerequisites

[Section titled Prerequisites](#prerequisites)

*   A [Neon](https://console.neon.tech/signup) account with a created project
*   Neon database connection string
*   An Astro project with [on-demand rendering (SSR)](/en/guides/on-demand-rendering/) enabled

### Environment configuration

[Section titled Environment configuration](#environment-configuration)

To use Neon with Astro, you will need to set a Neon environment variable. Create or edit the `.env` file in your project root, and add the following code, replacing your own project details:

.env

    NEON_DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>.neon.tech:<port>/<dbname>?sslmode=require"

For better TypeScript support, define environment variables in a `src/env.d.ts` file:

src/env.d.ts

    interface ImportMetaEnv {  readonly NEON_DATABASE_URL: string;}
    interface ImportMeta {  readonly env: ImportMetaEnv;}

Learn more about [environment variables](/en/guides/environment-variables/) and `.env` files in Astro.

### Installing dependencies

[Section titled Installing dependencies](#installing-dependencies)

Install the `@neondatabase/serverless` package to connect to Neon:

Terminal window

    npm install @neondatabase/serverless

### Creating a Neon client

[Section titled Creating a Neon client](#creating-a-neon-client)

Create a new file `src/lib/neon.ts` with the following code to initialize your Neon client:

src/lib/neon.ts

    import { neon } from '@neondatabase/serverless';
    export const sql = neon(import.meta.env.NEON_DATABASE_URL);

Querying your Neon database
---------------------------

[Section titled Querying your Neon database](#querying-your-neon-database)

You can now use the Neon client to query your database from any `.astro` component. The following example fetches the current time from the Postgres database:

src/pages/index.astro

    ---import { sql } from '../lib/neon';
    const response =  await  sql`SELECT NOW() as current_time`;const currentTime = response[0].current_time;---
    <h1>Current Time</h1><p>The time is: {currentTime}</p>

Database branching with Neon
----------------------------

[Section titled Database branching with Neon](#database-branching-with-neon)

Neon’s branching feature lets you create copies of your database for development or testing. Use this in your Astro project by creating different environment variables for each branch:

.env.development

    NEON_DATABASE_URL=your_development_branch_url

.env.production

    NEON_DATABASE_URL=your_production_branch_url

Resources
---------

[Section titled Resources](#resources)

*   [Neon documentation](https://neon.tech/docs/introduction)
*   [Neon serverless driver GitHub](https://github.com/neondatabase/serverless)
*   [Connect an Astro site or application to Neon Postgres](https://neon.tech/docs/guides/astro)

More backend service guides
---------------------------

*   ![](/logos/appwriteio.svg)
    
    ### [Appwrite](/en/guides/backend/appwriteio/)
    
*   ![](/logos/firebase.svg)
    
    ### [Firebase](/en/guides/backend/google-firebase/)
    
*   ![](/logos/neon.svg)
    
    ### [Neon](/en/guides/backend/neon/)
    
*   ![](/logos/sentry.svg)
    
    ### [Sentry](/en/guides/backend/sentry/)
    
*   ![](/logos/supabase.svg)
    
    ### [Supabase](/en/guides/backend/supabase/)
    
*   ![](/logos/turso.svg)
    
    ### [Turso](/en/guides/backend/turso/)
    
*   ![](/logos/xata.svg)
    
    ### [Xata](/en/guides/backend/xata/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/backend/neon.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Firebase](/en/guides/backend/google-firebase/) [Next  
Sentry](/en/guides/backend/sentry/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)