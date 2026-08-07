import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaPalette,
  FaUtensils,
  FaImages,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaGem,
} from "react-icons/fa";

import { logoutAdmin } from "../../services/adminService";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Decor",
      path: "/admin/decor",
      icon: <FaPalette />,
    },
    {
      title: "Food",
      path: "/admin/food",
      icon: <FaUtensils />,
    },
    {
      title: "Gallery",
      path: "/admin/gallery",
      icon: <FaImages />,
    },
    {
      title: "Contact",
      path: "/admin/contact",
      icon: <FaEnvelope />,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <aside
      className={`admin-sidebar ${
        sidebarOpen ? "show" : ""
      }`}
    >
      {/* Logo */}
      <div className="sidebar-header">
        <FaGem className="logo-icon" />

        <div>
          <h3>Grand Pearl</h3>
          <span>Admin Panel</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? "active-link" : ""
              }`
            }
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            {item.title}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span className="ms-2">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;