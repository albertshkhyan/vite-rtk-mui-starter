import { useAuth } from "@modules/auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateLayout;
