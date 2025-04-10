// PrivateRoute.js
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state) => state.user.user); // Get user from Redux
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
