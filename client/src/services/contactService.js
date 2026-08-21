import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/api/contact`;

const token = () => localStorage.getItem("token");

// ============================
// Get All Messages
// ============================

export const getMessages = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return response.data.messages;
};

// ============================
// Delete Message
// ============================

export const deleteMessage = async (id) => {
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