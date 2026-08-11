const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ==============================
// Storage Configuration
// ==============================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    let uploadFolder = "uploads/decor";

    // Food category uploads
    if (req.originalUrl.includes("/api/food")) {
      uploadFolder = "uploads/food";
    }

    // Make sure folder exists
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
        path.extname(file.originalname)
    );
  },

});

// ==============================
// File Filter
// ==============================

const fileFilter = (req, file, cb) => {

  const allowedTypes =
    /jpeg|jpg|png|webp/;

  const extname =
    allowedTypes.test(
      path
        .extname(file.originalname)
        .toLowerCase()
    );

  const mimetype =
    allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only image files are allowed."
    )
  );
};

// ==============================
// Upload Instance
// ==============================

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;