import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  TooltipItem,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useMediaQuery } from "react-responsive";
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { Vacancy } from "../../types/vacancies.types";

import DiagramTitle from "../Statistics/componets/statisticsDiagram/DiagramTitle";
import CustomLegend from "./CustomLegend";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function DoughnutChart({ vacancies }: { vacancies: Vacancy[] }) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 1279 });

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
        enabled: !isMobile,
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
      datalabels: {
        display: isMobile,
        color: "#333",
        font: {
          size: 14,
          family: "Nunito",
          weight: "bold",
          lineHeight: 1.3,
        } as const,
        formatter: (value: number, context: { dataset: { data: any[] } }) => {
          const total = context.dataset.data.reduce(
            (acc: any, val: any) => acc + val,
            0
          );
          const percentage = Math.round((value / total) * 100);

          return percentage === 0 ? "" : `${percentage}%`;
        },
        anchor: "center" as const,
        align: "center" as const,
      },
    },
  };

  return (
    <div className="flex h-fit w-full flex-col gap-2 md:gap-4 xl:w-[390px] xl:gap-6 2xl:w-[558px] 3xl:w-[633px] 3xl:gap-8">
      <DiagramTitle title={t(`statisticsDoughnatDiagram`)} />
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:px-8 xl:flex-col xl:justify-center xl:gap-6 xl:px-5 3xl:px-8">
        <div className="mx-auto aspect-square h-[calc(100%-60px)] w-[calc(100%-60px)] md:mx-0 md:w-[370px] xl:mx-auto xl:w-[350px] 2xl:w-[400px] 3xl:w-[556px]">
          <Doughnut data={chartData} options={options} />
        </div>
        <CustomLegend
          data={chartData}
          className="h-[130px] gap-2 md:h-fit md:w-[270px] md:gap-4 md:py-6 2xl:h-[170px] 2xl:w-full 2xl:gap-6"
        />
      </div>
    </div>
  );
}
