import "./FoodHero.css";
import { Link } from "react-router-dom";

function FoodHero() {
  return (
    <section className="food-hero">

      <div className="food-overlay"></div>

      <div
        className="container"
        data-aos="fade-up"
      >
        <div className="food-content">

          <span className="hero-tag">
            PREMIUM CATERING SERVICES
          </span>

          <h1>
            <span> Delicious Food For Every
             Celebration</span>
          </h1>

          <p>
            From elegant wedding feasts to corporate dinners and family
            gatherings, Grand Pearl Marquee offers premium catering with
            carefully crafted menus prepared by experienced chefs.
          </p>

          <div className="hero-buttons">

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
              View Menu
            </Link>

          </div>

        </div>
      </div>

    </section>
  );
}

export default FoodHero;