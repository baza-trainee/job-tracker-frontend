import { NavLink } from "react-router-dom";
import clsx from "clsx";
// import { IconId } from "../Icon/icons";
import Icon from "../Icon/Icon.tsx";
import { IconId } from "../Icon/icons";
// import { ICON } from "../Icon/icons.ts";

export interface SidebarItemProps {
  icon: IconId;
  link: string;
  title: string;
  useStroke?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, link, title }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive, isPending }) =>
        clsx(
          "group flex items-center gap-3 fill-text-primary text-text-primary transition dark:fill-slate-300 dark:text-slate-300",
          isPending && "bg-red-500",
          isActive &&
            "fill-[#000000] font-bold text-[#000000] dark:fill-white dark:text-white",
          !isActive &&
            "hover:fill-iconHover hover:text-iconHover dark:hover:fill-iconHover dark:hover:text-iconHover"
        )
      }
      // className={"group flex items-center gap-3 hover:text-iconHover"}
    >
      <Icon id={icon} className="h-10 w-10" />
      {title}
    </NavLink>
  );
};

export default SidebarItem;
