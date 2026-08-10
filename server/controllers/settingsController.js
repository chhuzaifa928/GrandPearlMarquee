const {
  getSettings,
  updateSettings,
  updateHeroImage,
} = require("../models/settingsModel");

// ===============================
// Fetch Settings
// ===============================

const fetchSettings = (req, res) => {
  getSettings((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch settings.",
      });
    }

    res.json({
      success: true,
      settings: result[0],
    });
  });
};

// ===============================
// Save Settings
// ===============================

const saveSettings = (req, res) => {
  updateSettings(req.body, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update settings.",
      });
    }

    res.json({
      success: true,
      message: "Settings updated successfully.",
    });
  });
};

// ===============================
// Save Hero Image
// ===============================

const saveHeroImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image uploaded.",
    });
  }

  const imagePath = `/uploads/settings/${req.file.filename}`;

  updateHeroImage(imagePath, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to save Hero image.",
      });
    }

    res.json({
      success: true,
      message: "Hero image uploaded successfully.",
      image: imagePath,
    });
  });
};

module.exports = {
  fetchSettings,
  saveSettings,
  saveHeroImage,
};