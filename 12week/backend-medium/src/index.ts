import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

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
