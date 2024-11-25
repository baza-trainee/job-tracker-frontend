// import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import cn from "clsx";

import SidebarItem from "./components/SidebarItem.tsx";
import LanguageToggle from "./components/LanguageToggle.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";
import DonateItem from "./components/DonateItem.tsx";
import NavList from "./components/NavList.tsx";
import OpenSidebarBtn from "./components/OpenSidebarBtn.tsx";
import CloseSidebarBtn from "./components/CloseSidebarBtn.tsx";

function Sidebar() {
  const { t } = useTranslation();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);

  const handleOpenSidebar = () => {
    setIsOpenSidebar(true);
  };
  const handleCloseSidebar = () => {
    setIsOpenSidebar(false);
  };

  return (
    <aside
      className={cn(
        "bg-backgroundSecondary flex h-screen w-fit max-w-[276px] flex-col justify-between rounded-r-[20px] p-6 font-nunito text-xl dark:bg-slate-800",
        !isOpenSidebar && "items-center pl-3 pr-3"
      )}
    >
      <div className={cn("flex flex-col", !isOpenSidebar && "items-center")}>
        <div className="flex items-center justify-between">
          <OpenSidebarBtn handleOpenSidebar={handleOpenSidebar} />
          <CloseSidebarBtn
            handleOpenSidebar={handleCloseSidebar}
            isOpenSidebar={isOpenSidebar}
          />
        </div>

        <nav
          className={cn(
            "mt-6 flex flex-col gap-4 border-b-2 border-[#CECECE] pb-5",
            !isOpenSidebar && "items-center px-2"
          )}
        >
          {NavList().map((item, index) => {
            return (
              <SidebarItem
                key={index}
                icon={item.icon}
                link={item.link}
                title={item.title}
                isOpen={isOpenSidebar}
              />
            );
          })}
        </nav>
      </div>
      <div
        className={cn("flex flex-col gap-6", !isOpenSidebar && "items-center")}
      >
        <div className="flex flex-col gap-4 border-b-2 border-[#CECECE] pb-6">
          <LanguageToggle isOpen={isOpenSidebar} />
          <ThemeToggle isOpen={isOpenSidebar} />
        </div>

        <div
          className={cn(
            "flex flex-col gap-4",
            !isOpenSidebar && "items-center"
          )}
        >
          <DonateItem
            icon="donate"
            title={t("donate")}
            isOpen={isOpenSidebar}
          />
          <SidebarItem
            icon="log-out"
            link="/log-in"
            title={t("navigation.logOut")}
            isOpen={isOpenSidebar}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
