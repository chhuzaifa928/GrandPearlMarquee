import axios from "axios";

const API = "http://localhost:5000/api/contact";

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