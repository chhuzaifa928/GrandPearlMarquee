const db = require("../config/db");

// ==========================
// Categories
// ==========================

// Get All Categories
const getAllCategories = (callback) => {
  db.query(
    "SELECT * FROM food_categories ORDER BY id ASC",
    callback
  );
};

// Add Category
const addCategory = (
  category_name,
  image,
  callback
) => {

  db.query(
    `INSERT INTO food_categories
     (category_name, image)
     VALUES (?, ?)`,
    [
      category_name,
      image,
    ],
    callback
  );
};

// Delete Category
const deleteCategory = (id, callback) => {
  db.query(
    "DELETE FROM food_categories WHERE id=?",
    [id],
    callback
  );
};

// ==========================
// Food Items
// ==========================

// Get All Items
const getAllItems = (callback) => {
  const sql = `
    SELECT
      food_items.id,
      food_items.item_name,
      food_items.description,
      food_categories.category_name,
      food_categories.id AS category_id
    FROM food_items
    JOIN food_categories
      ON food_items.category_id = food_categories.id
    ORDER BY food_categories.category_name ASC
  `;

  db.query(sql, callback);
};

// Add Item
const addItem = (item, callback) => {
  db.query(
    `INSERT INTO food_items
    (category_id,item_name,description)
    VALUES (?,?,?)`,
    [
      item.category_id,
      item.item_name,
      item.description,
    ],
    callback
  );
};

// Update Item
const updateItem = (id, item, callback) => {
  db.query(
    `UPDATE food_items
     SET
      category_id=?,
      item_name=?,
      description=?
     WHERE id=?`,
    [
      item.category_id,
      item.item_name,
      item.description,
      id,
    ],
    callback
  );
};

// Delete Item
const deleteItem = (id, callback) => {
  db.query(
    "DELETE FROM food_items WHERE id=?",
    [id],
    callback
  );
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,

  getAllItems,
  addItem,
  updateItem,
  deleteItem,
};