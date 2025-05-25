import rss from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Pearls of Wisdom - Blog (Not Available)',
    description: 'Blog is not available',
    site: context.site,
    items: [],
  });
}
