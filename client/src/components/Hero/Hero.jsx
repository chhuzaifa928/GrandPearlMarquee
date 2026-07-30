import "./Hero.css";
import heroImage from "../../assets/images/hero/hero-main.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
      data-aos="fade-up"
    >
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <span className="hero-tag">
          ✨ Premium Event Venue
        </span>

        <h1>
          <span className="hero-small">Celebrate Life's</span>
          <span className="hero-large">Finest Moments</span>
        </h1>

        <p>
          Grand Pearl Marquee offers an elegant venue for Barat,
          Walima, Mehndi, Birthday, Bridal Shower, Corporate
          Events, Family Gatherings, and unforgettable celebrations
          crafted with luxury and excellence.
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