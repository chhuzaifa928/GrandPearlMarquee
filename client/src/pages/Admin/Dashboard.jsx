import useFetch from "../../hooks/useFetch";

import DashboardCards from "../../components/Admin/Dashboard/DashboardCards";
import StatsChart from "../../components/Admin/Dashboard/StatsChart";
import TodayBookings from "../../components/Admin/Dashboard/TodayBookings";
import RecentBookings from "../../components/Admin/Dashboard/RecentBookings";
import QuickActions from "../../components/Admin/Dashboard/QuickActions";







import { getDashboardStats } from "../../services/adminService";

function Dashboard() {

  const { data: dashboard } = useFetch(getDashboardStats);

  const dashboardData = dashboard ?? {
    stats: {},
    todayBookings: [],
    recentBookings: [],
  };

  return (

    <>

      <h2 className="mb-4 fw-bold">

        Dashboard

      </h2>

      <DashboardCards stats={dashboardData.stats} />

      <StatsChart />

      <div className="row mt-4 g-4">

        <div className="col-lg-6">

          <TodayBookings
            bookings={dashboardData.todayBookings}
          />

        </div>

        <div className="col-lg-6">

          <RecentBookings
            bookings={dashboardData.recentBookings}
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