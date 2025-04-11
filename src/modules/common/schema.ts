import { z } from "@hono/zod-openapi";

export const QuerySchema = z.object({
  q: z.string().optional().describe("Search cquery"),
});

export const ParamSlugSchema = z.object({
  slug: z.string().describe("Search cquery"),
});
