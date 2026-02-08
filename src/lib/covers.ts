const NORMALIZE = (s: string) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

const MAP: Record<string, string> = {
  world: "/covers/world.webp",
  politics: "/covers/politics.webp",
  business: "/covers/business.webp",
  technology: "/covers/technology.webp",
  culture: "/covers/culture.webp",
  latest: "/covers/default.webp",
  default: "/covers/default.webp",

  // Extra aliases (in case your categories differ)
  tech: "/covers/technology.webp",
  "sci-tech": "/covers/technology.webp",
  "quiet-power": "/covers/business.webp",
  signals: "/covers/default.webp",
};

export function coverFor(postOrCategory: any): string {
  // Explicit post cover wins
  const explicitCover =
    typeof postOrCategory === "object" ? postOrCategory?.data?.cover : null;
  if (explicitCover && typeof explicitCover === "string") return explicitCover;

  // Category fallback
  const category =
    typeof postOrCategory === "string"
      ? postOrCategory
      : postOrCategory?.data?.category;

  const key = NORMALIZE(category || "default");
  return MAP[key] ?? MAP.default;
}

export function categoryBanner(category: string): string {
  const key = NORMALIZE(category || "default");
  return MAP[key] ?? MAP.default;
}
