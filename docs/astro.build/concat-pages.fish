#!/usr/bin/env fish

# Concatenate all Markdown files in subdirectories under docs/astro.build/pages
# into a single file for each directory, preserving the relative path as a header for each file.

for dir in (find docs/astro.build/pages -type d)
    if test -d "$dir"
        # only combine if there are child directories
        set -l subdirs (find "$dir" -mindepth 1 -maxdepth 1 -type d | sort)
        if test (count $subdirs) -eq 0
            # leaf: keep scraped index.md
            continue
        end

        set output "$dir/index.md"
        : > "$output"

        for subdir in $subdirs
            if test -f "$subdir/index.md"
                set rel_path (string replace "$dir" '' "$subdir/index.md")
                echo "# $rel_path" >> "$output"
                cat "$subdir/index.md" >> "$output"
                echo "" >> "$output"
            end
        end

        # also build a single “all.md” with the full content of every child .md
        set all_output "$dir/all.md"
        rm -f "$all_output"
        for subfile in (find "$dir" -type f -name '*.md' -not -path "$dir/index.md" | sort)
            cat "$subfile" >> "$all_output"
            echo "" >> "$all_output"
        end
    end
end

# Also create a single all_pages.md file
set all_pages_output docs/astro.build/all_pages.md
rm -f "$all_pages_output"
echo "# Astro Docs" >> "$all_pages_output"
echo "" >> "$all_pages_output"

for file in docs/astro.build/pages/**/*.md
    if test "$file" != "$all_pages_output"
        set rel_path (string replace 'docs/astro.build/pages/' '' "$file")
        echo "## $rel_path" >> "$all_pages_output"
        cat "$file" >> "$all_pages_output"
        echo "" >> "$all_pages_output"
    end
end
