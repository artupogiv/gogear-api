import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { ProductSchema } from "../modules/product/schema";
import { prisma } from "../lib/prisma";

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
            schema: ProductSchema,
          },
        },
        description: "Get all products",
      },
    },
  }),
  async (c) => {
    const product = await prisma.product.findMany();
    const formattedProduct = product.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));
    return c.json(formattedProduct);
  }
);
