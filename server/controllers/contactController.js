const {
  getAllMessages,
  deleteMessage,
} = require("../models/contactModel");

// ===============================
// Get All Contact Messages
// ===============================

const fetchMessages = (req, res) => {
  getAllMessages((err, result) => {
    if (err) {
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
  fetchMessages,
  removeMessage,
};
const { addMessage } = require("../models/contactModel");

// ===============================
// Save Contact Message
// ===============================

const createMessage = (req, res) => {
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
module.exports = {
  createMessage,
  fetchMessages,
  removeMessage,
};