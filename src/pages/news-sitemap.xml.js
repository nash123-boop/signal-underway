import { getCollection } from "astro:content";

const PUBLICATION_NAME = "The National Angle";
const PUBLICATION_LANGUAGE = "en";
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function publishedAt(post) {
  return new Date(`${post.data.publishDate}T${post.data.publishTime ?? "00:00"}:00Z`);
}

export async function GET({ site }) {
  const base = site ?? new URL("https://thenationalangle.com");
  const now = new Date();
  const cutoff = new Date(now.getTime() - TWO_DAYS_MS);
  const posts = (await getCollection("posts"))
    .filter((post) => {
      const published = publishedAt(post);
      return published >= cutoff && published <= now;
    })
    .sort((a, b) => publishedAt(b).getTime() - publishedAt(a).getTime())
    .slice(0, 1000);

  const urls = posts
    .map((post) => {
      const loc = new URL(`/p/${post.slug}`, base).toString();
      const publicationDate = post.data.publishTime
        ? `${post.data.publishDate}T${post.data.publishTime}:00Z`
        : post.data.publishDate;

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(PUBLICATION_NAME)}</news:name>
        <news:language>${PUBLICATION_LANGUAGE}</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(publicationDate)}</news:publication_date>
      <news:title>${escapeXml(post.data.title)}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
