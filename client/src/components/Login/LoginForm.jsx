import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
    return (
        <div className="ff-card p-6 space-y-6 flex flex-col  hover:bg-gradient-to-r from-[#62A6BF]/10 via-[#49EB8C]/10 to-[#65E67F]/10   w-full max-w-[1100px]  ">
            {/* Input fields */}
            <div className="flex flex-col md:flex-row  sm:flex-row sm:items-center sm:space-x-4 ">
                <label for="email" class="text-lg font-medium w-32 mb-2">Email</label>
                <input type="email" id="email" className="ff-input" placeholder='Enter your email' />
            </div>
            <div className="flex flex-col md:flex-row sm:flex-row sm:items-center sm:space-x-4">
                <label for="password" class="text-lg font-medium w-32 mb-2 ">Password</label>
                <input type="password" id="password" className="ff-input" placeholder='Enter your password' />
            </div>
            {/* Other Service Providers accounts  */}
            <div class=" flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                <button type="button"
                    class="ff-btn w-full sm:flex-1 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-200 flex items-center justify-between px-6">
                    <span>Login with Google</span>
                    <img src='../../public/google-icon-logo-svgrepo-com.svg' alt='Google Icon' class='w-6 h-6 ml-4' />
                </button>

                <button type="button"
                    class="ff-btn w-full sm:flex-1 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-200 flex items-center justify-between px-6">
                    <span>Login with Apple</span>
                    <img src='../../public/apple-logo-svgrepo-com.svg' alt='Apple Icon' class='w-6 h-6 ml-4' />
                </button>
            </div>
            {/* Final login button below */}
            <div class="flex justify-center">
                <button type="submit"
                    class="ff-btn w-full sm:w-56 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
                    Login
                </button>
            </div>

            <p class="text-gray-400 text-sm text-center">
                Don’t have an account?
                <Link to="/Register" className="text-green-400 hover:underline">
                    Sign up here
                </Link>
            </p>
        </div>
    )
}

export default LoginForm
