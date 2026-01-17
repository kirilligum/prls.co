#!/usr/bin/env fish
set -euo pipefail

set repo_root (pwd)
set urls_file "$repo_root/seo_ops/scripts/urls_priority.txt"

if not test -f $urls_file
  echo "Missing URL list: $urls_file"
  exit 1
end

set urls (cat $urls_file)

# Use Codex CLI to run the GUI flow in GSC via Playwright.
# This is required because the GSC API does not support "Request indexing".
set prompt "You are an SEO ops agent. Use Playwright to open Google Search Console for property sc-domain:prls.co. For each URL below, run URL Inspection and click 'Request indexing'. Log results to tasks/done/ with timestamp and include any failures. URLs:\n$urls"

codex exec -C $repo_root -a never --sandbox danger-full-access "$prompt"
