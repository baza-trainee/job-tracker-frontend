import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

type StatisticsCalendarDayProps = {
  onDateChange: (date: Date) => void;
};

export const StatisticsCalendarDay: React.FC<StatisticsCalendarDayProps> = ({
  onDateChange,
}) => {
  const { i18n } = useTranslation();

  return (
    <div className="statistics-calendar w-[468px] h-[514px] box-border bg-backgroundTertiary px-6 py-4 rounded-[20px]">
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