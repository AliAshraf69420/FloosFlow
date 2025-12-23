import React from 'react'

const HelpInfo = () => {
    return (
        <div className="w-full max-w-[1100px] bg-gray-100 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-lg p-8 space-y-6 text-left transition-all duration-300 hover:bg-gradient-to-r from-[#62A6BF]/10 via-[#49EB8C]/10 to-[#65E67F]/10 hover:shadow-xl">

            <h3 id="faq-heading" className="text-2xl font-semibold text-[#65E67F]">
                Frequently Asked Questions
            </h3>

            <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    How do I reset my password?
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                    Click on the "Forgot Password?" link on the login page. Enter your email and we'll send you a reset link to create a new password.
                </p>
            </div>

            <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    How do I create a new FloosFlow account?
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                    Go to the Sign Up page, fill in your personal details, email, and password, and click on "Create Account." You can also sign up using Google or Apple.
                </p>
            </div>

            <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Why is my transaction not showing up?
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                    Transactions may take a few minutes to update. Try refreshing your dashboard. If the issue continues, contact support below.
                </p>
            </div>

            <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    How can I contact customer support?
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                    Use the contact form below or email us directly at{" "}
                    <a href="mailto:support@floosflow.com" className="text-green-500 dark:text-green-400">
                        support@floosflow.com
                    </a>.
                </p>
            </div>

        </div>



    )
}

export default HelpInfo
