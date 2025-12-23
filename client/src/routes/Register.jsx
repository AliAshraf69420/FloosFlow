import React from 'react'
import RegisterWelcomeCard from '../components/Register/RegisterWelcomeCard'
import RegisterForm from '../components/Register/RegisterForm'
const Register = () => {
    return (
        <div className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-light dark:bg-ff-bg-dark pb-32">
            <RegisterWelcomeCard />
            <RegisterForm />
        </div>
    )
}

export default Register