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
          "fill-text-primary text-text-primary group flex items-center gap-3 transition",
          isPending && "bg-red-500",
          isActive && "fill-black text-black",
          !isActive && "hover:fill-iconHover hover:text-iconHover"
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