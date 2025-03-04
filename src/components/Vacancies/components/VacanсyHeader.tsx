import { FC } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "../../../store/hook";
import { setSortType } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice";

import Icon from "../../Icon/Icon";
import { LinkButton } from "../../buttons/LinkButton/LinkButton";
import { SearchForm } from "./SearchForm";
import Dropdown from "./dropdown/Dropdown";
import { DropdownInfo } from "./dropdown/DropdownInfo";
import AddVacancyButton from "../../buttons/AddVacancyButton/AddVacancyButton";
import { useMediaQuery } from "react-responsive";
import { ICON } from "@/components/Icon/icons";
import { IconButton } from "@/components/buttons/IconButton/IconButton";
// import { IconButton } from "@/components/buttons/IconButton/IconButton";

export type VacancyProps = {
  isArchive: boolean;
};

const VacancyHeader: FC<VacancyProps> = ({ isArchive }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const dispatch = useAppDispatch();

  const handleSetType = (option: string): void => {
    dispatch(setSortType(option));
  };

  return (
    <div className="w-full items-start pb-6 md:flex xl:justify-between">
      <SearchForm />
      <div className="relative flex xl:gap-8 smOnly:justify-between mdOnly:gap-5">
        <div className="relative hidden md:block md:w-[206px] xl:w-[216px]">
          <Dropdown
            options={DropdownInfo()}
            setValue={handleSetType}
            isInModal={false}
            name=""
          />
        </div>
        {isMobile && (
          <IconButton
            label="Search button"
            variant="default"
            onClick={() => console.log("hello")}
            className="p-0 pr-8"
          >
            <Icon id={ICON.MAGE_FILTER} className="size-10 stroke-black" />
          </IconButton>
        )}
        {!isArchive && !isMobile && (
          <LinkButton variant="ghost" size="small" href="/archive">
            <div className="items-center gap-[10px] md:flex">
              <span className="w-[124px] text-base leading-[135%] xl:w-[125px]">
                {t("vacanciesHeader.archive")}
              </span>
              <Icon id={"archive-outline"} className="h-6 w-6" />
            </div>
          </LinkButton>
        )}
        <AddVacancyButton className="smOnly:w-[210px] smOnly:justify-items-end smOnly:px-6" />
      </div>
    </div>
  );
};

export default VacancyHeader;
