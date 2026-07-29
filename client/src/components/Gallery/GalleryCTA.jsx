import "./GalleryCTA.css";
import { Link } from "react-router-dom";

function GalleryCTA() {
  return (
    <section className="gallery-cta">

      <div className="gallery-cta-overlay"></div>

      <div
        className="container"
        data-aos="zoom-in"
      >
        <div className="gallery-cta-content">

          <span>CREATE YOUR OWN MEMORIES</span>

          <h2>
            Your Dream Celebration Starts Here
          </h2>

          <p>
            Whether you're planning a wedding, Walima, Mehndi,
            birthday, corporate event, or family gathering,
            Grand Pearl Marquee is ready to make your special day unforgettable.
          </p>

          <div className="cta-buttons">

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

export default GalleryCTA;