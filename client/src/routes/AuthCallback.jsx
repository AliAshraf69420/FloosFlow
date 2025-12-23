// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { fetchUser } = useUser();

    useEffect(() => {
        console.log("=== AuthCallback Component Loaded ===");
        console.log("Current URL:", window.location.href);

        // Parse URL params
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const user = params.get("user");

        console.log("Token received:", token ? "Yes" : "No");
        console.log("User data received:", user ? "Yes" : "No");

        if (!token || !user) {
            console.error("Missing token or user data");
            alert("Authentication failed");
            navigate("/Login");
            return;
        }

        const completeLogin = async () => {
            try {
                // Save token in localStorage FIRST
                localStorage.setItem("authToken", token);
                console.log("Token saved to localStorage");

                // Parse the basic user data from URL (just for logging)
                const basicUser = JSON.parse(decodeURIComponent(user));
                console.log("Basic user from OAuth:", basicUser);

                // Fetch FULL user data from backend (like regular login does)
                console.log("Fetching full user data from backend...");
                await fetchUser();
                console.log("Full user data fetched successfully");

                // Redirect to home
                console.log("Redirecting to /Home");
                navigate("/Home");
            } catch (err) {
                console.error("Failed to complete OAuth login", err);
                alert("Failed to complete login. Please try again.");
                navigate("/Login");
            }
        };

        completeLogin();
    }, [navigate, fetchUser]);

    return (
        <div className="flex justify-center items-center h-screen text-white">
            <p className="text-lg">Logging in with Google...</p>
        </div>
    );
}
