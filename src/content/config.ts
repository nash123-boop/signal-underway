import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    deck: z.string(),
    category: z.enum(["World", "Politics", "Business", "Technology", "Culture"]),
    cover: z.string().optional(),
    publishDate: z.string(), // YYYY-MM-DD
    updatedDate: z.string().optional(),
    author: z.string().default("The National Signal Desk"),
    tags: z.array(z.string()).default([]),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
    })).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts };
