import axios from "axios";

const API = "http://localhost:5000/api/food";

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