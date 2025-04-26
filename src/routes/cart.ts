import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { prisma } from "../lib/prisma";
import {
  LoginUserSchema,
  LoginResponseSchema,
  PublicUserSchema,
  RegisterUserSchema,
  PrivateUserSchema,
} from "../modules/user/schema";
import { checkAuthorized } from "../modules/auth/middleware";
import { CartSchema } from "../modules/cart/schema";

export const cartRoutes = new OpenAPIHono();

// GET /auth/me
cartRoutes.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Cart"],
    summary: "Get cart",
    middleware: checkAuthorized,
    responses: {
      200: {
        content: { "application/json": { schema: CartSchema } },
        description: "Get cart",
      },
    },
  }),
  async (c) => {
    const user = c.get("user");
  }
);
