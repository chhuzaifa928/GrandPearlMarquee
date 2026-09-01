import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/food`;

export const getPublicFoodCategories = async () => {
  const response = await apiClient.get(`${API}/categories`);

  return response.data.categories;
};

export const getItems = async () => {
  const response = await apiClient.get(`${API}/items`);

  return response.data.items;
};