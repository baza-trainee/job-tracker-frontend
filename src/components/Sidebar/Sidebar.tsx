import { useTranslation } from "react-i18next";
import cn from "clsx";

import SidebarNavItem from "./components/SidebarNavItem.tsx";
import LanguageToggle from "./components/LanguageToggle.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";
import SidebarActionItem from "./components/SidebarActionItem.tsx";
import NavList from "./components/NavList.tsx";
import OpenSidebarBtn from "./components/OpenSidebarBtn.tsx";
import CloseSidebarBtn from "./components/CloseSidebarBtn.tsx";

import { useAppDispatch, useAppSelector } from "../../store/hook.ts";
import { selectSidebar } from "../../store/slices/sibebarSlice/sidebarSelector.ts";
import {
  closeSidebar,
  openSidebar,
} from "../../store/slices/sibebarSlice/sidebarSlice.ts";

import { openModal } from "../../store/slices/modalSlice/modalSlice.ts";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { ICON } from "../Icon/icons.ts";

function Sidebar() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    // Функція для оновлення стану при зміні розміру
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < 1280);
    }, 200);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogOut = (): void => {
    dispatch(
      openModal({
        typeModal: "logOut",
      })
    );
  };

  const handleSupportModal = (): void => {
    dispatch(
      openModal({
        typeModal: "contactUs",
      })
    );
  };

  const isOpenSidebar = useAppSelector(selectSidebar);

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const { t } = useTranslation();
  const isArchiveBtnRender =
    isMobile && location.pathname.includes("vacancies");

  let navListForRender = isArchiveBtnRender
    ? NavList()
    : NavList().slice(0, -1);

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 z-20 box-border flex h-[686px] flex-col justify-between bg-backgroundSecondary px-5 py-4 font-nunito text-xl font-medium dark:bg-slate-800 md:h-[780px] md:w-[256px] md:rounded-l-[20px] md:p-6 xl:left-0 xl:h-dvh xl:rounded-l-none xl:rounded-r-[20px] smOnly:max-w-full",
        "custom-size",

        !isOpenSidebar
          ? "w-[40px] items-center px-3 md:w-[92px] md:px-3 smOnly:translate-x-[92px] mdOnly:translate-x-[92px]"
          : "smOnly:w-full"
      )}
    >
      <div className={cn("flex flex-col")}>
        <div className={cn("flex items-center justify-between")}>
          <OpenSidebarBtn
            handleOpenSidebar={handleOpenSidebar}
            icon={ICON.LOGO}
          />
          <CloseSidebarBtn
            handleOpenSidebar={handleCloseSidebar}
            isOpenSidebar={isOpenSidebar}
          />
        </div>

        <nav
          className={cn(
            "mt-6 flex flex-col gap-4 border-b-[1px] border-borderLight pb-5",
            !isOpenSidebar && "items-center"
          )}
        >
          {navListForRender.map((item, index) => {
            return (
              <SidebarNavItem
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
          <LanguageToggle isOpen={isOpenSidebar} />
          <ThemeToggle isOpen={isOpenSidebar} />
        </div>

        <div
          className={cn(
            "flex flex-col gap-4 border-t-[1px] border-borderLight pt-6",
            !isOpenSidebar && "items-center"
          )}
        >
          <SidebarActionItem
            icon="support"
            title={t("navigation.support")}
            isOpen={isOpenSidebar}
            donateIcon={false}
            className="border-transparent dark:fill-slate-300 dark:text-slate-300"
            action={handleSupportModal}
          />
          <SidebarActionItem
            icon="donate"
            title={t("donate")}
            isOpen={isOpenSidebar}
            className="border-textBlack bg-button px-3"
            donateIcon={true}
          />
          <SidebarActionItem
            icon="log-out"
            title={t("navigation.logOut")}
            isOpen={isOpenSidebar}
            className="border-transparent dark:fill-slate-300 dark:text-slate-300"
            donateIcon={false}
            action={handleLogOut}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
