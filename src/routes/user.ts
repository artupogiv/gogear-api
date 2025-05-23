import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

import { prisma } from "../lib/prisma";
import { PublicUserSchema, PublicUsersSchema } from "../modules/user/schema";

export const usersRoute = new OpenAPIHono();

// GET all users
usersRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Users"],
    summary: "Get all users",
    responses: {
      200: {
        content: { "application/json": { schema: PublicUsersSchema } },
        description: "Get all users",
      },
    },
  }),
  async (c) => {
    const users = await prisma.user.findMany({
      omit: { email: true },
    });
    return c.json(users);
  }
);

// GET user by id
usersRoute.openapi(
  createRoute({
    method: "get",
    path: "/:id",
    tags: ["Users"],
    summary: "Get user by id",
    request: { params: z.object({ id: z.string() }) },
    responses: {
      200: {
        content: { "application/json": { schema: PublicUserSchema } },
        description: "Get user by id",
      },
      404: {
        description: "User not found",
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { email: true },
    });

    if (!user) {
      return c.notFound();
    }

    return c.json(user);
  }
);
