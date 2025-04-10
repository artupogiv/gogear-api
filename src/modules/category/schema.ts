import { z } from "@hono/zod-openapi";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CategoriesSchema = z.array(CategorySchema);
