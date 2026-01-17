#!/usr/bin/env bash
set -euo pipefail

search_root="website/public"
pattern=".html"

if command -v rg >/dev/null 2>&1; then
  if rg -n --glob "${search_root}/**" --glob "!${search_root}/_redirects" --fixed-strings "${pattern}"; then
    echo ""
    echo "Legacy .html references found in ${search_root} (excluding _redirects)."
    echo "Remove or update them to canonical non-.html URLs."
    exit 1
  fi
  exit 0
fi

if grep -RIn --exclude="_redirects" "${pattern}" "${search_root}"; then
  echo ""
  echo "Legacy .html references found in ${search_root} (excluding _redirects)."
  echo "Remove or update them to canonical non-.html URLs."
  exit 1
fi
