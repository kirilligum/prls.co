import fetch from 'node-fetch';
import { load } from 'cheerio';
import { writeFileSync } from 'fs';
import { URL } from 'url';

const baseUrl = 'https://docs.astro.build/en/';
async function main() {
  const res = await fetch(baseUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'text/html'
    }
  });
  const html = await res.text();
  const $ = load(html);
  const urls = new Set();

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    if (href.startsWith('/en/')) {
      urls.add(new URL(href, baseUrl).href);
    } else if (href.startsWith(baseUrl)) {
      urls.add(href);
    }
  });

  const sorted = Array.from(urls).sort();
  // Print URLs to console
  sorted.forEach((url) => console.log(url));
  const outputPath = 'docs/astro.build/urls.txt';
  writeFileSync(outputPath, sorted.join('\n'));
  console.log(`Saved ${sorted.length} URLs to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
