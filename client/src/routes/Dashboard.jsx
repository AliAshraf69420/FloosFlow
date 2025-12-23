import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardCard from "../components/Dashboard/DashboardCard";
import DashboardButton from "../components/Dashboard/DashboardButton";
import BarChart from "../components/Dashboard/BarChart";
import PieChart from "../components/Dashboard/PieChart";
import analyticsService from "../services/analyticsService";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const chartVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

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

        const chartData = {
          barData: { data: result.data },
          pieData: { data: result.data },
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

  if (loading) return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-3 border-gray-300 dark:border-white/20 border-t-[#49EB8C] rounded-full animate-spin" />
        <p className="text-gray-600 dark:text-white/60">Loading analytics...</p>
      </div>
    </motion.div>
  );

  if (error) return (
    <motion.p
      className="text-red-500 text-center mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {error}
    </motion.p>
  );

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
    >
      <motion.div
        className="flex justify-center items-start"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <DashboardCard
          title="Analytics"
          actions={
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <DashboardButton
                  onClick={prevChart}
                  imgSrc="/left-arrow-backup-2-svgrepo-com.svg"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <DashboardButton
                  onClick={nextChart}
                  imgSrc="/right-arrow-svgrepo-com.svg"
                />
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
            >
              {charts[index]}
            </motion.div>
          </AnimatePresence>
        </DashboardCard>
      </motion.div>
    </motion.main>
  );
}
