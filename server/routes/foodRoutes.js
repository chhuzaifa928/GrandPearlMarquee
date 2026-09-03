const express = require("express");

const router = express.Router();
const upload = require("../middleware/foodUpload");
const multerErrorHandler = require("../middleware/multerErrorHandler");
const verifyToken = require("../middleware/authMiddleware");
const validId = require("../validators/idValidator");
const {
  foodItemValidator,
  foodCategoryValidator,
} = require("../validators/foodValidator");


const {
  fetchCategories,
  createCategory,
  removeCategory,

  fetchItems,
  createItem,
  editItem,
  removeItem,
} = require("../controllers/foodController");

// ===========================
// Categories
// ===========================

// Public
router.get("/categories", fetchCategories);

// Admin
router.post(
  "/categories",
  verifyToken,
  upload.single("image"),
  foodCategoryValidator,
  createCategory,
  multerErrorHandler
);

router.delete(
  "/categories/:id",
  verifyToken,
  validId("id"),
  removeCategory
);

// ===========================
// Food Items
// ===========================

// Public
router.get("/items", fetchItems);

// Admin
router.post(
  "/items",
  verifyToken,
  foodItemValidator,
  createItem
);

router.put(
  "/items/:id",
  verifyToken,
  validId("id"),
  foodItemValidator,
  editItem
);

router.delete(
  "/items/:id",
  verifyToken,
  validId("id"),
  removeItem
);

module.exports = router;