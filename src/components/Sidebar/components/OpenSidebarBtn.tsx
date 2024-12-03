import Icon from "../../Icon/Icon";
import { ICON } from "../../Icon/icons";
import { SidebarBtnProps } from "./Sidebar.props";

const OpenSidebarBtn: React.FC<SidebarBtnProps> = ({ handleOpenSidebar }) => {
  return (
    <div
      onClick={handleOpenSidebar}
      className="custom-hover cursor-pointer py-[7px]"
    >
      <Icon
        id={ICON.LOGO}
        className="h-[30px] w-[54px] fill-black hover:fill-iconHover dark:fill-slate-300 dark:hover:fill-iconHover"
      />
    </div>
  );
};

export default OpenSidebarBtn;
