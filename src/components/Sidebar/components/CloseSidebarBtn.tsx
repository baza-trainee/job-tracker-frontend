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
      className={cn("cursor-pointer p-[10px]", !isOpenSidebar && "hidden")}
    >
      <Icon
        id={ICON.ARROW_LEFT}
        className="h-6 w-6 fill-black transition hover:fill-iconHover dark:fill-slate-300 dark:hover:fill-iconHover"
      />
    </div>
  );
};

export default CloseSidebarBtn;