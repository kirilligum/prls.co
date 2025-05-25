#!/usr/bin/env fish

# Concatenate all Markdown files in subdirectories under docs/astro.build/pages
# into a single file, preserving the relative path as a header for each file.

set output docs/astro.build/all_pages.md
rm -f $output

for file in (find docs/astro.build/pages -type f -name '*.md' -print0 | xargs -0 -n 1 -I {} basename {} | sort)
    set rel (string replace -r '^docs/astro.build/pages/' '' $file)
    echo "## $rel" >> $output
    cat $file >> $output
    echo "" >> $output
end
