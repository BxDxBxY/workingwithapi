import { useLocation, Navigate } from "react-router-dom";
import useAuthStore from "../Zustand/store";
import GetCookie from "../Cookies/GetCookie";

export function PrivateRoute({ allowedRoles, userRole, children }) {
  let location = useLocation();

  const { isAuthenticated } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  const tokenInLocalStorage = localStorage.getItem("access_token");
  const userCredentialsInLocalStorage =
    localStorage.getItem("user_credentials");

  const tokenInCookie = GetCookie("access_token");
  const userCredentialsInCookie = GetCookie("user_credentials");

  const isValid = (value) =>
    value !== undefined && value !== null && value !== "";

  const hasValidCredentials =
    isValid(tokenInLocalStorage) &&
    // isValid(userCredentialsInLocalStorage) &&
    isValid(tokenInCookie);
    // isValid(userCredentialsInCookie);

  console.log("auth check private", isAuthenticated);
  console.log("auth check private", hasValidCredentials);
  if (!isAuthenticated || !hasValidCredentials) {
    localStorage.clear();
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}
