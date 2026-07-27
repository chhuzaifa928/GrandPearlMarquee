import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo/grand-pearl-logo.png";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">

        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Grand Pearl Marquee" className="logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/decor">Decor</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/food">Food</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/gallery">Gallery</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/booking">Booking</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            <li className="nav-item ms-lg-3">
              <Link className="btn book-btn" to="/booking">
                Book Event
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;