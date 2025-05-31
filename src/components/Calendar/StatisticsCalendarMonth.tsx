import { useTranslation } from "react-i18next";
import { useState } from "react";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";
import clsx from "clsx";

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
    <div
      className={clsx(
        "statistics-calendar box-border rounded-[20px] bg-backgroundTertiary text-textBlack",
        "w-[276px] md:w-[356px] 3xl:w-[468px]",
        "h-[332px] md:h-[398px] 3xl:h-[514px]", //h-[318px]
        "p-4 md:px-4 md:pb-6 md:pt-4 3xl:px-8 3xl:py-6"
      )}
    >
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
        nextLabel={
          <Icon
            id={"arrow-right"}
            className="size-6 fill-textBlack hover:fill-iconHover active:fill-iconHover dark:hover:fill-iconHover"
          />
        }
        prevLabel={
          <Icon
            id={"arrow-left"}
            className="size-6 fill-textBlack hover:fill-iconHover active:fill-iconHover dark:hover:fill-iconHover"
          />
        }
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
            } w-[54px] h-[54px] md:w-[66px] md:h-[60px] 3xl:w-[80px] 3xl:h-[80px] font-Nunito text-textBlack bg-backgroundMain box-border` //стиль клітинок
        }
      />
    </div>
  );
};

export default StatisticsCalendarMonth;
