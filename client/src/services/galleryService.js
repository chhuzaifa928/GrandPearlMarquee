import axios from "axios";

const API = "http://localhost:5000/api/gallery";

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