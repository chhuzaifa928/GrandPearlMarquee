const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  fetchSettings,
  saveSettings,
} = require("../controllers/settingsController");

// Get settings
router.get(
  "/",
  verifyToken,
  fetchSettings
);

// Update settings
router.put(
  "/",
  verifyToken,
  saveSettings
);

module.exports = router;