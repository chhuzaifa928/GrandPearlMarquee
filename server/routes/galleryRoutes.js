const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  fetchGallery,
  createGallery,
  removeGallery,
} = require("../controllers/galleryController");

const upload = require("../middleware/galleryUpload");

// Public
router.get("/", fetchGallery);

// Admin
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  createGallery
);

router.delete(
  "/:id",
  verifyToken,
  removeGallery
);

module.exports = router;