import apiClient from "./apiClient";
import API_URL from "../config/api";

const API = `${API_URL}/api/settings`;

export const DEFAULT_SETTINGS = {
  website_name: "Grand Pearl Marquee",
  tagline: "Luxury Weddings & Events",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  facebook: "",
  instagram: "",
  youtube: "",
  tiktok: "",
  logo: "",

  hero_tagline: "✨ Premium Wedding & Event Venue",
  hero_title: "Grand Pearl Marquee",
  hero_description:
    "Grand Pearl Marquee offers an elegant venue for unforgettable celebrations.",
  hero_image: "",
  hero_title_line1: "Celebrate Life's",
  hero_title_line2: "Finest Moments",
};

export const getWebsiteSettings = async () => {
  const response = await apiClient.get(`${API}/public`);

  return response.data.settings;
};