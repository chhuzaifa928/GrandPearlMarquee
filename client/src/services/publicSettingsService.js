import axios from "axios";

const API = "http://localhost:5000/api/settings";

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
  const response = await axios.get(`${API}/public`);

  return response.data.settings;
};