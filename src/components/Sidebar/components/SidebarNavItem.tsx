import { NavLink } from "react-router-dom";
import cn from "clsx";

import Icon from "../../Icon/Icon.tsx";
import { SidebarItemProps } from "./Sidebar.props.ts";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  link,
  title,
  isOpen,
  onClick,
}) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <NavLink
      to={link}
      onClick={isMobile ? onClick : undefined}
      className={({ isActive, isPending }) =>
        cn(
          "group flex items-center rounded-[20px] border-2 border-transparent py-[2px]",
          "custom-transition",
          "fill-textBlack text-textBlack",
          isOpen ? "w-[206px]" : "w-[68px]",
          isPending && "bg-red-500",
          !isActive &&
            "hover:fill-iconHover hover:text-iconHover active:fill-iconHover active:text-iconHover",
          isActive &&
            "!dark:bg-backgroundMain !border-color9 bg-backgroundMain dark:bg-[#fdfeff] dark:fill-textWhite dark:text-textWhite"
        )
      }
    >
      <Icon id={icon} className={cn("mx-[16px] h-8 w-8")} />
      <span
        className={cn(
          "custom-size overflow-hidden whitespace-nowrap",
          isOpen
            ? "visible w-[108px] opacity-100"
            : "sr-only m-0 w-0 -translate-x-5 opacity-0"
        )}
      >
        {t(`navigation.${title}`)}
      </span>
    </NavLink>
  );
};

export default SidebarItem;
