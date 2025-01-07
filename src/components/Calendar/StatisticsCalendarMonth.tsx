import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

export const StatisticsCalendarMonth = () => {
    return (
        <div className="statistics-calendar w-[356px] box-border">
            <Calendar
                view="year" // Відображає рік і 12 місяців
                className="custom-calendar"
                nextLabel={<Icon id={"arrow-right"} className="size-6" />}
                prevLabel={<Icon id={"arrow-left"} className="size-6" />}
                // tileClassName="text-center py-4 px-6" // Стиль клітинок
            />
        </div>
    );
};

export default StatisticsCalendarMonth;
