export function coverFor(postOrCategory: any): string {
  // If passed a post, try post.data.cover first
  const category =
    typeof postOrCategory === "string"
      ? postOrCategory
      : (postOrCategory?.data?.category ?? "default");

  const explicitCover =
    typeof postOrCategory === "object" ? postOrCategory?.data?.cover : null;

  if (explicitCover && typeof explicitCover === "string") return explicitCover;

  const c = String(category || "default").toLowerCase();

  const map: Record<string, string> = {
    world: "/covers/world.jpg",
    politics: "/covers/politics.jpg",
    business: "/covers/business.jpg",
    technology: "/covers/technology.jpg",
    culture: "/covers/culture.jpg",
    latest: "/covers/default.jpg",
    default: "/covers/default.jpg",
  };

  return map[c] ?? map.default;
}

