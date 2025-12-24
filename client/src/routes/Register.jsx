import React from 'react'
import RegisterWelcomeCard from '../components/Register/RegisterWelcomeCard'
import RegisterForm from '../components/Register/RegisterForm'
const Register = () => {
    return (
        <div className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-light dark:bg-ff-bg-dark pb-32" role="main" aria-labelledby="register-heading">
            {/* Register Page Heading */}
            <h1 id="register-heading" className="sr-only">Register for an Account</h1>  {/* Visible for screen readers only */}

            {/* Welcome Card for Registration */}
            <RegisterWelcomeCard />

            {/* Register Form */}
            <form
            className="w-full max-w-md space-y-6"
            onSubmit={handleSubmit} // Ensure form submission handling is accessible
            aria-labelledby="register-heading"
            >
            <RegisterForm />
            </form>
        </div>
    )
}

export default Register