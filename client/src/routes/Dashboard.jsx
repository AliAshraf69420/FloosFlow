import { useState, useEffect } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import DashboardButton from "../components/Dashboard/DashboardButton";
import BarChart from "../components/Dashboard/BarChart";
import PieChart from "../components/Dashboard/PieChart";
import analyticsService from "../services/analyticsService";

export default function Dashboard() {
  const [data, setData] = useState({ barData: [], pieData: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  const nextChart = () => setIndex((prev) => (prev + 1) % 2);
  const prevChart = () => setIndex((prev) => (prev - 1 + 2) % 2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await analyticsService.getAnalytics();

        // Transform API data for charts
        const chartData = {
          barData: { data: result.data }, // for BarChart
          pieData: { data: result.data }, // for PieChart
        };

        setData(chartData);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  const charts = [
    <BarChart key="bar" chartData={data.barData} />,
    <PieChart key="pie" chartData={data.pieData} />,
  ];

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
