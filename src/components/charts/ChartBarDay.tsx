import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hook.ts";
import { RootState } from "../../store/store.ts";
import { useGetAllVacancyQuery } from "../../store/querySlices/vacanciesQuerySlice.ts";
import ChartBarBase from "./ChartBarBase.tsx";
import CustomLegendChart from "./CustomLegendChart.tsx";
import { useIsDarkMode } from "./useIsDarkMode.ts";

interface GroupedData {
  [date: string]: { sent: number; responses: number };
}

const ChartBarDay: React.FC = () => {
  const { t } = useTranslation();
  const selectedDate = useAppSelector(
    (state: RootState) => state.calendar.selectedDate
  );
  const { data: vacancies, isLoading, isError } = useGetAllVacancyQuery();
  // console.log("Обрана дата:", selectedDate);
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

  // console.log("Всі вакансії: ", vacancies);
  const notArhivedVacancies =
    vacancies?.filter((vacancy) => !vacancy.isArchived) || [];
  // console.log("notArhivedVacancies", notArhivedVacancies);

  const statuses =
    notArhivedVacancies?.flatMap((vacancy) => vacancy.statuses) || [];
  // console.log("Всі статуси:", statuses);

  // Групування статусів за датами
  const groupedByDate = statuses.reduce<GroupedData>((acc, status) => {
    // const date = new Date(status.date).toLocaleDateString("uk-UA"); // строкове представлення дати у форматі "дд.мм.рррр"
    const date = new Date(status.date).toISOString().split("T")[0]; // Формат рррр-мм-дд

    // Ініціалізуємо дату, якщо її ще немає
    if (!acc[date]) {
      acc[date] = { sent: 0, responses: 0 };
    }

    // Підраховуємо статуси
    if (status.name === "resume") {
      acc[date].sent += 1; // "Надіслано резюме"
    } else if (
      status.name === "hr" ||
      status.name === "test" ||
      status.name === "tech" ||
      status.name === "offer" ||
      status.name === "reject"
    ) {
      acc[date].responses += 1; // "Отримано відповідей"
    }

    return acc;
  }, {});

  const getLast7Days = (selectedDate: Date): string[] => {
    const result: string[] = [];

    // Три дні до обраного, обраний день, і три дні після
    for (let i = -3; i <= 3; i++) {
      const date = new Date(selectedDate); // Копія обраної дати
      date.setDate(selectedDate.getDate() + i); // Відлік вперед/назад від обраної дати
      result.push(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      ); // Формат yyyy-mm-dd
    }

    return result;
  };

  const last7Days = getLast7Days(new Date(selectedDate));
  // console.log("Діапазон 7 днів:", last7Days);
  // console.log("Дата для обчислення діапазону:", selectedDate);

  // Фільтруємо дані за останні 7 днів
  const filteredData = last7Days.map(
    (date) => groupedByDate[date] || { sent: 0, responses: 0 }
  );

  const datasets = [
    {
      label: t("chartBar.sent"),
      // data: sentData,
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
      // data: responseData,
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

  const labels = last7Days.map((date) =>
    new Date(date).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
    })
  ); // Відформатовані дати для осі X

  return (
    <div className="flex flex-col items-center">
      <ChartBarBase
        labels={labels}
        datasets={datasets}
        selectedIndex={3}
        isDarkMode={isDarkMode}
      />
      <CustomLegendChart datasets={datasets} />
    </div>
  );
};

export default ChartBarDay;
