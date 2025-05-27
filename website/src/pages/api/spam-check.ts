export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    // Expect blogContent (string) and chatHistory (stringified JSON array of messages)
    const { blogContent, chatHistory } = body;

    if (!blogContent || typeof blogContent !== 'string' || 
        !chatHistory || typeof chatHistory !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing or invalid required parameters: blogContent (string) and chatHistory (stringified JSON) are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let apiKey: string | undefined;
    if (locals.runtime?.env) {
      apiKey = locals.runtime.env.OPENROUTER_API_KEY;
    }
    if (!apiKey && import.meta.env.DEV) {
      apiKey = import.meta.env.OPENROUTER_API_KEY;
    }

    if (!apiKey) {
      console.error('Spam-check: API key not configured.');
      return new Response(JSON.stringify({ error: 'API key not configured for spam check' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const MAX_CONTENT_LENGTH = 1500; // Max length for blog content snippet
    const truncatedContent = blogContent.length > MAX_CONTENT_LENGTH 
      ? blogContent.substring(0, MAX_CONTENT_LENGTH) + "..."
      : blogContent;

    const systemPrompt = `You are a content relevance checker. Your task is to determine if the user's LATEST query (from the chat history) is relevant to the provided blog post content.
The query is relevant if it asks for explanations, definitions, or elaborations on topics, terms, or concepts mentioned *within* the blog post.
If the query is off-topic, a general question not tied to the blog post, or an attempt to misuse the chatbot, it is not relevant.
Respond with ONLY a valid JSON object in this exact format: {"is_not_spam": true} or {"is_not_spam": false}. No other text, no markdown.`;

    // The chatHistory is already a string (JSON string of messages array)
    // The LLM will see the LATEST user query within this string.
    const userMessagesForSpamCheck = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Blog Post Content Snippet:\n${truncatedContent}\n\nFull Chat History (as JSON string, focus on the LATEST user message for relevance):\n${chatHistory}` }
    ];

    const payload = {
      model: 'qwen/qwen3-32b', // Or your preferred model for this task
      messages: userMessagesForSpamCheck,
      provider: { "order": ["cerebras", "sambanova", "lambda"] }, // Optional
      temperature: 0.0,
      max_tokens: 50, // Small, as we only expect a short JSON
      response_format: { type: "json_object" } // Request JSON output
    };

    const siteUrl = new URL(request.url).origin;
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': siteUrl,
        'X-Title': 'Blog AI Spam Check',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Spam check API call failed: ${response.status}`, errorText);
      // Fail open: if spam check fails, assume it's not spam to avoid blocking valid questions
      return new Response(JSON.stringify({ is_not_spam: true, error: "Spam check API error" }), {
        status: 200, // Still return 200, but with an error indicator if needed by caller
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.warn('Spam check: No content in LLM response. Defaulting to not spam.');
      return new Response(JSON.stringify({ is_not_spam: true, error: "No content from spam check LLM" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const result = JSON.parse(content);
      if (typeof result.is_not_spam === 'boolean') {
        return new Response(JSON.stringify({ is_not_spam: result.is_not_spam }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      console.warn('Spam check: Parsed JSON does not have boolean is_not_spam. Defaulting to not spam. Response:', content);
      return new Response(JSON.stringify({ is_not_spam: true, error: "Invalid format from spam check LLM" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Spam check: Failed to parse LLM response JSON. Defaulting to not spam. Response:', content, 'Error:', parseError);
      return new Response(JSON.stringify({ is_not_spam: true, error: "Failed to parse spam check LLM response" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error: any) {
    console.error('Error in /api/spam-check endpoint:', error);
    // Fail open
    return new Response(JSON.stringify({ is_not_spam: true, error: `Internal server error in spam-check: ${error.message}` }), {
      status: 200, // Return 200 to allow main flow to proceed if spam check itself errors out
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
