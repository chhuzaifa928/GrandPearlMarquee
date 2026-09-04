const express = require("express");

const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  dashboardStats,
} = require("../controllers/adminController");

const verifyToken = require("../middleware/authMiddleware");
const requireSuperAdmin = require("../middleware/requireSuperAdmin");
const adminValidator = require("../validators/adminValidator");

router.post(
  "/register",
  verifyToken,
  requireSuperAdmin,
  adminValidator,
  registerAdmin
);
router.post("/login", loginAdmin);
router.get("/dashboard", verifyToken, dashboardStats);
// Verify Admin Session
router.get("/me", verifyToken, (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});
// Protected Test Route
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
    admin: req.admin,
  });
});

module.exports = router;