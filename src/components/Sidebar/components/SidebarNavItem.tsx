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
          "group flex items-center rounded-[20px] border-2 border-transparent py-[2px] text-textBlack",
          "custom-transition",

          isOpen ? "w-[206px]" : "w-[68px]",
          isPending && "bg-red-500",
          !isActive && "hover:text-iconHover active:text-iconHover",
          isActive && "!border-[#DBDCDD] bg-backgroundMain"
        )
      }
    >
      <Icon
        id={icon}
        className={cn(
          "group mx-[16px] h-8 w-8 fill-textBlack group-hover:fill-iconHover",
          "custom-hover"
        )}
      />
      <span
        className={cn(
          "custom-size overflow-hidden whitespace-nowrap text-textBlack active:text-iconHover active:underline group-hover:text-iconHover group-hover:underline dark:group-hover:text-iconHover",
          "custom-hover",
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
