import { Hono } from "hono";
import { prisma } from "./lib/prisma";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "⚙️ GoGear Backend REST API",
  });
});

app.get("/products", async (c) => {
  const products = await prisma.product.findMany();
  return c.json(products);
});

// TODO: Get product by slug

export default app;
