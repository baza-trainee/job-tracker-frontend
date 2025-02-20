import { RootState } from "../store/store.ts";
import { useAppDispatch, useAppSelector } from "../store/hook.ts";
import StatisticsPanel from "../components/Statistics/componets/statisticsPanel/StatisticsPanel";
import StatisticsCalendarTab from "../components/Calendar/StatisticsCalendarTab.tsx";
import StatisticsCalendarDay from "../components/Calendar/StatisticsCalendarDay.tsx";
import StatisticsCalendarMonth from "../components/Calendar/StatisticsCalendarMonth.tsx";
import StatisticsCalendarYear from "../components/Calendar/StatisticsCalendarYear.tsx";
import ChartBarDay from "../components/charts/ChartBarDay.tsx";
import ChartBarMonth from "../components/charts/ChartBarMonth.tsx";
import ChartBarYear from "../components/charts/ChartBarYear.tsx";

import DoughnutChart from "../components/charts/DoughnutChart.tsx";
import { useGetAllUserDataQuery } from "../store/querySlices/profileQuerySlice.ts";
import { useGetPredictionDailyQuery } from "../store/querySlices/predictionsQuerySlice.ts";
import StatisticsPanelSkeleton from "../components/Statistics/componets/statisticsPanel/StatisticsPanelSkeleton.tsx";
import NoVacancyCard from "../components/Statistics/componets/statisticsPanel/NoVacancyCard.tsx";
import Soon from "../components/Soon/Soon.tsx";
import RejectDiagram from "../components/Statistics/componets/statisticsDiagram/RejectDiagram.tsx";
import {
  setActiveTab,
  setSelectedDate,
  setSelectedMonth,
  setSelectedYear,
} from "@/store/slices/calendarSlice/calendarSlice.ts";

function Statistics() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.calendar.activeTab
  );

  const { data, isLoading, isError } = useGetAllUserDataQuery();

  const vacanciesForStat =
    data?.vacancies.filter((v) => v.isArchived === false) || [];

  const {
    data: prediction,
    isLoading: isPredictionLoading,
    isError: isPredictionError,
  } = useGetPredictionDailyQuery();

  const renderCalendar = () => {
    switch (activeTab) {
      case "day":
        return (
          <StatisticsCalendarDay
            onDateChange={(date) => dispatch(setSelectedDate(date))}
          />
        );
      case "month":
        return (
          <StatisticsCalendarMonth
            onMonthChange={(month) => dispatch(setSelectedMonth(month))}
          />
        );
      case "year":
        return (
          <StatisticsCalendarYear
            onYearChange={(year) => dispatch(setSelectedYear(year))}
          />
        );
      default:
        return null;
    }
  };

  const renderChart = () => {
    switch (activeTab) {
      case "day":
        return <ChartBarDay />;
      case "month":
        return <ChartBarMonth />;
      case "year":
        return <ChartBarYear />;
      default:
        return null;
    }
  };

  return (
    <div className="container pb-5 pt-4 sm:pb-6 sm:pt-4 md:py-6 xl:py-10">
      {(isLoading || isPredictionLoading) && <StatisticsPanelSkeleton />}
      {(isError || isPredictionError) && <h2>Error...</h2>}

      {!isLoading && vacanciesForStat && prediction && (
        <StatisticsPanel vacancies={vacanciesForStat} prediction={prediction} />
      )}
      {!isLoading && vacanciesForStat.length === 0 && <NoVacancyCard />}
      {!isLoading && vacanciesForStat.length !== 0 && (
        <>
          <div className="my-4 flex flex-col items-center gap-4 md:my-6 md:gap-6 xl:my-8 xl:flex-row xl:items-start xl:justify-between 2xl:my-10">
            <div className="mt-8 grid w-[1027px] auto-rows-max grid-cols-2 gap-x-6">
              <div className="col-span-1 row-span-1">
                <StatisticsCalendarTab
                  activeTab={activeTab}
                  setActiveTab={(tab) => dispatch(setActiveTab(tab))}
                />
              </div>
              <div className="col-span-1 row-span-2">
                <Soon />
              </div>
              <div className="col-span-1 row-start-2">{renderCalendar()}</div>
              <div className="col-span-2 row-start-3">{renderChart()}</div>
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
