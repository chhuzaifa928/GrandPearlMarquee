const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);
  console.log("JWT Secret Exists:", !!process.env.JWT_SECRET);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

module.exports = verifyToken;