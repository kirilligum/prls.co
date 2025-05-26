import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
// import { marcado } from 'marcado'; // If you need to render markdown for description

export async function GET(context) {
  const blogPosts = await getCollection('blog');
  return rss({
    title: 'Pearls of Wisdom Blog',
    description: 'Latest posts on LLM data curation and AI insights',
    site: context.site.toString(), // Ensure site is a string
    items: blogPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description, // Or render Markdown: marcado(post.body).html for a snippet
      link: new URL(`/blog/${post.slug}/`, context.site).href,
      // 'content:encoded': marcado(post.body).html, // Optional: full content
    })),
    // (Optional) Add custom data
    customData: `<language>en-us</language>`,
  });
}
