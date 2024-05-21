import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify, decode } from "hono/jwt";
export const blogRouter=new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();

  blogRouter.post("/api/v1/blog", (c) => {
    return c.text("jheh");
  });
  
  blogRouter.put("/api/v1/blog", (c) => {
    return c.text("jheh");
  });
  
  blogRouter.get("/api/v1/blog/:id", (c) => {
    return c.text("jheh");
  });
  
  blogRouter.get("/api/v1/blog/bulk", (c) => {
    return c.text("jheh");
  });