import axios from "axios";

const API = "http://localhost:5000/api/decor";

const getToken = () => localStorage.getItem("token");

// Get All Decor
export const getAllDecor = async () => {
  const response = await axios.get(API);
  return response.data.decor;
};

// Get Decor By ID
export const getDecorById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data.decor;
};

// Add Decor
export const addDecor = async (formData) => {
  const response = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update Decor
export const updateDecor = async (id, formData) => {
  const response = await axios.put(
    `${API}/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete Decor
export const deleteDecor = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};