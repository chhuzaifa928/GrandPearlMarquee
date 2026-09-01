const express = require("express");

const router = express.Router();

const upload = require("../middleware/decorUpload");
const multerErrorHandler = require("../middleware/multerErrorHandler");

const verifyToken = require("../middleware/authMiddleware");

const {
  fetchDecor,
  fetchDecorById,
  createDecor,
  editDecor,
  removeDecor,
} = require("../controllers/decorController");

// ==========================
// Public Routes
// ==========================

// Get all decor
router.get("/", fetchDecor);

// Get single decor
router.get("/:id", fetchDecorById);

// ==========================
// Protected Admin Routes
// ==========================

// Add decor
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  createDecor,
  multerErrorHandler
);

// Update decor
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  editDecor,
  multerErrorHandler
);

// Delete decor
router.delete(
  "/:id",
  verifyToken,
  removeDecor
);

module.exports = router;