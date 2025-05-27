
// Client definition for OpenRouter using Qwen3 32b,
// specifically for the spam checking task.
client OpenRouterQwenForSpam {
  // BAML uses 'openai-generic' for providers like OpenRouter
  // that are OpenAI API compatible.
  provider openai-generic
  options {
    // Explicitly set the API key from environment variable
    api_key env.OPENROUTER_API_KEY

    // Specify the base URL for OpenRouter.
    base_url "https://openrouter.ai/api/v1"

    // Specify the model to be used with this client.
    model "qwen/qwen3-32b"

    // Specify provider preference
    provider {
      order ["cerebras", "sambanova", "lambda"]
    }

    // Default options for this client
    max_tokens 75      // Sufficient for a boolean JSON response.
    temperature 0.0    // For deterministic output.

    // Default retry policy (optional, BAML has defaults)
    // retry_policy {
    //   max_retries 1
    // }
  }
}

// Generator block to explicitly define client generation settings
generator baml_client_ts { // You can name this generator (e.g., baml_client_ts)
  output_type "typescript"
  output_dir "../" // Generates into website/baml_client/ if baml_src is website/baml_src/
  version "0.89.0" // Match your @boundaryml/baml package version
}
