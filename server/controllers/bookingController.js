const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} = require("../models/bookingModel");

// ===========================
// Create Booking
// ===========================
const addBooking = (req, res) => {
  createBooking(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to create booking.",
        error: err.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Booking submitted successfully.",
      bookingId: result.insertId,
    });
  });
};

// ===========================
// Get All Bookings
// ===========================
const fetchBookings = (req, res) => {
  getAllBookings((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch bookings.",
        error: err.message,
      });
    }

    res.json({
      success: true,
      total: results.length,
      bookings: results,
    });
  });
};

// ===========================
// Get Booking By ID
// ===========================
const fetchBookingById = (req, res) => {
  const { id } = req.params;

  getBookingById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching booking.",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.json({
      success: true,
      booking: results[0],
    });
  });
};

// ===========================
// Update Booking Status
// ===========================
const changeBookingStatus = (req, res) => {
  const { id } = req.params;
  const { booking_status } = req.body;

  updateBookingStatus(id, booking_status, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update booking status.",
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Booking status updated successfully.",
    });
  });
};

// ===========================
// Delete Booking
// ===========================
const removeBooking = (req, res) => {
  const { id } = req.params;

  deleteBooking(id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete booking.",
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully.",
    });
  });
};

module.exports = {
  addBooking,
  fetchBookings,
  fetchBookingById,
  changeBookingStatus,
  removeBooking,
};