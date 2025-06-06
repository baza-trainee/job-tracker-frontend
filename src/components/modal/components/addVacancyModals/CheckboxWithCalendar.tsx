import { useState, forwardRef } from "react";
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

export const CheckboxWithCalendar = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { id, name, label, register, errors, date, getValues, setValue, onFocus },
    ref
  ) => {
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

    const validTime: number = moment().utcOffset();

    const handleCheckbox = () => {
      setIsChecked((prev: boolean) => !prev);
      setValueCalendar(moment(new Date()).format("D.MM.YY"));
      dispatch(
        changeStatus({
          id: id || "",
          name: name,
          date: !isChecked
            ? moment.utc().add(validTime, "minutes").format()
            : "1970-01-01T00:00:00.000Z",
        })
      );

      setIsOpenCalendar(false);
      // відстеження помилок
      if (name === "resume" || name === "reject") {
        setValue?.(`${name}`, !getValues?.(`${name}`));
      }
    };

    const createUpdatedDate = (date: string): void => {
      const newDate = moment(date)
        .set({
          hour: moment().hour(),
          minute: moment().minute() + validTime,
          second: moment().second(),
          millisecond: moment().millisecond(),
        })
        .toISOString();
      dispatch(
        changeStatus({
          id: id || "",
          name: name,
          date: newDate,
        })
      );
    };

    const changeDate = (e: ValueCalendarProps) => {
      setDateState(e);
      if (e instanceof Date) {
        const newDate = moment(e).format("D.MM.YY");
        setValueCalendar(newDate);
        createUpdatedDate(e.toISOString());
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
          return {
            mainOptions: resumeOptions,
            buttonOption: buttonResumeOption,
          };
        case "reject":
          return {
            mainOptions: rejectOptions,
            buttonOption: buttonRejectOption,
          };
        default:
          return { mainOptions: [], buttonOption: { id: "", label: "" } };
      }
    };

    const setValueDropDowm = (nameDropdown: string, resumeId: string) => {
      dispatch(
        changeStatus({
          id: id || "",
          name: name,
          resumeId: name === "resume" ? resumeId : null,
          rejectReason: name === "reject" ? resumeId : null,
        })
      );
      if (date) {
        createUpdatedDate(date);
      }
      return setValue?.(nameDropdown, resumeId);
    };

    const error = errors[`${name}Dropdown`];

    return (
      <>
        <div className="relative">
          <div>
            <div className="flex w-full items-center justify-between">
              <Checkbox
                name={name}
                id={id}
                label={t(`${label}`)}
                register={register}
                type="signUp"
                errors={errors}
                checked={isChecked}
                onClick={handleCheckbox}
                ref={ref}
                onFocus={onFocus}
              />
              <span
                className="cursor-pointer text-[14px] underline 2xl:text-[16px]"
                onClick={() => setIsOpenCalendar(true)}
              >
                {isChecked && valueCalendar}
              </span>
            </div>

            {/* ----------- Error ----------------- */}
            {error && (
              <span
                id={`inputError-${name}`}
                className={classNames(
                  "text-redColor inline-block pl-[9.5px] pt-1 font-nunito text-base font-medium"
                )}
              >
                {t(String(error?.message))}
              </span>
            )}
          </div>

          {/* ----------- Dropdown ----------------- */}
          {isDropdown ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className={classNames(
                isChecked
                  ? "visible relative z-10 mt-3 h-[44px] text-[10px] opacity-100"
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
        {/* ----- Calendar Click Away Zone --------- */}
        <div
          className={classNames(
            isOpenCalendar && isChecked
              ? "visible fixed left-0 top-0 z-[40] h-full w-full"
              : "hidden"
          )}
          onClick={() => setIsOpenCalendar(false)}
        ></div>
      </>
    );
  }
);
