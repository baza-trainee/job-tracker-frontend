import { PublicRouteProps } from "./PublicRoute.type";
import { useAppSelector } from "../../store/hook";
import { Navigate,  Outlet } from "react-router-dom";

export const PublicRoute = ({
  routeTo
}: PublicRouteProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ?  <Navigate to={routeTo}/>: <Outlet/>;
};
