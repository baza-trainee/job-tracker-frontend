import Checkbox from "../../../checkbox/Checkbox";
import { CheckboxProps } from "../../../checkbox/Checkbox.props";
import { useState } from "react";
import moment from "moment";
import classNames from "classnames";
import { JobCalendar } from "../../../Calendar/JobCalendar";
import { useAppDispatch } from "../../../../store/hook";

import { ValueCalendar } from "../../../Calendar/JobCalendarProps";
import {
  saveStatus,
  changeStatus,
} from "../../../../store/slices/statusVacancy/vacancySlice";

export const CheckboxCalendarItem = ({
  name,
  label,
  register,
  errors,
  date,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(date !== "1970-01-01T00:00:00.000Z");
  const [dateState, setDateState] = useState<ValueCalendar>(new Date());
  const [valueCalendar, setValueCalendar] = useState<string>("");
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const dispatch = useAppDispatch();

  const handleCheckbox = () => {
    setIsChecked((prev: boolean) => !prev);
    const newDate = moment(new Date()).format("D.MM.YY");
    setValueCalendar(newDate);
    dispatch(
      changeStatus({
        id: name,
        name: name,
        date: !isChecked ? newDate : "1970-01-01T00:00:00.000Z",
      })
    );
    setIsOpenCalendar(false);
  };

  const changeDate = (e: ValueCalendar) => {
    setDateState(e);
    if (e instanceof Date) {
      const newDate = moment(e).format("D.MM.YY");
      setValueCalendar(newDate);
      dispatch(
        changeStatus({
          id: name,
          name: name,
          date: newDate,
        })
      );
    }
    setIsOpenCalendar(false);
  };
  // const selectedType: string = "resumeVacansy";
  // // console.log(name, getValues(name), getValues(`${name}Calendar`));

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
          checked={isChecked}
          onClick={() => handleCheckbox()}
        />
        <span onClick={() => setIsOpenCalendar(true)}>
          {isChecked && valueCalendar}
        </span>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(
          isChecked
            ? "visible relative mt-3 h-[44px] opacity-100"
            : "sr-only h-0 opacity-0"
        )}
      >
        <Dropdown
          options={CheckboxDropdown()}
          setValue={setValue}
          isInModal={true}
          name={`${name}Dropdown`}
          // name="sendSummaryDropdown"
          register={register}
          getValues={getValues}
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
