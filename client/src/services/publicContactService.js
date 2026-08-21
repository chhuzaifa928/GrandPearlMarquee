import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/api/contact`;

export const sendContactMessage = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};