import { cn } from "@/utils/utils";
import Logo from "../Logo/JobTrackerLogo";

import { useAppDispatch } from "@/store/hook";
// import { selectSidebar } from "@/store/slices/sidebarSlice/sidebarSelector";
import { openSidebar } from "@/store/slices/sidebarSlice/sidebarSlice";
// import OpenSidebarBtn from "../Sidebar/components/OpenSidebarBtn";
import { ICON } from "../Icon/icons";
import Icon from "../Icon/Icon.tsx";
import { IconButton } from "../buttons/IconButton/IconButton";
// import { useState } from "react";
import { SearchForm } from "../Vacancies/components/SearchForm.tsx";
import { useSelector } from "react-redux";
import { selectSearchOpen } from "@/store/slices/searchSlice/searchSelector.ts";
import { openSearch } from "@/store/slices/searchSlice/searchSlice.ts";

function MobHeader() {
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isSearchOpen = useSelector(selectSearchOpen);

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  const toggleSearch = () => {
    dispatch(openSearch());
  };

  return (
    <header
      className={cn(
        "relative flex w-full items-center justify-between px-5 pt-4 md:px-6 md:pt-6 xl:hidden"
      )}
    >
      <Logo className="h-[44px] w-[54px]" />

      {isSearchOpen && (
        <div className="absolute right-5 top-4 z-20 md:right-6 md:top-6 smOnly:left-5">
          <SearchForm />
        </div>
      )}

      <div className="flex gap-4">
        <IconButton
          label="Search button"
          variant="default"
          onClick={toggleSearch}
          className="p-0"
        >
          <Icon id={ICON.SEARCH} className="size-8" />
        </IconButton>

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
