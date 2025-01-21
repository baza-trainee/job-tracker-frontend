import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

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

interface ChartBarBaseProps {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[],
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
    }>;
}

const ChartBarBase: React.FC<ChartBarBaseProps> = ({ labels, datasets }) => {
    const chartData = { labels, datasets };

    return (
        <div className={"w-full h-auto min-h-56 mt-4"}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ChartBarBase;
