import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use(cors());

// or could use: app.use(authmiddleware)
const authmiddleware = async (c: any, next: any) => {
  try {
    const req = await c.req.json();
    const token = req.header("Authorization");
    // jwt.verify(token,jwtPassword);
    //do authentication check using jwt or something
    next();
  } catch (error) {
    console.log(error);
  }
};

app.get("/", async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));
  return c.text("Hello Hono!");
});

app.post("/name", authmiddleware, async (c) => {
  const body = await c.req.json();
  console.log(body);
  return c.json({ name: body.name });
});

export default app;
