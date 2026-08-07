import { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { getDashboardStats } from "../../../services/adminService";

import "./DashboardCards.css";

function DashboardCards() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();

      console.log("Dashboard Stats:", data);

      setStats(data.stats);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <FaCalendarCheck />,
      className: "primary",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      className: "warning",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: <FaCheckCircle />,
      className: "success",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle />,
      className: "danger",
    },
  ];

  return (
    <div className="row g-4">
      {cards.map((card) => (
        <div
          className="col-12 col-sm-6 col-xl-3"
          key={card.title}
        >
          <div className={`dashboard-card ${card.className}`}>
            <div className="dashboard-icon">
              {card.icon}
            </div>

            <div>
              <h6>{card.title}</h6>
              <h2>{card.value}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;