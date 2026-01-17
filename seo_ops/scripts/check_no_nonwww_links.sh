#!/usr/bin/env bash
set -euo pipefail

search_root="website/public"
pattern="https://prls.co/"
pattern_http="http://prls.co/"

if command -v rg >/dev/null 2>&1; then
  if rg -n --glob "${search_root}/**" --glob "!${search_root}/_redirects" --fixed-strings "${pattern}" "${search_root}" || \
     rg -n --glob "${search_root}/**" --glob "!${search_root}/_redirects" --fixed-strings "${pattern_http}" "${search_root}"; then
    echo ""
    echo "Non-canonical host links found in ${search_root} (excluding _redirects)."
    echo "Replace with https://www.prls.co/ to avoid non-www discovery."
    exit 1
  fi
  exit 0
fi

if grep -RIn --exclude="_redirects" "${pattern}" "${search_root}" || \
   grep -RIn --exclude="_redirects" "${pattern_http}" "${search_root}"; then
  echo ""
  echo "Non-canonical host links found in ${search_root} (excluding _redirects)."
  echo "Replace with https://www.prls.co/ to avoid non-www discovery."
  exit 1
fi
