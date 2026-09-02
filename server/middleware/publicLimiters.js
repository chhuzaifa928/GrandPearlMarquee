const rateLimit = require("express-rate-limit");

const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many booking requests. Please try again later." },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many contact messages. Please try again later." },
});

module.exports = { bookingLimiter, contactLimiter };
