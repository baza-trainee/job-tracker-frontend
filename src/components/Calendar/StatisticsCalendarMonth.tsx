import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

export const StatisticsCalendarMonth = () => {
    const { t, i18n } = useTranslation();

    const months: string[] = t("calendar.months", { returnObjects: true }) as string[];
    console.log("Months from i18n:", months);
    console.log("i18next resources:", i18n.getResourceBundle(i18n.language, "translation"));
    return (
        <div className="statistics-calendar w-[356px] h-auto box-border bg-backgroundTertiary px-2 py-6 rounded-[20px]">
            <Calendar
                view="year" // Відображає 1 рік, в ньому місяців
                locale={i18n.language} 
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
                tileClassName="w-[66px] h-[60px] font-Nunito text-textBlack bg-backgroundMain box-border" // Стиль клітинок
            />
        </div>
    );
};

export default StatisticsCalendarMonth;
