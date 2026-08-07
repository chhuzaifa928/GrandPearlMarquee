const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  createMessage,
  fetchMessages,
  removeMessage,
} = require("../controllers/contactController");

router.post("/", createMessage);

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