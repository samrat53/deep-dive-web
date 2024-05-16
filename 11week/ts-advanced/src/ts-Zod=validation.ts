import { z } from "zod";
import express from "express";

const app = express();
app.use(express.json());

const userProfileSchema = z.object({
  name: z.string().min(1, { message: "name cannot be empty" }),
  email: z.string().email({ message: "invalid email" }),
  age: z.number().min(18, { message: "underaged mofo" }).optional(),
});

//infer final type of req.body from the zod type validation as:
 export type FinalUserSchema=z.infer<typeof userProfileSchema>

app.put("/user", (req, res) => {
  const result = userProfileSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  const updateBody:FinalUserSchema = result.data;
  res.json({
    message: "user updated",  
    updateBody,
  });
});

app.listen(3000, () => console.log(`listening on port 3000`)) ;
