import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { CalendarTab } from "../../store/slices/calendarSlice/calendarTypes.ts";

type StatisticsCalendarTabProps = {
    activeTab: CalendarTab;
    setActiveTab: (tab: CalendarTab) => void;
};

export const StatisticsCalendarTab: React.FC<StatisticsCalendarTabProps> = ({ 
    activeTab, 
    setActiveTab, 
}) => {
    const { t } = useTranslation();
    const tabs: { key: CalendarTab; label: string }[] = [
        {key: "day", label: t("calendarTabs.day")},
        {key: "month", label: t("calendarTabs.month")},
        {key: "year", label: t("calendarTabs.year")}
    ];

    return (
        <div className="w-[468px] flex justify-center gap-4 text-[28px] font-medium box-border text-textBlack">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    className={clsx("h-full px-4 py-2 border-b",
                        activeTab === tab.key ? "border-b-textBlack" : "border-b-color9"
                    )}
                    onClick={() => setActiveTab(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default StatisticsCalendarTab;
