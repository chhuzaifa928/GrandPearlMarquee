const { body, validationResult } = require("express-validator");

// =====================================
// Decor create/edit validator
// =====================================
// Validates the multipart body fields submitted to the admin Decor
// create and edit endpoints. Must run AFTER upload.single("image")
// so that multer has populated req.body from the multipart form.
//
// category and title are required (non-empty after trimming) strings
// with conservative maximum lengths. description is optional.
//
// Returns the project's existing validation response format:
//   400 { success: false, message: "<msg>" }
// =====================================

const decorValidator = [
  body("category")
    .isString()
    .withMessage("Category must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Category is required.")
    .isLength({ max: 100 })
    .withMessage("Category must be at most 100 characters."),

  body("title")
    .isString()
    .withMessage("Title must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 200 })
    .withMessage("Title must be at most 200 characters."),

  body("description")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Description must be a string.")
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description must be at most 2000 characters."),

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

module.exports = decorValidator;
