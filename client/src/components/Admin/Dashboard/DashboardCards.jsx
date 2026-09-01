
import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import "./DashboardCards.css";

const DEFAULT_STATS = {
  totalBookings: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
};

function DashboardCards({ stats = {} }) {
  const mergedStats = { ...DEFAULT_STATS, ...stats };

  const cards = [
    {
      title: "Total Bookings",
      value: mergedStats.totalBookings,
      icon: <FaCalendarCheck />,
      className: "primary",
    },
    {
      title: "Pending",
      value: mergedStats.pending,
      icon: <FaClock />,
      className: "warning",
    },
    {
      title: "Approved",
      value: mergedStats.approved,
      icon: <FaCheckCircle />,
      className: "success",
    },
    {
      title: "Rejected",
      value: mergedStats.rejected,
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
