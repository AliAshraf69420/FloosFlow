import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ErrorPage() {
    const location = useLocation();
    const { setError } = useUser();

    // Get error from state (passed via navigate) or props
    const errorMessage = location.state?.error || "Unknown Error Occured";

    const handleClearError = () => {
        setError(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4" role="alert" aria-live="assertive">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] mb-6 leading-tight">
                {typeof errorMessage === 'string' ? errorMessage : "An unexpected error occurred"}
            </h1>
            <Link
                to="/"
                onClick={handleClearError}
                className="px-8 py-3 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 mt-8"
                aria-label="Go back to the homepage"
                role="button"
                tabIndex="0"  // Ensure the link is keyboard-navigable
            >
                Go back to home
            </Link>
        </div>

    );
}