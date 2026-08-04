import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../assets/images/logo/grand-pearl-logo.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row">

          {/* Logo & About */}
          <div className="col-lg-4 mb-4 footer-brand">
            <img src={logo} alt="Grand Pearl Marquee" className="footer-logo" />

            <p className="footer-text">
              Grand Pearl Marquee is a luxury event venue designed to make every
              celebration unforgettable with elegant décor, premium catering,
              and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4 footer-links">
            <h5>Quick Links</h5>

            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/decor">Decor</Link></li>
              <li><Link to="/food">Food</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/booking">Booking</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 mb-4 footer-contact">
            <h5>Contact</h5>

            <p><FaPhoneAlt /> +92 3165867635</p>

            <p><FaEnvelope /> info@grandpearl.com</p>

            <p><FaMapMarkerAlt /> Grand Pearl Marquee, Adayala Road, Rawalpindi</p>
          </div>

          {/* Social */}
          <div className="col-lg-3 mb-4 footer-social">
            <h5>Follow Us</h5>

            <div className="footer-actions">

              <div className="social-icons">

                <a href="#">
                  <FaFacebookF />
                </a>

                <a href="#">
                  <FaInstagram />
                </a>

              </div>

              <Link to="/booking" className="footer-btn">
                Book Your Event
              </Link>

            </div>

          </div>

        </div>

        <hr />

        <div className="copyright">
          © {new Date().getFullYear()} Grand Pearl Marquee. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}

export default Footer;