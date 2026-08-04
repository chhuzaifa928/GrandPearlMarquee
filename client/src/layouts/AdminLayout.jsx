import { Outlet } from "react-router-dom";

import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Admin/Topbar";

function AdminLayout() {
  return (
    <div className="d-flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          background: "#f8f9fa",
        }}
      >
        <Topbar />

        <div className="p-4">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default AdminLayout;