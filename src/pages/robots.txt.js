export function GET({ site }) {
  const base = site ?? new URL("https://signal-underway.pages.dev");
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", base)}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
