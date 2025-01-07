import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

export const StatisticsCalendarYear = () => {
    return (
        <div className="statistics-calendar w-[356px] box-border">
            <Calendar
                view="decade" // Відображає період з 12 років, показую тільки рік
                className="custom-calendar"
                nextLabel={<Icon id={"arrow-right"} className="size-6" />}
                prevLabel={<Icon id={"arrow-left"} className="size-6" />}
                // tileClassName="text-center py-4 px-6" // Стиль клітинок
            />
        </div>
    );
};

export default StatisticsCalendarYear;
