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
  latest: "/covers/default.webp",
  default: "/covers/default.webp",

  // aliases (optional)
  tech: "/covers/technology.webp",
  "sci-tech": "/covers/technology.webp",
  signals: "/covers/default.webp",
};

export function coverFor(postOrCategory: any): string {
  // 1) If post explicitly sets a cover, use it
  const explicitCover =
    typeof postOrCategory === "object" ? postOrCategory?.data?.cover : null;
  if (explicitCover && typeof explicitCover === "string") return explicitCover;

  // 2) If we have a post slug, try /posts/<slug>.webp automatically
  const slug =
    typeof postOrCategory === "object" ? String(postOrCategory?.slug ?? "") : "";
  if (slug) return `/posts/${slug}.webp`;

  // 3) Category fallback
  const category =
    typeof postOrCategory === "string"
      ? postOrCategory
      : postOrCategory?.data?.category;

  const key = NORMALIZE(category || "default");
  return CATEGORY_MAP[key] ?? CATEGORY_MAP.default;
}

export function categoryBanner(category: string): string {
  const key = NORMALIZE(category || "default");
  return CATEGORY_MAP[key] ?? CATEGORY_MAP.default;
}

export function defaultCover(): string {
  return "/covers/default.webp";
}
