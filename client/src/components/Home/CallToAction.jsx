import "./CallToAction.css";
import { Link } from "react-router-dom";
import background from "../../assets/images/cta/cta-bg.jpg";

function CallToAction() {
  return (
    <section
      className="cta-section"
      style={{ backgroundImage: `url(${background})` }}
      data-aos="zoom-in"
    >
      <div className="cta-overlay"></div>

      <div className="container">

        <div className="cta-content">

          <h2>
           <span> Celebrate Your Special Moments
             at Grand Pearl Marquee</span>
          </h2>

          <p>
            From elegant weddings and grand receptions to birthdays,
            engagements and corporate events — we transform your
            celebrations into unforgettable memories.
          </p>

          <Link to="/booking" className="btn btn-gold">
            Book Your Event
          </Link>

        </div>

      </div>
    </section>
  );
}

export default CallToAction;