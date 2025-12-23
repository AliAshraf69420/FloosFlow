import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ chartData = [] }) {
  const labels = chartData.map((item) => item.label);
  const values = chartData.map((item) => item.value);

  const colors = [
    "#49EB8C",
    "#62A6BF",
    "#65E67F",
    "#FFB547",
    "#FF4C4C",
    "#B562FF",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Categories",
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: "rgba(255,255,255,0.6)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const item = chartData[ctx.dataIndex];
            return `${item.label}: ${item.value} (${item.percentage ?? 0}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffffb3" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#ffffffb3" },
        grid: { color: "#ffffff20" },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
