import React from 'react'
import LoginForm from '../components/Login/LoginForm'
import LoginWelcomeCard from '../components/Login/LoginWelcomeCard'
const Login = () => {
    return (
        <div className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-dark pb-32">
            <LoginWelcomeCard />
            <LoginForm />
        </div>
    )
}

export default Login