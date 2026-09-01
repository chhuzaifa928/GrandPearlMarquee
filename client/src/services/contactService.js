import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/contact`;

// ============================
// Get All Messages
// ============================

export const getMessages = async () => {
  const response = await apiClient.get(API);

  return response.data.messages;
};

// ============================
// Delete Message
// ============================

export const deleteMessage = async (id) => {
  const response = await apiClient.delete(`${API}/${id}`);

  return response.data;
};