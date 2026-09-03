const express = require("express");

const router = express.Router();

const upload = require("../middleware/decorUpload");
const multerErrorHandler = require("../middleware/multerErrorHandler");

const verifyToken = require("../middleware/authMiddleware");
const validId = require("../validators/idValidator");
const decorValidator = require("../validators/decorValidator");

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
router.get("/:id", validId("id"), fetchDecorById);

// ==========================
// Protected Admin Routes
// ==========================

// Add decor
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  decorValidator,
  createDecor,
  multerErrorHandler
);

// Update decor
router.put(
  "/:id",
  verifyToken,
  validId("id"),
  upload.single("image"),
  decorValidator,
  editDecor,
  multerErrorHandler
);

// Delete decor
router.delete(
  "/:id",
  verifyToken,
  validId("id"),
  removeDecor
);

module.exports = router;