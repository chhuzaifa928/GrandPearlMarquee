const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =====================================
// Upload Storage
// =====================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = path.join(
      __dirname,
      "../uploads/gallery"
    );

    // Create folder if it does not exist
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, {
        recursive: true,
      });
    }

    cb(null, uploadFolder);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
        path.extname(file.originalname).toLowerCase()
    );
  },
});

// =====================================
// File Filter
// =====================================

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

  if (allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP, MP4, WEBM, and MOV videos are allowed."
    )
  );
};

// =====================================
// Upload Configuration
// =====================================

const upload = multer({
  storage,
  fileFilter,

  // Maximum file size: 50 MB
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

module.exports = upload;