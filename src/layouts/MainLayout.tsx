import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/commonComponents/Footer";

function MainLayout() {
  return (
    <div className="flex h-dvh w-full flex-col">
      <Sidebar />
      <main className="ml-[92px] flex h-full flex-col justify-between">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default MainLayout;
