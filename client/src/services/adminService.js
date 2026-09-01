import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/admin`;
// ==========================
// Login
// ==========================

export const loginAdmin = async (loginData) => {
  const response = await apiClient.post(
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
  const response = await apiClient.get(
    `${API}/dashboard`
  );

  return response.data;
};

// ==========================
// Verify Admin Session
// ==========================

export const verifyAdminSession = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const response = await apiClient.get(
      `${API}/me`
    );

    return response.data.success === true;
  } catch {
    localStorage.removeItem("token");
    return false;
  }
};
// ==========================
// Logout
// ==========================

export const logoutAdmin = () => {
  localStorage.removeItem("token");
};
