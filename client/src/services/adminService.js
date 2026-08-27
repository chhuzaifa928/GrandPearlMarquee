import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/api/admin`;
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
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload.exp) {
      localStorage.removeItem("token");
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp <= currentTime) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};