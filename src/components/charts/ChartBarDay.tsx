import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hook.ts";
import { RootState } from "../../store/store.ts";
import { useGetAllVacancyQuery } from "../../store/querySlices/vacanciesQuerySlice.ts";
import ChartBarBase from "./ChartBarBase.tsx";

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

  // const getLast7Days = (endDate: Date): string[] => {
  //   const result: string[] = [];

  //   for (let i = 6; i >= 0; i--) {
  //     const date = new Date(endDate); // Копія обраної дати для опрацювання
  //     date.setDate(endDate.getDate() - i); // Відлік назад
  //     result.push(
  //       `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  //     ); // Формат yyyy-mm-dd
  //   }

  //   return result;
  // };

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
      backgroundColor: "rgba(208, 232, 197, 1)", // Зелений
      borderColor: "rgba(208, 232, 197, 1)",
      borderWidth: 1,
    },
    {
      label: t("chartBar.responses"),
      // data: responseData,
      data: filteredData.map((d) => d.responses),
      backgroundColor: "rgba(198, 231, 255, 1)", // Синій
      borderColor: "rgba(198, 231, 255, 1)",
      borderWidth: 1,
    },
  ];

  const labels = last7Days.map((date) =>
    new Date(date).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
    })
  ); // Відформатовані дати для осі X

  return <ChartBarBase labels={labels} datasets={datasets} selectedIndex={3} />;
};

export default ChartBarDay;

// console.log("Груповані дані за датами:", groupedByDate);

// const dates = Object.keys(groupedByDate);
// console.log("dates keys:", groupedByDate);

// Сортування ISO-дат і форматування
// const sortedDates = dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
// const formattedDates = sortedDates.map((date) =>
//   new Date(date).toLocaleDateString("uk-UA")
// );

// console.log("Сортовані дати:", sortedDates);
// console.log("Відформатовані дати:", formattedDates);

// const sentData = dates.map((date) => groupedByDate[date].sent); // Дані "Надіслано резюме"
// const responseData = dates.map((date) => groupedByDate[date].responses); // Дані "Отримано відповідей"

// const dates = Object.keys(groupedByDate); // Усі унікальні дати
// const sortedDates = dates.sort((a, b) => {
//   const dateA = new Date(a).getTime();
//   const dateB = new Date(b).getTime();
//   return dateA - dateB;
// });

// const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
//   return new Date(a).getTime() - new Date(b).getTime();
// });

// const formattedDates = sortedDates.map((date) =>
//   new Date(date).toLocaleDateString("uk-UA")
// );
// console.log("сортовані дати:", sortedDates)

{
  /* <Bar data={data} options={options} /> */
}
{
  /* <Bar data={data} /> */
}

// const data = {
//   // labels: ['January', 'February', 'March', 'April', 'May'],
//   labels: ["02.03", "03.03", "04.03", "05.03", "06.03", "07.03", "08.03"],
//   datasets: [
//     {
//       label: "Надіслано резюме",
//       data: [5, 8, 4, 6, 7, 9, 10], // Дані для першої групи
//       backgroundColor: "rgba(208, 232, 197, 1)", // Зелений колір
//       borderColor: "rgba(208, 232, 197, 1)",
//       borderWidth: 1,
//     },
//     {
//       label: "Отримано відповідей",
//       data: [2, 3, 1, 4, 2, 5, 3], // Дані для другої групи
//       backgroundColor: "rgba(198, 231, 255, 1)", // Синій колір
//       borderColor: "rgba(198, 231, 255, 1)",
//       borderWidth: 1,
//     },
//   ],
// };

// return (
//   <div className={"w-full h-auto min-h-56 mt-4"}>
//     {/* Зараз діаграма використовує статичні дані */}
//     <Bar
//       data={{
//         labels: ["02.03", "03.03", "04.03", "05.03", "06.03", "07.03", "08.03"],
//         datasets: [
//           {
//             label: "Надіслано резюме",
//             data: [5, 8, 4, 6, 7, 9, 10],
//             backgroundColor: "rgba(208, 232, 197, 1)",
//             borderColor: "rgba(208, 232, 197, 1)",
//             borderWidth: 1,
//           },
//           {
//             label: "Отримано відповідей",
//             data: [2, 3, 1, 4, 2, 5, 3],
//             backgroundColor: "rgba(198, 231, 255, 1)",
//             borderColor: "rgba(198, 231, 255, 1)",
//             borderWidth: 1,
//           },
//         ],
//       }}
//       options={{
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           x: { stacked: false },
//           y: { beginAtZero: true },
//         },
//         plugins: {
//           legend: { position: "bottom" },
//           tooltip: { mode: "index", intersect: false },
//         },
//       }}
//     />
//   </div>
// );

// {
//   "name": "hr",
//   "rejectReason": "SOFT_SKILLS",
//   "resumeId": "123e4567-e89b-12d3-a456-426614174000",
//   "date": "2025-01-14"
// }
