import { cn } from "@/utils/utils";
import Logo from "../Logo/JobTrackerLogo";

import { useAppDispatch } from "@/store/hook";
// import { selectSidebar } from "@/store/slices/sidebarSlice/sidebarSelector";
import { openSidebar } from "@/store/slices/sidebarSlice/sidebarSlice";
// import OpenSidebarBtn from "../Sidebar/components/OpenSidebarBtn";
import { ICON } from "../Icon/icons";
import Icon from "../Icon/Icon.tsx";
import { IconButton } from "../buttons/IconButton/IconButton";

function MobHeader() {
  const dispatch = useAppDispatch();
  // const isOpenSidebar = useAppSelector(selectSidebar);

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between px-5 pt-4 md:px-6 md:pt-6 xl:hidden"
      )}
    >
      <Logo className="h-[44px] w-[54px]" />
      <div className="flex gap-4">
        <IconButton
          label="Search button"
          variant="default"
          onClick={() => console.log("hello")}
          className="p-0"
        >
          <Icon id={ICON.SEARCH} className="size-8" />
        </IconButton>
        {/* <OpenSidebarBtn
          handleOpenSidebar={handleOpenSidebar}
          isOpenSidebar={isOpenSidebar}
          icon={ICON.BURGER_MENU}
        /> */}
        <IconButton
          label="Open sidebar button"
          variant="default"
          onClick={handleOpenSidebar}
          className="p-0"
        >
          <Icon id={ICON.BURGER_MENU} className="size-10" />
        </IconButton>
      </div>
    </header>
  );
}
export default MobHeader;
