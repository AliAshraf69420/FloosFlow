import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardCard from "../components/Dashboard/DashboardCard";
import DashboardButton from "../components/Dashboard/DashboardButton";
import BarChart from "../components/Dashboard/BarChart";
import PieChart from "../components/Dashboard/PieChart";
import LoadingSpinner from "../components/Notifications/LoadingSpinner";
import analyticsService from "../services/analyticsService";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const chartVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export default function Dashboard() {
  const [data, setData] = useState({ barData: [], pieData: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState("week");
  const [index, setIndex] = useState(0);

  const { fetchUser } = useUser();
  const navigate = useNavigate();

  const nextChart = () => setIndex((prev) => (prev + 1) % 2);
  const prevChart = () => setIndex((prev) => (prev - 1 + 2) % 2);

  useEffect(() => {
    if (error) {
      console.error(error);
      navigate("/Error", { state: { error } });
    }
  }, [error, navigate]);

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
      <motion.div className="min-h-screen flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <p className="text-gray-600 dark:text-white/60">Loading analytics...</p>
        </div>
      </motion.div>
    );
  }

  const charts = [
    <BarChart key="bar" chartData={data.barData} />,
    <PieChart key="pie" chartData={data.pieData} />,
  ];

  return (
    <motion.main
      className="min-h-screen bg-ff-bg-light dark:bg-[#121212] px-4 sm:px-6 lg:px-10 py-20 overflow-y-auto scroll-smooth"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      role="main"  // Added ARIA role for clarity
    >
      <div className="w-full mb-6">
        {/* Range Selector */}
        <div className="mb-6 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <label htmlFor="range" className="text-gray-700 dark:text-gray-300 font-medium">
              Filter by:
            </label>
            <select
              id="range"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-white/10 border border-white/20 text-gray-900 dark:text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-ff-accent transition-all duration-300"
              aria-label="Select the range for the chart data"
            >
              <option value="24h" className="bg-[#121212]">Last 24 Hours</option>
              <option value="week" className="bg-[#121212]">Last Week</option>
              <option value="month" className="bg-[#121212]">Last Month</option>
              <option value="year" className="bg-[#121212]">Last Year</option>
              <option value="all" className="bg-[#121212]">All Time</option>
            </select>
          </div>
        </div>

        <DashboardCard
          title="Analytics"
          actions={
            <>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous Chart"
                role="button"
                tabIndex="0"  // div is focusable via keyboard
                onClick={prevChart}
              >
                <DashboardButton imgSrc="/left-arrow-backup-2-svgrepo-com.svg" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next Chart"
                role="button"
                tabIndex="0"  // div is focusable via keyboard
                onClick={nextChart}
              >
                <DashboardButton imgSrc="/right-arrow-svgrepo-com.svg" />
              </motion.div>
            </>
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={chartVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-[500px]"
              role="region"
              aria-live="polite" // chart changes are announced
              aria-labelledby="chart-container"
            >
              {charts[index]}
            </motion.div>
          </AnimatePresence>
        </DashboardCard>
      </div>
    </motion.main>

  );
}