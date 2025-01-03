import Calendar from "react-calendar";
import Icon from "../Icon/Icon";
import classNames from "classnames";
import { JobCalendarProps } from "./JobCalendarProps";

export const JobCalendar = ({ changeDate, dateState }: JobCalendarProps) => {
  return (
    <Calendar
      className={classNames(
        "custom-size z-10 w-full rounded-b-xl bg-backgroundMain"
      )}
      nextLabel={<Icon id={"arrow-right"} className="h-6 w-6" />}
      prevLabel={<Icon id={"arrow-left"} className="h-6 w-6" />}
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
