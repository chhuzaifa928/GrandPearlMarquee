import axios from "axios";

const API = "http://localhost:5000/api/food";

const token = () => localStorage.getItem("token");

// ===========================
// Categories
// ===========================

export const getCategories = async () => {
  const response = await axios.get(
    `${API}/categories`
  );

  return response.data.categories;
};

export const addCategory = async (formData) => {
  const response = await axios.post(
    `${API}/categories`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${API}/categories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return response.data;
};

// ===========================
// Food Items
// ===========================

export const getItems = async () => {
  const response = await axios.get(
    `${API}/items`
  );

  return response.data.items;
};

export const addItem = async (item) => {
  const response = await axios.post(
    `${API}/items`,
    item,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return response.data;
};

export const updateItem = async (
  id,
  item
) => {
  const response = await axios.put(
    `${API}/items/${id}`,
    item,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(
    `${API}/items/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return response.data;
};