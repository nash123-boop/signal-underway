export function sortPostsNewest<T extends { id: string; data: { publishDate: string; publishTime?: string } }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    const aPublished = `${a.data.publishDate}T${a.data.publishTime ?? "00:00"}`;
    const bPublished = `${b.data.publishDate}T${b.data.publishTime ?? "00:00"}`;
    return bPublished.localeCompare(aPublished) || b.id.localeCompare(a.id);
  });
}

export function belongsToSection(
  post: { data: { category: string; tags: string[] } },
  section: string,
): boolean {
  const normalizedSection = section.trim().toLowerCase();
  return post.data.category.toLowerCase() === normalizedSection
    || post.data.tags.some((tag) => tag.trim().toLowerCase() === normalizedSection);
}
