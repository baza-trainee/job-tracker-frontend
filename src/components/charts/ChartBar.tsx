import { useAppSelector } from "../../store/hook.ts";
import { RootState } from "../../store/store.ts";
import { useGetAllVacancyQuery } from "../../store/querySlices/vacanciesQuerySlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from "chart.js";

// Реєстрація компонентів Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false, // Відключення пропорцій для зручності адаптації
  scales: {
    x: { stacked: false }, // Вимикаємо стекування стовпчиків    
    y: { beginAtZero: true },
  },
  plugins: {
    legend: { position: "bottom" },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
};

interface GroupedData {
  [date: string]: { sent: number; responses: number };
}

export default function ChartBar() {
  const selectedDate = useAppSelector((state: RootState) => state.calendar.selectedDate);
  const { data: vacancies, isLoading, isError } = useGetAllVacancyQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching vacancies</div>;

  // Крок 0: Витягуємо вакансії
  // console.log("Всі вакансії: ", vacancies);

  // Крок 1: Витягуємо статуси (Проходимо по кожній вакансії, витягуємо всі статуси у вигляді одного великого масив)
  const statuses = vacancies?.flatMap((vacancy) => vacancy.statuses) || [];
  // console.log("Всі статуси:", statuses);

  // Крок 2: Групування статусів за датами
  const groupedByDate = statuses.reduce<GroupedData>((acc, status) => {
    // const date = new Date(status.date).toLocaleDateString("uk-UA"); // строкове представлення дати у форматі "дд.мм.рррр"
    const date = new Date(status.date).toISOString().split("T")[0]; // Формат рррр-мм-дд

    // Ініціалізуємо дату, якщо її ще немає
    if (!acc[date]) {
      acc[date] = { sent: 0, responses: 0 };
    }

    // Підраховуємо статуси
    if (status.name === "resume" || status.name === "saved") {
      acc[date].sent += 1; // "Надіслано резюме"
    } else if (
      status.name === "hr" ||
      status.name === "test" ||
      status.name === "tech" ||
      status.name === "offer"
    ) {
      acc[date].responses += 1; // "Отримано відповідей"
    }

    return acc;
  }, {});

  // Генеруємо діапазон 7 днів, включаючи обрану дату
  const getLast7Days = (endDate: Date): string[] => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(endDate); // Копія обраної дати
      date.setDate(endDate.getDate() - i); // Відлік назад
      return date.toISOString().split("T")[0]; // Формат yyyy-mm-dd
    }).reverse(); // Зворотній порядок, щоб обрана дата була останньою
  };

  const last7Days = getLast7Days(selectedDate); // Масив із 7 дат

  // Фільтруємо дані за останні 7 днів
  const filteredData = last7Days.map((date) => groupedByDate[date] || { sent: 0, responses: 0 });

  // Дані для Chart.js
  const chartData = {
    // labels: formattedDates, // Дати
    labels: last7Days.map((date) =>
      new Date(date).toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit" })
    ), // Відформатовані дати для осі X
    datasets: [
      {
        label: "Надіслано резюме",
        // data: sentData,
        data: filteredData.map((d) => d.sent),
        backgroundColor: "rgba(208, 232, 197, 1)", // Зелений
        borderColor: "rgba(208, 232, 197, 1)",
        borderWidth: 1,
      },
      {
        label: "Отримано відповідей",
        // data: responseData,
        data: filteredData.map((d) => d.responses),
        backgroundColor: "rgba(198, 231, 255, 1)", // Синій
        borderColor: "rgba(198, 231, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={"w-full h-auto min-h-56 mt-4"}>
      <Bar data={chartData} options={options} />
    </div>
  );
}




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

{/* <Bar data={data} options={options} /> */ }
{/* <Bar data={data} /> */ }

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