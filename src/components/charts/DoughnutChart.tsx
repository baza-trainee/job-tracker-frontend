import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  TooltipItem,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { Vacancy } from "../../types/vacancies.types";
import DiagramTitle from "../Statistics/componets/statisticsDiagram/DiagramTitle";
import CustomLegend from "./CustomLegend";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ vacancies }: { vacancies: Vacancy[] }) {
  const { t } = useTranslation();

  const status = ["resume", "hr", "test", "tech", "reject", "offer"];

  const data = status.map((s) =>
    Array.isArray(vacancies)
      ? vacancies.filter(
          (v) => v.statuses && v.statuses[0] && v.statuses[0].name === s
        ).length
      : 0
  );

  if (!data.some((v) => v !== 0)) {
    return null;
  }

  const total = data.reduce((sum, value) => sum + value, 0);

  const chartData = {
    labels: status.map((s) => t(`sortDropdown.${s}`)),
    datasets: [
      {
        label: "",
        data,
        hoverBorderColor: "#436B88",
        backgroundColor: [
          "#C6E7FF",
          "#CDC1FF",
          "#FEEE91",
          "#A6AEBF",
          "#FC8972",
          "#B1D690",
        ],
        borderColor: [
          "#C6E7FF",
          "#CDC1FF",
          "#FEEE91",
          "#A6AEBF",
          "#FC8972",
          "#B1D690",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        // position: "bottom",
        // align: "start",

        labels: {
          boxWidth: 40,
          useBorderRadius: true,
          borderRadius: 12,
          font: {
            size: 16,
          },
          color: "#333",
        },
      },
      tooltip: {
        xAlign: "left" as const,
        yAlign: "center" as const,
        displayColors: false,
        bodyAlign: "center" as const,
        padding: 8,
        cornerRadius: {
          topLeft: 12,
          topRight: 12,
          bottomRight: 12,
          bottomLeft: 0,
        },
        caretSize: 0,
        backgroundColor: "#FDFEFF",
        borderColor: "#436B88",
        borderWidth: 1,
        titleColor: "#333",
        bodyColor: "#333",
        titleFont: {
          size: 14,
          family: "Nunito",
          weight: "bold",
          lineHeight: 1.3,
        } as const,
        bodyFont: {
          size: 14,
          family: "Nunito",
          weight: "bold",
          lineHeight: 1.3,
        } as const,
        callbacks: {
          label: function (tooltipItem: TooltipItem<"doughnut">) {
            const dataset = tooltipItem.dataset;
            const currentValue = dataset.data[tooltipItem.dataIndex] as number;
            const percentage = Math.round((currentValue / total) * 100);
            return `${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div className="flex w-[518px] flex-col gap-6">
      <DiagramTitle title={t(`statisticsDoughnatDiagram`)} />
      <div className="mx-auto h-[400px] w-[400px]">
        <Doughnut data={chartData} options={options} />
      </div>
      <CustomLegend data={chartData} className="h-[170px] flex-col flex-wrap" />
    </div>
  );
}
