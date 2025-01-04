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

export type VacancyProps = {
  isArchive: boolean;
};

const VacancyHeader: FC<VacancyProps> = ({ isArchive }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleSetType = (option: string): void => {
    dispatch(setSortType(option));
  };

  return (
    <div className="flex w-full items-start justify-between pb-6">
      <SearchForm />
      <div className="relative flex gap-8">
        <div className="relative w-[216px]">
          <Dropdown
            options={DropdownInfo()}
            setValue={handleSetType}
            isInModal={false}
            name=""
          />
        </div>
        {!isArchive && (
          <LinkButton variant="ghost" size="small" href="/archive">
            <div className="flex items-center gap-3">
              <span className="w-[125px] text-base leading-[135%]">
                {t("vacanciesHeader.archive")}
              </span>
              <Icon id={"archive-outline"} className="h-6 w-6" />
            </div>
          </LinkButton>
        )}
        <AddVacancyButton />
      </div>
    </div>
  );
};

export default VacancyHeader;
