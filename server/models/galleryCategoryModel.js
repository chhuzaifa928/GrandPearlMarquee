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
// Get Category By Id
// =====================================

const getGalleryCategoryById = (id, callback) => {
  db.query(
    `
    SELECT *
    FROM gallery_categories
    WHERE id = ?
    `,
    [id],
    callback
  );
};

// =====================================
// Delete Category
// =====================================
// Reassigns any gallery items using the
// category (by name) to empty before
// deleting the category itself.

const deleteGalleryCategory = (id, callback) => {
  getGalleryCategoryById(id, (getErr, categoryResult) => {
    if (getErr) {
      return callback(getErr);
    }

    if (!categoryResult || categoryResult.length === 0) {
      const notFound = new Error("Gallery category not found.");
      notFound.code = "NOT_FOUND";
      return callback(notFound);
    }

    const categoryName = categoryResult[0].name;

    db.getConnection((connErr, connection) => {
      if (connErr) {
        return callback(connErr);
      }

      connection.beginTransaction((txErr) => {
        if (txErr) {
          connection.release();
          return callback(txErr);
        }

        // Clear the category on any gallery items using it
        connection.query(
          `
          UPDATE gallery
          SET category = ''
          WHERE category = ?
          `,
          [categoryName],
          (updateErr) => {
            if (updateErr) {
              return connection.rollback(() => {
                connection.release();
                callback(updateErr);
              });
            }

            // Delete the category
            connection.query(
              `
              DELETE FROM gallery_categories
              WHERE id = ?
              `,
              [id],
              (deleteErr, deleteResult) => {
                if (deleteErr) {
                  return connection.rollback(() => {
                    connection.release();
                    callback(deleteErr);
                  });
                }

                connection.commit((commitErr) => {
                  connection.release();

                  if (commitErr) {
                    return callback(commitErr);
                  }

                  callback(null, deleteResult);
                });
              }
            );
          }
        );
      });
    });
  });
};

module.exports = {
  getAllGalleryCategories,
  addGalleryCategory,
  deleteGalleryCategory,
};