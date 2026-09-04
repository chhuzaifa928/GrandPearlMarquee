import axios from "axios";
import API_URL from "../config/api";

// =====================================
// Shared API Client
// =====================================
//
// Single reusable Axios instance used by all
// service modules. Centralizes the backend URL,
// a reasonable request timeout, and cross-origin
// cookie credentials so the HttpOnly admin
// authentication cookie is sent with protected
// requests.
//
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  withCredentials: true,
});

export default apiClient;