import StatisticsPanel from "../components/Statistics/componets/statisticsPanel/StatisticsPanel";
import StatisticsCalendarTab from "../components/Calendar/StatisticsCalendarTab.tsx";
import StatisticsCalendar from "../components/Calendar/StatisticsCalendar.tsx";
import ChartBar from "../components/charts/ChartBar.tsx";

function Statistics() {
  return (
    <div className="container pb-8 pt-10">
      <StatisticsPanel />
      <div className="flex h-auto w-96 flex-col">
        <StatisticsCalendarTab></StatisticsCalendarTab>
        <StatisticsCalendar></StatisticsCalendar>
        <ChartBar></ChartBar>
      </div>
    </div>
  );
}

export default Statistics;
