const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  findAdminByEmail,
  createAdmin,
  getDashboardStats,
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
      return res.status(500).json(err);
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
            return res.status(500).json(err);
          }

          res.status(201).json({
            success: true,
            message: "Admin registered successfully.",
          });
        }
      );
    } catch (error) {
      res.status(500).json(error);
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
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const admin = result[0];

    const isMatch = await bcrypt.compare(password, admin.password);

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
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        role: admin.role,
      },
    });
  });
};
// =========================
// Dashboard Statistics
// =========================

const dashboardStats = (req, res) => {

  getDashboardStats((err, result) => {

    if (err) {

      return res.status(500).json({

        success: false,
        message: "Failed to load dashboard.",

      });

    }

    res.json({

      success: true,

      stats: result[0],

    });

  });

};

module.exports = {
  registerAdmin,
  loginAdmin,
  dashboardStats,
};