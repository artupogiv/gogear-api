import { prisma } from "../lib/prisma";
import { cors } from "hono/cors";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ProductsSchema } from "../modules/product/schema";
import { ParamSlugSchema } from "../modules/common/schema";

const app = new OpenAPIHono();

export const productRoutes = app;
app.use(cors());

app.openapi(
  createRoute({
    method: "get",
    path: "/",
    summary: "Get all products",
    description: "Get all products",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: ProductsSchema,
          },
        },
        description: "Get all products response",
      },
    },
  }),
  async (c) => {
    const products = await prisma.product.findMany();
    const formattedProduct = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));
    return c.json(formattedProduct);
  }
);

app.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
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
      where: { slug }
    });
    if (!product) {
      return c.notFound();
    }
    return c.json(product);
  }
);
