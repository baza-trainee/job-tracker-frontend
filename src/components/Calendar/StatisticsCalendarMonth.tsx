import { useTranslation } from "react-i18next";
import { useState } from "react";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

type StatisticsCalendarMonthProps = {
  onMonthChange: (month: Date) => void;
};

export const StatisticsCalendarMonth: React.FC<
  StatisticsCalendarMonthProps
> = ({ onMonthChange }) => {
  const { t, i18n } = useTranslation();

  const months: string[] = t("calendar.monthsShort", {
    returnObjects: true,
  }) as string[];
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);

  return (
    <div className="statistics-calendar box-border h-[514px] w-[468px] rounded-[20px] bg-backgroundTertiary px-6 py-8">
      <Calendar
        view="year" // Відображає 1 рік, в ньому місяців
        locale={i18n.language}
        onClickMonth={(date) => {
          const firstDayOfMonth = new Date(
            date.getFullYear(),
            date.getMonth(),
            1
          ); // Переконуємося, що дата - це 1-е число місяця
          //   console.log("Клік на місяць:", date);
          //   console.log("Клік на місяць (початок місяця):", firstDayOfMonth);
          setSelectedMonth(firstDayOfMonth);
          onMonthChange(firstDayOfMonth);
        }}
        value={selectedMonth}
        className="statistics-calendar__months"
        nextLabel={<Icon id={"arrow-right"} className="size-6" />}
        prevLabel={<Icon id={"arrow-left"} className="size-6" />}
        tileContent={({ date, view }) => {
          if (view === "year") {
            // Додаємо кастомні назви місяців (скорочені по дизайну)
            return <span>{months[date.getMonth()]}</span>;
          }
          return null;
        }}
        tileClassName={
          ({ date, view }) =>
            `${
              view === "year" &&
              selectedMonth?.getFullYear() === date.getFullYear() &&
              selectedMonth?.getMonth() === date.getMonth()
                ? "react-calendar__tile--active"
                : ""
            } w-[80px] h-[80px] font-Nunito text-textBlack bg-backgroundMain box-border` //стиль клітинок
        }
      />
    </div>
  );
};

export default StatisticsCalendarMonth;
