import { useState } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import DashboardButton from "../components/Dashboard/DashboardButton";
import BarChart from "../components/Dashboard/BarChart";
import PieChart from "../components/Dashboard/PieChart";

export default function Dashboard() {
  const charts = [<BarChart />, <PieChart />];
  const [index, setIndex] = useState(0);

  const nextChart = () => setIndex((prev) => (prev + 1) % charts.length);
  const prevChart = () =>
    setIndex((prev) => (prev - 1 + charts.length) % charts.length);

  return (
    <main className="min-h-screen bg-[#121212] px-4 sm:px-6 lg:px-10 py-20 overflow-y-auto scroll-smooth">
      <div className="flex justify-center items-start">
        <DashboardCard
          title="Analytics"
          actions={
            <>
              <DashboardButton
                onClick={prevChart}
                imgSrc="/left-arrow-backup-2-svgrepo-com.svg"
              />
              <DashboardButton
                onClick={nextChart}
                imgSrc="/right-arrow-svgrepo-com.svg"
              />
            </>
          }
        >
          {charts[index]}
        </DashboardCard>
      </div>
    </main>
  );
}
