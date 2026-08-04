import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Admin/Topbar";

import "../components/Admin/AdminLayout.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="admin-content">

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <div className="container-fluid py-4">
          <Outlet />
        </div>

      </div>
    </>
  );
}

export default AdminLayout;