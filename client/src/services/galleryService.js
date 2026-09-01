import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/gallery`;

// ===============================
// Get Gallery
// ===============================

export const getGallery = async () => {
  const response = await apiClient.get(API);

  return response.data.gallery;
};

// ===============================
// Upload Gallery
// ===============================

export const uploadGallery = async (formData) => {
  const response = await apiClient.post(
    API,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ===============================
// Delete Gallery
// ===============================

export const deleteGallery = async (id) => {
  const response = await apiClient.delete(`${API}/${id}`);

  return response.data;
};

// ===============================
// Get Gallery Categories
// ===============================

export const getGalleryCategories = async () => {
  const response = await apiClient.get(`${API}/categories`);

  return response.data.categories;
};

// ===============================
// Delete Gallery Category
// ===============================

export const deleteGalleryCategory = async (id) => {
  const response = await apiClient.delete(
    `${API}/categories/${id}`
  );

  return response.data;
};

// ===============================
// Add Gallery Category
// ===============================

export const addGalleryCategory = async (name) => {
  const response = await apiClient.post(
    `${API}/categories`,
    { name }
  );

  return response.data;
};
