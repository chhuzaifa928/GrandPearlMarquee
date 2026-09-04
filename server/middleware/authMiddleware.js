const jwt = require("jsonwebtoken");
const cookie = require("cookie");

// =====================================
// Admin authentication cookie
// =====================================
// The JWT is delivered and carried in this HttpOnly cookie
// (never exposed to frontend JavaScript). The middleware reads the
// token from the cookie instead of an Authorization header.

const AUTH_COOKIE_NAME = "admintoken";
const AUTH_COOKIE_LIFETIME_MS = 12 * 60 * 60 * 1000; // matches JWT expiresIn "12h"

// HttpOnly cookie options shared by login (set) and logout (clear).
const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: AUTH_COOKIE_LIFETIME_MS,
});

const verifyToken = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies[AUTH_COOKIE_NAME];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      {
        algorithms: ["HS256"],
      }
    );

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

verifyToken.AUTH_COOKIE_NAME = AUTH_COOKIE_NAME;
verifyToken.getAuthCookieOptions = getAuthCookieOptions;

module.exports = verifyToken;