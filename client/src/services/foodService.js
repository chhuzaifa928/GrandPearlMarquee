import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/food`;

// ===========================
// Categories
// ===========================

export const getCategories = async () => {
  const response = await apiClient.get(`${API}/categories`);

  return response.data.categories;
};

export const addCategory = async (formData) => {
  const response = await apiClient.post(
    `${API}/categories`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await apiClient.delete(
    `${API}/categories/${id}`
  );

  return response.data;
};

// ===========================
// Food Items
// ===========================

export const getItems = async () => {
  const response = await apiClient.get(`${API}/items`);

  return response.data.items;
};

export const addItem = async (item) => {
  const response = await apiClient.post(`${API}/items`, item);

  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await apiClient.put(
    `${API}/items/${id}`,
    item
  );

  return response.data;
};

export const deleteItem = async (id) => {
  const response = await apiClient.delete(
    `${API}/items/${id}`
  );

  return response.data;
};
