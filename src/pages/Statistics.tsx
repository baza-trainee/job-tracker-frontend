import StatisticsPanel from "../components/Statistics/componets/statisticsPanel/StatisticsPanel";
import StatisticsCalendarTab from "../components/Calendar/StatisticsCalendarTab.tsx";
import StatisticsCalendar from "../components/Calendar/StatisticsCalendar.tsx";
import ChartBar from "../components/charts/ChartBar.tsx";
import GoughnutChart from "../components/charts/DoughnutChart.tsx";
import { useGetAllUserDataQuery } from "../store/querySlices/profileQuerySlice.ts";

function Statistics() {
  const { data, isLoading, isError } = useGetAllUserDataQuery();
  const vacancies = data?.vacancies || [];
  return (
    <div className="container pb-8 pt-10">
      <StatisticsPanel />
      <div className="mt-10 flex justify-between">
        <div className="flex h-auto w-96 flex-col">
          <StatisticsCalendarTab></StatisticsCalendarTab>
          <StatisticsCalendar></StatisticsCalendar>
          <ChartBar></ChartBar>
        </div>
        <GoughnutChart vacancies={vacancies} />
      </div>
    </div>
  );
}

export default Statistics;
