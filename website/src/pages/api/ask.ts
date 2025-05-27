export const prerender = false; // This ensures the file is treated as a dynamic serverless function

import type { APIRoute } from 'astro';
import { getCollection }    from 'astro:content'; // Astro's way to get content collections

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
    // Be aware: Extremely large post bodies (e.g., "a million tokens") might exceed model context limits,
    // be very slow, and incur high costs. Check OpenRouter's limits for the chosen model.
    const openRouterPayload = {
      model: 'qwen/qwen3-32b',
      // Construct messages: System prompt first, then the chat history (including current question)
      messages: [
        {
          role: 'system',
          content: `You are an expert assistant for a technical blog. Your primary goal is to provide short, technically deep answers, often definitions of terms found in the blog post. Aim for responses around 5 lines or less. The user is asking about the following blog post content:\n\n--- BEGIN BLOG POST ---\n${post.body}\n--- END BLOG POST ---\n\nUse the chat history below for context if relevant to the current question.`,
        },
        ...messages // Spread the received messages (history + current question)
      ],
      provider: {
        "order": ["cerebras", "sambanova", "lambda"]
      },
      max_tokens: 1000,
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
      console.error(`OpenRouter API Error Details: Status ${openRouterResponse.status}`, errorText);
      return new Response(JSON.stringify({ error: `AI service returned an error: ${openRouterResponse.status}. Details: ${errorText}` }), {
        status: openRouterResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const responseData = await openRouterResponse.json();

    let aiAnswer = responseData.choices?.[0]?.message?.content;

    // If content is empty, try to use reasoning, as some models/providers might put the response there.
    if (!aiAnswer && responseData.choices?.[0]?.message?.reasoning) {
      aiAnswer = responseData.choices[0].message.reasoning;
    }
    
    // If still no answer, use the default.
    if (!aiAnswer) {
      aiAnswer = 'No answer was received from the AI.';
    }
    

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
