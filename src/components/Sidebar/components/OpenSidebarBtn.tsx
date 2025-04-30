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
        className="h-[30px] w-[54px] fill-black transition-colors duration-500 ease-in-out active:fill-iconHover dark:fill-slate-300 xl:hover:fill-iconHover dark:xl:hover:fill-iconHover"
      />
    </div>
  );
};

export default OpenSidebarBtn;
