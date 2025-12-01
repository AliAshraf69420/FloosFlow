import React from 'react'
import { Link } from 'react-router-dom';
const StartCard = () => {
    return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg
         text-white  hover:text-white p-6 sm:p-10 flex flex-col space-y-12 text-center sm:space-x-6 w-full max-w-[1100px]">
            <h1 className="text-center font-extrabold text-3xl">Want to Start your journey?</h1>
            <div class="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
                <Link to="/Login" class="ff-btn w-full  bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">

                    Log in
                </Link>
                <Link to="/Register" class="ff-btn w-full  bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">

                    Sign up
                </Link>

            </div>

        </div>
    )
}

export default StartCard
