import React from 'react'

const ContactSupport = () => {
    return (
        <div className="w-full max-w-[1100px] bg-gradient-to-r from-[#62A6BF]/20 via-[#49EB8C]/20 to-[#65E67F]/20 
    backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-10 text-center">

            <h3 className="text-2xl font-semibold mb-4 text-[#65E67F]">
                Still Need Help?
            </h3>

            <p className="text-gray-300 mb-6">
                Our team is available 24/7. You can reach us directly by email or visit our Support Center for quick answers.
            </p>

            <a
                href="mailto:support@floosflow.com"
                aria-label="Email support"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] 
        text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            >
                Contact Support
            </a>

        </div>

    )
}

export default ContactSupport
