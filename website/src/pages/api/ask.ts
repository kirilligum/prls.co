export const prerender = false; // This ensures the file is treated as a dynamic serverless function

import type { APIRoute } from 'astro';
import { getCollection }    from 'astro:content'; // Astro's way to get content collections

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Parse incoming request data
    const body = await request.json();
    const { question, slug } = body;

    // Basic validation
    if (!question || !slug) {
      return new Response(JSON.stringify({ error: 'Missing question or slug parameter' }), {
        status: 400, // Bad Request
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
    // For deployed Cloudflare Pages Functions, it's in locals.runtime.env.
    // For local development (`astro dev`), Vite loads .env into import.meta.env.
    let apiKey = locals.runtime.env.OPENROUTER_API_KEY;

    // Fallback to import.meta.env for local development if key not found on locals.runtime.env
    // import.meta.env.DEV is true during `astro dev`
    if (!apiKey && import.meta.env.DEV) {
      apiKey = import.meta.env.OPENROUTER_API_KEY;
    }

    if (!apiKey) {
      console.error('CRITICAL: OPENROUTER_API_KEY is not set. Checked locals.runtime.env (for deployed) and import.meta.env (for local dev).');
      return new Response(JSON.stringify({ error: 'Server configuration error. API key missing.' }), {
        status: 500, // Internal Server Error
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Prepare the payload for OpenRouter
    // The entire `post.body` is used as context, as requested.
    // Be aware: Extremely large post bodies (e.g., "a million tokens") might exceed model context limits,
    // be very slow, and incur high costs. Check OpenRouter's limits for the chosen model.
    const openRouterPayload = {
      model: 'meta-llama/llama-3.1-70b-instruct', // A Llama model with a large context window
      messages: [
        {
          role: 'system',
          content: `You are an expert assistant for a technical blog. Your primary goal is to provide short, technically deep answers, often definitions of terms found in the blog post. Aim for responses around 5 lines or less. The user is asking about the following blog post content:\n\n--- BEGIN BLOG POST ---\n${post.body}\n--- END BLOG POST ---`,
        },
        {
          role: 'user',
          content: question,
        },
      ],
      max_tokens: 250,  // Adjust to control response length (aiming for ~5 lines)
      temperature: 0.3, // Lower temperature for more factual, less creative answers
    };

    // 5. Make the API call to OpenRouter
    const siteUrl = new URL(request.url).origin; // Get site's base URL

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        // Recommended by OpenRouter: 'HTTP-Referer': 'YOUR_SITE_URL', 'X-Title': 'YOUR_SITE_NAME'
        'HTTP-Referer': siteUrl,
        'X-Title': 'Blog AI Assistant', 
      },
      body: JSON.stringify(openRouterPayload),
    });

    // 6. Handle OpenRouter's response
    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error(`OpenRouter API Error: ${openRouterResponse.status}`, errorText);
      return new Response(JSON.stringify({ error: `AI service returned an error: ${openRouterResponse.status}. Details: ${errorText}` }), {
        status: openRouterResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const responseData = await openRouterResponse.json();
    const aiAnswer = responseData.choices?.[0]?.message?.content || 'No answer was received from the AI.';

    // 7. Send the AI's answer back to the frontend
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
