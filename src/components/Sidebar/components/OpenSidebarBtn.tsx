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
        className="h-[30px] w-[54px] fill-textBlack transition-colors duration-500 ease-in-out hover:fill-iconHover active:fill-iconHover"
      />
    </div>
  );
};

export default OpenSidebarBtn;
