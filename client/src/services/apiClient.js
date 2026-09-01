import axios from "axios";
import API_URL from "../config/api";

// =====================================
// Shared API Client
// =====================================
//
// Single reusable Axios instance used by all
// service modules. Centralizes the backend URL,
// a reasonable request timeout, and automatic JWT
// attachment so services no longer repeat
// `localStorage.getItem("token")` + `Bearer ...` logic.
//
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// =====================================
// Request Interceptor
// ------------------
// Attach the existing JWT token (Bearer) to every
// request when one is present. Existing custom
// headers (e.g. multipart Content-Type) are preserved.
// =====================================
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers || {};

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// =====================================
// Response Interceptor — 401 handling
// ------------------
// Conservative handling only. When an AUTHENTICATED
// request (one that sent a Bearer token) comes back
// with 401, the stale token is cleared so the existing
// session flow (ProtectedRoute -> verifyAdminSession)
// can route the user to /admin/login on the next
// navigation. We deliberately do NOT hard-redirect,
// so public requests, login failures and normal
// component error handling are all left unchanged
// (no redirect loops).
// =====================================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;

    if (
      response &&
      response.status === 401 &&
      error.config?.headers?.Authorization
    ) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
