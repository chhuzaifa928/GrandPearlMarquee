const { body, validationResult } = require("express-validator");

// =====================================
// Food validators
// =====================================
//
// foodItemValidator: validates the JSON body of the admin Food item
// create/edit endpoints (category_id, item_name, description).
//
// foodCategoryValidator: validates the multipart body of the admin
// Food category create endpoint (category_name). Must run AFTER
// upload.single("image") so that multer has populated req.body.
//
// Both return the project's existing validation response format:
//   400 { success: false, message: "<msg>" }
// =====================================

const respondWithError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  next();
};

const foodItemValidator = [
  body("category_id")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer."),

  body("item_name")
    .isString()
    .withMessage("Item name must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Item name is required.")
    .isLength({ max: 100 })
    .withMessage("Item name must be at most 100 characters."),

  body("description")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Description must be a string.")
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description must be at most 2000 characters."),

  respondWithError,
];

const foodCategoryValidator = [
  body("category_name")
    .isString()
    .withMessage("Category name must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ max: 100 })
    .withMessage("Category name must be at most 100 characters."),

  respondWithError,
];

module.exports = { foodItemValidator, foodCategoryValidator };
