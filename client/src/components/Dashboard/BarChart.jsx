import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function StaticBarChart() {
  const [hoverIndex, setHoverIndex] = useState(null);

  const labels = ["Group A", "Group B", "Group C", "Group D"];
  const colors = ["#49EB8C", "#62A6BF", "#65E67F", "#cccccc"];
  const dataValues = [40, 30, 20, 10];

  const data = {
    labels,
    datasets: [
      {
        label: "Groups",
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.6)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw}%`,
        },
      },
    },
    maintainAspectRatio: false,
    onHover: (event, chartElement) => {
      if (chartElement.length > 0) {
        setHoverIndex(chartElement[0].index);
      } else {
        setHoverIndex(null);
      }
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

  return (
    <div className="w-full flex justify-center">
      <div
        className="
          flex flex-col md:flex-row 
          w-full md:space-x-6 space-y-6 md:space-y-0 
          max-w-screen
          bg-[#1f1f1f]/80 hover:bg-[#1e1e1e]/50 
          border border-white/40 
          rounded-xl italic transition shadow-md 
          p-6
        "
      >
        {/* Chart */}
        <div className="flex-1 h-[260px] sm:h-[300px] w-full">
          <Bar data={data} options={options} />
        </div>

        {/* Legend */}
        <div className="text-white/80 space-y-2 md:ml-6 w-full md:w-auto">
          <ul className="list-disc pl-5">
            {labels.map((label, i) => (
              <li
                key={i}
                className={`transition ${
                  hoverIndex === i ? "text-white" : "text-white/70"
                }`}
                style={{
                  fontWeight: hoverIndex === i ? "bold" : "normal",
                }}
              >
                {label}: {dataValues[i]}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
