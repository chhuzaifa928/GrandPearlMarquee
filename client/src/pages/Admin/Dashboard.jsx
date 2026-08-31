import { useEffect, useState } from "react";

import DashboardCards from "../../components/Admin/Dashboard/DashboardCards";
import StatsChart from "../../components/Admin/Dashboard/StatsChart";
import TodayBookings from "../../components/Admin/Dashboard/TodayBookings";
import RecentBookings from "../../components/Admin/Dashboard/RecentBookings";
import QuickActions from "../../components/Admin/Dashboard/QuickActions";







import { getDashboardStats } from "../../services/adminService";

function Dashboard() {

  const [dashboard, setDashboard] = useState({

    stats: {},

    todayBookings: [],

    recentBookings: [],

  });

  useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      try {
        const data = await getDashboardStats();

        if (cancelled) return;

        console.log("Dashboard Data:", data);

        setDashboard(data);

      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  return (

    <>

      <h2 className="mb-4 fw-bold">

        Dashboard

      </h2>

      <DashboardCards />

      <StatsChart />

      <div className="row mt-4 g-4">

        <div className="col-lg-6">

          <TodayBookings
            bookings={dashboard.todayBookings}
          />

        </div>

        <div className="col-lg-6">

          <RecentBookings
            bookings={dashboard.recentBookings}
          />

        </div>
        <div className="mt-4">
        <QuickActions />
        </div>
      </div>

    </>

  );

}

export default Dashboard;