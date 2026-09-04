const { body, validationResult } = require("express-validator");

// =====================================
// Admin registration validator
// =====================================
// Validates the JSON body of the POST /api/admin/register endpoint
// (full_name, email, password).
//
// Returns the project's existing validation response format:
//   400 { success: false, message: "<msg>" }
// =====================================

const adminValidator = [
  body("full_name")
    .isString()
    .withMessage("Full name must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ max: 100 })
    .withMessage("Full name must be at most 100 characters."),

  body("email")
    .isString()
    .withMessage("Email must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .isLength({ max: 254 })
    .withMessage("Email must be at most 254 characters."),

  body("password")
    .isString()
    .withMessage("Password must be a string.")
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must be between 8 and 72 characters."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    next();
  },
];

module.exports = adminValidator;
