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

  // Реєстрація компонентів Chart.js
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  const data = {
    // labels: ['January', 'February', 'March', 'April', 'May'],
    labels: ["02.03", "03.03", "04.03", "05.03", "06.03", "07.03", "08.03"],
    // datasets: [
    //   {
    //     label: 'Vacancies',
    //     data: [12, 19, 3, 5, 2],
    //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
    //     borderColor: 'rgba(75, 192, 192, 1)',
    //     borderWidth: 1,
    //   },
    // ],
    datasets: [
      {
        label: "Кількість відправлених резюме",
        data: [5, 8, 4, 6, 7, 9, 10], // Дані для першої групи
        backgroundColor: "rgba(208, 232, 197, 1)", // Зелений колір
        borderColor: "rgba(208, 232, 197, 1)",
        borderWidth: 1,
      },
      {
        label: "Кількість отриманих відповідей",
        data: [2, 3, 1, 4, 2, 5, 3], // Дані для другої групи
        backgroundColor: "rgba(198, 231, 255, 1)", // Синій колір
        borderColor: "rgba(198, 231, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
  
  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false, // Це дозволяє графіку займати заданий розмір контейнера
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     tooltip: {
  //       mode: 'index',
  //       intersect: false,
  //     },
  //   },
  // };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false, // Відключення пропорцій для зручності адаптації
  //   scales: {
  //     x: {
  //       stacked: false, // Вимикаємо стекування стовпчиків
  //     },
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       position: "bottom",
  //     },
  //     tooltip: {
  //       mode: "index",
  //       intersect: false,
  //     },
  //   },
  // };

  export default function ChartBar() {
    return (
      // <div className={"size-96"}>
      <div className={"w-full h-auto"}>
        {/* <Bar data={data} options={options} /> */}
        <Bar data={data} />
      </div>
      
    );
  }
  