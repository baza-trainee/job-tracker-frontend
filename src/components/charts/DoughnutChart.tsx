import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { Vacancy } from "../../types/vacancies.types";
import { getVacanciesByStatus } from "../Vacancies/components/VacanсyMainConfig";
// import { useGetAllUserDataQuery } from "../../store/querySlices/profileQuerySlice";
// import { getVacanciesByStatus } from "../Vacancies/components/VacanсyMainConfig";
// import { FC } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

// getVacanciesByStatus(vacancies, "hr");

const CustomLegend = ({ data }) => {
  return (
    <div className="flex h-[200px] w-[518px] flex-col flex-wrap justify-between gap-6 rounded-2xl bg-backgroundTertiary px-6 py-4">
      {data.labels.map((label, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",

            width: "223px", // Ширина одного стовпчика
          }}
        >
          <div
            style={{
              backgroundColor: data.datasets[0].backgroundColor[index],
              width: 70,
              height: 30,
              marginRight: 10,
              borderRadius: 4,
            }}
          ></div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function GoughnutChart({ vacancies }: { vacancies: Vacancy[] }) {
  console.log("vacancies", vacancies);
  const { t } = useTranslation();
  //   const status = [
  //     "sent",
  //     "hrInterview",
  //     "testTask",
  //     "techInterview",
  //     "rejection",
  //     "offer",
  //   ];
  const status = ["resume", "hr", "test", "tech", "reject", "offer"];

  const data = {
    labels: status.map((s) => t(`sortDropdown.${s}`)),
    datasets: [
      {
        label: "",
        // data: [10, 19, 3, 5, 2, 3],
        data: status.map(
          (s) =>
            vacancies.filter(
              (v) => v.statuses && v.statuses[0] && v.statuses[0].name === s
            ).length
        ),
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
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        align: "start",
        labels: {
          font: {
            size: 16,
          },
          color: "#333",
          //  boxWidth: 20,
        },
      },
      tooltip: {
        backgroundColor: "#FDFEFF",
        borderColor: "#436B88",
        borderWidth: 1,
        titleColor: "#333",
        bodyColor: "#ccc",
      },
    },
  };

  return (
    <div className="flex h-[400px] w-[478px] flex-col gap-6">
      <Doughnut data={data} options={options} />
      <CustomLegend data={data} />
    </div>
  );
}
