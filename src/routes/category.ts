import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../lib/prisma";
import {
  CategoriesSchema,
  CreateCategorySchema,
} from "../modules/category/schema";
import { ProductsSchema } from "../modules/product/schema";
// import { ParamSlugSchema } from "../modules/common/schema";

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

// // GET category by slug
// categoryRoutes.openapi(
//   createRoute({
//     method: "get",
//     path: "/{slug}",
//     tags: ["Categories"],
//     summary: "Get category by slug",
//     description: "Get category by slug",
//     request: { params: ParamSlugSchema },
//     responses: {
//       200: {
//         content: { "application/json": { schema: CategoriesSchema } },
//         description: "Get category by slug response",
//       },
//       404: {
//         description: "Category not found",
//       },
//     },
//   }),
//   async (c) => {
//     const { slug } = c.req.valid("param");
//     const productFiltered = await prisma.product.findMany({where: { categorySlug: slug }});
//     });
//     if (!category) {
//       return c.notFound();
//     }
//     return c.json(category);
//   }
// );

//POST new product
categoryRoutes.openapi(
  createRoute({
    method: "post",
    path: "/",
    tags: ["Categories"],
    summary: "Add new category",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateCategorySchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: { "application/json": { schema: CategoriesSchema } },
        description: "Product successfully created",
      },
    },
  }),
  async (c) => {
    const body = await c.req.json();
    const { data } = body;

    const category = await prisma.category.create({ data });

    return c.json(category, 201);
  }
);
