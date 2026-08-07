const db = require("../config/db");

// =========================
// Find Admin By Email
// =========================
const findAdminByEmail = (email, callback) => {
  const sql = "SELECT * FROM admins WHERE email = ?";
  db.query(sql, [email], callback);
};

// =========================
// Create New Admin
// =========================
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

      SUM(CASE WHEN booking_status='Pending'
      THEN 1 ELSE 0 END) AS pending,

      SUM(CASE WHEN booking_status='Approved'
      THEN 1 ELSE 0 END) AS approved,

      SUM(CASE WHEN booking_status='Rejected'
      THEN 1 ELSE 0 END) AS rejected,

      SUM(CASE WHEN DATE(event_date)=CURDATE()
      THEN 1 ELSE 0 END) AS todayEvents

    FROM bookings
  `;

  db.query(sql, callback);

};

// =========================
// Today's Bookings
// =========================
const getTodayBookings = (callback) => {

  const sql = `
    SELECT
      id,
      customer_name,
      event_type,
      event_time,
      booking_status
    FROM bookings
    WHERE DATE(event_date)=CURDATE()
    ORDER BY event_time ASC
  `;

  db.query(sql, callback);

};

// =========================
// Recent Bookings
// =========================
const getRecentBookings = (callback) => {

  const sql = `
    SELECT
      id,
      customer_name,
      event_type,
      booking_status,
      created_at
    FROM bookings
    ORDER BY created_at DESC
    LIMIT 5
  `;

  db.query(sql, callback);

};

// =========================
// Exports
// =========================
module.exports = {
  findAdminByEmail,
  createAdmin,
  getDashboardStats,
  getTodayBookings,
  getRecentBookings,
};