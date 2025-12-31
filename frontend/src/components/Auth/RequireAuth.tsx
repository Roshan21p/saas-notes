import type { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth( { allowedRoles  }: { allowedRoles: string[] }) {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state?.auth
  );

  return isAuthenticated && allowedRoles.includes(role) ? (
    <Outlet />
  ) : isAuthenticated ?  (
    <Navigate to="/" />
  ) : (
    <Navigate to="/auth/login" />
  );
}

export default RequireAuth;
