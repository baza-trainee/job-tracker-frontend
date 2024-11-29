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
          "flex w-fit items-center rounded-[20px] border-2 border-transparent fill-textBlack py-[2px] text-textBlack transition-all duration-500 ease-in-out dark:fill-slate-300 dark:text-slate-300",
          isOpen && "!w-[204px]",
          isPending && "bg-red-500",
          !isActive &&
            "hover:fill-iconHover hover:text-iconHover dark:hover:fill-iconHover dark:hover:text-iconHover",
          isActive &&
            "!border-[#DBDCDD] bg-backgroundMain fill-[#000000] text-[#000000] dark:fill-[#000000] dark:text-[#000000]"
        )
      }
      onClick={funcIcon}
    >
      <Icon id={icon} className="mx-3 h-8 w-8" />
      <span
        // className={`${isOpen ? "visible opacity-100" : "sr-only opacity-0"} transition-opacity duration-500`}
        className={cn(
          "transition-all duration-500 ease-in-out",
          isOpen
            ? "visible w-[148px] opacity-100"
            : "sr-only w-0 -translate-x-10 opacity-0"
        )}
      >
        {title}
      </span>
    </NavLink>
  );
};

export default SidebarItem;
