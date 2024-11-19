import { PublicRouteProps } from "./PublicRoute.type";
import { useAppSelector } from "../../store/hook";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({
  children,
  routeTo,
}: PublicRouteProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to={routeTo} />;
};
