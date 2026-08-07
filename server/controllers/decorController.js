const {
  getAllDecor,
  getDecorById,
  addDecor,
  updateDecor,
  deleteDecor,
} = require("../models/decorModel");

// ==========================
// Get All Decor
// ==========================
const fetchDecor = (req, res) => {
  getAllDecor((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch decor.",
      });
    }

    res.json({
      success: true,
      decor: result,
    });
  });
};

// ==========================
// Get Decor By ID
// ==========================
const fetchDecorById = (req, res) => {
  const { id } = req.params;

  getDecorById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Decor not found.",
      });
    }

    res.json({
      success: true,
      decor: result[0],
    });
  });
};

// ==========================
// Add Decor
// ==========================
const createDecor = (req, res) => {
  const { category, title, description } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image is required.",
    });
  }

  const image = `/uploads/decor/${req.file.filename}`;

  addDecor(
    {
      category,
      title,
      description,
      image,
    },
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to add decor.",
        });
      }

      res.status(201).json({
        success: true,
        message: "Decor added successfully.",
      });
    }
  );
};

// ==========================
// Update Decor
// ==========================
const editDecor = (req, res) => {
  const { id } = req.params;

  const { category, title, description, image } = req.body;

  const updatedImage = req.file
    ? `/uploads/decor/${req.file.filename}`
    : image;

  updateDecor(
    id,
    {
      category,
      title,
      description,
      image: updatedImage,
    },
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to update decor.",
        });
      }

      res.json({
        success: true,
        message: "Decor updated successfully.",
      });
    }
  );
};

// ==========================
// Delete Decor
// ==========================
const removeDecor = (req, res) => {
  const { id } = req.params;

  deleteDecor(id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete decor.",
      });
    }

    res.json({
      success: true,
      message: "Decor deleted successfully.",
    });
  });
};

module.exports = {
  fetchDecor,
  fetchDecorById,
  createDecor,
  editDecor,
  removeDecor,
};