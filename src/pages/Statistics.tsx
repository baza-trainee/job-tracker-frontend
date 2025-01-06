import StatisticsPanel from "../components/Statistics/componets/statisticsPanel/StatisticsPanel";
import StatisticsCalendarTab from "../components/Calendar/StatisticsCalendarTab.tsx";
import StatisticsCalendar from "../components/Calendar/StatisticsCalendar.tsx";
import ChartBar from "../components/charts/ChartBar.tsx";
import GoughnutChart from "../components/charts/DoughnutChart.tsx";
import { useGetAllUserDataQuery } from "../store/querySlices/profileQuerySlice.ts";
import { useGetPredictionDailyQuery } from "../store/querySlices/predictionsQuerySlice.ts";
import StatisticsPanelSkeleton from "../components/Statistics/componets/statisticsPanel/StatisticsPanelSkeleton.tsx";
import NoVacancyCard from "../components/Statistics/componets/statisticsPanel/NoVacancyCard.tsx";

function Statistics() {
  const { data, isLoading, isError } = useGetAllUserDataQuery();

  const vacanciesForStat =
    data?.vacancies.filter((v) => v.isArchived === false) || [];
  const {
    data: prediction,
    isLoading: isPredictionLoading,
    isError: isPredictionError,
  } = useGetPredictionDailyQuery();

  return (
    <div className="container pb-8 pt-10">
      {(isLoading || isPredictionLoading) && <StatisticsPanelSkeleton />}
      {(isError || isPredictionError) && <h2>Error...</h2>}

      {!isLoading && vacanciesForStat && prediction && (
        <StatisticsPanel vacancies={vacanciesForStat} prediction={prediction} />
      )}
      {!isLoading && vacanciesForStat.length === 0 && <NoVacancyCard />}
      {!isLoading && vacanciesForStat.length !== 0 && (
        <div className="mt-10 flex justify-between">
          <div className="flex h-auto w-96 flex-col">
            <StatisticsCalendarTab></StatisticsCalendarTab>
            <StatisticsCalendar></StatisticsCalendar>
            <ChartBar></ChartBar>
          </div>
          <GoughnutChart vacancies={vacanciesForStat} />
        </div>
      )}
    </div>
  );
}

export default Statistics;
