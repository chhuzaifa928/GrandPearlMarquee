require("dotenv").config();
const decorRoutes = require("./routes/decorRoutes");
const decorMediaRoutes = require("./routes/decorMediaRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const adminRoutes = require("./routes/adminRoutes");
const foodRoutes = require("./routes/foodRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

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
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // (for example, some server-to-server requests)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
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
//gallery uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
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

// Global error handler (registered LAST, after all routes)
app.use(errorHandler);

module.exports = app;