import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/admin`;
// ==========================
// Login
// ==========================
// The backend sets the JWT as an HttpOnly cookie.
// No token is stored in localStorage / exposed to JS.

export const loginAdmin = async (loginData) => {
  const response = await apiClient.post(
    `${API}/login`,
    loginData
  );

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
  try {
    const response = await apiClient.get(
      `${API}/me`
    );

    return response.data.success === true;
  } catch {
    return false;
  }
};
// ==========================
// Logout
// ==========================
// Asks the backend to clear the HttpOnly auth cookie,
// since JavaScript cannot delete the cookie itself.

export const logoutAdmin = async () => {
  try {
    await apiClient.post(`${API}/logout`);
  } catch {
    // Best-effort: the session cookie is cleared server-side.
  }
};