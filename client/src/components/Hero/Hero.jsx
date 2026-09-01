import "./Hero.css";
import { Link } from "react-router-dom";
import getMediaUrl from "../../utils/getMediaUrl";
import useWebsiteSettings from "../../hooks/useWebsiteSettings";
import { DEFAULT_SETTINGS } from "../../services/publicSettingsService";

function Hero() {
  const liveSettings = useWebsiteSettings();
  const settings = { ...DEFAULT_SETTINGS, ...(liveSettings || {}) };

  // ==========================
  // Hero Image URL
  // ==========================

 const heroImageUrl = getMediaUrl(settings.hero_image);
    

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