const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const router = express.Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  try {
    await Admin.create({ username, password });
  } catch (error) {
    res.status(400).json({ message: "Admin not created" });
  }
  res.status(200).json({ message: "Admin created" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;
  try {
    const newEntry = await User.create({
      title,
      description,
      price,
      imageLink,
    });
    res.status(200).json({ message: "entry done", courseId: newEntry._id });
  } catch (error) {
    res.status(403).send(`course not created`);
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const response = await Course.find({});
    res.status(200).json({ courses: response });
  } catch (error) {
    res.status(403).json({ message: "internal server error" });
  }
});

module.exports = router;
