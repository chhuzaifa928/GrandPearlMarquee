require("dotenv").config();
const decorRoutes = require("./routes/decorRoutes");
const decorMediaRoutes = require("./routes/decorMediaRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const path = require("path");

const adminRoutes = require("./routes/adminRoutes");
const foodRoutes = require("./routes/foodRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const errorHandler = require("./middleware/errorHandler");
const verifyToken = require("./middleware/authMiddleware");
const { UPLOADS_DIR, ensureUploadDirs } = require("./utils/uploadPaths");

const app = express();

// Trust first proxy in production (required for correct req.ip behind reverse proxy)
if (process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", 1);
}

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);
const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !process.env.FRONTEND_URL) {
  console.error(
    "CORS FATAL: FRONTEND_URL is required in production. " +
      "Set it to your production frontend origin (e.g. https://grandpearlmarquee.com)."
  );
  process.exit(1);
}

const defaultOrigins = [
  "https://grandpearlmarquee.com",
  "https://www.grandpearlmarquee.com",
];

if (!isProduction) {
  defaultOrigins.push("http://localhost:5173");
}

if (process.env.FRONTEND_URL) {
  defaultOrigins.push(process.env.FRONTEND_URL.trim().replace(/\/$/, ""));
}

const allowedOrigins = Array.from(new Set(defaultOrigins));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many attempts. Please try again later." },
});

// Test Route
app.get("/", (req, res) => {
  res.send("Grand Pearl Marquee Backend Running...");
});
// Persistent uploads directory (survives redeployments).
// Base comes from process.env.UPLOADS_DIR (or server/uploads in dev).
ensureUploadDirs();

app.use(
  "/uploads",
  express.static(UPLOADS_DIR)
);

// Admin Routes
app.use("/api/admin/login", authLimiter);
app.use("/api/admin/register", authLimiter);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/decor", decorRoutes);
app.use("/api/decor-media", decorMediaRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/settings", settingsRoutes);

// TEMPORARY DIAGNOSTIC — REMOVE AFTER DIAGNOSIS. Do not return paths or filenames.
app.get("/api/debug-uploads", verifyToken, (req, res) => {
  const TARGET = "food/1789057134902-566687008.jpg";

  const statSafe = (filePath) => {
    try {
      const s = fs.statSync(filePath);
      return { exists: true, size: s.size, is_file: s.isFile() };
    } catch {
      return { exists: false, size: 0, is_file: false };
    }
  };

  return res.json({
    success: true,
    uploads_dir: statSafe(path.join(UPLOADS_DIR, TARGET)),
    underscore_dirname: statSafe(path.join(__dirname, "..", "uploads", TARGET)),
    cwd_server_uploads: statSafe(path.join(process.cwd(), "server", "uploads", TARGET)),
    cwd_uploads: statSafe(path.join(process.cwd(), "uploads", TARGET)),
    hostinger_uploads: statSafe(path.join("/home/u864236641/grandpearl-uploads", TARGET)),
    hostinger_files: statSafe(path.join("/home/u864236641/files/grandpearl-uploads", TARGET)),
  });
});

// JSON 404 for unknown /api/* endpoints
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found.",
  });
});

// Global error handler (registered LAST, after all routes)
app.use(errorHandler);

module.exports = app;