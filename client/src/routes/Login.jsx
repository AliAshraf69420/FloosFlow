import React from 'react'
import { motion } from 'framer-motion'
import LoginForm from '../components/Login/LoginForm'
import LoginWelcomeCard from '../components/Login/LoginWelcomeCard'

const pageVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
}

const itemVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
}

const Login = () => {
    return (
        <motion.div
            className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-light dark:bg-ff-bg-dark pb-32"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.div variants={itemVariants}>
                <LoginWelcomeCard />
            </motion.div>
            <motion.div variants={itemVariants} className="hover-lift">
                <LoginForm />
            </motion.div>
        </motion.div>
    )
}

export default Login