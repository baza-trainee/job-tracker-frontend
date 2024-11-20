import { PublicRouteProps } from "./PublicRoute.type";
import { useAppSelector } from "../../store/hook";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({
  children,
  routeTo = '/home',
}: PublicRouteProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ?  <Navigate to={routeTo}/>:  children;
};
