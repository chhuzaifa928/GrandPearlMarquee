const db = require("../config/db");

// ===============================
// Save Contact Message
// ===============================

const addMessage = (message, callback) => {
  db.query(
    `INSERT INTO contact_messages
    (full_name, email, phone, subject, message)
    VALUES (?, ?, ?, ?, ?)`,
    [
      message.full_name,
      message.email,
      message.phone,
      message.subject,
      message.message,
    ],
    callback
  );
};

// ===============================
// Get All Messages
// ===============================

const getAllMessages = (callback) => {
  db.query(
    `SELECT *
     FROM contact_messages
     ORDER BY created_at DESC`,
    callback
  );
};

// ===============================
// Delete Message
// ===============================

const deleteMessage = (id, callback) => {
  db.query(
    "DELETE FROM contact_messages WHERE id=?",
    [id],
    callback
  );
};

module.exports = {
  addMessage,
  getAllMessages,
  deleteMessage,
};