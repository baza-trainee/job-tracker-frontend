import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon.tsx";
import { ICON } from "../Icon/icons.ts";
import SidebarItem from "./SidebarItem.tsx";
import LanguageToggle from "./LanguageToggle.tsx";
import ThemeToggle from "./ThemeToggle.tsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Sidebar() {
  const { t } = useTranslation();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const handleOpenSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };
  // const handleCloseSidebar = () => {
  //   setIsOpenSidebar(false);
  // };

  //onClick={handleOpenModal}

  return (
    <aside className="flex h-[1024px] w-fit max-w-[276px] flex-col justify-between rounded-r-[20px] bg-background-sidebar px-6 pb-[60px] pt-10 font-nunito text-xl dark:bg-slate-800">
      <div>
        <NavLink to="/" className="">
          <Icon
            id={ICON.LOGO}
            className="h-[52px] w-[94px] fill-black transition hover:fill-iconHover dark:fill-slate-300 dark:hover:fill-iconHover"
          />
        </NavLink>
        <div onClick={handleOpenSidebar} className="cursor-pointer">
          <Icon
            id={isOpenSidebar ? ICON.ARROW_LEFT : ICON.ARROW_DOWN}
            className="h-[52px] w-[94px] fill-black transition hover:fill-iconHover dark:fill-slate-300 dark:hover:fill-iconHover"
          />
        </div>

        <nav className="mt-[60px] flex flex-col gap-6 border-b-2 border-[#CECECE] pb-6">
          <SidebarItem
            icon="vacancy"
            link="/vacancies"
            title={t("navigation.vacancies")}
            isOpen={isOpenSidebar}
          />
          <SidebarItem
            icon="statistics"
            link="/statistics"
            title={t("navigation.statistics")}
            isOpen={isOpenSidebar}
          />
          <SidebarItem
            icon="account"
            link="/profile"
            title={t("navigation.account")}
            isOpen={isOpenSidebar}
          />
          <SidebarItem
            icon="note"
            link="/notes"
            title={t("navigation.notes")}
            isOpen={isOpenSidebar}
          />
        </nav>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 border-b-2 border-[#CECECE] pb-6">
          <LanguageToggle isOpen={isOpenSidebar} />
          <ThemeToggle isOpen={isOpenSidebar} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border-[1px] border-[#525252] bg-white fill-text-primary px-6 py-2 transition hover:fill-iconHover hover:text-iconHover">
            <Icon id={ICON.DONATE} className="h-6 w-6" />
            <span
              className={`${isOpenSidebar ? "visible" : "hidden"} w-[148px]`}
            >
              {t("donate")}
            </span>
          </div>
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
