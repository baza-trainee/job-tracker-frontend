import StatisticsCalendarTab from "../components/Calendar/StatisticsCalendarTab.tsx";
import StatisticsCalendar from "../components/Calendar/StatisticsCalendar.tsx";
import ChartBar from "../components/charts/ChartBar.tsx";

function Statistics() {
  return (
    <div className="flex flex-col w-full">
      <h2>Statistics</h2>
      <div className="flex flex-col w-96 h-auto">
        <StatisticsCalendarTab></StatisticsCalendarTab>
        <StatisticsCalendar></StatisticsCalendar>
        <ChartBar></ChartBar>
      </div>
    </div>
  );
}

export default Statistics;
