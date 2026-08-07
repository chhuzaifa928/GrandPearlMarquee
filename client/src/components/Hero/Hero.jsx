import "./Hero.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWebsiteSettings } from "../../services/publicSettingsService";
function Hero() {

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getWebsiteSettings();
      setSettings(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!settings) {
    return null;
  }

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(http://localhost:5000${settings.hero_image})`,
      }}
      data-aos="fade-up"
    >

      <div className="hero-overlay"></div>

      <div className="container hero-content">

        <span className="hero-tag">
          {settings.hero_tagline}
        </span>

        <h1>

  <span className="hero-small">
    {settings.hero_title_line1}
  </span>

  <span className="hero-large">
    {settings.hero_title_line2}
  </span>

</h1>

        <p>
          {settings.hero_description}
        </p>

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