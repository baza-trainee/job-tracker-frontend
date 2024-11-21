import { NavLink } from "react-router-dom";
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
      className={
        "group flex items-center gap-3 hover:fill-[#436B88] hover:text-[#436B88]"
      }
    >
      <Icon id={icon} className="h-8 w-8" />
      <span>{title}</span>
    </NavLink>
  );
};

export default SidebarItem;
