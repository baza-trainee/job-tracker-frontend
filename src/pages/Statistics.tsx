import { useState } from "react";
import StatisticsPanel from "../components/Statistics/componets/statisticsPanel/StatisticsPanel";
import StatisticsCalendarTab from "../components/Calendar/StatisticsCalendarTab.tsx";
import StatisticsCalendarDay from "../components/Calendar/StatisticsCalendarDay.tsx";
import StatisticsCalendarMonth from "../components/Calendar/StatisticsCalendarMonth.tsx";
import StatisticsCalendarYear from "../components/Calendar/StatisticsCalendarYear.tsx";
import ChartBar from "../components/charts/ChartBar.tsx";

import DoughnutChart from "../components/charts/DoughnutChart.tsx";
import { useGetAllUserDataQuery } from "../store/querySlices/profileQuerySlice.ts";
import { useGetPredictionDailyQuery } from "../store/querySlices/predictionsQuerySlice.ts";
import StatisticsPanelSkeleton from "../components/Statistics/componets/statisticsPanel/StatisticsPanelSkeleton.tsx";
import NoVacancyCard from "../components/Statistics/componets/statisticsPanel/NoVacancyCard.tsx";
import Soon from "../components/Calendar/Soon.tsx";
import RejectDiagram from "../components/Statistics/componets/statisticsDiagram/RejectDiagram.tsx";

function Statistics() {
  const { data, isLoading, isError } = useGetAllUserDataQuery();

  const vacanciesForStat =
    data?.vacancies.filter((v) => v.isArchived === false) || [];

  const {
    data: prediction,
    isLoading: isPredictionLoading,
    isError: isPredictionError,
  } = useGetPredictionDailyQuery();

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
      {(isLoading || isPredictionLoading) && <StatisticsPanelSkeleton />}
      {(isError || isPredictionError) && <h2>Error...</h2>}

      {!isLoading && vacanciesForStat && prediction && (
        <StatisticsPanel vacancies={vacanciesForStat} prediction={prediction} />
      )}
      {!isLoading && vacanciesForStat.length === 0 && <NoVacancyCard />}
      {!isLoading && vacanciesForStat.length !== 0 && (
        <>
          <div className="mt-10 flex justify-between">
            <div className="grid-col-2 mt-8 grid w-[712px] auto-rows-max">
              <div className="col-span-1 row-span-1">
                <StatisticsCalendarTab
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
              <div className="col-span-1 row-span-2">
                <Soon />
              </div>
              <div className="col-span-1 row-start-2">{renderCalendar()}</div>
              <div className="col-span-2 row-start-3">
                <ChartBar />
              </div>
            </div>
            <DoughnutChart vacancies={vacanciesForStat} />
          </div>
          <RejectDiagram vacancies={vacanciesForStat} />
        </>
      )}
    </div>
  );
}

export default Statistics;
