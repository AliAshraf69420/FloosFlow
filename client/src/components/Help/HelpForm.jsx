import React from 'react'
import { Link } from 'react-router-dom';
const HelpForm = () => {
    return (
        <form className="ff-card p-6 space-y-6 flex flex-col  hover:bg-gradient-to-r from-[#62A6BF]/10 via-[#49EB8C]/10 to-[#65E67F]/10   w-full max-w-[1100px]  ">
            {/* Input fields */}
            <div className="flex flex-col md:flex-row  sm:flex-row sm:items-center sm:space-x-4 ">
                <label htmlFor="full-name" className="text-lg font-medium w-32 mb-2">Full-Name</label>
                <input required type="text" id="full-name" className="ff-input" placeholder='Enter your full name' />
            </div>
            <div className="flex flex-col md:flex-row  sm:flex-row sm:items-center sm:space-x-4 ">
                <label htmlFor="email" className="text-lg font-medium w-32 mb-2">Email</label>
                <input required type="email" id="email" className="ff-input" placeholder='Enter your email' />
            </div>
            <div className="flex flex-col md:flex-row  sm:flex-row sm:items-center sm:space-x-4 ">
                <label htmlFor="message" className="text-lg font-medium w-32 mb-2">Message</label>
                <textarea required type="text" id="message" className="ff-input leading-10" placeholder='Enter your Message' />
            </div>

            {/* Other Service Providers accounts  */}

            {/* Final login button below */}
            <div className="flex items-start">
                <button type="submit"
                    className="ff-btn w-full sm:w-40 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
                    Send message
                </button>
            </div>

        </form>
    )
}

export default HelpForm
