const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const { username, passsword } = req.body;
  try {
    User.create({ username, passsword });
  } catch (error) {
    res.status(403);
  }
  res.status(200).send(`Done`);
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const response = await Course.find({});
    res.status(200).json({ courses: response });
  } catch (error) {
    res.status(403).json({ message: "internal server error" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  try {
    await User.updateOne(
      { username: username },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
  } catch (error) {
    res.status(403).json({ message: `internal server urr gya` });
  }
  res.status(200).json({ message: "Done" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  try {

    const user = await User.findOne({ username });
    const courses = await Course.find({
      _id: {
        $in: user.purchasedCourses,
      },
    });
    res.status(200).json({ courses: courses });

    // const user = await User.findOne({ username }).populate('purchasedCourses');
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    // res.status(200).json({ purchasedCourses: user.purchasedCourses });

  } catch (error) {
    res.status(403).json({ message: "Could load your courses" });
  }
});

module.exports = router;
