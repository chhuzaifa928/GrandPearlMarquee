import "./Hero.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getWebsiteSettings,
  DEFAULT_SETTINGS,
} from "../../services/publicSettingsService";

function Hero() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getWebsiteSettings();

      console.log("Hero Settings:", data);
      console.log("Hero Image From API:", data.hero_image);

      setSettings({
        ...DEFAULT_SETTINGS,
        ...data,
      });
    } catch (error) {
      console.error("Failed to load Hero settings:", error);
      setSettings(DEFAULT_SETTINGS);
    }
  };

  // ==========================
  // Hero Image URL
  // ==========================

 const heroImageUrl = settings.hero_image
  ? `http://localhost:5000${
      settings.hero_image.startsWith("/")
        ? settings.hero_image
        : `/${settings.hero_image}`
    }`
  : "";
    

  console.log("FINAL HERO IMAGE URL:", heroImageUrl);

  return (
    <section
      className="hero"
      style={
        heroImageUrl
          ? {
              backgroundImage: `url(${heroImageUrl})`,
            }
          : undefined
      }
      data-aos="fade-up"
    >
      <div className="hero-overlay"></div>

      <div className="container hero-content">

        {/* Hero Tagline */}
        <span className="hero-tag">
          {settings.hero_tagline}
        </span>

        {/* Hero Title */}
        <h1>
          <span className="hero-small">
            {settings.hero_title_line1}
          </span>

          <span className="hero-large">
            {settings.hero_title_line2}
          </span>
        </h1>

        {/* Hero Description */}
        <p>
          {settings.hero_description}
        </p>

        {/* Buttons */}
        <div className="hero-buttons">

          <Link
            to="/booking"
            className="btn btn-gold"
          >
            Book Your Event
          </Link>

          <Link
            to="/gallery"
            className="btn btn-outline-light"
          >
            Explore Gallery
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Hero;