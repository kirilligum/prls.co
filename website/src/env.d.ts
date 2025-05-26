/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

// Augment App.Locals for Cloudflare runtime
declare namespace App {
	interface Locals extends Runtime {}
}

// Augment ImportMetaEnv for Vite's .env handling
interface ImportMetaEnv {
  readonly OPENROUTER_API_KEY: string;
  // Add other environment variables from your .env file here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
