const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const settingsUpload = require("../middleware/settingsUpload");

const {
  fetchSettings,
  saveSettings,
  saveHeroImage,
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

// Admin: Upload Hero Image
// Admin: Upload Hero Image
router.post(
  "/hero-image",
  verifyToken,
  settingsUpload.single("hero_image"),
  saveHeroImage
);

module.exports = router;