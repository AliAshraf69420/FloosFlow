import { motion } from 'framer-motion';
import WelcomeCard from '../components/Home/WelcomeCard';
import CardSection from '../components/Home/CardSection';
import Service from '../components/Home/services';
import { useUser } from '../context/UserContext';

const services = [
    'Service 1',
    'Service 2',
    'Service 3',
    'Service 4',
    'Service 5',
    'Service 6',
    'Service 7',
    'Service 8',
];

const pageVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const serviceContainerVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.3 }
    }
};

const serviceItemVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
    }
};

const Home = () => {
    const { user, loading, error } = useUser();

    if (loading) return (
        <div className="pt-24 px-4 flex items-center justify-center min-h-[60vh]">
            <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="w-12 h-12 border-3 border-gray-300 dark:border-white/20 border-t-[#49EB8C] rounded-full animate-spin" />
                <p className="text-gray-600 dark:text-white/60">Loading...</p>
            </motion.div>
        </div>
    );
    if (error) return <p className="text-red-500 text-center pt-24">Error loading user: {error}</p>;

    return (
        <motion.div
            className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-light dark:bg-ff-bg-dark pb-32"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.div variants={itemVariants} className="w-full flex justify-center">
                <WelcomeCard user={user} />
            </motion.div>
            <motion.div variants={itemVariants} className="w-full flex justify-center">
                <CardSection user={user} />
            </motion.div>
            <motion.section
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 justify-items-center w-full max-w-6xl"
                variants={serviceContainerVariants}
            >
                {services.map((label, index) => (
                    <motion.div key={label} variants={serviceItemVariants}>
                        <Service label={label} />
                    </motion.div>
                ))}
            </motion.section>
        </motion.div>
    );
};

export default Home;
