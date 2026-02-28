const NORMALIZE = (s: string) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

const CATEGORY_MAP: Record<string, string> = {
  world: "/covers/world.webp",
  politics: "/covers/politics.webp",
  business: "/covers/business.webp",
  technology: "/covers/technology.webp",
  culture: "/covers/culture.webp",
  default: "/covers/default.webp",
};

export function coverFor(post: any): string {
  const slug = post?.slug;

  if (slug) {
    return `/posts/${slug}.png`;  // now uses PNG
  }

  const category = NORMALIZE(post?.data?.category || "default");
  return CATEGORY_MAP[category] ?? CATEGORY_MAP.default;
}

export function categoryBanner(category: string): string {
  const key = NORMALIZE(category || "default");
  return CATEGORY_MAP[key] ?? CATEGORY_MAP.default;
}
