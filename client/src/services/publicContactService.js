import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/contact`;

export const sendContactMessage = async (data) => {
  const response = await apiClient.post(API, data);
  return response.data;
};