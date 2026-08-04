import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaPalette,
  FaUtensils,
  FaImages,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin",
    },
    {
      title: "Bookings",
      icon: <FaCalendarAlt />,
      path: "/admin/bookings",
    },
    {
      title: "Decor",
      icon: <FaPalette />,
      path: "/admin/decor",
    },
    {
      title: "Food",
      icon: <FaUtensils />,
      path: "/admin/food",
    },
    {
      title: "Gallery",
      icon: <FaImages />,
      path: "/admin/gallery",
    },
    {
      title: "Contact",
      icon: <FaEnvelope />,
      path: "/admin/contact",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <aside
      className="bg-dark text-white d-flex flex-column"
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <div className="p-4 border-bottom border-secondary">
        <h4 className="mb-1 text-warning">Grand Pearl</h4>
        <small>Admin Panel</small>
      </div>

      <nav className="flex-grow-1 mt-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none px-4 py-3 ${
                isActive
                  ? "bg-warning text-dark fw-bold"
                  : "text-white"
              }`
            }
          >
            <span className="me-3">{item.icon}</span>
            {item.title}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-top border-secondary">
        <button className="btn btn-danger w-100">
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;