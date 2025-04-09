import { useSelector } from "react-redux";

import { cn } from "@/utils/utils";
import { useAppDispatch } from "@/store/hook";
import { openSidebar } from "@/store/slices/sidebarSlice/sidebarSlice";
import { selectSearchOpen } from "@/store/slices/searchSlice/searchSelector.ts";
import {
  closeSearch,
  openSearch,
} from "@/store/slices/searchSlice/searchSlice.ts";

import { ICON } from "../Icon/icons";
import Icon from "../Icon/Icon.tsx";
import { IconButton } from "../buttons/IconButton/IconButton";
import Logo from "../Logo/JobTrackerLogo";
import { SearchForm } from "../Vacancies/components/SearchForm.tsx";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { selectSearchQuery } from "@/store/slices/filteredVacanciesSlice/filteredVacanciesSelector.ts";

function MobHeader() {
  const dispatch = useAppDispatch();
  const isSearchOpen = useSelector(selectSearchOpen);
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const emptySearch = useSelector(selectSearchQuery) === "";

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node) &&
      emptySearch
    ) {
      dispatch(closeSearch());
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emptySearch, isSearchOpen]);

  const isSearchShown =
    location.pathname.replace(/^\/+/, "") === "vacancies" ||
    location.pathname.replace(/^\/+/, "") === "notes" ||
    location.pathname.replace(/^\/+/, "") === "archive";

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  const toggleSearch = () => {
    dispatch(openSearch());
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-10 flex w-full items-center justify-between bg-backgroundMain px-5 pt-4 md:px-6 md:pt-6 xl:hidden"
      )}
    >
      <Logo className="h-[44px] w-[54px]" />

      {isSearchOpen && (
        <div
          ref={searchRef}
          className="absolute right-5 top-4 z-20 md:right-[88px] md:top-6 smOnly:left-5"
        >
          <SearchForm />
        </div>
      )}

      <div className="flex gap-6">
        {isSearchShown && (
          <IconButton
            label="Search button"
            variant="default"
            onClick={toggleSearch}
            className="p-0"
          >
            <Icon id={ICON.SEARCH} className="size-10" />
          </IconButton>
        )}

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
