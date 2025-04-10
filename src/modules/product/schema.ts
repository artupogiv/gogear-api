import { z } from "@hono/zod-openapi";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  imageUrl: z.string(),
  categorySlug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProductsSchema = z.array(ProductSchema);
