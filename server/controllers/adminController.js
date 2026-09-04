const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/authMiddleware");

const {
  findAdminByEmail,
  createAdmin,
  getDashboardStats,
  getTodayBookings,
  getRecentBookings,
} = require("../models/adminModel");

// =========================
// Register Admin
// =========================

const registerAdmin = (req, res) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  findAdminByEmail(email, async (err, result) => {
    if (err) {
      console.error("Admin lookup failed:", err.message);

      return res.status(500).json({
        success: false,
        message: "Unable to process the request.",
      });
    }

    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists.",
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      createAdmin(
        {
          full_name,
          email,
          password: hashedPassword,
          role: "admin",
        },
        (err) => {
          if (err) {
            console.error("Admin creation failed:", err.message);

            return res.status(500).json({
              success: false,
              message: "Unable to create admin account.",
            });
          }

          res.status(201).json({
            success: true,
            message: "Admin registered successfully.",
          });
        }
      );
    } catch (error) {
      console.error("Password hashing failed:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to process the request.",
      });
    }
  });
};

// =========================
// Login Admin
// =========================

const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  findAdminByEmail(email, async (err, result) => {
    if (err) {
      console.error("Admin login lookup failed:", err.message);

      return res.status(500).json({
        success: false,
        message: "Unable to process the login request.",
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const admin = result[0];

    try {
      const isMatch = await bcrypt.compare(
        password,
        admin.password
      );

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "12h",
        }
      );

      // Deliver the JWT as an HttpOnly cookie (not exposed to JS).
      res.cookie(
        verifyToken.AUTH_COOKIE_NAME,
        token,
        verifyToken.getAuthCookieOptions()
      );

      res.json({
        success: true,
        message: "Login successful.",
        admin: {
          id: admin.id,
          full_name: admin.full_name,
          email: admin.email,
          role: admin.role,
        },
      });
    } catch (error) {
      console.error("Admin authentication failed:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to process the login request.",
      });
    }
  });
};

// =========================
// Logout Admin
// =========================

const logoutAdmin = (req, res) => {
  res.clearCookie(
    verifyToken.AUTH_COOKIE_NAME,
    verifyToken.getAuthCookieOptions()
  );

  res.json({
    success: true,
    message: "Logged out successfully.",
  });
};

// =========================
// Dashboard Statistics
// =========================

const dashboardStats = (req, res) => {
  getDashboardStats((err, stats) => {
    if (err) {
      console.error("Dashboard statistics failed:", err.message);

      return res.status(500).json({
        success: false,
        message: "Unable to load dashboard statistics.",
      });
    }

    getTodayBookings((err, today) => {
      if (err) {
        console.error("Today's bookings query failed:", err.message);

        return res.status(500).json({
          success: false,
          message: "Unable to load today's bookings.",
        });
      }

      getRecentBookings((err, recent) => {
        if (err) {
          console.error("Recent bookings query failed:", err.message);

          return res.status(500).json({
            success: false,
            message: "Unable to load recent bookings.",
          });
        }

        res.json({
          success: true,

          stats: {
            totalBookings: Number(stats[0].totalBookings),
            pending: Number(stats[0].pending),
            approved: Number(stats[0].approved),
            rejected: Number(stats[0].rejected),
            todayEvents: Number(stats[0].todayEvents),
          },

          todayBookings: today,
          recentBookings: recent,
        });
      });
    });
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  dashboardStats,
};