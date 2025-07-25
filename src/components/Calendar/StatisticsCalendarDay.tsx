import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";
import { useGetAllEventsQuery } from "../../store/querySlices/eventsQuerySlice.ts";
import clsx from "clsx";

type StatisticsCalendarDayProps = {
  onDateChange: (date: Date) => void;
};

// Функція для форматування дати у "YYYY-MM-DD"
const formatDate = (date: Date | string) => {
  return new Date(date)
    .toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split(".") // Розділяємо dd.mm.yyyy
    .reverse() // Перевертаємо до yyyy-mm-dd
    .join("-"); // Формуємо назад yyyy-mm-dd
};

export const StatisticsCalendarDay: React.FC<StatisticsCalendarDayProps> = ({
  onDateChange,
}) => {
  const { i18n } = useTranslation();
  const { data: events } = useGetAllEventsQuery();

  const actualEvents = events?.filter((event) => {
    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0); // Очищаємо час, щоб порівнювати тільки дати

    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    return eventDate >= dateToday;
  });

  // Формуємо Set із датами подій
  const eventDates = new Set(
    actualEvents?.map((event) => formatDate(event.date)) || []
  );

  return (
    <div
      className={clsx(
        "statistics-calendar box-border rounded-[20px] bg-backgroundTertiary text-textBlack",
        "w-[276px] smPlus:w-[468px] md:w-[356px] 3xl:w-[468px]",
        "h-[332px] md:h-[398px] 3xl:h-[514px]", //h-[318px]
        "p-3 md:p-2 3xl:px-6 3xl:py-4"
      )}
    >
      <Calendar
        view="month"
        locale={i18n.language}
        onChange={(date) => {
          // console.log("Клік на дату (день):", date);
          onDateChange(date as Date);
        }}
        className="statistics-calendar__day"
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
        formatMonthYear={(locale, date) =>
          `${date.toLocaleDateString(locale, { month: "long" })} ${date.getFullYear()}`
        }
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const formattedDate = formatDate(date);
            return eventDates.has(formattedDate)
              ? "react-calendar__tile--active"
              : "";
          }
          return "";
        }}
      />
    </div>
  );
};

export default StatisticsCalendarDay;
