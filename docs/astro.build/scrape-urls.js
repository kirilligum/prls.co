import fetch from 'node-fetch';
import { load } from 'cheerio';
import { writeFileSync } from 'fs';

const sitemapUrl = 'https://docs.astro.build/sitemap.xml';
async function main() {
  const res = await fetch(sitemapUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/xml'
    }
  });
  const xml = await res.text();
  const $ = load(xml, { xmlMode: true });
  const urls = new Set();

  $('loc').each((_, el) => {
    const url = $(el).text();
    if (url.startsWith('https://docs.astro.build/en/')) {
      urls.add(url);
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
