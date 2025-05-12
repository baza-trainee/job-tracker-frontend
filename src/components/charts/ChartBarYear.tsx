import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hook.ts";
import { RootState } from "../../store/store.ts";
import { useGetAllVacancyQuery } from "../../store/querySlices/vacanciesQuerySlice.ts";
import ChartBarBase from "./ChartBarBase.tsx";
import CustomLegendChart from "./CustomLegendChart.tsx";
import { useIsDarkMode } from "./useIsDarkMode.ts";

const ChartBarYear: React.FC = () => {
  const { t } = useTranslation();
  const selectedYear = useAppSelector(
    (state: RootState) => state.calendar.selectedYear
  );
  const { data: vacancies, isLoading, isError } = useGetAllVacancyQuery();
  const isDarkMode = useIsDarkMode();

  if (isLoading)
    return (
      <div className="flex justify-start py-4 text-lg font-medium text-textBlack">
        {t("loading.loading")}...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-start py-4 text-lg font-medium text-textBlack">
        {t("loading.error")}...
      </div>
    );

  const notArhivedVacancies =
    vacancies?.filter((vacancy) => !vacancy.isArchived) || [];

  const statuses =
    notArhivedVacancies?.flatMap((vacancy) => vacancy.statuses) || [];

  const groupedByYear = statuses.reduce<
    Record<number, { sent: number; responses: number }>
  >((acc, status) => {
    const date = new Date(status.date);
    const year = date.getFullYear();

    if (!acc[year]) acc[year] = { sent: 0, responses: 0 };

    if (status.name === "resume") acc[year].sent += 1;
    else if (["hr", "test", "tech", "offer", "reject"].includes(status.name))
      acc[year].responses += 1;

    return acc;
  }, {});

  // Генеруємо діапазон з 5 років (по 2 роки до і після обраного року)
  const years = Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i);

  // Мітки для осі X
  const labels = years.map((year) => year.toString());

  // Дані для діаграми
  const filteredData = years.map(
    (year) => groupedByYear[year] || { sent: 0, responses: 0 }
  );

  const datasets = [
    {
      label: t("chartBar.sent"),
      data: filteredData.map((d) => d.sent),
      backgroundColor: isDarkMode
        ? "rgba(208, 232, 197, 0.7)"
        : "rgba(208, 232, 197, 1)", // Зелений
      borderColor: isDarkMode
        ? "rgba(208, 232, 197, 0.7)"
        : "rgba(208, 232, 197, 1)",
      borderWidth: 1,
    },
    {
      label: t("chartBar.responses"),
      data: filteredData.map((d) => d.responses),
      backgroundColor: isDarkMode
        ? "rgba(198, 231, 255, 0.7)"
        : "rgba(198, 231, 255, 1)", // Синій
      borderColor: isDarkMode
        ? "rgba(198, 231, 255, 0.7)"
        : "rgba(198, 231, 255, 1)",
      borderWidth: 1,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <ChartBarBase
        labels={labels}
        datasets={datasets}
        selectedIndex={2}
        isDarkMode={isDarkMode}
      />
      <CustomLegendChart datasets={datasets} />
    </div>
  );
};

export default ChartBarYear;
