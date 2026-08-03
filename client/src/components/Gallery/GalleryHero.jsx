import "./GalleryHero.css";
import { Link } from "react-router-dom";

function GalleryHero() {
  return (
    <section className="gallery-hero">

      <div className="gallery-overlay"></div>

      <div
        className="container"
        data-aos="fade-up"
      >
        <div className="gallery-content">

          <span className="hero-tag">
            OUR MEMORABLE EVENTS
          </span>

          <h1>
            <span> Celebrate Every
             Beautiful Moment</span>
          </h1>

          <p>
            Discover unforgettable weddings, receptions, birthdays,
            corporate events, and family celebrations hosted at
            Grand Pearl Marquee. Every event reflects elegance,
            luxury, and lasting memories.
          </p>

          <div className="hero-buttons">

            <Link
              to="/booking"
              className="btn btn-gold"
            >
              Book Your Event
            </Link>

            <Link
              to="/contact"
              className="btn btn-outline-light"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </div>

    </section>
  );
}

export default GalleryHero;