const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/decorMediaUpload");

const {
  fetchDecorMedia,
  uploadDecorMedia,
  removeDecorMedia,
} = require("../controllers/decorMediaController");

// ===============================
// Public Routes
// ===============================

// Get all media for a decor
router.get("/:decorId", fetchDecorMedia);

// ===============================
// Protected Admin Routes
// ===============================

// Upload multiple images/videos
router.post(
  "/:decorId",
  verifyToken,
  upload.array("media", 20),
  uploadDecorMedia
);

// Delete media
router.delete(
  "/:id",
  verifyToken,
  removeDecorMedia
);

module.exports = router;