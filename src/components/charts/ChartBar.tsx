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
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Vacancies',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
  
  export default function ChartBar() {
    return (
      <div className={"size-96"}>
        {/* <Bar data={data} options={options} /> */}
        <Bar data={data} />
      </div>
    );
  }
  