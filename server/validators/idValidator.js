const { param, validationResult } = require("express-validator");

// =====================================
// Reusable ID parameter validation
// =====================================
// Validates that a route param acting as a database ID is a positive
// integer before it reaches a controller / database query.
//
// Usage (mount before the controller):
//   router.delete("/:id", verifyToken, validId("id"), removeItem);
//
// Respects the project's existing validation response format:
//   400 { success: false, message: "<msg>" }
// =====================================

const validId = (name = "id") => [
  param(name)
    .isInt({ min: 1 })
    .withMessage("Invalid ID parameter."),

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

module.exports = validId;
