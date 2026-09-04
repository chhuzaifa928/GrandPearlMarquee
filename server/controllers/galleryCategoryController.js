const {
  getAllGalleryCategories,
  addGalleryCategory,
  deleteGalleryCategory,
} = require("../models/galleryCategoryModel");

// =====================================
// Get All Gallery Categories
// =====================================

const fetchGalleryCategories = (req, res) => {
  getAllGalleryCategories((err, result) => {
    if (err) {
      console.error("Failed to fetch gallery categories:", err.code, err.message);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch gallery categories.",
      });
    }

    res.json({
      success: true,
      categories: result,
    });
  });
};

// =====================================
// Add Gallery Category
// =====================================

const createGalleryCategory = (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Category name is required.",
    });
  }

  const categoryName = name.trim();

  addGalleryCategory(categoryName, (err, result) => {
    if (err) {
      console.error("Failed to add gallery category:", err.code, err.message);

      // Duplicate category
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "This gallery category already exists.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to add gallery category.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Gallery category added successfully.",
      category: {
        id: result.insertId,
        name: categoryName,
      },
    });
  });
};

// =====================================
// Delete Gallery Category
// =====================================

const removeGalleryCategory = (req, res) => {
  const { id } = req.params;

  deleteGalleryCategory(id, (err) => {
    if (err) {
      console.error("Failed to delete gallery category:", err.code, err.message);

      if (err.code === "NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Gallery category not found.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to delete gallery category.",
      });
    }

    res.json({
      success: true,
      message: "Gallery category deleted successfully.",
    });
  });
};

module.exports = {
  fetchGalleryCategories,
  createGalleryCategory,
  removeGalleryCategory,
};