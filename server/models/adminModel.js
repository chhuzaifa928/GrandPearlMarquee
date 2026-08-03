const db = require("../config/db");

// Find admin by email
const findAdminByEmail = (email, callback) => {
  const sql = "SELECT * FROM admins WHERE email = ?";

  db.query(sql, [email], callback);
};

// Create new admin
const createAdmin = (adminData, callback) => {
  const sql = `
    INSERT INTO admins
    (full_name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      adminData.full_name,
      adminData.email,
      adminData.password,
      adminData.role,
    ],
    callback
  );
};

module.exports = {
  findAdminByEmail,
  createAdmin,
};