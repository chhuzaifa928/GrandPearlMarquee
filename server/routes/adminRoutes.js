const express = require("express");

const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected Test Route
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
    admin: req.admin,
  });
});

module.exports = router;