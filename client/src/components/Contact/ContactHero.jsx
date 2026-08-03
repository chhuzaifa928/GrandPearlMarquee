import "./ContactHero.css";
import { Link } from "react-router-dom";

function ContactHero() {
  return (
    <section className="contact-hero">

      <div className="contact-overlay"></div>

      <div
        className="container"
        data-aos="fade-up"
      >
        <div className="contact-content">

          <span className="hero-tag">
            GET IN TOUCH
          </span>

          <h1>
           <span> Let's Plan Your
             Perfect Event</span>
          </h1>

          <p>
            Whether you're planning a wedding, Walima, Mehndi,
            birthday, corporate event, or family gathering,
            our team is here to help make your celebration unforgettable.
          </p>

          <div className="hero-buttons">

            <Link
              to="/booking"
              className="btn btn-gold"
            >
              Book Now
            </Link>

            <a
              href="tel:+920000000000"
              className="btn btn-outline-light"
            >
              Call Us
            </a>

          </div>

        </div>
      </div>

    </section>
  );
}

export default ContactHero;