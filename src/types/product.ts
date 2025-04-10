import { z } from "@hono/zod-openapi";

export const ProductSchema = z.object({
    id: z.string().ulid(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    categorySlug: z.string(),
    imageUrl: z.string(),
    price: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateProductSchema = ProductSchema.omit({
    id: true,
    slug: true,
    createdAt: true,
    updatedAt: true,
}).strict();

export const UpdateProductSchema = CreateProductSchema.strict();

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;