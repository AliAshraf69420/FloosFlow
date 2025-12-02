import React from 'react'

const Introduction = () => {
    return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg text-white  hover:text-white p-6 sm:p-10 flex flex-col space-y-12  sm:space-x-6 w-full max-w-[1100px]">

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Manage Your Money the Smart Way with FloosFlow
            </h1>

            <h3 className="text-xl text-[#ACE6CF] font-semibold">
                Track, control, and improve your financial decisions effortlessly
            </h3>

            <p className="text-gray-200 text-base">
                With FloosFlow, you are always aware of where your money goes.
            </p>

            <ol className="list-decimal mt-1 ml-5 text-lg text-gray-100 space-y-2">
                <li>Organize and categorize all your transactions in one secure place</li>
                <li>Send and receive money easily between trusted users</li>
                <li>Create monthly budgets and get spending insights</li>
                <li>Track your balance and financial progress over time</li>
            </ol>

        </div>


    )
}

export default Introduction
