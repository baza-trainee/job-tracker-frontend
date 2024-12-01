import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="flex h-dvh w-full flex-col">
      <Sidebar />
      <main className="ml-[92px] flex h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
