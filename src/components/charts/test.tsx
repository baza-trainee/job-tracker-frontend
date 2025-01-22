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
  // const chartData = { labels, datasets };

  // const customPlugin = {
  //   id: "customTickStyles",
  //   afterDraw: (chart: any) => {
  //     const xAxis = chart.scales.x;
  //     const ctx = chart.ctx;

  //     xAxis.ticks.forEach((tick: any, index: number) => {
  //       const x = xAxis.getPixelForTick(index);
  //       const isSelected = labels[index] === selectedLabel;
  //       ctx.save();
  //       ctx.textAlign = "center";
  //       ctx.textBaseline = "middle";
  //       ctx.fillStyle = "rgba(51, 51, 51, 1)";
  //       ctx.fillText(labels[index], x, xAxis.bottom + 10);

  //       // Додаємо кастомний бордер
  //       ctx.beginPath();
  //       ctx.moveTo(x - 20, xAxis.bottom + 15);
  //       ctx.lineTo(x + 20, xAxis.bottom + 15);
  //       ctx.lineWidth = 2;
  //       ctx.strokeStyle = isSelected ? "#436B88" : "transparent";
  //       ctx.stroke();
  //       ctx.restore();
  //     });
  //   },
  const customPlugin = {
    id: "customTickUnderline",
    afterDraw: (chart: any) => {
      const xAxis = chart.scales.x;
      const ctx = chart.ctx;

      xAxis.ticks.forEach((tick: any, index: number) => {
        const x = xAxis.getPixelForTick(index);
        const isSelected = labels[index] === selectedLabel;

        // Малюємо підкреслення
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x - 20, xAxis.bottom + 5); // Початок лінії
        ctx.lineTo(x + 20, xAxis.bottom + 5); // Кінець лінії
        ctx.lineWidth = 2;
        ctx.strokeStyle = isSelected ? "#436B88" : "transparent"; // Підкреслення для вибраного
        ctx.stroke();
        ctx.restore();
      });
    },
  };

  const chartOptions: ExtendedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // x: {
      //   ticks: {
      //     callback: function (value: string | number) {
      //       const label = typeof value === "number" ? this.getLabelForValue(value) : value;
      //       return label;
      //     },
      //     font: {
      //       size: 14,
      //     },
      //     color: "rgba(51, 51, 51, 1)",
      //     // color: (ctx) => {
      //     //   const label = ctx.tick.label;
      //     //   const selected = (ctx.chart.config.options as any).selectedLabel; // Доступ до обраного
      //     //   return label === selected ? "#4CAF50" : "rgba(0, 0, 0, 0.7)"; // Колір для обраного
      //   },
      x: {
        ticks: {
          font: {
            size: 14,
          },
          color: "rgba(51, 51, 51, 1)", // Колір тексту для всіх міток
        },
        border: {
          display: false, // Прибираємо рамку осі X
        },
        //   ticks: {
        //     display: false, // Приховуємо стандартні тики
        //   },
        //   border: {
        //     display: false, // Прибираємо рамку осі X
        //   },
        //   // },
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
    // selectedLabel, // Додаємо обране значення на осі x
  };

  return (
    <div className={"w-full h-auto min-h-56 mt-4"}>
      {/* <style>
        {`
          .tick-default {
            border-bottom: 1px solid transparent;
          }
          .tick-selected {
            border-bottom: 1px solid #436B88;
          }
        `}
      </style> */}
      {/* <Bar data={chartData} options={chartOptions} plugins={[customPlugin]} /> */}
      <Bar data={{ labels, datasets }} options={chartOptions} plugins={[customPlugin]} />
    </div>
  );
};

export default ChartBarBase;



// Додаємо CSS для осі X
// const chartOptionsWithCustomStyles: any = {
//   ...chartOptions,
//   scales: {
//     ...chartOptions.scales,
//     x: {
//       ...chartOptions.scales?.x,
//       ticks: {
//         ...chartOptions.scales?.x?.ticks,
//         callback: function (value: string | number, index: number) {
//           const label = typeof value === "number" ? this.getLabelForValue(value) : value;
//           const customClass = label === selectedLabel ? "tick-selected" : "tick-default";
//           return `<span class="${customClass}">${label}</span>`; // Додаємо CSS-клас
//         },
//       },
//     },
//   },
// };

// const options: ChartOptions<"bar"> = {
//   responsive: true,
//   maintainAspectRatio: false, // Відключення пропорцій для зручності адаптації
//   scales: {
//     // x: { stacked: false }, // Вимикаємо стекування стовпчиків
//     x: {
//       ticks: {
//         callback: function (value: string | number) {
//           // Додаємо клас для підкреслення обраного значення
//           const label = typeof value === "number" ? this.getLabelForValue(value) : value;
//           return label;
//         },
//         font: {
//           size: 14,
//         },
//         color: (ctx) => {
//           const label = ctx.tick.label;
//           return label === ctx.chart.options.plugins?.selectedLabel
//             ? "#4CAF50" // Зелений для обраного
//             : "rgba(0, 0, 0, 0.7)"; // Сірий для інших
//         },
//       },
//     },
//     y: { beginAtZero: true },
//   },
//   plugins: {
//     legend: {
//       position: "bottom",
//       labels: {
//         usePointStyle: false, // Виключаємо точки
//         boxWidth: 70, // Розмір блоку
//         boxHeight: 30, // Розмір блоку
//         padding: 24, // Відстань між елементами
//         color: "#333",
//       },
//     },
//     tooltip: {
//       mode: "index",
//       intersect: false,
//     },
//   },
// };

// const ChartBarBase: React.FC<ChartBarBaseProps> = ({ labels, datasets, selectedIndex }) => {
//   const selectedLabel = labels[selectedIndex]; // Вибір обраного елемента по осі x
//   const chartData = { labels, datasets };

//   const chartOptions: ChartOptions<"bar"> = {
//     ...options,
//     scales: {
//       ...options.scales,
//       x: {
//         ...options.scales?.x,
//         ticks: {
//           ...options.scales?.x?.ticks,
//           color: (ctx) =>
//             ctx.tick.label === selectedLabel ? "#4CAF50" : "rgba(0, 0, 0, 0.7)", // Стиль обраного
//         },
//       },
//     },
//   };