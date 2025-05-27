export const prerender = false; // This ensures the file is treated as a dynamic serverless function

import type { APIRoute } from "astro";
import { getEntryBySlug } from 'astro:content';
import type { KVNamespace, R2Bucket } from "@cloudflare/workers-types"; // Added R2Bucket

// CACHE_TTL_SECONDS remains the same
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 60; // 2 months (60 days)

function normalizeQuestionForCache(question: string): string {
  // Normalize by converting to lowercase, removing punctuation, and collapsing multiple spaces
  return question
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

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

// Helper function to generate R2 object key
function getR2SessionLogKey(slug: string, sessionId: string, turnTimestamp: string): string {
  const date = new Date(turnTimestamp);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `ai-logs/${slug}/${year}/${month}/${day}/${sessionId}/${turnTimestamp}.json`;
}

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "qwen/qwen3-32b";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Parse incoming request data
    const body = await request.json();
    // Expect 'messages' array, 'slug', 'readerId', 'sessionId', 'currentUserQuestion'
    const { messages, slug, readerId, sessionId, currentUserQuestion } = body;

    // Define aiLogsBucket at the top of the function scope
    const aiLogsBucket = locals.runtime?.env?.PRLS_AI_LOGS_BUCKET;

    // Basic validation
    if (!slug || !readerId || !sessionId || typeof currentUserQuestion === 'undefined' || !messages || !Array.isArray(messages) /* messages.length === 0 is allowed if currentUserQuestion is primary */) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters (slug, readerId, sessionId, currentUserQuestion, messages)." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const turnTimestamp = new Date().toISOString();
    let r2Key = ""; // Initialize r2Key
    if (aiLogsBucket) {
      r2Key = getR2SessionLogKey(slug, sessionId, turnTimestamp);
    }

    // Log user's question to R2
    if (aiLogsBucket && currentUserQuestion && typeof currentUserQuestion === 'string' && currentUserQuestion.trim() !== "") {
      const userTurnData = {
        sessionId, readerId, blogSlug: slug, turnTimestampUTC: turnTimestamp,
        userQuestion: currentUserQuestion, aiResponse: null, // AI response not yet known
        source: "user_input",
      };
      locals.runtime.ctx.waitUntil( // Changed to locals.runtime.ctx.waitUntil
        aiLogsBucket.put(r2Key, JSON.stringify(userTurnData), { httpMetadata: { contentType: 'application/json' } })
          .then(() => console.log(`Logged user question to R2: ${r2Key}`))
          .catch(e => console.error(`Error logging user question to R2 for ${r2Key}:`, e))
      );
    } else if (import.meta.env.DEV && !aiLogsBucket) {
        console.warn("R2 bucket (PRLS_AI_LOGS_BUCKET) not available in DEV. Skipping user question log.");
    }


    // --- MODIFIED SECTION: Fetching blog post content ---
    let postBodyForContext: string;
    try {
      const postEntry = await getEntryBySlug('blog', slug);
      if (!postEntry) {
        console.error(`Blog post with slug "${slug}" not found.`);
        if (aiLogsBucket) {
            const errorData = { sessionId, readerId, blogSlug: slug, turnTimestampUTC: new Date().toISOString(), userQuestion: currentUserQuestion, errorDetails: `Context Error: Blog post with slug '${slug}' not found.`, source: "error_context" };
            locals.runtime.ctx.waitUntil(aiLogsBucket.put(getR2SessionLogKey(slug, sessionId, new Date().toISOString()), JSON.stringify(errorData))); // Changed
        }
        return new Response(JSON.stringify({ error: "Blog post context not found." }), { status: 404 });
      }
      postBodyForContext = postEntry.body;
    } catch (e) {
      console.error(`Error fetching blog post with slug "${slug}":`, e);
      if (aiLogsBucket) {
          const errorData = { sessionId, readerId, blogSlug: slug, turnTimestampUTC: new Date().toISOString(), userQuestion: currentUserQuestion, errorDetails: `Context Error: Failed to fetch blog post '${slug}'. Details: ${e instanceof Error ? e.message : String(e)}`, source: "error_context_fetch" };
          locals.runtime.ctx.waitUntil(aiLogsBucket.put(getR2SessionLogKey(slug, sessionId, new Date().toISOString()), JSON.stringify(errorData))); // Changed
      }
      return new Response(JSON.stringify({ error: "Failed to retrieve blog post context." }), { status: 500 });
    }
    // --- END MODIFIED SECTION ---

    // 3. Securely access the API key
    const apiKey = getApiKey(locals, import.meta.env.DEV);

    if (!apiKey) {
      const contextMessage = import.meta.env.DEV
        ? "Local development: OPENROUTER_API_KEY not found in .env or via platform proxy."
        : "Cloudflare deployment: OPENROUTER_API_KEY not found in environment variables. Ensure it is set in Pages project settings.";
      console.error(`CRITICAL: ${contextMessage}`);
      // Log API key error to R2
      if (aiLogsBucket) {
          const errorData = { sessionId, readerId, blogSlug: slug, turnTimestampUTC: new Date().toISOString(), userQuestion: currentUserQuestion, errorDetails: `Server configuration error: API key missing. Context: ${contextMessage}`, source: "error_api_key" };
          locals.runtime.ctx.waitUntil(aiLogsBucket.put(getR2SessionLogKey(slug, sessionId, new Date().toISOString()), JSON.stringify(errorData))); // Changed
      }
      return new Response(
        JSON.stringify({
          error: "Server configuration error. API key missing.",
        }),
        {
          status: 500, // Internal Server Error
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 4. Determine cache eligibility and attempt cache read
    const aiCache = locals.runtime?.env?.PRLS_BLOGPOST_AI_CACHE;
    const lastMessage = messages[messages.length - 1];
    let isCacheableQuestion = false;
    let cacheKey = "";
    // let questionContentMatches = false; // REMOVED

    console.log(
      "[DEBUG] Initial cache eligibility check. KV available:",
      !!aiCache,
    );
    if (lastMessage) {
      console.log(
        `[DEBUG] Last message role: "${lastMessage.role}", content (first 100 chars): "${lastMessage.content?.substring(0, 100)}"`,
      );
    } else {
      console.log("[DEBUG] No last message found in request.");
    }
    console.log(`[DEBUG] Total messages in history: ${messages.length}`);

    if (aiCache && lastMessage && lastMessage.role === "user") {
      const currentUserQuestion = lastMessage.content;
      // It's good practice to normalize the question for the cache key to avoid minor variations
      // (e.g., case, extra spaces) creating different cache entries for essentially the same question.
      const normalizedCurrentUserQuestion =
        normalizeQuestionForCache(currentUserQuestion);

      console.log(
        `[DEBUG] Current user question (raw, first 100 chars): "${currentUserQuestion?.substring(0, 100)}"`,
      );
      console.log(
        `[DEBUG] Current user question (normalized): "${normalizedCurrentUserQuestion}"`,
      );
      // The log for predefined cacheable question is no longer relevant here.

      // NEW CACHING LOGIC: Cache if it's the first message in the thread.
      if (messages.length === 1) {
        console.log(
          "[DEBUG] This is the FIRST message. This question IS cacheable.",
        );
        isCacheableQuestion = true; // Mark as cacheable
        // Generate a cache key based on the slug AND the normalized question content
        // to ensure different initial questions for the same slug have different cache entries.
        // Using a prefix like "initial-q::" to distinguish from other potential cache types in the future.
        cacheKey = `initial-q::${slug}::${normalizedCurrentUserQuestion}`;
        console.log(`[DEBUG] Generated cache key: "${cacheKey}"`);

        // Attempt cache read
        try {
          console.log(`[CACHE] Checking cache for key: ${cacheKey}`);
          const cachedAnswer = await aiCache.get(cacheKey);
          if (cachedAnswer) {
            console.log(
              `[CACHE] HIT for key: ${cacheKey}. Returning cached answer.`,
            );
            // Log cache hit to R2
            if (aiLogsBucket) {
                const cacheTurnData = { sessionId, readerId, blogSlug: slug, turnTimestampUTC: new Date().toISOString(), userQuestion: currentUserQuestion, aiResponse: cachedAnswer, source: "cache", cacheKey };
                // Use a new timestamp for this specific log entry if r2Key was based on initial turnTimestamp
                const cacheLogKey = getR2SessionLogKey(slug, sessionId, new Date().toISOString());
                locals.runtime.ctx.waitUntil( // Changed
                    aiLogsBucket.put(cacheLogKey, JSON.stringify(cacheTurnData), { httpMetadata: { contentType: 'application/json' } })
                    .then(() => console.log(`Logged CACHE HIT to R2: ${cacheLogKey}`))
                    .catch(e => console.error(`Error logging CACHE HIT to R2 for ${cacheLogKey}:`, e))
                );
            }
            return new Response(
              JSON.stringify({ answer: cachedAnswer, source: "cache" }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              },
            );
          } else {
            console.log(`[CACHE] MISS for key: ${cacheKey}`);
          }
        } catch (kvError) {
          console.error(
            `[CACHE] KV Cache read error for key ${cacheKey}:`,
            kvError,
          );
          // If cache read fails, proceed to LLM call. Do not block the request.
        }
      } else {
        console.log(
          `[DEBUG] This is NOT the FIRST message (messages.length: ${messages.length}). Not attempting cache read, and will not write to cache later.`,
        );
      }
      // The old 'if/else' block checking against NORMALIZED_CACHEABLE_QUESTION is removed.
    } else {
      let reason = "[DEBUG] Initial conditions for caching not met: ";
      if (!aiCache) reason += "KV unavailable. ";
      if (!lastMessage) reason += "No last message. ";
      else if (lastMessage.role !== "user")
        reason += `Last message not from user (role: ${lastMessage.role}). `;
      console.log(reason.trim());
    }

    // 5. Prepare the payload for OpenRouter if not served from cache
    // The entire `post.body` is used as context, as requested.
    // Be aware: Extremely large post bodies might exceed model context limits.
    const siteUrl = new URL(request.url).origin; // Get site's base URL

    // --- Define Payload for the Answering LLM ---
    const answererSystemPrompt = `/no_think You are an expert assistant for a technical blog. Your primary goal is to provide short, technically deep answers, often definitions of terms found in the blog post. Aim for responses around 5 lines or less. The user is asking about the following blog post content:\n\n--- BEGIN BLOG POST ---\n${postBodyForContext}\n--- END BLOG POST ---\n\nUse the chat history below for context if relevant to the current question.`;

    const answererPayload = {
      model: DEFAULT_MODEL,
      messages: [
        { role: "system", content: answererSystemPrompt },
        // Ensure `messages` here is the chat history from the client, not the one used for cache check
        ...(body.messages || []), // Use body.messages which is the chat history for LLM
      ],
      provider: { order: ["cerebras", "sambanova", "lambda"] },
      max_tokens: 1000,
      temperature: 0.3,
    };

    // --- Prepare and Make Answerer LLM Call ---
    const commonHeaders = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl,
      "X-Title": "Blog AI Assistant",
    };

    const answererResponse = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify(answererPayload),
    });

    if (!answererResponse.ok) {
      const errorText = await answererResponse.text();
      console.error(
        `Answerer API Error: Status ${answererResponse.status}`,
        errorText,
      );
      // Log LLM error to R2
      if (aiLogsBucket) {
          const llmErrorData = { sessionId, readerId, blogSlug: slug, turnTimestampUTC: new Date().toISOString(), userQuestion: currentUserQuestion, errorDetails: `LLM API Error: Status ${answererResponse.status}. Details: ${errorText.substring(0,1000)}`, source: "error_llm_api" };
          // Use a new timestamp for this specific log entry
          const llmErrorLogKey = getR2SessionLogKey(slug, sessionId, new Date().toISOString());
          locals.runtime.ctx.waitUntil(aiLogsBucket.put(llmErrorLogKey, JSON.stringify(llmErrorData))); // Changed
      }
      return new Response(
        JSON.stringify({
          error: `AI service (answerer) returned an error: ${answererResponse.status}. Details: ${errorText}`,
        }),
        {
          status: answererResponse.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const answerData = await answererResponse.json();
    let aiAnswer = answerData.choices?.[0]?.message?.content;
    if (!aiAnswer && answerData.choices?.[0]?.message?.reasoning) {
      aiAnswer = answerData.choices[0].message.reasoning;
    }
    if (!aiAnswer) {
      aiAnswer = "No answer was received from the AI for your question.";
    }

    // Log successful LLM response to R2
    if (aiLogsBucket) {
        const llmTurnData = { sessionId, readerId, blogSlug: slug, turnTimestampUTC: new Date().toISOString(), userQuestion: currentUserQuestion, aiResponse: aiAnswer, source: "llm", modelUsed: DEFAULT_MODEL };
        // Use a new timestamp for this specific log entry
        const llmLogKey = getR2SessionLogKey(slug, sessionId, new Date().toISOString());
        locals.runtime.ctx.waitUntil( // Changed
            aiLogsBucket.put(llmLogKey, JSON.stringify(llmTurnData), { httpMetadata: { contentType: 'application/json' } })
            .then(() => console.log(`Logged LLM response to R2: ${llmLogKey}`))
            .catch(e => console.error(`Error logging LLM response to R2 for ${llmLogKey}:`, e))
        );
    }

    // 6. Store in Cache if it was a cacheable question (content matched AND was first message) and LLM call was successful
    console.log(
      `[DEBUG] Conditions for cache write: isCacheableQuestion=${isCacheableQuestion}, aiCache=${!!aiCache}, answererResponse.ok=${answererResponse.ok}, aiAnswer exists=${!!aiAnswer}`,
    );
    if (isCacheableQuestion && aiCache && answererResponse.ok && aiAnswer) {
      try {
        // cacheKey would have been set if isCacheableQuestion is true
        console.log(
          `[CACHE] Writing to cache for key: ${cacheKey} (LLM answer: "${aiAnswer.substring(0, 50)}...")`,
        );
        await aiCache.put(cacheKey, aiAnswer, {
          expirationTtl: CACHE_TTL_SECONDS,
        });
        console.log(`[CACHE] Successfully wrote to cache for key: ${cacheKey}`);
      } catch (kvError) {
        console.error(
          `[CACHE] KV Cache write error for key ${cacheKey}:`,
          kvError,
        );
      }
    } else if (answererResponse.ok && aiAnswer) {
      // Log why write was skipped if LLM call was ok but not cached
      let skipReason = "[DEBUG] Cache write skipped: ";
      if (!isCacheableQuestion) {
        // If it wasn't cacheable, and we got this far, it's likely because it wasn't the first message,
        // or initial conditions (KV, user message) weren't met.
        if (lastMessage && lastMessage.role === "user" && messages.length > 1) {
          skipReason += "Question was not the first message. ";
        } else {
          skipReason +=
            "Question was not eligible for caching (check earlier logs for specifics like KV availability or message role). ";
        }
      }
      // The following conditions are less likely if !isCacheableQuestion was the primary reason,
      // but good to keep for completeness if other parts of the `if` for writing failed.
      if (!aiCache && isCacheableQuestion)
        skipReason += "KV unavailable (though question was deemed cacheable). "; // Edge case
      if (!answererResponse.ok) skipReason += "LLM response not OK. "; // This is already checked by the outer if
      if (!aiAnswer) skipReason += "No AI answer. "; // This is also checked
      console.log(skipReason.trim());
    }

    return new Response(JSON.stringify({ answer: aiAnswer, source: "llm" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in /api/ask endpoint:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    // Log general error to R2
    if (aiLogsBucket) {
        // Try to get slug and sessionId from body if available, otherwise use placeholders or omit
        const errorSlug = typeof slug === 'string' ? slug : "unknown_slug";
        const errorSessionId = typeof sessionId === 'string' ? sessionId : "unknown_session";
        const errorReaderId = typeof readerId === 'string' ? readerId : "unknown_reader";
        const errorUserQuestion = typeof currentUserQuestion === 'string' ? currentUserQuestion : "unknown_question";

        const generalErrorData = { sessionId: errorSessionId, readerId: errorReaderId, blogSlug: errorSlug, turnTimestampUTC: new Date().toISOString(), userQuestion: errorUserQuestion, errorDetails: `Outer API Error: ${errorMessage.substring(0,1000)}`, source: "error_api_catch_all" };
        // Use a new timestamp for this specific log entry
        const generalErrorLogKey = getR2SessionLogKey(errorSlug, errorSessionId, new Date().toISOString());
        locals.runtime.ctx.waitUntil(aiLogsBucket.put(generalErrorLogKey, JSON.stringify(generalErrorData))); // Changed
    }
    return new Response(
      JSON.stringify({
        error: `An unexpected server error occurred: ${errorMessage}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
