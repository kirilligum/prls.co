#!/usr/bin/env fish

# Concatenate all Markdown files in subdirectories under docs/astro.build/pages
# into a single file for each directory, preserving the relative path as a header for each file.

for dir in docs/astro.build/pages/**/
    if test -d "$dir"
        set output "$dir"index.md
        echo "# $dir" > "$output"
        echo "" >> "$output"

        for file in "$dir"*.md
            if test "$file" != "$output"
                set rel_path (string replace "$dir" '' "$file")
                echo "## $rel_path" >> "$output"
                cat "$file" >> "$output"
                echo "" >> "$output"
            end
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
