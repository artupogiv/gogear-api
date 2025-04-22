import { z } from "@hono/zod-openapi";

export const CategorySchema = z.object({
  id: z.string().ulid(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CategoriesSchema = z.array(CategorySchema);

export const CreateCategorySchema = CategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

export const UpdateCategorySchema = CreateCategorySchema.strict();

export type Category = z.infer<typeof CategorySchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
