import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../services/adminService";

const ProtectedRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
