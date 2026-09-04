const fs = require("fs");
const path = require("path");

const {
  getAllGallery,
  getGalleryById,
  addGallery,
  deleteGallery,
} = require("../models/galleryModel");

const { safelyRemoveFile } = require("../utils/fileCleanup");

// ===============================
// Get All Gallery
// ===============================

const fetchGallery = (req, res) => {
  getAllGallery((err, result) => {
    if (err) {
      console.error("Gallery fetch error:", err.code, err.message);

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
  const {
    title,
    category,
    media_type,
  } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Gallery title is required.",
    });
  }

  if (!category || !category.trim()) {
    return res.status(400).json({
      success: false,
      message: "Gallery category is required.",
    });
  }

  if (!media_type) {
    return res.status(400).json({
      success: false,
      message: "Media type is required.",
    });
  }

  if (!["image", "video"].includes(media_type)) {
    return res.status(400).json({
      success: false,
      message: "Invalid media type.",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a file.",
    });
  }

  const filePath = req.file.path;

  addGallery(
    {
      title: title.trim(),
      category: category.trim(),
      media_type,
      image: `/uploads/gallery/${req.file.filename}`,
    },
    (err) => {
      if (err) {
        console.error("Gallery database insert error:", err.code, err.message);

        // Remove uploaded file if database insert fails
        fs.unlink(filePath, (unlinkError) => {
          if (unlinkError) {
            console.error(
              "Failed to remove orphaned gallery file:",
              unlinkError.code,
              unlinkError.message
            );
          }
        });

        return res.status(500).json({
          success: false,
          message: "Failed to upload gallery item.",
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
  const { id } = req.params;

  // Capture the stored image path BEFORE the DB delete so the file
  // can be removed only after the database record is gone.
  getGalleryById(id, (findErr, result) => {
    const image =
      findErr || !result || result.length === 0
        ? null
        : result[0].image || null;

    deleteGallery(id, (err) => {
      if (err) {
        console.error("Gallery delete error:", err.code, err.message);

        return res.status(500).json({
          success: false,
          message: "Failed to delete gallery item.",
        });
      }

      if (image) {
        safelyRemoveFile(image);
      }

      res.json({
        success: true,
        message: "Gallery item deleted successfully.",
      });
    });
  });
};

module.exports = {
  fetchGallery,
  createGallery,
  removeGallery,
};