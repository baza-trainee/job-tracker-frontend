import { useState } from "react";
import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

export const StatisticsCalendarDay = ({ onDateChange }: { onDateChange: (date: Date) => void }) => {
  const { i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (value: Date | [Date, Date] | null) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      onDateChange(value);
    }
  };

  return (
    <div className="statistics-calendar w-[356px] h-auto box-border bg-backgroundTertiary p-2 rounded-[20px]">
      <Calendar
        view="month"
        locale={i18n.language}
        value={selectedDate}
        onChange={() => handleDateChange}
        className="statistics-calendar__day"
        nextLabel={<Icon id={"arrow-right"} className="size-6" />}
        prevLabel={<Icon id={"arrow-left"} className="size-6" />}
        formatMonthYear={(locale, date) =>
          `${date.toLocaleDateString(locale, { month: "long" })} ${date.getFullYear()}`
        }
      />
    </div>
  );
};

export default StatisticsCalendarDay;



// // Функція для перевірки, чи належить день до активного місяця, щоб приховати зайві дні
// const isSameMonth = (date: Date, activeMonth: Date) => {
//     return date.getMonth() === activeMonth.getMonth() && date.getFullYear() === activeMonth.getFullYear();
// };

// tileClassName={({ date, view }) =>
//     view === "month" && !isSameMonth(date, new Date()) ? "calendar-hidden-cell" : ""
// } // Додаємо клас для прихованих клітинок для зайвих днів з попереднього і наступного місяцівЧи варто стан виносити в редакс? Бо зараз дата по замовчуванню сьогодні, але при кліку на будь-яку іншу дату на календарі, діаграмма повинна переналаштовуватися відповідно нового діапазона.