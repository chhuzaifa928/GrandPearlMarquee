const { body } = require("express-validator");

// =====================================
// Admin Website Settings Validator
// =====================================
// All fields are optional because the Settings UI allows empty
// values (no required attributes).  isString + isLength protects
// against non-string types and oversized input.  Email gets an
// additional format check when a value is supplied.
//
// hero_image is handled by its own multer upload endpoint and is
// only validated here for basic type/length so the legitimate
// admin form payload (which always includes it) is not rejected.
// =====================================

const textField = (name, max, label) => [
  body(name)
    .isString()
    .withMessage(`${label} must be a string.`)
    .trim()
    .isLength({ max })
    .withMessage(`${label} must be at most ${max} characters.`),
];

const settingsValidator = [
  ...textField("website_name", 100, "Website name"),
  ...textField("tagline", 200, "Tagline"),
  ...textField("phone", 30, "Phone"),
  ...textField("whatsapp", 30, "WhatsApp"),
  ...textField("address", 255, "Address"),
  ...textField("facebook", 255, "Facebook"),
  ...textField("instagram", 255, "Instagram"),
  ...textField("youtube", 255, "YouTube"),
  ...textField("tiktok", 255, "TikTok"),

  ...textField("hero_tagline", 200, "Hero tagline"),
  ...textField("hero_title_line1", 100, "Hero title line 1"),
  ...textField("hero_title_line2", 100, "Hero title line 2"),
  ...textField("hero_description", 2000, "Hero description"),

  // Sent by admin form but not persisted by the settings update
  // query.  Validated for basic type/length so the legitimate
  // payload is accepted; rejected if it contains a non-string.
  ...textField("hero_title", 100, "Hero title"),
  ...textField("hero_image", 255, "Hero image"),

  // Email: format-checked when non-empty; empty is allowed (no
  // required attribute on the Settings form).
  body("email")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Email must be a string.")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .isLength({ max: 254 })
    .withMessage("Email must be at most 254 characters."),
];

module.exports = settingsValidator;
