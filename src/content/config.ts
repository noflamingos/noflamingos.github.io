import { defineCollection, z } from "astro:content";
import { CATEGORY_SLUGS } from "../lib/categories";

const drills = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),

    // Multi-tag categories (min 1). UI will still allow only one filter selection at a time.
    categories: z
      .array(z.enum(CATEGORY_SLUGS as [string, ...string[]]))
      .min(1),

    // Optional: one “main” category for display
    primary_category: z.enum(CATEGORY_SLUGS as [string, ...string[]]).optional(),

    level: z.string().optional(),
    time_minutes: z.number().int().positive().optional(),
    group_size: z.string().optional(),
    equipment: z.array(z.string()).optional(),
    summary: z.string().max(220),

    images: z.array(z.string()).optional(),
    video_url: z.string().url().optional().or(z.literal("")),
  }),
});

export const collections = { drills };
