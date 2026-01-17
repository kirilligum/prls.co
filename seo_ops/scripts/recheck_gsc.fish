#!/usr/bin/env fish
set -euo pipefail

set repo_root (pwd)
set urls_file "$repo_root/seo_ops/scripts/urls_priority.txt"

if not test -f $urls_file
  echo "Missing URL list: $urls_file"
  exit 1
end

set urls (cat $urls_file)

# Full recheck: inspect URLs via API, then use Playwright to request indexing if needed.
set prompt "You are an SEO ops agent. First inspect each URL in GSC (API) and note status. For any URL that is 'Discovered - currently not indexed' or 'Crawled - currently not indexed', use Playwright GUI to request indexing. Log actions and outcomes to tasks/doing or tasks/done with timestamps. URLs:\n$urls"

codex exec -C $repo_root -a never --sandbox danger-full-access "$prompt"
