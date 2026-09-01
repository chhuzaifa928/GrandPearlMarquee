const { body } = require("express-validator");

const contactValidator = [
  body("full_name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ max: 100 })
    .withMessage("Full name must be at most 100 characters."),

  body("email")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .isLength({ max: 254 })
    .withMessage("Email must be at most 254 characters."),

  body("phone")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .isLength({ max: 20 })
    .withMessage("Phone number must be at most 20 characters.")
    .matches(/^[+0-9()\-\s]+$/)
    .withMessage("Please enter a valid phone number."),

  body("subject")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Subject is required.")
    .isLength({ max: 200 })
    .withMessage("Subject must be at most 200 characters."),

  body("message")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ max: 5000 })
    .withMessage("Message must be at most 5000 characters."),
];

module.exports = contactValidator;
