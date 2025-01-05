import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#C6E7FF",
        "#A6AEBF",
        "#CDC1FF",
        "#FC8972",
        "#FEEE91",
        "#B1D690",
      ],
      borderColor: [
        "#C6E7FF",
        "#A6AEBF",
        "#CDC1FF",
        "#FC8972",
        "#FEEE91",
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

const CustomLegend = ({ data }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {data.labels.map((label, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 10px",
            width: "140px", // Ширина одного стовпчика
          }}
        >
          <div
            style={{
              backgroundColor: data.datasets[0].backgroundColor[index],
              width: 70,
              height: 30,
              marginRight: 10,
              borderRadius: 4, // Робимо маркер круглим
            }}
          ></div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function GoughnutChart() {
  return (
    <div className="h-[400px] w-[400px]">
      <Doughnut data={data} options={options} />
      <CustomLegend data={data} />
    </div>
  );
}
