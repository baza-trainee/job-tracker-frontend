import { useState } from "react";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

type StatisticsCalendarYearProps = {
  onYearChange: (year: number) => void;
};

export const StatisticsCalendarYear: React.FC<StatisticsCalendarYearProps> = ({
  onYearChange,
}) => {
  const [selectedYear, setSelectedYear] = useState<Date | null>(null);

  return (
    <div className="statistics-calendar box-border h-[514px] w-[468px] rounded-[20px] bg-backgroundTertiary px-6 py-8">
      <Calendar
        view="decade" // Відображає період з 12 років, показую тільки роки
        onClickYear={(date) => {
          const year = (date as Date).getFullYear(); //поверне рік числом
          const selectedYearDate = new Date(year, 0, 1); // Додаємо 1 січня обраного року для стилізації активного
          //   console.log("Клік на рік:", year);
          //   console.log("Клік на рік-date:", date);
          //   console.log("Клік на рік-selectedYearDate:", selectedYearDate);
          setSelectedYear(selectedYearDate);
          onYearChange(year);
        }}
        value={selectedYear}
        className="statistics-calendar__years"
        nextLabel={<Icon id={"arrow-right"} className="size-6" />}
        prevLabel={<Icon id={"arrow-left"} className="size-6" />}
        tileClassName={({ date, view }) =>
          `${
            view === "decade" &&
            selectedYear?.getFullYear() === date.getFullYear()
              ? "react-calendar__tile--active"
              : ""
          } w-[80px] h-[80px] font-Nunito text-textBlack bg-backgroundMain box-border`
        }
      />
    </div>
  );
};

export default StatisticsCalendarYear;
