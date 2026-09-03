const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { extensionForMime } = require("../utils/fileExtensions");

// ===============================
// Storage Configuration
// ===============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = path.join(
      __dirname,
      "../uploads/decor"
    );

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, {
        recursive: true,
      });
    }

    cb(null, uploadFolder);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + extensionForMime(file.mimetype));
  },
});

// ===============================
// Allow Images + Videos
// ===============================

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const allowedVideoTypes = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

  const allowedTypes = [
    ...allowedImageTypes,
    ...allowedVideoTypes,
  ];

  if (allowedTypes.includes(file.mimetype.toLowerCase())) {
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