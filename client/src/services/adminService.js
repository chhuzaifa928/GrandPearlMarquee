import axios from "axios";

const API = "http://localhost:5000/api/admin";

// ==========================
// Login
// ==========================

export const loginAdmin = async (loginData) => {
  const response = await axios.post(
    `${API}/login`,
    loginData
  );

  if (response.data.token) {
    localStorage.setItem(
      "token",
      response.data.token
    );
  }

  return response.data;
};

// ==========================
// Dashboard
// ==========================

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==========================
// Logout
// ==========================

export const logoutAdmin = () => {
  localStorage.removeItem("token");
};

// ==========================
// Check Login
// ==========================

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};