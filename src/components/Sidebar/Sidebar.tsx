import { useTranslation } from "react-i18next";
import cn from "clsx";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hook.ts";
import { selectSidebar } from "../../store/slices/sidebarSlice/sidebarSelector.ts";
import {
  closeSidebar,
  openSidebar,
} from "../../store/slices/sidebarSlice/sidebarSlice.ts";
import { openModal } from "../../store/slices/modalSlice/modalSlice.ts";

import { ICON } from "../Icon/icons.ts";
import SidebarNavItem from "./components/SidebarNavItem.tsx";
import LanguageToggle from "./components/LanguageToggle.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";
import SidebarActionItem from "./components/SidebarActionItem.tsx";
import NavList from "./components/NavList.tsx";
import OpenSidebarBtn from "./components/OpenSidebarBtn.tsx";
import CloseSidebarBtn from "./components/CloseSidebarBtn.tsx";

function Sidebar() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isOpenSidebar = useAppSelector(selectSidebar);

  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!isDesktop && isOpenSidebar) {
      dispatch(closeSidebar());
    }
  }, [isMobile, dispatch]);

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
        "custom-size fixed right-0 top-0 z-20 flex h-fit max-h-dvh flex-col justify-between bg-backgroundSecondary px-5 py-4 font-nunito text-base font-medium leading-[135%] dark:bg-slate-800 md:h-[780px] md:p-6 md:text-xl xl:left-0 xl:h-dvh xl:rounded-r-[20px] 3xl:py-8 smOnly:overflow-y-scroll mdOnly:overflow-y-scroll mdOnly:rounded-l-[20px]",
        isOpenSidebar
          ? "w-full md:w-[256px]"
          : "w-[92px] translate-x-[92px] xl:transform-none xl:px-3 3xl:px-3"
      )}
      // className={cn(
      //   "fixed right-0 top-0 z-20 box-border flex h-fit max-h-dvh flex-col justify-between bg-backgroundSecondary px-5 py-4 font-nunito font-medium dark:bg-slate-800 md:h-[780px] md:w-[256px] md:p-6 md:text-xl xl:left-0 xl:h-dvh xl:rounded-r-[20px] smOnly:overflow-y-scroll mdOnly:rounded-l-[20px]",
      //   "custom-size",
      //   !isOpenSidebar
      //     ? "items-center px-3 md:w-[92px] md:px-3 smOnly:w-0 smOnly:px-0 mdOnly:translate-x-[92px]"
      //     : "smOnly:w-full smOnly:px-5"
      // )}
    >
      <div className={cn("flex flex-col")}>
        <div
          className={cn(
            "custom-size flex items-center justify-between",
            !isOpenSidebar ? "pl-[7px]" : "pl-0"
          )}
        >
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
            donateIcon={true}
            className="border-textBlack bg-button px-3 active:border-iconHover active:bg-iconHover active:fill-textWhite active:text-textWhite xl:hover:border-iconHover xl:hover:bg-backgroundSecondary xl:hover:fill-textBlack xl:hover:text-textBlack xl:active:border-iconHover xl:active:bg-iconHover xl:active:fill-textWhite xl:active:text-textWhite"
          />
          <SidebarActionItem
            icon="log-out"
            title={t("navigation.logOut")}
            isOpen={isOpenSidebar}
            donateIcon={false}
            className="border-transparent dark:fill-slate-300 dark:text-slate-300"
            action={handleLogOut}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
