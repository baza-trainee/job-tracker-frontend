import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="flex h-dvh w-full flex-col">
      <Header />
      <main className="flex h-full">
        <Sidebar />

        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
