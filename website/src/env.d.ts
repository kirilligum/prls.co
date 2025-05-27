/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { KVNamespace } from '@cloudflare/workers-types';

// Define the Env interface for Cloudflare bindings
interface Env {
  OPENROUTER_API_KEY: string; // For Cloudflare runtime
  PRLS_BLOGPOST_AI_CACHE: KVNamespace; // KV namespace binding for "prls blogpost ai"
  // Add other Cloudflare bindings (D1, R2, etc.) here if you use them
}

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
