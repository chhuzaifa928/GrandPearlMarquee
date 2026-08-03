const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.send("Grand Pearl Marquee Backend Running...");
});

// Admin Routes
app.use("/api/admin", adminRoutes);

module.exports = app;