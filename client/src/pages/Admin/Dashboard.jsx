import { useEffect, useState } from "react";

import DashboardCards from "../../components/Admin/DashboardCards";
import { getDashboardStats } from "../../services/adminService";

function Dashboard() {

  const [stats, setStats] = useState({
    totalBookings: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    todayEvents: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const data = await getDashboardStats();

      setStats(data.stats);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="text-center mt-5">

        <div className="spinner-border text-primary"></div>

      </div>

    );

  }

  return (

    <div className="container-fluid">

      <h2 className="mb-4">

        Dashboard

      </h2>

      <DashboardCards stats={stats} />

    </div>

  );

}

export default Dashboard;