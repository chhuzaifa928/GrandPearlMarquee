const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  fetchSettings,
  saveSettings,
} = require("../controllers/settingsController");

// Public: Get website settings
router.get(
  "/public",
  fetchSettings
);

// Admin: Get settings
router.get(
  "/",
  verifyToken,
  fetchSettings
);

// Admin: Update settings
router.put(
  "/",
  verifyToken,
  saveSettings
);

module.exports = router;