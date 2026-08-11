const {
  getAllCategories,
  addCategory,
  deleteCategory,

  getAllItems,
  addItem,
  updateItem,
  deleteItem,
} = require("../models/foodModel");

// ======================================
// FOOD CATEGORIES
// ======================================

// Get Categories
const fetchCategories = (req, res) => {
  getAllCategories((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch categories.",
      });
    }

    res.json({
      success: true,
      categories: result,
    });
  });
};

// Add Category
const createCategory = (req, res) => {

  const { category_name } = req.body;

  if (!category_name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required.",
    });
  }

  const image = req.file
    ? `/uploads/food/${req.file.filename}`
    : null;

  addCategory(
    category_name,
    image,
    (err, result) => {

      if (err) {

        console.error(
          "Add category error:",
          err
        );

        return res.status(500).json({
          success: false,
          message: "Failed to add category.",
        });
      }

      res.status(201).json({
        success: true,
        message:
          "Category added successfully.",
        categoryId: result.insertId,
      });

    }
  );
};

// Delete Category
const removeCategory = (req, res) => {
  deleteCategory(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete category.",
      });
    }

    res.json({
      success: true,
      message: "Category deleted successfully.",
    });
  });
};

// ======================================
// FOOD ITEMS
// ======================================

// Get Items
const fetchItems = (req, res) => {
  getAllItems((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch food items.",
      });
    }

    res.json({
      success: true,
      items: result,
    });
  });
};

// Add Item
const createItem = (req, res) => {
  const {
    category_id,
    item_name,
    description,
  } = req.body;

  addItem(
    {
      category_id,
      item_name,
      description,
    },
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to add item.",
        });
      }

      res.status(201).json({
        success: true,
        message: "Food item added successfully.",
      });
    }
  );
};

// Update Item
const editItem = (req, res) => {
  const {
    category_id,
    item_name,
    description,
  } = req.body;

  updateItem(
    req.params.id,
    {
      category_id,
      item_name,
      description,
    },
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to update item.",
        });
      }

      res.json({
        success: true,
        message: "Food item updated successfully.",
      });
    }
  );
};

// Delete Item
const removeItem = (req, res) => {
  deleteItem(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete item.",
      });
    }

    res.json({
      success: true,
      message: "Food item deleted successfully.",
    });
  });
};

module.exports = {
  fetchCategories,
  createCategory,
  removeCategory,

  fetchItems,
  createItem,
  editItem,
  removeItem,
};