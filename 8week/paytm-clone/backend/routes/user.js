const express = require("express");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { signupBody, signinBody, updateBody } = require("../types");
const { authMiddleware } = require("../middleware");

router.use(authMiddleware);

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!existingUser) {
    return res.status(411).json({
      message: "error while loggin in",
    });
  }
  const userId = existingUser._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    token: token,
  });
});

router.put("/", authMiddleware, async (res, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) return res.status(411).json({ msg: "bad request" });
  await User.updateOne(req.body, {
    _id: req.userId,
  });
  res.status(200).json({ message: "User updated successfully" });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastname: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
