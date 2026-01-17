#!/usr/bin/env fish
set -euo pipefail

set repo_root (pwd)
set urls_file "$repo_root/seo_ops/scripts/urls_priority.txt"

if not test -f $urls_file
  echo "Missing URL list: $urls_file"
  exit 1
end

set urls (cat $urls_file)
set today (date +%F)
set report_path "$repo_root/seo_ops/reports/gsc_inspection_$today.md"

# Use Codex CLI to call GSC API tools and write a report file.
set prompt "You are an SEO ops agent. Use GSC API tools to inspect each URL and write a report to $report_path with status (indexed/not indexed), coverage, and canonical. URLs:\n$urls"

codex exec -C $repo_root -a never --sandbox danger-full-access "$prompt"
