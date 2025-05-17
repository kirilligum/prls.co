---
import rss from '@astrojs/rss';
const posts = import.meta.glob('./blog/*.astro', { eager: true });
export const get = () =>
  rss({
    title: 'Pearls of Wisdom Blog',
    description: 'Insights on how LLMs process HTML and AI-SEO best practices.',
    site: import.meta.env.SITE,
    items: Object.values(posts).map((post: any) => {
      const fm = post.frontmatter;
      return {
        title: fm.title,
        description: fm.description,
        pubDate: new Date(fm.pubDate),
        link: `/blog/${fm.slug}/`,
        customData: `<author>${fm.author}</author>`,
      };
    }),
  });
---
