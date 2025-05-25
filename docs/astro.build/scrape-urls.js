import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { URL } from 'url';

const baseUrl = 'https://docs.astro.build/en/';
async function main() {
  const res = await fetch(baseUrl);
  const html = await res.text();
  const $ = cheerio.load(html);
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
  const outputPath = 'docs/astro.build/urls.txt';
  writeFileSync(outputPath, sorted.join('\n'));
  console.log(`Saved ${sorted.length} URLs to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
