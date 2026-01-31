import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    deck: z.string(),
    category: z.enum(["World", "Politics", "Business", "Technology", "Culture"]),
    cover: z.string().optional(),
    publishDate: z.string(), // YYYY-MM-DD
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts };
