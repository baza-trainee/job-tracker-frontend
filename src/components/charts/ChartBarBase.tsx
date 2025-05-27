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
  isDarkMode: boolean;
}

interface ExtendedChartOptions extends ChartOptions<"bar"> {
  selectedLabel?: string;
}

const ChartBarBase: React.FC<ChartBarBaseProps> = ({
  labels,
  datasets,
  selectedIndex,
  isDarkMode,
}) => {
  const selectedLabel = labels[selectedIndex]; // Визначаємо обране значення по осі x
  const chartData = { labels, datasets };

  // Кастомний плагін для підкреслення обраної дати на осі x
  const customPlugin = {
    id: "highlightTick",
    afterDraw: (chart: any) => {
      const xAxis = chart.scales.x; // Отримуємо шкалу X
      const ctx = chart.ctx;
      if (!xAxis) return;

      const chartWidth = chart.width; // Отримуємо ширину графіка
      // console.log("chartWidth", chartWidth);
      if (chartWidth < 480) return; // Якщо екран малий, не малюємо риску

      const lineLength = chart.width < 650 && chart.width >= 320 ? 26 : 44; // довжина риски на різну ширину діаграми

      xAxis.ticks.forEach((_: any, index: number) => {
        const x = xAxis.getPixelForTick(index); // Позиція мітки
        if (isNaN(x) || x < xAxis.left || x > xAxis.right) return; // Уникаємо помилок рендеру

        const isHighlighted = index === selectedIndex;

        // Малюємо підкреслення
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x - lineLength, xAxis.bottom + 5); // Початок лінії
        ctx.lineTo(x + lineLength, xAxis.bottom + 5); // Кінець лінії
        ctx.lineWidth = 1;
        ctx.strokeStyle = isHighlighted ? "#436B88" : "rgba(0,0,0,0)"; // Підкреслення лише для вибраного
        ctx.stroke();
        ctx.restore();
      });
    },
  };

  const chartOptions: ExtendedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 8,
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (value: string | number) {
            const label =
              typeof value === "number" ? this.getLabelForValue(value) : value;
            return label;
          },
          font: (context) => {
            const width = context.chart.width;
            const index = context.index;
            // console.log("Chart width:", width);
            return {
              size: width < 1027 ? 14 : 20,
              weight: width >= 1027 ? 500 : index === selectedIndex ? 700 : 400,
            };
          },
          color: (context) => {
            const index = context.index;
            // console.log("selected index", index, "tickValue:", context.tick.value, "labels:", labels);
            const baseColor = isDarkMode
              ? "rgba(236, 240, 246, 1)"
              : "rgba(51, 51, 51, 1)";
            return index === selectedIndex ? "#436B88" : baseColor;
          },
        },
        grid: {
          color: isDarkMode
            ? "rgba(255, 255, 255, 0.1)" // світла сіточка на темному фоні
            : "rgba(0, 0, 0, 0.05)", // темна сіточка на світлому фоні
          // drawBorder: false,
        },
        border: {
          display: false, // Прибираємо рамку осі X
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: (context) => {
            const width = context.chart.width;
            return {
              size: width < 1027 ? 14 : 20,
              weight: width >= 1027 ? 500 : 400,
            };
          },
          color: () => {
            return isDarkMode
              ? "rgba(236, 240, 246, 1)"
              : "rgba(51, 51, 51, 1)";
          },
        },
        grid: {
          color: isDarkMode
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.05)",
          // drawBorder: false,
        },
      },
    },
    plugins: {
      datalabels: {
        display: false, // Вимикає підписи на стовпчиках
      },
      legend: {
        display: false, // Вимикаємо стандартну легенду
        // position: "bottom",
        // labels: {
        //   font: (context) => {
        //     const width = context.chart.width;
        //     return {
        //       size: width < 720 ? 14 : width < 1027 ? 16 : 20,
        //       weight: width >= 720 ? 500 : 400,
        //     };
        //   },
        //   usePointStyle: false,
        //   boxWidth: 70,
        //   boxHeight: 30,
        //   padding: 24,
        //   color: "rgba(51, 51, 51, 1)",
        // },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: isDarkMode ? "#252a34" : "#fdfeff",
        titleColor: isDarkMode ? "#fdfeff" : "#333333",
        bodyColor: isDarkMode ? "#fdfeff" : "#333333",
        borderColor: isDarkMode ? "#134e79" : "#436b88",
        borderWidth: 0.8,
        titleFont: {
          size: 14,
          lineHeight: 1.3,
        },
        bodyFont: {
          size: 14,
          lineHeight: 1.3,
        },
        padding: 10,
      },
    },
    selectedLabel, // Додаємо обране значення на осі x
  };

  return (
    <div className={"mt-4 min-h-[406px] w-full overflow-visible"}>
      <Bar data={chartData} options={chartOptions} plugins={[customPlugin]} />
    </div>
  );
};

export default ChartBarBase;
