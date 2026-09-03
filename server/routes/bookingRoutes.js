const express = require("express");
const router = express.Router();

// Controllers
const {
  addBooking,
  fetchBookings,
  fetchBookingById,
  changeBookingStatus,
  removeBooking,
} = require("../controllers/bookingController");

// Middleware
const verifyToken = require("../middleware/authMiddleware");
const { bookingLimiter } = require("../middleware/publicLimiters");

// Validators
const bookingValidator = require("../validators/bookingValidator");

// ======================================
// Public Route
// ======================================

// Customer submits a booking
router.post("/", bookingLimiter, bookingValidator, addBooking);

// ======================================
// Protected Admin Routes
// ======================================

// Get all bookings
router.get("/", verifyToken, fetchBookings);

// Get single booking by ID
router.get("/:id", verifyToken, fetchBookingById);

// Update booking status
router.put("/:id", verifyToken, changeBookingStatus);

// Delete booking
router.delete("/:id", verifyToken, removeBooking);

module.exports = router;