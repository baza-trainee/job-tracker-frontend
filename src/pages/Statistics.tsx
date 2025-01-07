import { useState } from "react";
import StatisticsPanel from "../components/Statistics/componets/statisticsPanel/StatisticsPanel";
import StatisticsCalendarTab from "../components/Calendar/StatisticsCalendarTab.tsx";
import StatisticsCalendarDay from "../components/Calendar/StatisticsCalendarDay.tsx";
import StatisticsCalendarMonth from "../components/Calendar/StatisticsCalendarMonth.tsx";
import StatisticsCalendarYear from "../components/Calendar/StatisticsCalendarYear.tsx";
import ChartBar from "../components/charts/ChartBar.tsx";
import Soon from "../components/Calendar/Soon.tsx";

function Statistics() {
  const [activeTab, setActiveTab] = useState("Day");

  const renderCalendar = () => {
    switch (activeTab) {
      case "Day":
        return <StatisticsCalendarDay />;
      case "Month":
        return <StatisticsCalendarMonth />;
      case "Year":
        return <StatisticsCalendarYear />;
      default:
        return null;
    }
  };

  return (
    <div className="container pb-8 pt-10">
      <StatisticsPanel />

      <div className="w-[712px] grid grid-col-2 auto-rows-max mt-8">
        <div className="col-span-1 row-span-1">
          <StatisticsCalendarTab activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="col-span-1 row-span-2">
          <Soon />
        </div>
        <div className="col-span-1 row-start-2">
          {renderCalendar()}
        </div>
        <div className="col-span-2 row-start-3">
          <ChartBar />
        </div>
      </div>
    </div>
  );
}

export default Statistics;
