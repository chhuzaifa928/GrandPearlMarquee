import axios from "axios";

const API = "http://localhost:5000/api/decor";
const MEDIA_API = "http://localhost:5000/api/decor-media";

// ===============================
// Get All Public Decor
// ===============================

export const getDecor = async () => {
  const response = await axios.get(API);

  return response.data.decor;
};

// ===============================
// Get Media For A Decor
// ===============================

export const getDecorMedia = async (decorId) => {
  const response = await axios.get(
    `${MEDIA_API}/${decorId}`
  );

  return response.data.media;
};