import { PrivateRouteProps } from "./PrivateRoute.type";
import { useAppSelector } from "../../store/hook";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({
  routeTo,
}: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={routeTo} />;
};
