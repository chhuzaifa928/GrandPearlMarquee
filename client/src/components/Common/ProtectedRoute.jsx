import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { verifyAdminSession } from "../../services/adminService";

const ProtectedRoute = () => {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const valid = await verifyAdminSession();

      setAuthenticated(valid);
      setChecking(false);
    };

    checkSession();
  }, []);

  if (checking) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="spinner-border text-warning"
          role="status"
        >
          <span className="visually-hidden">
            Checking authentication...
          </span>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;