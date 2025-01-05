import StatisticsPanel from "../components/Statistics/componets/statisticsPanel/StatisticsPanel";
import StatisticsCalendarTab from "../components/Calendar/StatisticsCalendarTab.tsx";
import StatisticsCalendar from "../components/Calendar/StatisticsCalendar.tsx";
import ChartBar from "../components/charts/ChartBar.tsx";
import GoughnutChart from "../components/charts/DoughnutChart.tsx";

function Statistics() {
  return (
    <div className="container pb-8 pt-10">
      <StatisticsPanel />
      <div className="mt-10 flex justify-between">
        <div className="flex h-auto w-96 flex-col">
          <StatisticsCalendarTab></StatisticsCalendarTab>
          <StatisticsCalendar></StatisticsCalendar>
          <ChartBar></ChartBar>
        </div>
        <GoughnutChart />
      </div>
    </div>
  );
}

export default Statistics;
