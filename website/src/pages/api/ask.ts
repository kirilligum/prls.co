export const prerender = false; // This ensures the file is treated as a dynamic serverless function

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content'; // Astro's way to get content collections

// Helper function to retrieve API key
function getApiKey(locals: App.Locals, devMode: boolean): string | undefined {
  // Attempt to get API key from Cloudflare runtime environment
  if (locals.runtime?.env?.OPENROUTER_API_KEY) {
    return locals.runtime.env.OPENROUTER_API_KEY;
  }

  // If API key is not found via runtime AND in local development mode,
  // attempt to get it from Vite's `import.meta.env`.
  if (devMode && import.meta.env.OPENROUTER_API_KEY) {
    return import.meta.env.OPENROUTER_API_KEY;
  }
  return undefined;
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'qwen/qwen3-32b';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Parse incoming request data
    const body = await request.json();
    // Expect 'messages' array (chat history + current question) and 'slug'
    const { messages, slug } = body;

    // Basic validation
    if (!messages || !Array.isArray(messages) || messages.length === 0 || !slug) {
      return new Response(JSON.stringify({ error: 'Missing messages array, or slug parameter' }), {
        status: 400, // Bad Request
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Further validation for message structure can be added here if needed
    // e.g., messages.every(m => m.role && m.content)

    // 2. Fetch the specific blog post content
    // Note: For a very large number of blog posts, getCollection() might load a lot of data.
    // For v1, this is acceptable. For future optimization, consider other ways to fetch single post content.
    const posts = await getCollection('blog');
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      return new Response(JSON.stringify({ error: 'Blog post not found' }), {
        status: 404, // Not Found
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Securely access the API key
    const apiKey = getApiKey(locals, import.meta.env.DEV);

    if (!apiKey) {
      const contextMessage = import.meta.env.DEV
        ? "Local development: OPENROUTER_API_KEY not found in .env or via platform proxy."
        : "Cloudflare deployment: OPENROUTER_API_KEY not found in environment variables. Ensure it is set in Pages project settings.";
      console.error(`CRITICAL: ${contextMessage}`);
      if (!import.meta.env.DEV && (!locals.runtime || !locals.runtime.env)) {
        console.error("Additionally, Astro.locals.runtime or Astro.locals.runtime.env was not available, indicating a possible adapter issue.");
      }
      return new Response(JSON.stringify({ error: 'Server configuration error. API key missing.' }), {
        status: 500, // Internal Server Error
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Prepare the payload for OpenRouter
    // The entire `post.body` is used as context, as requested.
    // Be aware: Extremely large post bodies might exceed model context limits.
    const siteUrl = new URL(request.url).origin; // Get site's base URL

    // --- Define Payload for the Answering LLM ---
    const answererSystemPrompt = `You are an expert assistant for a technical blog. Your primary goal is to provide short, technically deep answers, often definitions of terms found in the blog post. Aim for responses around 5 lines or less. The user is asking about the following blog post content:\n\n--- BEGIN BLOG POST ---\n${post.body}\n--- END BLOG POST ---\n\nUse the chat history below for context if relevant to the current question.`;
    const answererPayload = {
      model: DEFAULT_MODEL,
      messages: [{ role: 'system', content: answererSystemPrompt }, ...messages],
      provider: { "order": ["cerebras", "sambanova", "lambda"] },
      max_tokens: 1000,
      temperature: 0.3,
    };

    // --- Prepare and Make Answerer LLM Call ---
    const commonHeaders = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': siteUrl,
      'X-Title': 'Blog AI Assistant',
    };

    const answererResponse = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify(answererPayload),
    });

    if (!answererResponse.ok) {
      const errorText = await answererResponse.text();
      console.error(`Answerer API Error: Status ${answererResponse.status}`, errorText);
      return new Response(JSON.stringify({ error: `AI service (answerer) returned an error: ${answererResponse.status}. Details: ${errorText}` }), {
        status: answererResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const answerData = await answererResponse.json();
    let aiAnswer = answerData.choices?.[0]?.message?.content;
    if (!aiAnswer && answerData.choices?.[0]?.message?.reasoning) {
      aiAnswer = answerData.choices[0].message.reasoning;
    }
    if (!aiAnswer) {
      aiAnswer = 'No answer was received from the AI for your question.';
    }

    return new Response(JSON.stringify({ answer: aiAnswer }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in /api/ask endpoint:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: `An unexpected server error occurred: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
