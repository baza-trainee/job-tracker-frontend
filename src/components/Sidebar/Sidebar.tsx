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

import { useAppDispatch } from "../../store/hook.ts";
import { clearTokens } from "../../store/slices/authSlice/authSlice.ts";

function Sidebar() {
  const dispatch = useAppDispatch();
  const handleLogOut = (): void => {
    dispatch(clearTokens());
  };
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
        "flex h-screen w-[256px] flex-col justify-between rounded-r-[20px] bg-backgroundSecondary p-6 font-nunito text-xl font-medium dark:bg-slate-800",
        "custom-size",
        !isOpenSidebar && "w-[92px] items-center pl-3 pr-3"
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
            "mt-6 flex flex-col gap-4 border-b-[1px] border-[#CECECE] pb-5",
            !isOpenSidebar && "items-center"
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
      <div className={cn("flex flex-col", !isOpenSidebar && "")}>
        <div className="flex flex-col gap-4 py-6">
          {/* <LanguageToggle isOpen={isOpenSidebar} /> */}
          <ThemeToggle isOpen={isOpenSidebar} />
        </div>

        <div
          className={cn(
            "flex flex-col gap-4 border-t-[1px] border-[#CECECE] pt-6",
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
            funcIcon={handleLogOut}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
