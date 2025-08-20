import { useAuthStore } from "../../Store/authStore";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoutes;
