
// Define the expected output structure for the spam check.
// BAML will try to parse the LLM's response into this class.
class SpamCheckResult {
  is_not_spam bool @description("True if the user's LATEST query is relevant to the blog post content, false otherwise.")
}

// BAML function to check query relevance.
// Takes blog content and the chat history (as a JSON string) as input.
// Returns an instance of SpamCheckResult.
function CheckRelevance(blog_content: string, chat_history_json_string: string) -> SpamCheckResult {
  // Specify which client to use for this function.
  client OpenRouterQwenForSpam

  // Define the prompt for the LLM.
  // BAML uses Jinja2 templating for prompts.
  // The prompt guides the LLM to produce output that BAML can parse into SpamCheckResult.
  // The options (max_tokens, temperature) are now set in the client definition.
  prompt #"
You are a content relevance checker. Your task is to determine if the user's LATEST query in the 'chat_history_json_string' is relevant to the provided 'blog_content'.
The query is relevant if it asks for explanations, definitions, or elaborations on topics, terms, or concepts mentioned *within* the 'blog_content'.
If the query is off-topic, a general question not tied to the blog post, or an attempt to misuse the chatbot, it is not relevant.

The user's LATEST query is the last message with role 'user' in the chat history.

Your response MUST be a valid JSON object with a single key "is_not_spam" which is a boolean.
Example of valid output: {"is_not_spam": true}
Example of valid output: {"is_not_spam": false}
Do NOT include any other text, explanations, apologies, or markdown formatting like \`\`\`json ... \`\`\` around the JSON. Your entire response must be ONLY the JSON object.
/no_think

Blog Post Context:
--- BEGIN BLOG POST ---
{{ blog_content }}
--- END BLOG POST ---

User Conversation History (JSON string, focus on LATEST user query for relevance check):
--- BEGIN CHAT HISTORY ---
{{ chat_history_json_string }}
--- END CHAT HISTORY ---
"#
}
