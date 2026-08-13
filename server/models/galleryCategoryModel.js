const db = require("../config/db");

// =====================================
// Get All Categories
// =====================================

const getAllGalleryCategories = (callback) => {
  db.query(
    `
    SELECT *
    FROM gallery_categories
    ORDER BY name ASC
    `,
    callback
  );
};

// =====================================
// Add Category
// =====================================

const addGalleryCategory = (name, callback) => {
  db.query(
    `
    INSERT INTO gallery_categories (name)
    VALUES (?)
    `,
    [name],
    callback
  );
};

// =====================================
// Delete Category
// =====================================

const deleteGalleryCategory = (id, callback) => {
  db.query(
    `
    DELETE FROM gallery_categories
    WHERE id = ?
    `,
    [id],
    callback
  );
};

module.exports = {
  getAllGalleryCategories,
  addGalleryCategory,
  deleteGalleryCategory,
};