const express = require("express");
const mongoose = require("mongoose");
const zod = require("zod");
require("dotenv").config();
const app = express();
app.use(express.json());
app.listen(3000);

const db_url = process.env.DB_URL;
mongoose.connect(db_url);
//define schema with mongoose
const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

const validateInputs = (obj) => {
  const inputSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
  });
  return inputSchema.safeParse(obj);
};

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const inputCheck=validateInputs({ name, email, password });
  if(!inputCheck.success){
    return res.json({"msg":"Invalid Input"})
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  user.save();
  res.status(200).json({ msg: "Entry done" });
});
