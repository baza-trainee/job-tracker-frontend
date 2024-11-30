import { NavLink } from "react-router-dom";
import clsx from "clsx";
import cn from "clsx";

import Icon from "../../Icon/Icon.tsx";
import { SidebarItemProps } from "./Sidebar.props.ts";

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  link,
  title,
  isOpen,
  funcIcon,
}) => {
  return (
    <NavLink
      to={link}
      className={({ isActive, isPending }) =>
        clsx(
          "flex items-center rounded-[20px] border-2 border-transparent fill-textBlack py-[2px] text-textBlack dark:fill-slate-300 dark:text-slate-300",
          "custom-hover custom-size",
          isOpen ? "w-[206px]" : "w-[64px]",
          isPending && "bg-red-500",
          !isActive &&
            "hover:fill-iconHover hover:text-iconHover dark:hover:fill-iconHover dark:hover:text-iconHover",
          isActive &&
            "!border-[#DBDCDD] bg-backgroundMain fill-textBlack text-textBlack dark:fill-textBlack dark:text-textBlack"
        )
      }
      onClick={funcIcon}
    >
      <Icon id={icon} className="mx-3 h-8 w-8" />
      <span
        className={cn(
          "custom-size overflow-hidden text-nowrap",
          isOpen
            ? "visible w-[148px] opacity-100"
            : "sr-only w-0 -translate-x-5 opacity-0"
        )}
      >
        {title}
      </span>
    </NavLink>
  );
};

export default SidebarItem;
