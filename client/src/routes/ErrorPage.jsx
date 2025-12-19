import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] mb-6">Page not found</h1>
            {/* <p className="text-2xl text-gray-300 mb-8">Page not found</p> */}
            <Link to="/" className="px-8 py-3 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 mt-8">
                Go back to home
            </Link>
        </div>
    );
}