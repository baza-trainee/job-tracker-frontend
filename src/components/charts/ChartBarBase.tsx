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
      if (!xAxis) return;

      // console.log("Selected Index:", selectedIndex);
      // console.log("Chart Labels:", chart.data.labels);

      xAxis.ticks.forEach((_: any, index: number) => {
        const x = xAxis.getPixelForTick(index); // Позиція мітки
        if (isNaN(x) || x < xAxis.left || x > xAxis.right) return; // Уникаємо помилок рендеру

        const isHighlighted = index === selectedIndex;

        // Малюємо підкреслення
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x - 44, xAxis.bottom + 5); // Початок лінії
        ctx.lineTo(x + 44, xAxis.bottom + 5); // Кінець лінії
        ctx.lineWidth = 1;
        ctx.strokeStyle = isHighlighted ? "#436B88" : "rgba(0,0,0,0)"; // Підкреслення лише для вибраного
        ctx.stroke();
        ctx.restore();
      });
    },
  };

  // Кастомний плагін для фону під легендою
  const customLegendPlugin = {
    id: "customLegendBackground",
    beforeDraw: (chart: any) => {
      const { ctx, legend } = chart;
      // if (!legend) return;
      if (!legend || !legend.legendItems || !legend.legendHitBoxes) return; // Перевіряємо, чи є легенда

      ctx.save();

      // Отримуємо межі легенди
      let minLeft = Infinity;
      let maxRight = -Infinity;
      let minTop = Infinity;
      let maxBottom = -Infinity;

      legend.legendHitBoxes.forEach((hitBox: any) => {
        minLeft = Math.min(minLeft, hitBox.left);
        maxRight = Math.max(maxRight, hitBox.left + hitBox.width);
        minTop = Math.min(minTop, hitBox.top);
        maxBottom = Math.max(maxBottom, hitBox.top + hitBox.height);
      });

      const padding = 24;
      const borderRadius = 12; // Радіус закруглення

      const bgLeft = minLeft - padding;
      const bgTop = minTop - padding + 10;
      const bgWidth = maxRight - minLeft + padding * 2;
      const bgHeight = maxBottom - minTop + padding * 2 - 20;

      ctx.fillStyle = "rgba(247, 248, 251, 1)";
      ctx.beginPath();
      ctx.roundRect(bgLeft, bgTop, bgWidth, bgHeight, borderRadius);
      ctx.fill();
      ctx.restore();
    },
  };

  const chartOptions: ExtendedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 40,
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
            // console.log("Chart width:", width);
            return {
              size: width < 1027 ? 14 : 20,
              weight: width >= 1027 ? 500 : 400,
            };
          },
          color: "rgba(51, 51, 51, 1)",
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
          color: "rgba(51, 51, 51, 1)",
        },
      },
    },
    plugins: {
      datalabels: {
        display: false, // Вимикає підписи на стовпчиках
      },
      legend: {
        // display: false, // Вимикаємо стандартну легенду
        position: "bottom",
        labels: {
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
    <div className={"mt-4 min-h-[406px] w-full overflow-visible"}>
      <Bar
        data={chartData}
        options={chartOptions}
        plugins={[customPlugin, customLegendPlugin]}
      />
    </div>
  );
};

export default ChartBarBase;
