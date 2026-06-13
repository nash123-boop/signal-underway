import { getCollection } from "astro:content";

const staticPages = ["/", "/latest", "/about", "/method", "/privacy", "/c/world", "/c/politics", "/c/business", "/c/technology", "/c/culture"];

export async function GET({ site }) {
  const base = site ?? new URL("https://signal-underway.pages.dev");
  const posts = await getCollection("posts");
  const pages = [
    ...staticPages.map((path) => ({ path })),
    ...posts.map((post) => ({ path: `/p/${post.slug}`, lastmod: post.data.updatedDate ?? post.data.publishDate })),
  ];
  const urls = pages.map(({ path, lastmod }) => `  <url>\n    <loc>${new URL(path, base)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
