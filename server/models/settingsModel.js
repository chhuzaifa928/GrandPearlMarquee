const db = require("../config/db");

// ===============================
// Get Website Settings
// ===============================

const getSettings = (callback) => {
  db.query(
    "SELECT * FROM website_settings LIMIT 1",
    callback
  );
};

// ===============================
// Update Website Settings
// ===============================

const updateSettings = (data, callback) => {
  db.query(
    `UPDATE website_settings SET
      website_name = ?,
      tagline = ?,
      phone = ?,
      whatsapp = ?,
      email = ?,
      address = ?,
      facebook = ?,
      instagram = ?,
      youtube = ?,
      tiktok = ?,
      hero_tagline = ?,
      hero_title_line1 = ?,
      hero_title_line2 = ?,
      hero_description = ?
    WHERE id = 1`,
    [
      data.website_name,
      data.tagline,
      data.phone,
      data.whatsapp,
      data.email,
      data.address,
      data.facebook,
      data.instagram,
      data.youtube,
      data.tiktok,
      data.hero_tagline,
      data.hero_title_line1,
      data.hero_title_line2,
      data.hero_description,
    ],
    callback
  );
};

// ===============================
// Update Hero Image
// ===============================

const updateHeroImage = (imagePath, callback) => {
  db.query(
    `UPDATE website_settings
     SET hero_image = ?
     WHERE id = 1`,
    [imagePath],
    callback
  );
};

module.exports = {
  getSettings,
  updateSettings,
  updateHeroImage,
};