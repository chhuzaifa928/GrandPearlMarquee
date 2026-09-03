const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const validId = require("../validators/idValidator");
const upload = require("../middleware/decorMediaUpload");
const multerErrorHandler = require("../middleware/multerErrorHandler");

const {
  fetchDecorMedia,
  uploadDecorMedia,
  removeDecorMedia,
} = require("../controllers/decorMediaController");

// ===============================
// Public Routes
// ===============================

// Get all media for a decor
router.get("/:decorId", validId("decorId"), fetchDecorMedia);

// ===============================
// Protected Admin Routes
// ===============================

// Upload multiple images/videos
router.post(
  "/:decorId",
  verifyToken,
  validId("decorId"),
  upload.array("media", 20),
  uploadDecorMedia,
  multerErrorHandler
);

// Delete media
router.delete(
  "/:id",
  verifyToken,
  validId("id"),
  removeDecorMedia
);

module.exports = router;