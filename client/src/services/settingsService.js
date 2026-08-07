import axios from "axios";

const API = "http://localhost:5000/api/settings";

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