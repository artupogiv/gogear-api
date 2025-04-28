import { prisma } from "../lib/prisma";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import {
  CreateProductSchema,
  ProductSchema,
  ProductsSchema,
} from "../modules/product/schema";
import { ParamSlugSchema, QuerySchema } from "../modules/common/schema";

export const productRoutes = new OpenAPIHono();

//Get single product by slug
productRoutes.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    tags: ["Products"],
    summary: "Get product by slug",
    description: "Get product by slug",
    request: { params: ParamSlugSchema },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: ProductsSchema,
          },
        },
        description: "Get product by slug response",
      },
      404: {
        description: "Product not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");
    const product = await prisma.product.findUnique({
      where: { slug },
    });
    if (!product) {
      return c.notFound();
    }
    return c.json(product);
  }
);

//GET search product by keyword
productRoutes.openapi(
  createRoute({
    method: "get",
    path: "/search",
    tags: ["Products"],
    summary: "Get products by keyword",
    request: { query: QuerySchema },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: ProductsSchema,
          },
        },
        description: "Search result",
      },
      400: { description: "Bad request" },
    },
  }),
  async (c) => {
    const { q } = c.req.valid("query");
    const products = await prisma.product.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
    });

    if (!products) {
      return c.notFound();
    }

    return c.json(products);
  }
);

//POST new product
productRoutes.openapi(
  createRoute({
    method: "post",
    path: "/",
    tags: ["Products"],
    summary: "Add new product",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateProductSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: { "application/json": { schema: ProductSchema } },
        description: "Product successfully created",
      },
    },
  }),
  async (c) => {
    const body = await c.req.json();
    const { categorySlug, ...data } = body;

    const product = await prisma.product.create({ data });

    return c.json(product, 201);
  }
);

//DELETE product by id
productRoutes.openapi(
  createRoute({
    method: "delete",
    path: "/:id",
    tags: ["Products"],
    summary: "Delete product by id",
    request: { params: z.object({ id: z.string() }) },
    responses: {
      204: { description: "Product successfully deleted" },
      404: { description: "Product not found" },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    const product = await prisma.product.delete({ where: { id } });

    if (!product) {
      return c.notFound();
    }

    return c.json({ message: "Product deleted", data: product }, 200);
  }
);
