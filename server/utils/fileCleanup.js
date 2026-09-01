const fs = require("fs");
const path = require("path");

// Server-side uploads root (server/uploads).
const UPLOADS_DIR = path.resolve(__dirname, "..", "uploads");

// Uploads subdirectories the app actually writes to.
const ALLOWED_SUBDIRS = ["decor", "food", "gallery", "settings"];

// =====================================
// Resolve a stored DB path to an
// absolute filesystem path
// =====================================
//
// Accepts the formats the app actually stores, e.g.:
//   /uploads/decor/example.jpg
//   uploads/decor/example.jpg
//
// Refuses anything that:
//   - is not under /uploads/<known-subdir>/
//   - normalizes to a path OUTSIDE server/uploads (traversal)
//   - resolves to the uploads root itself (a directory)
//
// Returns null when the path is not a safe upload file path.
//
const resolveUploadPath = (storedPath) => {
  if (typeof storedPath !== "string" || !storedPath.trim()) {
    return null;
  }

  const normalized = storedPath.trim().replace(/\\/g, "/");

  const match = normalized.match(/^\/?uploads\/(.+)$/);
  if (!match) {
    return null;
  }

  const relativeParts = match[1].split("/").filter(Boolean);

  const [subdir] = relativeParts;
  if (!subdir || !ALLOWED_SUBDIRS.includes(subdir)) {
    return null;
  }

  const absolutePath = path.resolve(
    UPLOADS_DIR,
    ...relativeParts
  );

  const relative = path.relative(UPLOADS_DIR, absolutePath);

  if (
    relative === "" ||
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    return null;
  }

  return absolutePath;
};

// =====================================
// Safely delete ONE uploaded file
// =====================================
//
// - Never throws; always resolves a boolean.
// - Missing files resolve false (successful no-op).
// - Directories are never deleted.
// - Failures are logged server-side only and never surfaced to the
//   client. Filesystem cleanup must never roll back / fail an already
//   successful database operation.
//
const safelyRemoveFile = (storedPath) =>
  new Promise((resolve) => {
    const absolutePath = resolveUploadPath(storedPath);

    if (!absolutePath) {
      console.error(
        "Upload cleanup skipped: path rejected or unsupported:",
        storedPath
      );
      return resolve(false);
    }

    fs.stat(absolutePath, (statErr, stats) => {
      if (statErr) {
        // Already gone - treat as a clean no-op.
        if (statErr.code === "ENOENT") {
          return resolve(false);
        }

        console.error(
          "Failed to stat upload file for cleanup:",
          statErr
        );
        return resolve(false);
      }

      // Only delete individual files, never directories.
      if (!stats.isFile()) {
        console.error(
          "Upload cleanup skipped: not a file:",
          storedPath
        );
        return resolve(false);
      }

      fs.unlink(absolutePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(
            "Failed to remove upload file:",
            unlinkErr
          );
          return resolve(false);
        }

        resolve(true);
      });
    });
  });

module.exports = {
  resolveUploadPath,
  safelyRemoveFile,
};