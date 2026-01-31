import { getCollection } from "astro:content";

export async function GET({ site }) {
  const posts = (await getCollection("posts"))
    .sort((a, b) => b.data.publishDate.localeCompare(a.data.publishDate))
    .slice(0, 50);

  const items = posts
    .map((p) => {
      const link = new URL(`/p/${p.slug}`, site).toString();
      return `
      <item>
        <title><![CDATA[${p.data.title}]]></title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${new Date(p.data.publishDate).toUTCString()}</pubDate>
        <description><![CDATA[${p.data.deck}]]></description>
      </item>
    `.trim();
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>The National Signal</title>
      <link>${site}</link>
      <description>Tracking patterns shaping what comes next.</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
