import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { useAppDispatch } from "../../../store/hook";
import { setSortType } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice";
import { showDropdown } from "@/store/slices/searchSlice/searchSlice.ts";

import Icon from "../../Icon/Icon";
import { LinkButton } from "../../buttons/LinkButton/LinkButton";
import { SearchForm } from "./SearchForm";
import Dropdown from "./dropdown/Dropdown";
import { DropdownInfo } from "./dropdown/DropdownInfo";
import AddVacancyButton from "../../buttons/AddVacancyButton/AddVacancyButton";
import { ICON } from "@/components/Icon/icons";
import { IconButton } from "@/components/buttons/IconButton/IconButton";
import { SearchResults } from "./SearchResults";
import { useSelector } from "react-redux";
import { selectDropdownShown } from "@/store/slices/searchSlice/searchSelector";
import { cn } from "@/utils/utils";

export type VacancyProps = {
  isArchive: boolean;
};

const VacancyHeader: FC<VacancyProps> = ({ isArchive }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const isDropdownShown = useSelector(selectDropdownShown);
  // console.log("isDropdownShown", isDropdownShown);
  const dispatch = useAppDispatch();

  const handleSetType = (option: string): void => {
    dispatch(setSortType(option));
  };

  const handleShowDropdown = () => {
    dispatch(showDropdown());
  };

  const dropdownInfo = DropdownInfo();

  return (
    <div className="w-full items-start pb-6 xl:flex xl:justify-between">
      {isDesctop && <SearchForm />}
      <div className="relative flex xl:gap-8 smOnly:justify-between mdOnly:gap-5">
        <div
          className={cn(
            "md:relative md:block md:w-[206px] xl:w-[216px]",
            !isDropdownShown && "hidden"
          )}
        >
          <Dropdown
            options={dropdownInfo}
            setValue={handleSetType}
            isInModal={false}
            name=""
          />
        </div>
        {isMobile && (
          <IconButton
            label="Sort button"
            variant="default"
            onClick={handleShowDropdown}
            className="p-0 pr-[30px]"
          >
            <Icon id={ICON.MAGE_FILTER} className="size-10 stroke-black" />
          </IconButton>
        )}

        {!isArchive && !isMobile && (
          <LinkButton variant="ghost" size="small" href="/archive">
            <div className="flex items-center gap-[10px]">
              <span className="w-[124px] text-base leading-[135%] xl:w-[125px]">
                {t("vacanciesHeader.archive")}
              </span>
              <Icon id={"archive-outline"} className="size-6" />
            </div>
          </LinkButton>
        )}
        <AddVacancyButton className="smOnly:w-[210px] smOnly:justify-items-end smOnly:px-6" />
      </div>
      {!isDesctop && <SearchResults />}
    </div>
  );
};

export default VacancyHeader;
