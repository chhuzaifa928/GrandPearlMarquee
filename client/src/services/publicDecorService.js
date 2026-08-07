import axios from "axios";

const API = "http://localhost:5000/api/decor";

export const getDecor = async () => {
  const response = await axios.get(API);
  return response.data.decor;
};