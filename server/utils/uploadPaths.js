const path = require("path");
const fs = require("fs");

// =====================================
// Persistent Uploads Root
// =====================================
//
// Single source of truth for where uploaded media lives on disk.
//
//   process.env.UPLOADS_DIR   -> production persistent directory
//                                (Hostinger: /files/grandpearl-uploads)
//   (no env var, local dev)   -> server/uploads
//
// The DATABASE keeps storing relative public paths such as
// "/uploads/gallery/file.jpg" and "/uploads/decor/file.mp4".
// This module changes only where those bytes physically live; the
// public /uploads URL and the DB path format never change.

const UPLOADS_DIR =
  process.env.UPLOADS_DIR || path.join(__dirname, "../uploads");

const GALLERY_UPLOAD_DIR = path.join(UPLOADS_DIR, "gallery");
const DECOR_UPLOAD_DIR = path.join(UPLOADS_DIR, "decor");
const FOOD_UPLOAD_DIR = path.join(UPLOADS_DIR, "food");
const SETTINGS_UPLOAD_DIR = path.join(UPLOADS_DIR, "settings");

// Subdirectories the app actually writes to.
const UPLOAD_SUBDIRS = ["gallery", "decor", "food", "settings"];

// =====================================
// Ensure all subdirectories exist
// =====================================
//
// Creates the four upload directories when missing. Idempotent and
// never deletes or overwrites existing files. Called once at server
// startup; each multer middleware also keeps its own existing
// existsSync + mkdirSync guard before writing a file.
//
const ensureUploadDirs = () => {
  [GALLERY_UPLOAD_DIR, DECOR_UPLOAD_DIR, FOOD_UPLOAD_DIR, SETTINGS_UPLOAD_DIR].forEach(
    (dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  );
};

module.exports = {
  UPLOADS_DIR,
  GALLERY_UPLOAD_DIR,
  DECOR_UPLOAD_DIR,
  FOOD_UPLOAD_DIR,
  SETTINGS_UPLOAD_DIR,
  UPLOAD_SUBDIRS,
  ensureUploadDirs,
};