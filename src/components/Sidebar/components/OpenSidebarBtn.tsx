import Icon from "../../Icon/Icon";

import { SidebarOpenBtnProps } from "./Sidebar.props";

const OpenSidebarBtn: React.FC<SidebarOpenBtnProps> = ({
  handleOpenSidebar,
  icon,
}) => {
  return (
    <div
      onClick={handleOpenSidebar}
      className="custom-hover cursor-pointer py-[7px]"
    >
      <Icon
        id={icon}
        className="h-[30px] w-[54px] fill-black transition-colors duration-500 ease-in-out hover:fill-iconHover dark:fill-slate-300 dark:hover:fill-iconHover"
      />
    </div>
  );
};

export default OpenSidebarBtn;
