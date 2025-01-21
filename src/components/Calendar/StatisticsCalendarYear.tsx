import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

type StatisticsCalendarYearProps = {
    onYearChange: (year: number) => void;
};

export const StatisticsCalendarYear: React.FC<StatisticsCalendarYearProps> = ({
    onYearChange
}) => {
    return (
        <div className="statistics-calendar w-[356px] h-auto box-border bg-backgroundTertiary px-2 py-6 rounded-[20px]">
            <Calendar
                view="decade" // Відображає період з 12 років, показую тільки роки
                onClickYear={(date) => {
                    const year = (date as Date).getFullYear();
                    // console.log("Клік на рік:", year);
                    onYearChange(year);
                }}
                className="statistics-calendar__years"
                nextLabel={<Icon id={"arrow-right"} className="size-6" />}
                prevLabel={<Icon id={"arrow-left"} className="size-6" />}
                // tileContent={({ date, view }) =>
                //     view === "decade" ? <span>{date.getFullYear()}</span> : null
                // }
                tileClassName="w-[66px] h-[60px] font-Nunito text-textBlack bg-backgroundMain box-border" // Стиль клітинок
                // formatYear={(_, date) => `${date.getFullYear()}`}
            />
        </div>
    );
};

export default StatisticsCalendarYear;
