import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/settings`;

// ==========================
// Get Settings
// ==========================

export const getSettings = async () => {
  const response = await apiClient.get(API);

  return response.data.settings;
};

// ==========================
// Update Settings
// ==========================

export const updateSettings = async (data) => {
  const response = await apiClient.put(API, data);

  return response.data;
};

// ==========================
// Upload Hero Image
// ==========================

export const uploadHeroImage = async (file) => {
  const formData = new FormData();

  formData.append("hero_image", file);

  const response = await apiClient.post(
    `${API}/hero-image`,
    formData
  );

  return response.data;
};