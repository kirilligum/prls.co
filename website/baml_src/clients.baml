
// Client definition for OpenRouter using Claude 3 Haiku,
// specifically for the spam checking task.
client OpenRouterHaikuForSpam {
  // BAML uses 'openai-generic' for providers like OpenRouter
  // that are OpenAI API compatible.
  provider openai-generic
  options {
    // BAML will automatically look for OPENROUTER_API_KEY in environment variables.
    // api_key env.OPENROUTER_API_KEY // This is often implicit if OPENROUTER_API_KEY is set

    // Specify the base URL for OpenRouter.
    base_url "https://openrouter.ai/api/v1"

    // Specify the model to be used with this client.
    model "anthropic/claude-3-haiku-20240307"

    // Default options for this client
    max_tokens 75      // Sufficient for a boolean JSON response.
    temperature 0.0    // For deterministic output.

    // Default retry policy (optional, BAML has defaults)
    // retry_policy {
    //   max_retries 1
    // }
  }
}
