#!/usr/bin/env fish

# Concatenate all Markdown files in subdirectories under docs/astro.build/pages
# into a single file, preserving the relative path as a header for each file.

set output docs/astro.build/all_pages.md
rm -f $output
echo "# Astro Docs" >> $output
echo "" >> $output

for file in docs/astro.build/pages/**/*.md
    set rel_path (string replace 'docs/astro.build/pages/' '' $file)
    echo "## $rel_path" >> $output
    cat $file >> $output
    echo "" >> $output
end
