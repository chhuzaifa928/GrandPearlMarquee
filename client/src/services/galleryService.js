import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/api/gallery`;

const token = () => localStorage.getItem("token");

// ===============================
// Get Gallery
// ===============================

export const getGallery = async () => {
  const response = await axios.get(API);

  return response.data.gallery;
};

// ===============================
// Upload Gallery
// ===============================

export const uploadGallery = async (formData) => {
  const response = await axios.post(
    API,
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

// ===============================
// Delete Gallery
// ===============================

export const deleteGallery = async (id) => {
  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return response.data;
};

// ===============================
// Get Gallery Categories
// ===============================

export const getGalleryCategories = async () => {

  const response = await axios.get(
    `${API}/categories`
  );

  return response.data.categories;

};


// ===============================
// Delete Gallery Category
// ===============================

export const deleteGalleryCategory = async (id) => {

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

// ===============================
// Add Gallery Category
// ===============================

export const addGalleryCategory = async (name) => {

  const response = await axios.post(
    `${API}/categories`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return response.data;

};