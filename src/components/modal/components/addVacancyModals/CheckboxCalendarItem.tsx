import Checkbox from "../../../checkbox/Checkbox";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { CheckboxProps } from "../../../checkbox/Checkbox.props";
import { useState } from "react";
import moment from "moment";
import classNames from "classnames";
import { JobCalendar } from "../../../Calendar/JobCalendar";
import Dropdown from "../../../Vacancies/components/dropdown/Dropdown";
import { CheckboxDropdown } from "./CheckboxDropdown";

type CheckboxCalendarFunctionProps = {
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
};

type CheckboxWithCalendarItemProps = CheckboxProps &
  CheckboxCalendarFunctionProps;

type CheckBoxCalendarValue =
  | "sendSummaryCalendar"
  | "HRCalendar"
  | "testTaskCalendar"
  | "technicalInterviewCalendar"
  | "rejectionCalendar"
  | "offerCalendar";

import { ValueCalendar } from "../../../Calendar/JobCalendarProps";

export const CheckboxCalendarItem = ({
  name,
  label,
  register,
  errors,
  getValues,
  setValue,
}: CheckboxWithCalendarItemProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const [dateState, setDateState] = useState<ValueCalendar>(new Date());
  const calendarValue = getValues(`${name}Calendar`);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const handleCheckbox = () => {
    setIsChecked((prev: boolean) => !prev);
    setValue(
      `${name}Calendar` as CheckBoxCalendarValue,
      !isChecked ? moment(new Date()).format("DD.MM.YY") : "delete status"
    );
    setIsOpenCalendar(false);
  };

  const changeDate = (e: ValueCalendar) => {
    setDateState(e);
    if (e instanceof Date) {
      setValue(
        `${name}Calendar` as CheckBoxCalendarValue,
        moment(e).format("DD.MM.YY")
      );
    }
    setIsOpenCalendar(false);
  };
  const selectedType:string  = "resumeVacansy"
  // console.log(name, getValues(name), getValues(`${name}Calendar`));
 

  return (
    <div className="relative">
      <div className="flex w-full items-center justify-between">
        <Checkbox
          name={name}
          id={name}
          label={label}
          register={register}
          type="signUp"
          errors={errors}
          onClick={() => handleCheckbox()}
        />
        <span onClick={() => setIsOpenCalendar(true)}>
          {isChecked && calendarValue}
        </span>
      </div>

      <div
        className={classNames(
          isChecked ? "visible opacity-100" : "sr-only h-0 opacity-0"
        )}
      >
        <Dropdown
          options={CheckboxDropdown()}
          action={() => setValue(
            "resume", "Yes") }
          selectedType={selectedType || ""}
          isInModal={true}
        />
      </div>

      <div
        className={classNames(
          isOpenCalendar && isChecked
            ? "visible opacity-100"
            : "sr-only h-0 opacity-0"
        )}
      >
        <JobCalendar changeDate={changeDate} dateState={dateState} />
      </div>
    </div>
  );
};
