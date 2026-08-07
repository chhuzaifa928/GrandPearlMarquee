import axios from "axios";

const API = "http://localhost:5000/api/contact";

export const sendContactMessage = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};