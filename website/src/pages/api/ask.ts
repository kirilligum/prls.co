export const prerender = false; // This ensures the file is treated as a dynamic serverless function

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content'; // Astro's way to get content collections

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
    // Securely access the API key
    // Securely access the API key
    let apiKey: string | undefined;

    // Attempt to get API key from Cloudflare runtime environment
    // This is the standard way for deployed Cloudflare Pages Functions and `wrangler pages dev`
    if (locals.runtime?.env) {
      apiKey = locals.runtime.env.OPENROUTER_API_KEY;
    }

    // If API key is not found via runtime AND we are in local development mode (`astro dev`),
    // attempt to get it from Vite's `import.meta.env` (populated from .env files).
    if (!apiKey && import.meta.env.DEV) {
      apiKey = import.meta.env.OPENROUTER_API_KEY;
    }

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

    // --- Define Payloads for Two LLM Calls ---

    // 1. Payload for the Answering LLM (existing logic)
    const answererSystemPrompt = `You are an expert assistant for a technical blog. Your primary goal is to provide short, technically deep answers, often definitions of terms found in the blog post. Aim for responses around 5 lines or less. The user is asking about the following blog post content:\n\n--- BEGIN BLOG POST ---\n${post.body}\n--- END BLOG POST ---\n\nUse the chat history below for context if relevant to the current question.`;
    const answererPayload = {
      model: 'qwen/qwen3-32b',
      messages: [{ role: 'system', content: answererSystemPrompt }, ...messages],
      provider: { "order": ["cerebras", "sambanova", "lambda"] },
      max_tokens: 1000,
      temperature: 0.3,
    };

    // --- Spam Check Call ---
    let isNotSpam = true; // Default to not spam (fail-open for spam check)
    try {
      const spamCheckResponse = await fetch(`${siteUrl}/api/spam-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogContent: post.body,
          chatHistory: JSON.stringify(messages) // Pass full messages array as a JSON string
        }),
      });

      if (spamCheckResponse.ok) {
        const spamResult = await spamCheckResponse.json();
        if (typeof spamResult.is_not_spam === 'boolean') {
          isNotSpam = spamResult.is_not_spam;
        } else {
          console.warn('/api/ask: Spam check result did not contain a boolean is_not_spam. Defaulting to not spam. Parsed result:', spamResult);
        }
      } else {
        const errorText = await spamCheckResponse.text();
        console.warn(`/api/ask: Spam check endpoint call failed with status ${spamCheckResponse.status}. Defaulting to not spam. Error: ${errorText}`);
      }
    } catch (e) {
      console.error('/api/ask: Error calling spam check endpoint. Defaulting to not spam.', e);
    }

    if (!isNotSpam) {
      return new Response(JSON.stringify({ answer: "This chatbot is only for questions related to the content of the article." }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // --- Prepare and Make Answerer LLM Call (if not spam) ---
    // The answererPayload is defined before this modified block.
    
    const commonHeaders = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': siteUrl,
      'X-Title': 'Blog AI Assistant',
    };

    // The answererPayload was defined before the section we are replacing.
    // We now fetch only the answerer response.
    const answererResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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

  } catch (error: any) {
    console.error('Error in /api/ask endpoint:', error);
    return new Response(JSON.stringify({ error: `An unexpected server error occurred: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
