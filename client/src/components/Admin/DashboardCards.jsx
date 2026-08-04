import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

function DashboardCards({ stats }) {
  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <FaCalendarCheck />,
      color: "primary",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      color: "warning",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: <FaCheckCircle />,
      color: "success",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle />,
      color: "danger",
    },
    {
      title: "Today's Events",
      value: stats.todayEvents,
      icon: <FaUsers />,
      color: "info",
    },
  ];

  return (
    <div className="row g-4">
      {cards.map((card, index) => (
        <div className="col-lg-3 col-md-6" key={index}>
          <div className={`card border-0 shadow-sm bg-${card.color} text-white`}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6>{card.title}</h6>
                <h2>{card.value ?? 0}</h2>
              </div>

              <div style={{ fontSize: "35px" }}>
                {card.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;