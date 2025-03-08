import { useState } from "react";

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

const AddVacancyStage = ({
  register,
  getValues,
  setValue,
}: AddVacancyStageProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

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
          date: moment().add(1, "hours").toISOString(),
        })
      );
    }
    setDropdownOpen(false);
    return setValue?.(nameDropdown, stageId);
  };

  return (
    <div>
      <button
        className="flex w-fit items-center justify-start gap-2 2xl:mx-[9.5px]"
        onClick={handleStage}
        type="button"
      >
        <Icon id="plus" className="size-6" />
        Додати етап
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
};

export default AddVacancyStage;
