import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaUtensils,
  FaPalette,
  FaImages,
} from "react-icons/fa";

import "./QuickActions.css";

function QuickActions() {

  const navigate = useNavigate();

  const actions = [

    {
      title: "Bookings",
      icon: <FaCalendarCheck />,
      path: "/admin/bookings",
    },

    {
      title: "Food",
      icon: <FaUtensils />,
      path: "/admin/food",
    },

    {
      title: "Decor",
      icon: <FaPalette />,
      path: "/admin/decor",
    },

    {
      title: "Gallery",
      icon: <FaImages />,
      path: "/admin/gallery",
    },

  ];

  return (

    <div className="dashboard-widget">

      <h4>Quick Actions</h4>

      <div className="quick-actions-grid">

        {actions.map((action) => (

          <button
  key={action.title}
  className="quick-action-btn"
  onClick={() => navigate(action.path)}
>

  <div className="quick-icon">

    {action.icon}

  </div>

  <span>

    {action.title}

  </span>

</button>

        ))}

      </div>

    </div>

  );

}

export default QuickActions;