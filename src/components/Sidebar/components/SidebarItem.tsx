import { NavLink } from "react-router-dom";
import clsx from "clsx";

import Icon from "../../Icon/Icon.tsx";
import { SidebarItemProps } from "./Sidebar.props.ts";

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  link,
  title,
  isOpen,
}) => {
  return (
    <NavLink
      to={link}
      className={({ isActive, isPending }) =>
        clsx(
          "fill-textBlack text-textBlack group flex w-fit items-center rounded-2xl border-2 border-transparent py-[2px] transition dark:fill-slate-300 dark:text-slate-300",
          isOpen && "w-[192px]",
          isPending && "bg-red-500",
          !isActive &&
            "hover:fill-iconHover hover:text-iconHover dark:hover:fill-iconHover dark:hover:text-iconHover",
          isActive &&
            "bg-backgroundMain !border-[#DBDCDD] fill-[#000000] text-[#000000] dark:fill-[#000000] dark:text-[#000000]"
        )
      }
    >
      <Icon id={icon} className="mx-4 h-10 w-10" />
      <span className={`${isOpen ? "visible" : "sr-only"}`}>{title}</span>
    </NavLink>
  );
};

export default SidebarItem;
