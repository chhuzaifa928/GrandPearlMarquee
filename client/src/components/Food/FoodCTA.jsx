import "./FoodCTA.css";
import { Link } from "react-router-dom";

function FoodCTA() {
  return (
    <section className="food-cta">

      <div className="food-cta-overlay"></div>

      <div
        className="container"
        data-aos="zoom-in"
      >
        <div className="food-cta-content">

          <span>MAKE EVERY EVENT DELICIOUS</span>

          <h2>
            Delight Your Guests With Exceptional Catering
          </h2>

          <p>
            From elegant wedding receptions to corporate events and family
            celebrations, Grand Pearl Marquee offers premium catering
            services designed to create unforgettable dining experiences.
          </p>

          <div className="cta-buttons">

            <Link
              to="/booking"
              className="btn btn-gold"
            >
              Book Catering
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

export default FoodCTA;