export const categories = ["World", "Politics", "Business", "Technology", "Culture"] as const;

export function categoryLabel(category: string): string {
  return category === "Culture" ? "Incredible Stories" : category;
}
