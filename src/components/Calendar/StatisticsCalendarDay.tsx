import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";
import { useGetAllEventsQuery } from "../../store/querySlices/eventsQuerySlice.ts";

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

  // Формуємо Set із датами подій
  const eventDates = new Set(
    events?.map((event) => formatDate(event.date)) || []
  );

  return (
    <div className="statistics-calendar box-border h-[514px] w-[468px] rounded-[20px] bg-backgroundTertiary px-6 py-4">
      <Calendar
        view="month"
        locale={i18n.language}
        onChange={(date) => {
          // console.log("Клік на дату (день):", date);
          onDateChange(date as Date);
        }}
        className="statistics-calendar__day"
        nextLabel={<Icon id={"arrow-right"} className="size-6" />}
        prevLabel={<Icon id={"arrow-left"} className="size-6" />}
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
