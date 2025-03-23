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
} from "chart.js";

// Реєстрація компонентів Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartBarBaseProps {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }>;
  selectedIndex: number; // пропс для підкреслення обраного елемента по осі x
}

interface ExtendedChartOptions extends ChartOptions<"bar"> {
  selectedLabel?: string;
}

const ChartBarBase: React.FC<ChartBarBaseProps> = ({
  labels,
  datasets,
  selectedIndex,
}) => {
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
        ctx.moveTo(x - 44, xAxis.bottom + 5); // Початок лінії
        ctx.lineTo(x + 44, xAxis.bottom + 5); // Кінець лінії
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
            const label =
              typeof value === "number" ? this.getLabelForValue(value) : value;
            return label;
          },
          // font: {
          //   size: 20,
          // },
          font: (context) => {
            const width = context.chart.width;
            // console.log("Chart width:", width);
            return {
              size: width < 1027 ? 14 : 20,
              weight: width >= 1027 ? 500 : 400,
            };
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
        ticks: {
          // font: {
          //   size: 16,
          // },
          font: (context) => {
            const width = context.chart.width;
            return {
              size: width < 1027 ? 14 : 20,
              weight: width >= 1027 ? 500 : 400,
            };
          },
          color: "rgba(51, 51, 51, 1)",
        },
      },
    },
    plugins: {
      datalabels: {
        display: false, // Вимикає підписи на стовпчиках
      },
      legend: {
        position: "bottom",
        labels: {
          // font: {
          //   size: 20,
          //   weight: 500,
          // },
          font: (context) => {
            const width = context.chart.width;
            return {
              size: width < 720 ? 14 : width < 1027 ? 16 : 20,
              weight: width >= 720 ? 500 : 400,
            };
          },
          usePointStyle: false,
          boxWidth: 70,
          boxHeight: 30,
          padding: 24,
          color: "rgba(51, 51, 51, 1)",
          // generateLabels: (chart) => {
          //   const originalLabels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
          //   return originalLabels.map((label) => ({
          //     ...label,
          //     pointStyle: "rectRounded", // робимо закруглені бокси
          //     radius: 4, // закруглення кутів (немає в доках, але працює)
          //   }));
          // },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
      },
    },
    selectedLabel, // Додаємо обране значення на осі x
  };

  return (
    <div className={"mt-4 min-h-[406px] w-full"}>
      <Bar data={chartData} options={chartOptions} plugins={[customPlugin]} />
    </div>
  );
};

export default ChartBarBase;
