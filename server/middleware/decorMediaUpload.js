const multer = require("multer");
const path = require("path");

// ===============================
// Storage Configuration
// ===============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/decor"));
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname).toLowerCase()
    );
  },
});

// ===============================
// Allow Images + Videos
// ===============================

const fileFilter = (req, file, cb) => {
  const allowedImageTypes =
    /jpeg|jpg|png|webp/;

  const allowedVideoTypes =
    /mp4|webm|mov/;

  const extension =
    path.extname(file.originalname).toLowerCase();

  const mimetype = file.mimetype.toLowerCase();

  const isImage =
    allowedImageTypes.test(extension) &&
    mimetype.startsWith("image/");

  const isVideo =
    allowedVideoTypes.test(extension) &&
    mimetype.startsWith("video/");

  if (isImage || isVideo) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP, MP4, WEBM and MOV files are allowed."
    )
  );
};

// ===============================
// Upload Configuration
// ===============================

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
});

module.exports = upload;