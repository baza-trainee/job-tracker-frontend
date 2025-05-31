import Icon from "../../Icon/Icon";

import { SidebarOpenBtnProps } from "./Sidebar.props";

const OpenSidebarBtn: React.FC<SidebarOpenBtnProps> = ({
  handleOpenSidebar,
  icon,
}) => {
  return (
    <div
      onClick={handleOpenSidebar}
      className="custom-hover cursor-pointer fill-textBlack py-[7px] hover:fill-iconHover active:fill-iconHover"
    >
      <Icon id={icon} className="h-[32px] w-[56px]" />
    </div>
  );
};

export default OpenSidebarBtn;
