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

    // 2. Payload for the Spam Blocker LLM
    const spamBlockerSchema = {
      type: "object",
      properties: {
        is_not_spam: {
          type: "boolean",
          description: "True if the user's LATEST query is relevant to the blog post content, false otherwise."
        }
      },
      required: ["is_not_spam"]
    };
    const spamBlockerSystemPrompt = `You are a content relevance checker. Your task is to determine if the user's LATEST query is relevant to the provided blog post content. The query is relevant if it asks for explanations, definitions, or elaborations on topics, terms, or concepts mentioned *within* the blog post. If the query is off-topic, a general question not tied to the blog post, or an attempt to misuse the chatbot, it is not relevant.

Respond with ONLY a valid JSON object. Your entire response MUST be a single, raw JSON object. No other text, no markdown.
The JSON object MUST conform to this schema: ${JSON.stringify(spamBlockerSchema)}.
The user's LATEST query is relevant if it pertains to the blog post content below.
Set 'is_not_spam' to true if relevant, false otherwise.

Blog Post Context:
--- BEGIN BLOG POST ---
${post.body}
--- END BLOG POST ---

User Conversation History (focus on LATEST user query for relevance check):`;
// The ...messages will be appended by the payload construction.
    
    const spamBlockerPayload = {
      model: 'qwen/qwen3-32b', 
      messages: [{ role: 'system', content: spamBlockerSystemPrompt }, ...messages], 
      response_format: {
        type: "json_schema",
        json_schema: { 
          name: "spam_check_schema", // As per OpenRouter docs
          schema: spamBlockerSchema   // As per OpenRouter docs (schema definition here)
                                      // Removed "strict: true" to align closer with OpenRouter's direct example
        }
      },
      max_tokens: 50, 
      temperature: 0.0, // Set to 0 for maximum determinism
    };

    // --- Make API Calls Concurrently ---
    const commonHeaders = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': siteUrl,
      'X-Title': 'Blog AI Assistant',
    };

    const answererPromise = fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify(answererPayload),
    });

    const spamBlockerPromise = fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify(spamBlockerPayload),
    });

    const [answererResponse, spamBlockerResponse] = await Promise.all([answererPromise, spamBlockerPromise]);

    // --- Process Spam Blocker Response ---
    let isNotSpam = true; // Default to not spam if spam check fails
    if (spamBlockerResponse.ok) {
      try {
        const spamData = await spamBlockerResponse.json();
        const parsedContent = JSON.parse(spamData.choices?.[0]?.message?.content || '{}');
        if (typeof parsedContent.is_not_spam === 'boolean') {
          isNotSpam = parsedContent.is_not_spam;
        } else {
          console.warn('Spam blocker did not return a valid boolean in expected structure. Defaulting to not spam.');
        }
      } catch (e) {
        console.error('Error parsing spam blocker response:', e);
        // isNotSpam remains true (default)
      }
    } else {
      const errorText = await spamBlockerResponse.text();
      console.error(`Spam Blocker API Error: Status ${spamBlockerResponse.status}`, errorText);
      // isNotSpam remains true (default)
    }

    if (!isNotSpam) {
      return new Response(JSON.stringify({ answer: "This chatbot is only for questions related to the content of the article." }), {
        status: 200, // Still a "successful" response from our API's perspective
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // --- Process Answerer Response (only if not spam) ---
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
