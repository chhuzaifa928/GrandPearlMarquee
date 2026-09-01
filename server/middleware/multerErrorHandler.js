const multer = require("multer");

// Safe, client-facing messages for common Multer failures.
// Detailed error information is kept server-side only.
const MULTER_CODE_MESSAGES = {
  LIMIT_FILE_SIZE: "File is too large.",
  LIMIT_FILE_COUNT: "Too many files uploaded.",
  LIMIT_UNEXPECTED_FILE: "Unexpected file field.",
  LIMIT_FIELD_KEY: "Invalid form field.",
  LIMIT_FIELD_VALUE: "Invalid form field value.",
  LIMIT_FIELD_COUNT: "Too many form fields.",
  LIMIT_PART_COUNT: "Upload contains too many parts.",
};

// File-filter rejections are plain Error instances with a safe,
// predefined client message (set by each upload middleware).
const FILE_FILTER_MESSAGE = /Only .*allowed\./;

// =====================================
// Centralized Multer error handling
// =====================================
//
// Distinguishes:
//   - MulterErrors (LIMIT_FILE_SIZE, etc.) -> clean client error (400).
//   - fileFilter rejections                 -> clean client error (400).
//   - anything else                         -> forwarded to Express
//     so genuine unexpected errors use the normal error flow.
//
function multerErrorHandler(err, req, res, next) {
  // Multer-specific errors (size limits, file count, unexpected field).
  if (err instanceof multer.MulterError) {
    console.error("Multer upload error:", err.code, err.message);

    const message =
      MULTER_CODE_MESSAGES[err.code] || "Invalid file upload.";

    return res.status(400).json({
      success: false,
      message,
    });
  }

  // fileFilter rejection (a plain Error with a predefined message).
  if (
    err instanceof Error &&
    FILE_FILTER_MESSAGE.test(err.message || "")
  ) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Not an upload-related error: let Express handle it normally.
  return next(err);
}

module.exports = multerErrorHandler;
