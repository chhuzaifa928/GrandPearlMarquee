const {
  getAllDecor,
  getDecorById,
  addDecor,
  updateDecor,
  deleteDecor,
} = require("../models/decorModel");

const { safelyRemoveFile } = require("../utils/fileCleanup");

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
    (err, result) => {
      if (err) {
        // The DB insert failed, so the just-uploaded image is now
        // orphaned. Remove ONLY that new file. No existing file is
        // touched because nothing was saved.
        if (req.file) {
          safelyRemoveFile(`/uploads/decor/${req.file.filename}`);
        }

        return res.status(500).json({
          success: false,
          message: "Failed to add decor.",
        });
      }

      res.status(201).json({
        success: true,
        message: "Decor added successfully.",
        decorId: result.insertId,
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

  // Capture the OLD stored image before the update so it can be
  // removed only after the database write succeeds.
  getDecorById(id, (findErr, result) => {
    const oldImage =
      findErr || !result || result.length === 0
        ? null
        : result[0].image || null;

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
          // The DB update failed, so the freshly uploaded replacement
          // is now orphaned. Remove ONLY that new file. The old image
          // must be kept because the record is untouched.
          if (req.file) {
            safelyRemoveFile(`/uploads/decor/${req.file.filename}`);
          }

          return res.status(500).json({
            success: false,
            message: "Failed to update decor.",
          });
        }

        // A replacement image was uploaded AND the DB update
        // succeeded AND the old file is genuinely different.
        if (
          req.file &&
          oldImage &&
          oldImage !== updatedImage
        ) {
          safelyRemoveFile(oldImage);
        }

        res.json({
          success: true,
          message: "Decor updated successfully.",
        });
      }
    );
  });
};

// ==========================
// Delete Decor
// ==========================
const removeDecor = (req, res) => {
  const { id } = req.params;

  // Capture the stored image path BEFORE the DB delete so the file
  // can be removed only after the database record is gone.
  getDecorById(id, (findErr, result) => {
    const image =
      findErr || !result || result.length === 0
        ? null
        : result[0].image || null;

    deleteDecor(id, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete decor.",
        });
      }

      if (image) {
        safelyRemoveFile(image);
      }

      res.json({
        success: true,
        message: "Decor deleted successfully.",
      });
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