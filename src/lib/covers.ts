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
  const explicit = String(post?.data?.cover || "").trim();
  if (explicit) return explicit;

  const category = NORMALIZE(post?.data?.category || "default");
  return CATEGORY_MAP[category] ?? CATEGORY_MAP.default;
}

export function categoryBanner(category: string): string {
  const key = NORMALIZE(category || "default");
  return CATEGORY_MAP[key] ?? CATEGORY_MAP.default;
}

export function defaultCover(): string {
  return CATEGORY_MAP.default;
}
