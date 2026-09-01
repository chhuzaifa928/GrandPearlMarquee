const { validationResult } = require("express-validator");

const {
  getAllMessages,
  deleteMessage,
  addMessage,
} = require("../models/contactModel");

// ===============================
// Save Contact Message
// ===============================

const createMessage = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const {
    full_name,
    email,
    phone,
    subject,
    message,
  } = req.body;

  addMessage(
    {
      full_name,
      email,
      phone,
      subject,
      message,
    },
    (err) => {
      if (err) {
        console.error("Failed to save contact message:", err.message);

        return res.status(500).json({
          success: false,
          message: "Failed to save message.",
        });
      }

      res.status(201).json({
        success: true,
        message: "Message sent successfully.",
      });
    }
  );
};

// ===============================
// Get All Contact Messages
// ===============================

const fetchMessages = (req, res) => {
  getAllMessages((err, result) => {
    if (err) {
      console.error("Failed to fetch contact messages:", err.message);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch contact messages.",
      });
    }

    res.json({
      success: true,
      messages: result,
    });
  });
};

// ===============================
// Delete Contact Message
// ===============================

const removeMessage = (req, res) => {
  deleteMessage(req.params.id, (err) => {
    if (err) {
      console.error("Failed to delete contact message:", err.message);

      return res.status(500).json({
        success: false,
        message: "Failed to delete message.",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully.",
    });
  });
};

module.exports = {
  createMessage,
  fetchMessages,
  removeMessage,
};
