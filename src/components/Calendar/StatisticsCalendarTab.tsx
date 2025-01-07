import clsx from "clsx";

type StatisticsCalendarTabProps = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
};

export const StatisticsCalendarTab: React.FC<StatisticsCalendarTabProps> = ({ activeTab, setActiveTab }) => {
    const tabs = ["Day", "Month", "Year"];

    return (
        <div className="w-[356px] flex justify-center gap-4 text-xl mb-6 box-border text-textBlack">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={clsx("h-full px-4 py-2 border-b",
                        activeTab === tab ? "border-b-textBlack" : "border-b-color9"
                    )}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default StatisticsCalendarTab;
