import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useState } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ chartData = { data: [] } }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  // fallback empty array if no data
  const labels = chartData.data.map((item) => item.label) || [];
  const dataValues = chartData.data.map((item) => item.value) || [];
  const colors = ["#49EB8C", "#62A6BF", "#65E67F", "#FFB547", "#FF4C4C", "#B562FF"];

  const data = {
    labels,
    datasets: [
      {
        label: "Categories",
        data: dataValues,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: "rgba(255,255,255,0.6)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw} (${chartData.data[ctx.dataIndex]?.percentage || 0}%)`,
        },
      },
    },
    maintainAspectRatio: false,
    onHover: (event, chartElement) => {
      setHoverIndex(chartElement.length > 0 ? chartElement[0].index : null);
    },
    scales: {
      x: { ticks: { color: "#ffffffb3" }, grid: { display: false } },
      y: { ticks: { color: "#ffffffb3" }, grid: { color: "#ffffff20" } },
    },
  };

  return <Bar data={data} options={options} />;
}
