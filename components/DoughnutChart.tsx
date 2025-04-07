"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({
  labels,
  values,
  labelName,
  color,
  Adress
}: {
  labels: string[];
  values: number[];
  labelName: string;
  color: string[];
  Adress: string;
}) => {
  const data = {
    labels: labels.map(
      (label) => label[0].toUpperCase() + label.slice(1).toLowerCase()
    ),
    datasets: [
      {
        label: labelName,
        data: [...values],
        backgroundColor: [...color],
        hoverOffset: 10,
      },
    ],
  };
  return (
    <div className="w-[200px]">
      <p className="text-center text-xl font-semibold">{Adress}</p>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
