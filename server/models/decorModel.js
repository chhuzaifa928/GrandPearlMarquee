const db = require("../config/db");

// Get All Decor
const getAllDecor = (callback) => {
  const sql = `
    SELECT *
    FROM decor
    ORDER BY created_at DESC
  `;

  db.query(sql, callback);
};

// Get Decor By ID
const getDecorById = (id, callback) => {
  const sql = `
    SELECT *
    FROM decor
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

// Add Decor
const addDecor = (decor, callback) => {
  const sql = `
    INSERT INTO decor
    (category, title, description, image)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      decor.category,
      decor.title,
      decor.description,
      decor.image,
    ],
    callback
  );
};

// Update Decor
const updateDecor = (id, decor, callback) => {
  const sql = `
    UPDATE decor
    SET
      category = ?,
      title = ?,
      description = ?,
      image = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      decor.category,
      decor.title,
      decor.description,
      decor.image,
      id,
    ],
    callback
  );
};

// Delete Decor
const deleteDecor = (id, callback) => {
  const sql = `
    DELETE FROM decor
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  getAllDecor,
  getDecorById,
  addDecor,
  updateDecor,
  deleteDecor,
};