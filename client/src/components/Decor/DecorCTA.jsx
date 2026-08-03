import "./DecorCTA.css";
import { Link } from "react-router-dom";

function DecorCTA() {
  return (
    <section className="decor-cta">
      <div className="container">

        <div
          className="decor-cta-content"
          data-aos="zoom-in"
        >

          <span>READY TO PLAN YOUR EVENT?</span>

          <h2>

           <span> Bring Your Dream Celebration To Life</span>
          </h2>

          <p>
            Whether it's a luxurious Barat, elegant Walima,
            colourful Mehndi, or a memorable birthday celebration,
            our expert team is ready to create the perfect décor
            for your special day.
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

export default DecorCTA;