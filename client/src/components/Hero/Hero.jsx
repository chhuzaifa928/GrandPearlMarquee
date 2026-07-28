import "./Hero.css";
import heroImage from "../../assets/images/hero/hero-main.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
      data-aos="zoom-in"
    >
      <div className="hero-overlay"></div>

      <div className="container hero-content">

        <span className="hero-tag">
          Premium Event Venue
        </span>

        <h1>
          Celebrate Life's <span>Finest Moments</span>
        </h1>

        <p>
          Grand Pearl Marquee offers an elegant venue for
          Barat, Walima, Mehndi, Birthday, Bridal Shower,
          Corporate Events and unforgettable celebrations.
        </p>

        <div className="hero-buttons">

          <Link to="/booking" className="btn btn-gold">
            Book Your Event
          </Link>

          <Link to="/gallery" className="btn btn-outline-light">
            Explore Gallery
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Hero;