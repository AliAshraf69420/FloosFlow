import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [hoverIndex, setHoverIndex] = useState(null);

  const labels = ["Group A", "Group B", "Group C", "Group D"];
  const colors = ["#49EB8C", "#62A6BF", "#65E67F", "#cccccc"];
  const dataValues = [40, 30, 20, 10];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        hoverOffset: 10,
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
    responsive: true,
    onHover: (event, elements) => {
      setHoverIndex(elements.length > 0 ? elements[0].index : null);
    },
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className="
          flex flex-col md:flex-row
          w-full md:space-x-6 space-y-6 md:space-y-0
          bg-[#1f1f1f]/80 hover:bg-[#1e1e1e]/50
          border border-white/40 rounded-xl shadow-md
          p-6 transition max-w-screen
        "
      >
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
                className={`transition ${
                  hoverIndex === i ? "text-white" : "text-white/70"
                }`}
                style={{ fontWeight: hoverIndex === i ? "bold" : "normal" }}
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
