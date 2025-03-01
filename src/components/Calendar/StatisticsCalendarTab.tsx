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
    { key: "day", label: t("calendarTabs.day") },
    { key: "month", label: t("calendarTabs.month") },
    { key: "year", label: t("calendarTabs.year") },
  ];

  return (
    <div
      className={clsx(
        "mb-4 box-border flex justify-center gap-4 font-medium text-textBlack",
        "w-[276px] md:w-[356px] 3xl:w-[468px]",
        "text-base md:text-xl 3xl:text-[28px] 3xl:leading-[38px]"
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={clsx(
            "h-full border-b px-4 py-2",
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
