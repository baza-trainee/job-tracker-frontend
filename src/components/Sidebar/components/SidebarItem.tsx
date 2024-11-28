import { NavLink } from "react-router-dom";
import clsx from "clsx";

import Icon from "../../Icon/Icon.tsx";
import { SidebarItemProps } from "./Sidebar.props.ts";

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  link,
  title,
  isOpen,
  funcLogOut,
}) => {
  return (
    <NavLink
      to={link}
      className={({ isActive, isPending }) =>
        clsx(
          "group flex w-fit items-center gap-3 fill-textBlack text-textBlack transition dark:fill-slate-300 dark:text-slate-300",
          isPending && "bg-red-500",
          isActive &&
            "fill-[#000000] font-bold text-[#000000] dark:fill-white dark:text-white",
          !isActive &&
            "hover:fill-iconHover hover:text-iconHover dark:hover:fill-iconHover dark:hover:text-iconHover"
        )
      }
      onClick={funcLogOut}
    >
      <Icon id={icon} className="h-10 w-10" />
      <span className={`${isOpen ? "visible" : "sr-only"}`}>{title}</span>
    </NavLink>
  );
};

export default SidebarItem;
