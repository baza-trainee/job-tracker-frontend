import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

export const StatisticsCalendarDay = () => {
    const { i18n } = useTranslation();

    // Функція для перевірки, чи належить день до активного місяця, щоб приховати зайві дні
    const isSameMonth = (date: Date, activeMonth: Date) => {
        return date.getMonth() === activeMonth.getMonth() && date.getFullYear() === activeMonth.getFullYear();
    };

    return (
        <div className="statistics-calendar w-[356px] h-auto box-border bg-backgroundTertiary p-2 rounded-[20px]">
            <Calendar
                view="month" // Відображає місяць і календарні дні
                locale={i18n.language}
                className="statistics-calendar__day"
                nextLabel={<Icon id={"arrow-right"} className="size-6" />}
                prevLabel={<Icon id={"arrow-left"} className="size-6" />}
                formatMonthYear={(locale, date) =>
                    `${date.toLocaleDateString(locale, { month: "long" })} ${date.getFullYear()}` // прибираємо в навігації слово рік `р.`
                }
                tileClassName={({ date, view }) =>
                    view === "month" && !isSameMonth(date, new Date()) ? "calendar-hidden-cell" : ""
                } // Додаємо клас для прихованих клітинок для зайвих днів з попереднього і наступного місяців
            />
        </div>
    );
};

export default StatisticsCalendarDay;
