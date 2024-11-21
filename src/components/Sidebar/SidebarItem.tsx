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
  funcIcon?:() => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, link, title, funcIcon }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive, isPending }) =>
        clsx(
          "group flex items-center gap-3 fill-text-primary text-text-primary transition",
          isPending && "bg-red-500",
          isActive && "fill-black text-black",
          !isActive && "hover:fill-iconHover hover:text-iconHover"
        )
      }
      // className={"group flex items-center gap-3 hover:text-iconHover"}
    onClick={funcIcon}>
      <Icon id={icon} className="h-10 w-10" />
      {title}
    </NavLink>
  );
};

export default SidebarItem;
