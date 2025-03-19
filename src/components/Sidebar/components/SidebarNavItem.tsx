import { NavLink } from "react-router-dom";
import cn from "clsx";

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
        cn(
          "flex items-center rounded-[20px] border-2 border-transparent fill-textBlack py-[2px] text-textBlack dark:fill-slate-300 dark:text-slate-300",
          "custom-transition",
          isOpen ? "w-[206px]" : "w-[68px]",
          isPending && "bg-red-500",
          !isActive &&
            "active:fill-iconHover active:text-iconHover xl:hover:fill-iconHover xl:hover:text-iconHover dark:xl:hover:fill-iconHover dark:xl:hover:text-iconHover",
          isActive &&
            "!border-[#DBDCDD] bg-backgroundMain fill-textBlack text-textBlack dark:fill-textBlack dark:text-textBlack"
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
        {title}
      </span>
    </NavLink>
  );
};

export default SidebarItem;
