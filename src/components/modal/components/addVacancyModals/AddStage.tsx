import { useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";

import classNames from "classnames";
import moment from "moment";
// component
import Icon from "@/components/Icon/Icon";
import Dropdown from "@/components/Vacancies/components/dropdown/Dropdown";
import AddVacancyInfo from "./AddVacancyInfo";
import { useAppDispatch } from "@/store/hook";
// redux
import { saveStatus } from "@/store/slices/statusVacancy/vacancyStatusSlice";
import { AddVacancyStageProps } from "./AddVacancy.props";

const AddVacancyStage = forwardRef<HTMLButtonElement, AddVacancyStageProps>(
  ({ register, getValues, setValue }, ref) => {
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const validTime: number = moment().utcOffset();
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const handleStage = (): void => {
      setDropdownOpen((prev) => !prev);
    };
    const { stagesOptions, buttonStagesOption } = AddVacancyInfo();
    const optionsDropDown = () => {
      return { mainOptions: stagesOptions, buttonOption: buttonStagesOption };
    };

    const setValueDropDowm = (nameDropdown: string, stageId: string) => {
      const statusKey = stagesOptions.find((elem) => elem.id === stageId);
      if (statusKey) {
        dispatch(
          saveStatus({
            id: statusKey.id,
            name: statusKey.name || "",
            date: moment.utc().add(validTime, "minutes").format(),
          })
        );
      }
      setDropdownOpen(false);
      return setValue?.(nameDropdown, stageId);
    };

    return (
      <div>
        <button
          className={classNames(
            "flex w-fit items-center justify-start gap-2 pr-2 text-textBlack",
            "rounded-[4px] border-[1px] border-solid border-transparent focus:border-textOther focus:outline-none"
          )}
          onClick={handleStage}
          type="button"
          ref={ref}
        >
          <Icon
            id="plus"
            className="size-6 fill-textBlack hover:fill-iconHover dark:hover:fill-iconHover"
          />
          {t("addVacancy.form.addStage")}
        </button>

        <div
          onClick={(e) => e.stopPropagation()}
          className={classNames(
            isDropdownOpen
              ? "visible relative z-50 mt-3 h-[44px] opacity-100 2xl:pl-[9.5px]"
              : "sr-only h-0 opacity-0"
          )}
        >
          <Dropdown
            options={optionsDropDown()}
            setValue={setValueDropDowm}
            isInModal={true}
            name={"addStageDropdown"}
            register={register}
            getValues={getValues}
          />
        </div>
      </div>
    );
  }
);

export default AddVacancyStage;
