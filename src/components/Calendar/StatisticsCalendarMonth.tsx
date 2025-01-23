import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

type StatisticsCalendarMonthProps = {
    onMonthChange: (month: Date) => void;
  };

export const StatisticsCalendarMonth: React.FC<StatisticsCalendarMonthProps> = ({
    onMonthChange,
}) => {
    const { t, i18n } = useTranslation();

    const months: string[] = t("calendar.months", { returnObjects: true }) as string[];
    // console.log("Months from i18n:", months);
    // console.log("i18next resources:", i18n.getResourceBundle(i18n.language, "translation"));
    return (
        <div className="statistics-calendar w-[468px] h-[514px] box-border bg-backgroundTertiary px-6 py-8 rounded-[20px]">
            <Calendar
                view="year" // Відображає 1 рік, в ньому місяців
                locale={i18n.language} 
                onClickMonth={(date) => {
                    // console.log("Клік на місяць:", date);
                    onMonthChange(date as Date)
                }}
                className="statistics-calendar__months"
                nextLabel={<Icon id={"arrow-right"} className="size-6" />}
                prevLabel={<Icon id={"arrow-left"} className="size-6" />}
                tileContent={({ date, view }) => {
                    if (view === "year") {
                        // Додаємо кастомні назви місяців (скорочені по дизайну)
                        return <span>{months[date.getMonth()]}</span>;
                    }
                    return null;
                }}
                tileClassName="w-[80px] h-[80px] font-Nunito text-textBlack bg-backgroundMain box-border" // Стиль клітинок
            />
        </div>
    );
};

export default StatisticsCalendarMonth;
