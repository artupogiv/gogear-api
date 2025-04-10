import { prisma } from "../lib/prisma";
import { cors } from "hono/cors";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ProductsSchema } from "../modules/product/schema";

const app = new OpenAPIHono();

export const productRoutes = app;
app.use(cors());

app.openapi(
  createRoute({
    method: "get",
    path: "/products",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: ProductsSchema,
          },
        },
        description: "Get all products",
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
