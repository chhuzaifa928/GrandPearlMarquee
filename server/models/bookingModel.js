const db = require("../config/db");

// ===========================
// Create Booking
// ===========================

const SLOT_LOCK_TIMEOUT_SECONDS = 15;

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
      heater_required,

      extra_services
    )
    VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?,
      ?, ?,
      ?, ?,

      ?, ?, ?,

      ?
    )
  `;

  const bookingValues = [

    // =========================
    // CUSTOMER
    // =========================

    bookingData.customer_name,
    bookingData.email,
    bookingData.phone,
    bookingData.whatsapp,
    bookingData.city,

    // =========================
    // EVENT
    // =========================

    bookingData.event_type,
    bookingData.event_date,
    bookingData.event_time,

    // =========================
    // GUESTS
    // =========================

    bookingData.guests,
    bookingData.male_guests,
    bookingData.female_guests,

    // =========================
    // VIP
    // =========================

    bookingData.vip_guests,
    bookingData.male_vip,
    bookingData.female_vip,

    // =========================
    // ARRANGEMENT
    // =========================

    bookingData.partition_required,

    // =========================
    // FOOD
    // =========================

    bookingData.food_category,
    bookingData.custom_food,

    // =========================
    // DECOR
    // =========================

    bookingData.decor_theme,
    bookingData.additional_requirements,

    // =========================
    // EXISTING EXTRA FIELDS
    // =========================

    bookingData.sound_system,
    bookingData.ac_required,
    bookingData.heater_required,

    // =========================
    // ALL EXTRA SERVICES
    // =========================

    bookingData.extra_services || "[]",
  ];

  // Serializes race-prone check-then-insert on the database so two
  // concurrent requests cannot both book the same event_date + event_time.
  // Rejected bookings do NOT block the slot; deleted bookings are gone.
  const lockName =
    "booking_slot:" +
    bookingData.event_date +
    ":" +
    bookingData.event_time;

  db.getConnection((connectionError, connection) => {
    if (connectionError) {
      return callback(connectionError);
    }

    const finish = (err, result) => {
      // Return the connection to the pool after the lock is released.
      connection.release();
      callback(err, result);
    };

    connection.query(
      "SELECT GET_LOCK(?, ?) AS got_lock",
      [lockName, SLOT_LOCK_TIMEOUT_SECONDS],
      (lockError, lockResults) => {
        if (lockError) {
          return finish(lockError);
        }

        // 1 = lock acquired, 0 = timed out (another request is booking this slot).
        if (!lockResults || lockResults[0].got_lock !== 1) {
          const conflict = new Error(
            "This time slot is already booked. Please choose a different date or time."
          );
          conflict.code = "BOOKING_CONFLICT";
          return finish(conflict);
        }

        const releaseLockAndFinish = (err, result) => {
          connection.query(
            "SELECT RELEASE_LOCK(?)",
            [lockName],
            () => finish(err, result)
          );
        };

        // Availability check while the slot lock is held.
        connection.query(
          "SELECT id FROM bookings WHERE event_date = ? AND event_time = ? AND booking_status <> 'Rejected' LIMIT 1",
          [bookingData.event_date, bookingData.event_time],
          (checkError, existingBookings) => {
            if (checkError) {
              return releaseLockAndFinish(checkError);
            }

            if (existingBookings.length > 0) {
              const conflict = new Error(
                "This time slot is already booked. Please choose a different date or time."
              );
              conflict.code = "BOOKING_CONFLICT";
              return releaseLockAndFinish(conflict);
            }

            connection.query(sql, bookingValues, (insertError, result) => {
              if (insertError && insertError.code === "ER_DUP_ENTRY") {
                // Safety net in case a unique index is added later.
                const conflict = new Error(
                  "This time slot is already booked. Please choose a different date or time."
                );
                conflict.code = "BOOKING_CONFLICT";
                return releaseLockAndFinish(conflict);
              }

              releaseLockAndFinish(insertError, result);
            });
          }
        );
      }
    );
  });
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
// Check Slot Availability
// ===========================
// Read-only. Reuses the C1 slot-blocking rule: only bookings whose status
// is not 'Rejected' occupy the slot. Rejected bookings are ignored and
// deleted bookings no longer exist in the table.

const getSlotAvailability = (event_date, event_time, callback) => {

  db.query(
    "SELECT id FROM bookings WHERE event_date = ? AND event_time = ? AND booking_status <> 'Rejected' LIMIT 1",
    [event_date, event_time],
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

const updateBookingStatus = (
  id,
  status,
  callback
) => {

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
  getSlotAvailability,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};