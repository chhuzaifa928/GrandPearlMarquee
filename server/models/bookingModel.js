const db = require("../config/db");


// ===========================
// Create Booking
// ===========================

const createBooking = (bookingData, callback) => {
  const sql = `
    INSERT INTO bookings (
      customer_name,
      email,
      phone,
      whatsapp,
      city,

      event_type,
      event_date,
      event_time,

      guests,
      male_guests,
      female_guests,

      vip_guests,
      male_vip,
      female_vip,

      partition_required,

      food_category,
      custom_food,

      decor_theme,
      additional_requirements,

      sound_system,
      ac_required,
      heater_required
    )
    VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?,
      ?, ?,
      ?, ?,
      ?, ?, ?
    )
  `;

  db.query(
    sql,
    [
      // Customer
      bookingData.customer_name,
      bookingData.email,
      bookingData.phone,
      bookingData.whatsapp,
      bookingData.city,

      // Event
      bookingData.event_type,
      bookingData.event_date,
      bookingData.event_time,

      // Guests
      bookingData.guests,
      bookingData.male_guests,
      bookingData.female_guests,

      // VIP
      bookingData.vip_guests,
      bookingData.male_vip,
      bookingData.female_vip,

      // Arrangement
      bookingData.partition_required,

      // Food
      bookingData.food_category,
      bookingData.custom_food,

      // Decor
      bookingData.decor_theme,
      bookingData.additional_requirements,

      // Extra services
      bookingData.sound_system,
      bookingData.ac_required,
      bookingData.heater_required,
    ],
    callback
  );
};


// ===========================
// Get All Bookings
// ===========================

const getAllBookings = (callback) => {
  db.query(
    "SELECT * FROM bookings ORDER BY created_at DESC",
    callback
  );
};


// ===========================
// Get Booking By ID
// ===========================

const getBookingById = (id, callback) => {
  db.query(
    "SELECT * FROM bookings WHERE id = ?",
    [id],
    callback
  );
};


// ===========================
// Update Booking Status
// ===========================

const updateBookingStatus = (id, status, callback) => {
  db.query(
    "UPDATE bookings SET booking_status = ? WHERE id = ?",
    [status, id],
    callback
  );
};


// ===========================
// Delete Booking
// ===========================

const deleteBooking = (id, callback) => {
  db.query(
    "DELETE FROM bookings WHERE id = ?",
    [id],
    callback
  );
};


module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};