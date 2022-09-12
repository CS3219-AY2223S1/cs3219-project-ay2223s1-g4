import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated === true ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;