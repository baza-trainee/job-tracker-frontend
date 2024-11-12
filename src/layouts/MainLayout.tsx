import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <main className="flex h-full">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default MainLayout;
