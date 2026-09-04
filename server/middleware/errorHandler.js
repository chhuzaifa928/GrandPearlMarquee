const multer = require("multer");

// Safe, client-facing messages for common Multer failures.
// Duplicated from multerErrorHandler.js so that any Multer error
// which slips past the route-level handler still receives a clean
// 400 response instead of an internal error.
const MULTER_CODE_MESSAGES = {
  LIMIT_FILE_SIZE: "File is too large.",
  LIMIT_FILE_COUNT: "Too many files uploaded.",
  LIMIT_UNEXPECTED_FILE: "Unexpected file field.",
  LIMIT_FIELD_KEY: "Invalid form field.",
  LIMIT_FIELD_VALUE: "Invalid form field value.",
  LIMIT_FIELD_COUNT: "Too many form fields.",
  LIMIT_PART_COUNT: "Upload contains too many parts.",
};

// =====================================
// Centralized global error handler
// =====================================
//
// Registered once in app.js as the final middleware, AFTER all
// routes.  It is a safety net for any unexpected error that has
// escaped the controllers / route-level error handlers.
//
// Responses always use the project's existing JSON shape:
//   { success: false, message: "..." }
//
// It never exposes stack traces, filesystem paths, database
// credentials, JWT secrets/tokens, environment values, request
// bodies, or authorization headers to the client.
//
function errorHandler(err, req, res, next) {
  // Response already started: do not attempt a second response.
  if (res.headersSent) {
    return next(err);
  }

  // ---- Multer upload errors ----
  // Route-level multerErrorHandler should normally convert these
  // into a 400 first; this branch is a safety net for any that
  // reach the global handler.
  if (err instanceof multer.MulterError) {
    console.error("Multer upload error:", err.code, err.message);

    const message =
      MULTER_CODE_MESSAGES[err.code] || "Invalid file upload.";

    return res.status(400).json({
      success: false,
      message,
    });
  }

  // ---- JSON / URL-encoded body parsing errors ----
  // e.g. express.json / express.urlencoded failures.
  switch (err.type) {
    case "entity.parse.failed": {
      // Malformed JSON / URL-encoded body.
      return res.status(400).json({
        success: false,
        message: "Invalid request body.",
      });
    }
    case "entity.too.large":
    case "entity.parameter.too.large": {
      // Request exceeded the configured body size limit.
      return res.status(413).json({
        success: false,
        message: "Request payload too large.",
      });
    }
    case "charset.unsupported":
    case "encoding.unsupported": {
      return res.status(415).json({
        success: false,
        message: "Unsupported character encoding.",
      });
    }
    default:
      break;
  }

  // ---- CORS origin rejection ----
  // Thrown by the cors() origin callback in app.js.
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Not allowed by CORS.",
    });
  }

  // ---- Generic unexpected errors ----
  // Log useful diagnostics server-side but never reveal internal
  // implementation details such as err.message to the client, and never
  // log the full error object (it can carry request/sql context).
  console.error("Unhandled server error:", err.code, err.message);

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
}

module.exports = errorHandler;