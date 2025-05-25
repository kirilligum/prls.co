#!/usr/bin/env fish

# Concatenate all Markdown under docs/astro.build/pages into a single file
set output docs/astro.build/all_pages.md
rm -f $output

for file in (find docs/astro.build/pages -type f -name '*.md' | sort)
    set rel (string replace -r '^docs/astro.build/pages/' '' $file)
    echo "## $rel" >> $output
    cat $file >> $output
    echo "" >> $output
end
