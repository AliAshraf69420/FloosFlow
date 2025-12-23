import React from 'react'
import { motion } from 'framer-motion'
import WelcomeCard from '../components/LandingPage/WelcomeCard'
import Introduction from '../components/LandingPage/Introduction'
import StartCard from '../components/LandingPage/StartCard'

const pageVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    },
    exit: { opacity: 0 }
}

const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
}

const LandingPage = () => {
    return (
        <motion.div
            className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-light dark:bg-ff-bg-dark pb-32"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.div variants={itemVariants}>
                <WelcomeCard />
            </motion.div>
            <motion.div variants={itemVariants}>
                <Introduction />
            </motion.div>
            <motion.div variants={itemVariants}>
                <StartCard />
            </motion.div>
        </motion.div>
    )
}

export default LandingPage
