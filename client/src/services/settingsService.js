import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/api/settings`;

const token = () => localStorage.getItem("token");

// ==========================
// Get Settings
// ==========================

export const getSettings = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return response.data.settings;
};

// ==========================
// Update Settings
// ==========================

export const updateSettings = async (data) => {
  const response = await axios.put(API, data, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return response.data;
};

// ==========================
// Upload Hero Image
// ==========================

export const uploadHeroImage = async (file) => {
  const formData = new FormData();

  formData.append("hero_image", file);

  const response = await axios.post(
    `${API}/hero-image`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return response.data;
};