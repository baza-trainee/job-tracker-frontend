import { useState } from "react";
import { useTranslation } from "react-i18next";

import moment from "moment";
import classNames from "classnames";
// redux
import { changeStatus } from "../../../../store/slices/statusVacancy/vacancyStatusSlice";
import { useAppDispatch } from "../../../../store/hook";
// component
import Checkbox from "../../../checkbox/Checkbox";
import { JobCalendar } from "../../../Calendar/JobCalendar";
import Dropdown from "../../../Vacancies/components/dropdown/Dropdown";
import AddVacancyInfo from "./AddVacancyInfo";
// props
import { CheckboxProps } from "../../../checkbox/Checkbox.props";
import { ValueCalendarProps } from "../../../Calendar/JobCalendarProps";
import { Options } from "../../../Vacancies/components/dropdown/Dropdown.props";

export const CheckboxWithCalendar = ({
  id,
  name,
  label,
  register,
  errors,
  date,
  getValues,
  setValue,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    date !== "1970-01-01T00:00:00.000Z"
  );
  const [dateState, setDateState] = useState<ValueCalendarProps>(new Date());
  const [valueCalendar, setValueCalendar] = useState<string>(
    moment(date).format("D.MM.YY")
  );
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleCheckbox = () => {
    setIsChecked((prev: boolean) => !prev);
    setValueCalendar(moment(new Date()).format("D.MM.YY"));
    dispatch(
      changeStatus({
        id: id || "",
        name: name,
        date: !isChecked
          ? new Date().toISOString()
          : "1970-01-01T00:00:00.000Z",
      })
    );
    setIsOpenCalendar(false);
  };

  const changeDate = (e: ValueCalendarProps) => {
    setDateState(e);
    if (e instanceof Date) {
      const newDate = moment(e).format("D.MM.YY");
      setValueCalendar(newDate);
      dispatch(
        changeStatus({
          id: id || "",
          name: name,
          date: moment(e).format("YYYY-MM-DD"),
        })
      );
    }
    setIsOpenCalendar(false);
  };

  const isDropdown: boolean = name === "resume" || name === "reject";

  const {
    buttonResumeOption,
    resumeOptions,
    buttonRejectOption,
    rejectOptions,
  } = AddVacancyInfo();

  const optionsDropDown = (): Options => {
    switch (name) {
      case "resume":
        return { mainOptions: resumeOptions, buttonOption: buttonResumeOption };
      case "reject":
        return { mainOptions: rejectOptions, buttonOption: buttonRejectOption };
      default:
        return { mainOptions: [], buttonOption: { id: "", label: "" } };
    }
  };

  const setValueDropDowm = (nameDropdown: string, resumeId: string) => {
    dispatch(
      changeStatus({
        id: id || "", // вопрос с фйди может изменить
        name: name,
        resumeId: name === "resume" ? resumeId : null,
        rejectReason: name === "reject" ? resumeId : null,
      })
    );
    console.log("удалить", nameDropdown, resumeId);
    return setValue?.(nameDropdown, resumeId);
  };

  return (
    <div className="relative">
      <div className="flex w-full items-center justify-between">
        <Checkbox
          name={name}
          id={name}
          label={t(`${label}`)}
          register={register}
          type="signUp"
          errors={errors}
          checked={isChecked}
          onClick={handleCheckbox}
        />
        <span className="cursor-pointer" onClick={() => setIsOpenCalendar(true)}>
          {isChecked && valueCalendar}
        </span>
      </div>

      {/* ----------- Dropdown ----------------- */}
      {isDropdown ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className={classNames(
            isChecked
              ? "visible relative z-50 mt-3 h-[44px] pl-[9.5px] opacity-100"
              : "sr-only h-0 opacity-0"
          )}
        >
          <Dropdown
            options={optionsDropDown()}
            setValue={setValueDropDowm}
            isInModal={true}
            name={`${name}Dropdown`}
            register={register}
            getValues={getValues}
          />
        </div>
      ) : null}

      {/* ------------ Calendar ---------------- */}
      <div
        className={classNames(
          isOpenCalendar && isChecked
            ? "visible absolute right-0 top-[34px] z-50 opacity-100"
            : "sr-only h-0 opacity-0"
        )}
      >
        <JobCalendar changeDate={changeDate} dateState={dateState} />
      </div>
    </div>
  );
};
