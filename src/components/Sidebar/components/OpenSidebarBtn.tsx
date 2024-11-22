import Icon from "../../Icon/Icon";
import { ICON } from "../../Icon/icons";
import { SidebarBtnProps } from "./Sidebar.props";

const OpenSidebarBtn: React.FC<SidebarBtnProps> = ({ handleOpenSidebar }) => {
  return (
    <div onClick={handleOpenSidebar} className="cursor-pointer">
      <Icon
        id={ICON.LOGO}
        className="h-[52px] w-[94px] fill-black transition hover:fill-iconHover dark:fill-slate-300 dark:hover:fill-iconHover"
      />
    </div>
  );
};

export default OpenSidebarBtn;
