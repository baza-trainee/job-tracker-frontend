import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/commonComponents/Footer";
import MobHeader from "@/components/commonComponents/MobHeader";

function MainLayout() {
  return (
    <div className="MAIN flex h-dvh w-full flex-col">
      <Sidebar />
      <MobHeader />
      <main className="flex h-full w-full flex-col justify-between pt-[60px] xl:pl-[92px] xl:pt-0">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default MainLayout;
