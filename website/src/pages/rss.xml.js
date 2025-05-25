import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Pearls of Wisdom Blog',
    description: 'Latest posts on LLM data curation and AI insights',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./posts/*.md')),
  });
}
