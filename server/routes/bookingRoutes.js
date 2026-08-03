const express = require("express");
const router = express.Router();

const {
  addBooking,
  fetchBookings,
  fetchBookingById,
  changeBookingStatus,
  removeBooking,
} = require("../controllers/bookingController");

const verifyToken = require("../middleware/authMiddleware");

// ===============================
// Public Route
// ===============================

// Customer creates booking
router.post("/", addBooking);

// ===============================
// Protected Admin Routes
// ===============================

// Get all bookings
router.get("/", verifyToken, fetchBookings);

// Get single booking
router.get("/:id", verifyToken, fetchBookingById);

// Update booking status
router.put("/:id", verifyToken, changeBookingStatus);

// Delete booking
router.delete("/:id", verifyToken, removeBooking);

module.exports = router;