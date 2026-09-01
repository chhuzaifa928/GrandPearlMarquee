const { validationResult } = require("express-validator");

const {
  getSettings,
  updateSettings,
  updateHeroImage,
} = require("../models/settingsModel");

const { safelyRemoveFile } = require("../utils/fileCleanup");

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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const settingsData = {
    website_name: req.body.website_name,
    tagline: req.body.tagline,
    phone: req.body.phone,
    whatsapp: req.body.whatsapp,
    email: req.body.email,
    address: req.body.address,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    youtube: req.body.youtube,
    tiktok: req.body.tiktok,
    hero_tagline: req.body.hero_tagline,
    hero_title_line1: req.body.hero_title_line1,
    hero_title_line2: req.body.hero_title_line2,
    hero_description: req.body.hero_description,
  };

  updateSettings(settingsData, (err) => {
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

  // Capture the CURRENT hero image before the update so it can be
  // removed only after the database write succeeds.
  getSettings((findErr, result) => {
    const oldHeroImage =
      findErr || !result || result.length === 0
        ? null
        : result[0].hero_image || null;

    updateHeroImage(imagePath, (err) => {
      if (err) {
        // The DB update failed, so the freshly uploaded replacement
        // is now orphaned. Remove ONLY that new file. The old hero
        // image must be kept because the current setting is untouched.
        safelyRemoveFile(imagePath);

        return res.status(500).json({
          success: false,
          message: "Failed to save Hero image.",
        });
      }

      // A replacement was uploaded AND the DB update succeeded AND
      // the old hero differs from the new one.
      if (oldHeroImage && oldHeroImage !== imagePath) {
        safelyRemoveFile(oldHeroImage);
      }

      res.json({
        success: true,
        message: "Hero image uploaded successfully.",
        image: imagePath,
      });
    });
  });
};

module.exports = {
  fetchSettings,
  saveSettings,
  saveHeroImage,
};