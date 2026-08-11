const {
  getMediaByDecorId,
  addMedia,
  deleteMedia,
} = require("../models/decorMediaModel");

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

  deleteMedia(id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete decor media.",
      });
    }

    res.json({
      success: true,
      message: "Decor media deleted successfully.",
    });
  });
};

module.exports = {
  fetchDecorMedia,
  uploadDecorMedia,
  removeDecorMedia,
};