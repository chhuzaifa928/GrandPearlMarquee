import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo/grand-pearl-logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

useEffect(() => {
  setMenuOpen(false);
}, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Decor",
      path: "/decor",
    },
    {
      title: "Food",
      path: "/food",
    },
    {
      title: "Gallery",
      path: "/gallery",
    },
    {
      title: "Booking",
      path: "/booking",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];

  return (
    <>
      <nav
        className={`custom-navbar ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="container navbar-container">

          {/* Logo */}

          <NavLink
            to="/"
            className="navbar-brand"
            onClick={() => {
  setMenuOpen(false);
}}
          >
            <img
              src={logo}
              alt="Grand Pearl Marquee"
              className="logo"
            />
          </NavLink>

          {/* Desktop Menu */}

          <ul className="desktop-menu">

            {links.map((link) => (

              <li key={link.path}>

                <NavLink
                  end={link.path === "/"}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  {link.title}
                </NavLink>

              </li>

            ))}

          </ul>

          {/* Desktop Button */}

          <NavLink
            to="/booking"
            className="book-btn desktop-btn"
          >
            Book Event
          </NavLink>

          {/* Hamburger */}

          <button
  type="button"
  className={`hamburger ${menuOpen ? "active" : ""}`}
  onClick={() => setMenuOpen(prev => !prev)}
  aria-label="Toggle Menu"
>
  <span></span>
  <span></span>
  <span></span>
</button>

        </div>
      </nav>

      {/* Overlay */}

      <div
        className={`menu-overlay ${
          menuOpen ? "show" : ""
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Sidebar */}

      <aside
        className={`mobile-sidebar ${
          menuOpen ? "show" : ""
        }`}
      >
        <div className="mobile-logo">

          <img
            src={logo}
            alt="Grand Pearl Marquee"
          />

        </div>

        <ul>

          {links.map((link) => (

            <li key={link.path}>

              <NavLink
                end={link.path === "/"}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                {link.title}
              </NavLink>

            </li>

          ))}

        </ul>

        <NavLink
          to="/booking"
          onClick={closeMenu}
          className="book-btn mobile-btn"
        >
          Book Event
        </NavLink>

      </aside>
    </>
  );
}

export default Navbar;