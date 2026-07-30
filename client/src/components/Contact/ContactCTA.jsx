import "./ContactCTA.css";
import { Link } from "react-router-dom";

function ContactCTA() {
  return (
    <section className="contact-cta">

      <div className="contact-cta-overlay"></div>

      <div
        className="container"
        data-aos="zoom-in"
      >

        <div className="contact-cta-content">

          <span>READY TO CELEBRATE?</span>

          <h2>
            Let's Make Your Dream Event a Reality
          </h2>

          <p>
            From elegant weddings to memorable corporate events,
            Grand Pearl Marquee is committed to making every occasion
            extraordinary. Contact us today and let's start planning
            your unforgettable celebration.
          </p>

          <div className="cta-buttons">

            <Link
              to="/booking"
              className="btn btn-gold"
            >
              Book Your Event
            </Link>

            <a
              href="tel:+923001234567"
              className="btn btn-outline-light"
            >
              Call Now
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ContactCTA;