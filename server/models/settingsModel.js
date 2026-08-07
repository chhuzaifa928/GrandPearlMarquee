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
      tiktok = ?
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
    ],
    callback
  );
};

module.exports = {
  getSettings,
  updateSettings,
};