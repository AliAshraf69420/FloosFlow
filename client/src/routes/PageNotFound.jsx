import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center" role="alert" aria-live="assertive">
            {/* Title with clear message for users */}
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] mb-6" id="page-not-found-heading">
                Page not found
            </h1>

            {/* Optional description (now hidden but accessible for screen readers) */}
            <p className="sr-only">The page you are looking for does not exist.</p>

            {/* Link to go back to home, with accessible description */}
            <Link 
                to="/" 
                className="px-8 py-3 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 mt-8" 
                aria-labelledby="page-not-found-heading" // Associates link with the heading for context
                aria-label="Go back to the homepage" // Describes the link's action for screen readers
            >
                Go back to home
            </Link>
        </div>

    );
}