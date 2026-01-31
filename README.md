# Signal Underway — Mobile-first "signals" publication (Astro)

This is a lightweight, ultra-fast, mobile-first publication template built for:
- High CTR headlines
- Strong on-page SEO (OpenGraph/Twitter cards)
- Clean reading experience (short paragraphs, strong hierarchy)
- Static deployment for lowest cost (Cloudflare Pages, Vercel, Netlify)

## 1) Quick start (local)
Prereqs: Node 18+

```bash
npm install
npm run dev
```

## 2) Publish
### Cloudflare Pages (recommended)
1. Push this repo to GitHub
2. Cloudflare Pages → Create project → connect repo
3. Build command: `npm run build`
4. Output directory: `dist`

### Vercel / Netlify
- Build: `npm run build`
- Output: `dist`

## 3) Add/modify articles
Articles live in `src/content/posts/*.md`.

Each post has frontmatter:
- title
- deck (one-line hook)
- category (World/Politics/Business/Technology/Culture)
- cover (optional path under /public/covers/)
- publishDate (YYYY-MM-DD)
- tags (array)

## 4) SEO
- Auto OG/Twitter meta per post
- JSON-LD Article schema per post
- RSS feed at /rss.xml
- Sitemap at /sitemap-index.xml (Astro sitemap integration recommended later)

## 5) Analytics (optional)
This template includes a placeholder for **Plausible** (privacy-friendly). Replace the domain in:
`src/components/Analytics.astro`

## Notes
This template intentionally avoids invasive tracking. If you later want personalization, do it ethically:
- anonymous session-based recommendations
- no fingerprinting
- clear consent for any non-essential cookies
