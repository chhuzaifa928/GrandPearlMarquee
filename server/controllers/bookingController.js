const { validationResult } = require("express-validator");

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
  // Check validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  // Custom Validation
  if (
    Number(req.body.vip_guests || 0) >
    Number(req.body.guests || 0)
  ) {
    return res.status(400).json({
      success: false,
      message:
        "VIP guests cannot be greater than total guests.",
    });
  }

  // Make sure extra_services is valid JSON
  if (req.body.extra_services) {
    try {
      const parsedExtras =
        typeof req.body.extra_services === "string"
          ? JSON.parse(req.body.extra_services)
          : req.body.extra_services;

      if (!Array.isArray(parsedExtras)) {
        return res.status(400).json({
          success: false,
          message:
            "Extra services must be an array.",
        });
      }

      // Store it as JSON string
      req.body.extra_services =
        JSON.stringify(parsedExtras);

    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid extra services data.",
      });
    }
  } else {
    req.body.extra_services = "[]";
  }

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
      message:
        "Booking submitted successfully.",
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

    res.status(200).json({
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
        message: "Failed to fetch booking.",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
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

    res.status(200).json({
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

    res.status(200).json({
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