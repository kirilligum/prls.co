import fetch from 'node-fetch';
import { load } from 'cheerio';
import { writeFileSync } from 'fs';

const sitemapUrl = 'https://docs.astro.build/sitemap-index.xml';
async function main() {
  const res = await fetch(sitemapUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/xml'
    }
  });
  console.log(`Fetched sitemap at ${sitemapUrl}, status ${res.status}`);
  const xml = await res.text();
  console.log('Sitemap XML content:', xml);
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
