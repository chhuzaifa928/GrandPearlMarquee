import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/decor`;

// Get All Decor
export const getAllDecor = async () => {
  const response = await apiClient.get(API);
  return response.data.decor;
};

// Get Decor By ID
export const getDecorById = async (id) => {
  const response = await apiClient.get(`${API}/${id}`);
  return response.data.decor;
};

// Add Decor
export const addDecor = async (formData) => {
  const response = await apiClient.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ===============================
// Upload Decor Media
// ===============================

export const uploadDecorMedia = async (decorId, formData) => {
  const response = await apiClient.post(
    `${API_URL}/api/decor-media/${decorId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update Decor
export const updateDecor = async (id, formData) => {
  const response = await apiClient.put(
    `${API}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete Decor
export const deleteDecor = async (id) => {
  const response = await apiClient.delete(`${API}/${id}`);

  return response.data;
};
