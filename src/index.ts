import { cors } from "hono/cors";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { productRoutes } from "./routes/product";
import { usersRoute } from "./routes/user";
import { authRoutes } from "./routes/auth";

const app = new OpenAPIHono();

app.use(cors());

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "GoGear API",
    description: "API for gogear.com",
  },
});

app.route("/products", productRoutes);
app.route("/users", usersRoute);
app.route("/auth", authRoutes);

app.get(
  "/",
  Scalar({
    pageTitle: "GoGear API",
    theme: "saturn",
    spec: { url: "/openapi.json" },
  })
);

export default app;
