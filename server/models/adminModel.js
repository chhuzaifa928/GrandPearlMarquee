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

// =========================
// Dashboard Statistics
// =========================

const getDashboardStats = (callback) => {

  const sql = `
    SELECT

      COUNT(*) AS totalBookings,

      SUM(CASE WHEN booking_status = 'Pending' THEN 1 ELSE 0 END) AS pending,

      SUM(CASE WHEN booking_status = 'Approved' THEN 1 ELSE 0 END) AS approved,

      SUM(CASE WHEN booking_status = 'Rejected' THEN 1 ELSE 0 END) AS rejected,

      SUM(CASE WHEN DATE(event_date)=CURDATE() THEN 1 ELSE 0 END) AS todayEvents

    FROM bookings
  `;

  db.query(sql, callback);

};
module.exports = {
  findAdminByEmail,
  createAdmin,
  getDashboardStats,
};