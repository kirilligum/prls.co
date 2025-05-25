#!/usr/bin/env bash
set -euo pipefail
shopt -s dotglob nullglob

# Recursively aggregate markdown files bottom-up
# Process directories in reverse order so children run before parents
find . -type d | sort -r | while IFS= read -r dir; do
  # Detect any subdirectories
  subdirs=( "$dir"/*/ )
  has_subdirs=false
  for sd in "${subdirs[@]}"; do
    [ -d "$sd" ] && { has_subdirs=true; break; }
  done
  # Skip leaf directories (no subdirs)
  if ! $has_subdirs; then
    continue
  fi

  output="$dir/agg.md"
  # Create or truncate the aggregate file
  : > "$output"
  if [ -f "$dir/index.md" ]; then
    cat "$dir/index.md" >> "$output"
    echo -e "\n" >> "$output"
  fi

  # Append each child's content
  for sd in "${subdirs[@]}"; do
    [ -d "$sd" ] || continue

    # If child has its own index.md, include that; otherwise include all .md files
    if [ -f "$sd/index.md" ]; then
      echo "# Aggregated from ${sd%/}" >> "$output"
      cat "$sd/index.md" >> "$output"
    else
      for md in "$sd"/*.md; do
        [ -f "$md" ] || continue
        echo "# $(basename "$md")" >> "$output"
        cat "$md" >> "$output"
      done
    fi
    echo -e "\n" >> "$output"
  done
done
