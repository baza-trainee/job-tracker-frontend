import cn from "clsx";
import Icon from "../../Icon/Icon";
import { ICON } from "../../Icon/icons";
import { SidebarBtnProps } from "./Sidebar.props";

const CloseSidebarBtn: React.FC<SidebarBtnProps> = ({
  handleOpenSidebar,
  isOpenSidebar,
}) => {
  return (
    <div
      onClick={handleOpenSidebar}
      className={cn(
        "cursor-pointer xl:p-[10px]",
        "custom-transition fill-textBlack hover:fill-iconHover active:fill-iconHover",
        !isOpenSidebar ? "sr-only m-0 opacity-0" : "visible opacity-100"
      )}
    >
      <Icon
        id={ICON.ARROW_LEFT}
        className="size-11 rotate-180 xl:size-6 xl:rotate-0"
      />
    </div>
  );
};

export default CloseSidebarBtn;
