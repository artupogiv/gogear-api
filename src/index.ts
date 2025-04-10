import { cors } from "hono/cors";
import { OpenAPIHono } from "@hono/zod-openapi";
import { productRoutes } from "./routes/product";
import { Scalar } from "@scalar/hono-api-reference";

const app = new OpenAPIHono();

app.use(cors());

app.get("/", (c) => {
  return c.json({
    message: "⚙️ GoGear Backend REST API",
  });
});

// The OpenAPI documentation will be available at /openapi.json
app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: 'GoGear API',
    version: '1.0.0',
  },
});

app.route("/products", productRoutes);

// Scalar for OpenAPI documentation
app.get("/docs", Scalar({ url: "/openapi.json" }));

export default app;
