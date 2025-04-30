import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";
import classNames from "classnames";
import { JobCalendarProps } from "./JobCalendarProps";

export const JobCalendar = ({ changeDate, dateState }: JobCalendarProps) => {
  const { i18n } = useTranslation();

  return (
    <Calendar
      locale={i18n.language}
      className={classNames(
        "custom-size z-10 w-full bg-backgroundMain statistics-calendar__day border-[1px] border-[solid] border-[#436b88] rounded-[12px] py-3 job-cal"
      )}
      nextLabel={<Icon id={"arrow-right"} className="h-6 w-6" />}
      prevLabel={<Icon id={"arrow-left"} className="h-6 w-6" />}
      formatMonthYear={(locale, date) =>
        `${date.toLocaleDateString(locale, { month: "long" })} ${date.getFullYear()}`
      }
      onChange={changeDate}
      value={dateState}
    />
  );
};


// приклад CheckboxCalendarItem.tsx
// поточна дата
// const [dateState, setDateState] = useState<ValueCalendar>(new Date());
// функція збереження дати
// const changeDate = (e: ValueCalendar) => {
//   setDateState(e);
// };
