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

function Sidebar() {
  const dispatch = useAppDispatch();

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

  return (
    <aside
      className={cn(
        "fixed top-0 z-20 flex h-dvh w-[256px] flex-col justify-between rounded-r-[20px] bg-backgroundSecondary p-6 font-nunito text-xl font-medium dark:bg-slate-800",
        "custom-size",
        !isOpenSidebar && "w-[92px] items-center pl-3 pr-3"
      )}
    >
      <div className={cn("flex flex-col")}>
        <div className={cn("flex items-center justify-between")}>
          <OpenSidebarBtn handleOpenSidebar={handleOpenSidebar} />
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
          {NavList().map((item, index) => {
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
