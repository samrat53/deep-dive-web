const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  authHeader = authHeader.substring(authHeader.indexOf(" ") + 1);

  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({ message: "invalid headers" });
  }
};

module.exports = {
  authMiddleware,
};
