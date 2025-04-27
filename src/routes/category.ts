import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../lib/prisma";
import { CategoriesSchema } from "../modules/category/schema";
import { ParamSlugSchema } from "../modules/common/schema";

export const categoryRoutes = new OpenAPIHono();

// GET all categories
categoryRoutes.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Categories"],
    summary: "Get all categories",
    description: "Get all categories",
    responses: {
      200: {
        content: { "application/json": { schema: CategoriesSchema } },
        description: "Get all categories response",
      },
    },
  }),
  async (c) => {
    const categories = await prisma.category.findMany();
    return c.json(categories);
  }
);

// GET category by slug
categoryRoutes.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    tags: ["Categories"],
    summary: "Get category by slug",
    description: "Get category by slug",
    request: { params: ParamSlugSchema },
    responses: {
      200: {
        content: { "application/json": { schema: CategoriesSchema } },
        description: "Get category by slug response",
      },
      404: {
        description: "Category not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");
    const product = await prisma.product.findMany({where: { categorySlug: slug }});
    });
    if (!category) {
      return c.notFound();
    }
    return c.json(category);
  }
);
