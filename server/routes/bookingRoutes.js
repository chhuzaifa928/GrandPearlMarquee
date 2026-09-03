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
const validId = require("../validators/idValidator");

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
router.get("/:id", verifyToken, validId("id"), fetchBookingById);

// Update booking status
router.put("/:id", verifyToken, validId("id"), changeBookingStatus);

// Delete booking
router.delete("/:id", verifyToken, validId("id"), removeBooking);

module.exports = router;