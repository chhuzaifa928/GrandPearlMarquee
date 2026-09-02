const db = require("../config/db");

// ===============================
// Get All Media For A Decor
// ===============================

const getMediaByDecorId = (decorId, callback) => {
  const sql = `
    SELECT *
    FROM decor_media
    WHERE decor_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [decorId], callback);
};

// ===============================
// Get Media By ID
// ===============================

const getMediaById = (id, callback) => {
  const sql = `
    SELECT *
    FROM decor_media
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

// ===============================
// Add Media
// ===============================

const addMedia = (media, callback) => {
  const sql = `
    INSERT INTO decor_media
    (decor_id, media_type, media_url)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [
      media.decor_id,
      media.media_type,
      media.media_url,
    ],
    (err, result) => callback(err, result)
  );
};

// ===============================
// Delete Media
// ===============================

const deleteMedia = (id, callback) => {
  const sql = `
    DELETE FROM decor_media
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  getMediaByDecorId,
  getMediaById,
  addMedia,
  deleteMedia,
};