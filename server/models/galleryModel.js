const db = require("../config/db");

// =============================
// Get All Gallery
// =============================

const getAllGallery = (callback) => {
  db.query(
    "SELECT * FROM gallery ORDER BY uploaded_at DESC",
    callback
  );
};

// =============================
// Add Gallery
// =============================

const addGallery = (gallery, callback) => {
  db.query(
    `INSERT INTO gallery
      (title, category, image, media_type)
     VALUES (?, ?, ?, ?)`,
    [
      gallery.title,
      gallery.category,
      gallery.image,
      gallery.media_type,
    ],
    callback
  );
};

// =============================
// Delete Gallery
// =============================

const deleteGallery = (id, callback) => {
  db.query(
    "DELETE FROM gallery WHERE id = ?",
    [id],
    callback
  );
};

module.exports = {
  getAllGallery,
  addGallery,
  deleteGallery,
};