import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/api/decor`;
const MEDIA_API = `${API_URL}/api/decor-media`;

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