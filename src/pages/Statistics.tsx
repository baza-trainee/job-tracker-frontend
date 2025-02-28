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
import clsx from "clsx";

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
          <div
            className={clsx(
              "flex flex-col items-center xl:flex-row xl:items-start xl:justify-between",
              "my-4 md:my-6 xl:my-8 2xl:my-10",
              "gap-4 md:gap-6"
            )}
          >
            <div
              className={clsx(
                "md:grid-cols-[auto, auto] mt-8 grid auto-rows-max grid-cols-1 justify-items-center",
                "md:gap-x-5 xl:gap-x-2 3xl:gap-x-6"
              )}
            >
              <div className="col-start-1 row-start-1">
                <StatisticsCalendarTab
                  activeTab={activeTab}
                  setActiveTab={(tab) => dispatch(setActiveTab(tab))}
                />
              </div>
              <div className="col-start-1 row-start-2">{renderCalendar()}</div>
              <div
                className={clsx(
                  "col-start-1 row-start-3 md:col-span-2",
                  "w-full md:w-[720px] xl:w-[729px] 2xl:w-[746px] 3xl:w-[1027px]"
                )}
              >
                {renderChart()}
              </div>
              <div className="col-start-1 row-start-4 w-full md:col-start-2 md:row-span-2 md:row-start-1">
                <Soon />
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
