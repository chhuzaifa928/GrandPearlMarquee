import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import logo from "../../assets/images/logo/grand-pearl-logo.png";
import useWebsiteSettings from "../../hooks/useWebsiteSettings";

function Footer() {
  const settings = useWebsiteSettings();

  return (
    <footer className="footer">

      <div className="container">

        <div className="row">

          {/* Logo */}

          <div className="col-lg-4 mb-4 footer-brand">

            <img
              src={logo}
              alt={settings?.website_name || "Grand Pearl Marquee"}
              className="footer-logo"
            />

            <p className="footer-text">
              {settings?.tagline ||
                "Luxury Weddings & Events"}
            </p>

          </div>

          {/* Links */}

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

            <p>
              <FaPhoneAlt /> {settings?.phone}
            </p>

            <p>
              <FaEnvelope /> {settings?.email}
            </p>

            <p>
              <FaMapMarkerAlt /> {settings?.address}
            </p>

          </div>

          {/* Social */}

          <div className="col-lg-3 mb-4 footer-social">

            <h5>Follow Us</h5>

            <div className="footer-actions">

              <div className="social-icons">

                <a
                  href={settings?.facebook || "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebookF />
                </a>

                <a
                  href={settings?.instagram || "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>

              </div>

              <Link
                to="/booking"
                className="footer-btn"
              >
                Book Your Event
              </Link>

            </div>

          </div>

        </div>

        <hr />

        <div className="copyright">
          © {new Date().getFullYear()}{" "}
          {settings?.website_name ||
            "Grand Pearl Marquee"}
          . All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}

export default Footer;