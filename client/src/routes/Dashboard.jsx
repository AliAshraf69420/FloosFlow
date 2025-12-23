import { useState, useEffect } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import DashboardButton from "../components/Dashboard/DashboardButton";
import BarChart from "../components/Dashboard/BarChart";
import PieChart from "../components/Dashboard/PieChart";
import LoadingSpinner from '../components/Notifications/LoadingSpinner'
import analyticsService from "../services/analyticsService";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState({
    barData: [],
    pieData: [],
  });

  const { fetchUser } = useUser()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState("week");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (error) {
      console.error(error);
      navigate("/Error", { state: { error } });
    }
  }, [error, navigate]);

  const nextChart = () => setIndex((prev) => (prev + 1) % 2);
  const prevChart = () => setIndex((prev) => (prev - 1 + 2) % 2);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        await fetchUser();

        setLoading(true);
        setError(null);

        const result = await analyticsService.getAnalytics({ range });

        setData({
          barData: result.data,
          pieData: result.data,
        });
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [fetchUser, range]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const charts = [
    <BarChart key="bar" chartData={data.barData} />,
    <PieChart key="pie" chartData={data.pieData} />,
  ];

  return (
    <main className="min-h-screen bg-[#121212] px-4 sm:px-6 lg:px-10 py-20 overflow-y-auto">
      <div className="flex flex-col items-center">
        {/* Range Selector */}
        <div className="mb-6 mt-6 flex items-center gap-3">
          <label htmlFor="range" className="text-white/70 font-medium">
            Filter by:
          </label>

          <select
            id="range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-ff-accent transition-all duration-300"
          >
            <option value="24h" className="bg-[#121212]">Last 24 Hours</option>
            <option value="week" className="bg-[#121212]">Last Week</option>
            <option value="month" className="bg-[#121212]">Last Month</option>
            <option value="year" className="bg-[#121212]">Last Year</option>
            <option value="all" className="bg-[#121212]">All Time</option>
          </select>
        </div>

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
