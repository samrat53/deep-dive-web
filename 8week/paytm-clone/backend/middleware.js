const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || token.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  token = token.substring(token.indexOf(" ") + 1);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    }
    else{
        throw new Error;
    }
  } catch (jwt) {
    return res.status(403).json({});
  }
};

module.exports = { authMiddleware };
