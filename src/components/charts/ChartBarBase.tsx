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

interface ChartBarBaseProps {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[],
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }>;
  selectedIndex: number; // пропс для підкреслення обраного елемента по осі x
};

interface ExtendedChartOptions extends ChartOptions<"bar"> {
  selectedLabel?: string;
}

const ChartBarBase: React.FC<ChartBarBaseProps> = ({ labels, datasets, selectedIndex }) => {
  const selectedLabel = labels[selectedIndex]; // Визначаємо обране значення по осі x
  const chartData = { labels, datasets };

  // Кастомний плагін для підкреслення
  const customPlugin = {
    id: "highlightTick",
    afterDraw: (chart: any) => {
      const xAxis = chart.scales.x; // Отримуємо шкалу X
      const ctx = chart.ctx;

      xAxis.ticks.forEach((_: any, index: number) => {
        const x = xAxis.getPixelForTick(index); // Позиція мітки
        const isHighlighted = index === selectedIndex;

        // Малюємо підкреслення
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x - 20, xAxis.bottom + 5); // Початок лінії
        ctx.lineTo(x + 20, xAxis.bottom + 5); // Кінець лінії
        ctx.lineWidth = 1;
        ctx.strokeStyle = isHighlighted ? "#436B88" : "transparent"; // Підкреслення лише для вибраного
        ctx.stroke();
        ctx.restore();
      });
    },
  };

  const chartOptions: ExtendedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          callback: function (value: string | number) {
            const label = typeof value === "number" ? this.getLabelForValue(value) : value;
            return label;
          },
          font: {
            size: 14,
          },
          color: "rgba(51, 51, 51, 1)",
          // color: (ctx) => {
          //   const label = ctx.tick.label;
          //   const selected = (ctx.chart.config.options as any).selectedLabel; // Доступ до обраного
          //   return label === selected ? "#4CAF50" : "rgba(0, 0, 0, 0.7)"; // Колір для обраного
        },
        border: {
          display: false, // Прибираємо рамку осі X
        },
        // },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: false,
          boxWidth: 70,
          boxHeight: 30,
          padding: 24,
          color: "rgba(51, 51, 51, 1)",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    selectedLabel, // Додаємо обране значення на осі x    
  };

  return (
    <div className={"w-full h-auto min-h-[406px] mt-4"}>
      <Bar data={chartData} options={chartOptions} plugins={[customPlugin]}/>
    </div>
  );
};

export default ChartBarBase;
