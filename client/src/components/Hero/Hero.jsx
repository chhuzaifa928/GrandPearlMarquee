import "./Hero.css";
import heroImage from "../../assets/images/hero/hero-main.jpg";
import logo from "../../assets/images/logo/grand-pearl-logo.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay"></div>

      <div className="container hero-content">

        <img
          src={logo}
          alt="Grand Pearl Marquee"
          className="hero-logo"
        />

        <h1>Grand Pearl Marquee</h1>

        <p>
          Where Elegant Celebrations Become Beautiful Memories
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