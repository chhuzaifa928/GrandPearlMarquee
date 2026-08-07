const {
  getAllGallery,
  addGallery,
  deleteGallery,
} = require("../models/galleryModel");

// ===============================
// Get All Gallery
// ===============================

const fetchGallery = (req, res) => {
  getAllGallery((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch gallery.",
      });
    }

    res.json({
      success: true,
      gallery: result,
    });
  });
};

// ===============================
// Add Gallery
// ===============================

const createGallery = (req, res) => {
  const { title, media_type } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a file.",
    });
  }

  addGallery(
    {
      title,
      media_type,
      image: `/uploads/gallery/${req.file.filename}`,
    },
    (err) => {
      if (err) {
    console.error(err);

    return res.status(500).json({
        success: false,
        message: err.message,
        error: err,
    });
}

      res.status(201).json({
        success: true,
        message: "Gallery item uploaded successfully.",
      });
    }
  );
};

// ===============================
// Delete Gallery
// ===============================

const removeGallery = (req, res) => {
  deleteGallery(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete gallery item.",
      });
    }

    res.json({
      success: true,
      message: "Gallery item deleted successfully.",
    });
  });
};

module.exports = {
  fetchGallery,
  createGallery,
  removeGallery,
};