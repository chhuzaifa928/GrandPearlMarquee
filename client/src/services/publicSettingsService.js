import axios from "axios";

const API = "http://localhost:5000/api/settings/public";

export const getWebsiteSettings = async () => {
  const response = await axios.get(API);
  return response.data.settings;
};