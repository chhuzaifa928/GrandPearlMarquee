import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/api/food`;

export const getPublicFoodCategories = async () => {
  const response = await axios.get(
    `${API}/categories`
  );

  return response.data.categories;
};

export const getItems = async () => {
  const response = await axios.get(
    `${API}/items`
  );

  return response.data.items;
};