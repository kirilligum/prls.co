import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Pearls of Wisdom Blog',
    description: 'Insights on how LLMs process HTML and AI-SEO best practices.',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}`,
      customData: `<author>${post.data.author}</author>`,
    })),
  });
}
