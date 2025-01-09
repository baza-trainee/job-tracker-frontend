import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

export const StatisticsCalendarYear = () => {
    return (
        <div className="statistics-calendar w-[356px] h-auto box-border bg-backgroundTertiary px-2 py-6 rounded-[20px]">
            <Calendar
                view="decade" // Відображає період з 12 років, показую тільки рік
                className="custom-calendar"
                nextLabel={<Icon id={"arrow-right"} className="size-6" />}
                prevLabel={<Icon id={"arrow-left"} className="size-6" />}
                tileClassName="w-[66px] h-[60px] font-Nunito text-textBlack bg-backgroundMain box-border" // Стиль клітинок
            />
        </div>
    );
};

export default StatisticsCalendarYear;
