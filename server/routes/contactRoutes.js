const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { contactLimiter } = require("../middleware/publicLimiters");
const validId = require("../validators/idValidator");

const contactValidator = require("../validators/contactValidator");

const {
  createMessage,
  fetchMessages,
  removeMessage,
} = require("../controllers/contactController");

router.post("/", contactLimiter, contactValidator, createMessage);

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
  validId("id"),
  removeMessage
);

module.exports = router;