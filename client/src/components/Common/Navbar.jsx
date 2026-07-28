import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo/grand-pearl-logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">

        {/* Logo */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Grand Pearl Marquee" className="logo" />
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/decor"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Decor
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/food"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Food
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Gallery
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/booking"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Booking
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Contact
              </NavLink>
            </li>

            <li className="nav-item ms-lg-3">
              <NavLink className="btn book-btn" to="/booking">
                Book Event
              </NavLink>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;