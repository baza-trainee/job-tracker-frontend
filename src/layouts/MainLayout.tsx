import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="flex h-dvh w-full flex-col">
      <main className="flex h-full">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
