export function GET({ site }) {
  const base = site ?? new URL("https://thenationalangle.com");
  return new Response(`User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", base)}
Sitemap: ${new URL("/news-sitemap.xml", base)}
`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
