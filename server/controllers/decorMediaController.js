const {
  getMediaByDecorId,
  getMediaById,
  addMedia,
  deleteMedia,
} = require("../models/decorMediaModel");

const { safelyRemoveFile } = require("../utils/fileCleanup");

// ===============================
// Get Media For A Decor
// ===============================

const fetchDecorMedia = (req, res) => {
  const { decorId } = req.params;

  getMediaByDecorId(decorId, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch decor media.",
      });
    }

    res.json({
      success: true,
      media: result,
    });
  });
};

// ===============================
// Upload Decor Media
// ===============================

const uploadDecorMedia = (req, res) => {
  const { decorId } = req.params;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No media files uploaded.",
    });
  }

  const mediaRecords = req.files.map((file) => {
    const mediaType = file.mimetype.startsWith("video/")
      ? "video"
      : "image";

    return {
      decor_id: decorId,
      media_type: mediaType,
      media_url: `/uploads/decor/${file.filename}`,
    };
  });

  let completed = 0;
  let hasError = false;

  mediaRecords.forEach((media) => {
    addMedia(media, (err) => {
      if (hasError) {
        return;
      }

      if (err) {
        hasError = true;

        return res.status(500).json({
          success: false,
          message: "Failed to save decor media.",
        });
      }

      completed++;

      if (completed === mediaRecords.length) {
        res.status(201).json({
          success: true,
          message: "Decor media uploaded successfully.",
          media: mediaRecords,
        });
      }
    });
  });
};

// ===============================
// Delete Decor Media
// ===============================

const removeDecorMedia = (req, res) => {
  const { id } = req.params;

  // Capture the stored media URL BEFORE the DB delete so the file
  // can be removed only after the database record is gone.
  getMediaById(id, (findErr, result) => {
    const mediaUrl =
      findErr || !result || result.length === 0
        ? null
        : result[0].media_url || null;

    deleteMedia(id, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete decor media.",
        });
      }

      if (mediaUrl) {
        safelyRemoveFile(mediaUrl);
      }

      res.json({
        success: true,
        message: "Decor media deleted successfully.",
      });
    });
  });
};

module.exports = {
  fetchDecorMedia,
  uploadDecorMedia,
  removeDecorMedia,
};