const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

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
  createCategory
);

router.delete(
  "/categories/:id",
  verifyToken,
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
  createItem
);

router.put(
  "/items/:id",
  verifyToken,
  editItem
);

router.delete(
  "/items/:id",
  verifyToken,
  removeItem
);

module.exports = router;