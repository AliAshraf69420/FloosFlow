import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ chartData = [] }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  // fallback to empty array if chartData is undefined
  const labels = chartData.map((item) => item.label) || [];
  const values = chartData.map((item) => item.value || 0);
  const colors = ["#49EB8C", "#62A6BF", "#65E67F", "#FFB547", "#FF4C4C", "#B562FF"];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: "rgba(255,255,255,0.6)",
        hoverOffset: 10,
      },
    ],
  };

  const formatEGP = (val) =>
    new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(val);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const item = chartData[ctx.dataIndex];
            return `${item.label}: ${formatEGP(item.value)} (${item.percentage ?? 0}%)`;
          },
        },
      },
    },
    onHover: (event, elements) => setHoverIndex(elements.length > 0 ? elements[0].index : null),
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col md:flex-row w-full md:space-x-6 space-y-6 md:space-y-0 bg-[#1f1f1f]/80 hover:bg-[#1e1e1e]/50 border border-white/40 rounded-xl shadow-md p-6 transition max-w-screen">
        {/* Pie Chart */}
        <div className="flex-1 h-[260px] sm:h-[320px] flex items-center justify-center">
          <div className="w-52 h-52 sm:w-64 sm:h-64">
            <Pie data={data} options={options} />
          </div>
        </div>

        {/* Legend */}
        <div className="text-white/80 space-y-2 w-full md:w-48 md:ml-6">
          <ul className="list-disc pl-5">
            {labels.map((label, i) => (
              <li
                key={i}
                className={`transition ${hoverIndex === i ? "text-white" : "text-white/70"}`}
                style={{ fontWeight: hoverIndex === i ? "bold" : "normal" }}
              >
                {label}: {formatEGP(values[i])} ({chartData[i]?.percentage ?? 0}%)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
