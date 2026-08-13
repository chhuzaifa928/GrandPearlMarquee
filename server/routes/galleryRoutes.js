const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

// Gallery controller
const {
  fetchGallery,
  createGallery,
  removeGallery,
} = require("../controllers/galleryController");

// Gallery category controller
const {
  fetchGalleryCategories,
  createGalleryCategory,
  removeGalleryCategory,
} = require("../controllers/galleryCategoryController");

const upload = require("../middleware/galleryUpload");

// =====================================
// Public Routes
// =====================================

// Get all gallery items
router.get("/", fetchGallery);

// Get all gallery categories
router.get("/categories", fetchGalleryCategories);

// =====================================
// Admin Category Routes
// =====================================

// Add category
router.post(
  "/categories",
  verifyToken,
  createGalleryCategory
);

// Delete category
router.delete(
  "/categories/:id",
  verifyToken,
  removeGalleryCategory
);

// =====================================
// Admin Gallery Routes
// =====================================

// Upload image/video
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  createGallery
);

// Delete gallery item
router.delete(
  "/:id",
  verifyToken,
  removeGallery
);

module.exports = router;