import { FC } from "react";
import Icon from "../../Icon/Icon";
import { LinkButton } from "../../buttons/LinkButton/LinkButton";
import { useTranslation } from "react-i18next";
import { Button } from "../../buttons/Button/Button";
import { SearchForm } from "./SearchForm";
import { useAppDispatch } from "../../../store/hook";
import { openModal } from "../../../store/slices/modalSlice/modalSlice";
import SortDropdown from "./sortingDropdown/SortingDropdown";

type VacancyHeaderProps = {
  isArchive: boolean;
};

const VacancyHeader: FC<VacancyHeaderProps> = ({ isArchive }) => {
  const { t } = useTranslation();

  const handleButtonClick = () => {
    console.log("click");
  };

  const dispatch = useAppDispatch();

  return (
    <div className="flex w-full items-start justify-between pb-6">
      <SearchForm />
      <div className="relative flex gap-8">
        <SortDropdown />
        {/* <Button variant="ghost" size="small" onClick={handleButtonClick}>
          <div className="flex items-center gap-3">
            <span className="w-[92px] text-base leading-[135%]">
              {t("vacanciesHeader.sortBy")}
            </span>
            <Icon id={"arrow-down"} className="h-6 w-6" />
          </div>
        </Button> */}
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

        <Button
          variant="accent"
          size="big"
          onClick={() => {
            dispatch(
              openModal({
                typeModal: "addVacancy",
              })
            );
          }}
        >
          <div className="flex items-center gap-3">
            <span className="w-[130px] text-base leading-[135%]">
              {t("vacanciesHeader.addVacancy")}
            </span>
            <Icon id={"plus"} className="h-6 w-6" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default VacancyHeader;
