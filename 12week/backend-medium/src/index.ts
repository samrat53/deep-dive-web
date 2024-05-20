import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify, decode } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (error) {
    c.status(411);
    console.log(error);
    return c.text("invalid");
  }
});

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });
    console.log(user);
    if (!user) {
      c.status(403);
      return c.text("not found");
    } else {
      const jwt = await sign(
        {
          id: user.id,
        },
        c.env.JWT_SECRET
      );

      return c.text(jwt);
    }
  } catch (error) {
    c.status(411);
    console.log(error);
    return c.text("invalid");
  }
});

app.post("/api/v1/blog", (c) => {
  return c.text("jheh");
});

app.put("/api/v1/blog", (c) => {
  return c.text("jheh");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("jheh");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("jheh");
});

export default app;
