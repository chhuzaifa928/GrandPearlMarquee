const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const contactValidator = require("../validators/contactValidator");

const {
  createMessage,
  fetchMessages,
  removeMessage,
} = require("../controllers/contactController");

router.post("/", contactValidator, createMessage);

// ===============================
// Admin Routes
// ===============================

// Get all messages
router.get(
  "/",
  verifyToken,
  fetchMessages
);

// Delete a message
router.delete(
  "/:id",
  verifyToken,
  removeMessage
);

module.exports = router;