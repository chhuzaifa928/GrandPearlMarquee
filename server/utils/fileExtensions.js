// =====================================
// MIME -> Safe Extension Mapping
// =====================================
//
// Stored filenames derive their extension ONLY from the validated
// MIME type, never from the client-supplied original filename.
// Each MIME maps to a fixed, well-known safe extension.
//
const MIME_TO_EXT = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
};

// Returns the safe extension for a MIME type, or null when the MIME
// is not in the strict allowlist.
function extensionForMime(mimetype) {
  return MIME_TO_EXT[(mimetype || "").toLowerCase()] || null;
}

module.exports = {
  extensionForMime,
};
