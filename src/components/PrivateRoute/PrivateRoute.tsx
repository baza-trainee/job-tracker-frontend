import { PrivateRouteProps } from "./PrivateRoute.type";
import { useAppSelector } from "../../store/hook";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({
  children,
  routeTo,
}: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to={routeTo} />;
};
