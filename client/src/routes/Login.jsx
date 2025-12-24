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
            role="main"  // Indicating this is the main content
        >
            {/* Login Welcome Card Section */}
            <motion.div variants={itemVariants} role="region" aria-labelledby="login-welcome-card-header">
                <h2 id="login-welcome-card-header" className="sr-only">Login Welcome</h2>
                <LoginWelcomeCard />
            </motion.div>

            {/* Login Form Section */}
            <motion.div variants={itemVariants} className="hover-lift" role="region" aria-labelledby="login-form-header">
                <h2 id="login-form-header" className="sr-only">Login Form</h2>
                <LoginForm />
            </motion.div>
        </motion.div>
    );
}

export default Login