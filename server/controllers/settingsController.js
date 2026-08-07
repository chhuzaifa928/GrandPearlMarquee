const {
  getSettings,
  updateSettings,
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

module.exports = {
  fetchSettings,
  saveSettings,
};