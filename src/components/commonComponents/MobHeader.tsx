import { cn } from "@/utils/utils";
import Logo from "../Logo/JobTrackerLogo";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectSidebar } from "@/store/slices/sibebarSlice/sidebarSelector";
import { openSidebar } from "@/store/slices/sibebarSlice/sidebarSlice";
import OpenSidebarBtn from "../Sidebar/components/OpenSidebarBtn";
import { ICON } from "../Icon/icons";

function MobHeader() {
  const dispatch = useAppDispatch();
  const isOpenSidebar = useAppSelector(selectSidebar);

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between px-5 pt-4 md:px-6 md:pt-6 xl:hidden"
      )}
    >
      <Logo />
      <OpenSidebarBtn
        handleOpenSidebar={handleOpenSidebar}
        isOpenSidebar={isOpenSidebar}
        icon={ICON.BASELINE_MORE_HORIZ}
      />
    </header>
  );
}
export default MobHeader;
