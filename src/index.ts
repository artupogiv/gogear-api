import { cors } from "hono/cors";
import { OpenAPIHono } from "@hono/zod-openapi";
import { productRoutes } from "./routes/product";
import { Scalar } from "@scalar/hono-api-reference";

const app = new OpenAPIHono();

app.use(cors());

app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: 'GoGear API',
    version: '1.0.0',
  },
});

app.route("/products", productRoutes);

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
