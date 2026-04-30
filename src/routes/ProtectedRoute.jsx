import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // giriş yoksa login'e at
  if (!user) {
    return <Navigate to="/" />;
  }

  // rol yanlışsa engelle
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;