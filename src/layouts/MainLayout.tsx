import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/commonComponents/Footer";

function MainLayout() {
  return (
    <div className="MAIN flex h-dvh w-full flex-col">
      <Sidebar />
      <main className="flex h-full flex-col justify-between md:ml-[92px]">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default MainLayout;
