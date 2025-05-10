import { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

import { cn } from "@/utils/utils";
import { useAppDispatch } from "../../store/hook";
import { setSortType } from "../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice";
import { showDropdown } from "@/store/slices/searchSlice/searchSlice.ts";
import { selectDropdownShown } from "@/store/slices/searchSlice/searchSelector";
import { setNotesSortType } from "@/store/slices/filteredNotesSlice/filteredNotesSlice";
import { selectSortType } from "@/store/slices/filteredVacanciesSlice/filteredVacanciesSelector";
import { selectNotesSortType } from "@/store/slices/filteredNotesSlice/filteredNotesSelector";

import Icon from "../Icon/Icon";
import { LinkButton } from "../buttons/LinkButton/LinkButton";
import { SearchForm } from "../Vacancies/components/SearchForm";
import Dropdown from "../Vacancies/components/dropdown/Dropdown";
import { ICON } from "@/components/Icon/icons";
import { IconButton } from "@/components/buttons/IconButton/IconButton";
import { SearchResults } from "../Vacancies/components/SearchResults";
import AddButton from "../buttons/AddButton/AddButton";
import { DropdownNotesInfo } from "../Vacancies/components/dropdown/DropdownNotesInfo";
import { DropdownVacancyInfo } from "../Vacancies/components/dropdown/DropdownVacancyInfo";
import { Options } from "../Vacancies/components/dropdown/Dropdown.props";

const PageHeader: FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const isDropdownShown = useSelector(selectDropdownShown);

  const location = useLocation();

  const dispatch = useAppDispatch();

  let handleSetType: (option: string) => void = () => {};
  let dropdownInfo: Options = {
    mainOptions: [],
    buttonOption: { id: "", label: "" },
  };

  const variant = location.pathname.replace(/^\/+/, "") as
    | "notes"
    | "vacancies"
    | "noNote"
    | "archive";

  const isArchive = variant === "archive" || variant === "notes";

  switch (variant) {
    case "vacancies":
    case "archive":
      dropdownInfo = DropdownVacancyInfo();
      handleSetType = (option: string): void => {
        dispatch(setSortType(option));
      };
      break;
    case "notes":
      dropdownInfo = DropdownNotesInfo();
      handleSetType = (option: string): void => {
        dispatch(setNotesSortType(option));
      };
      break;

    default:
      break;
  }

  const handleShowDropdown = () => {
    dispatch(showDropdown());
  };

  return (
    <div className="w-full items-start pb-6 xl:flex xl:justify-between">
      {isDesctop && <SearchForm />}
      <div
        className={cn(
          "relative flex xl:gap-6 smOnly:justify-between mdOnly:justify-end mdOnly:gap-5",
          isArchive && "mdOnly:justify-end"
        )}
      >
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
            selector={
              variant === "notes" ? selectNotesSortType : selectSortType
            }
            name=""
          />
        </div>
        {isMobile && (
          <IconButton
            label="Sort_button"
            variant="default"
            onClick={handleShowDropdown}
            className="mr-[30px] p-0 outline-none"
          >
            <Icon id={ICON.MAGE_FILTER} className="size-10 stroke-textBlack" />
          </IconButton>
        )}
        {!isArchive && !isMobile && (
          <LinkButton variant="ghost" size="small" href="/archive">
            <div className="flex items-center gap-[10px]">
              <span className="w-[124px] text-base leading-[135%] xl:w-[125px]">
                {t("vacanciesHeader.archive")}
              </span>
              <Icon id={"archive-outline"} className="size-6 fill-textBlack" />
            </div>
          </LinkButton>
        )}

        <AddButton variant={variant} />
      </div>
      {!isDesctop && <SearchResults />}
    </div>
  );
};

export default PageHeader;
