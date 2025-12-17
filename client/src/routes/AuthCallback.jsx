// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { updateUser } = useUser();

    useEffect(() => {
        // Parse URL params
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const userStr = params.get("user");

        if (!token || !userStr) {
            alert("Authentication failed");
            navigate("/Login");
            return;
        }

        try {
            // Save token in localStorage
            localStorage.setItem("authToken", token);

            // Parse user object and update context
            const user = JSON.parse(decodeURIComponent(userStr));
            updateUser(user);

            // Redirect to home or dashboard
            navigate("/Home");
        } catch (err) {
            console.error("Failed to parse auth callback", err);
            navigate("/Login");
        }
    }, [navigate, updateUser]);

    return (
        <div className="flex justify-center items-center h-screen text-white">
            <p className="text-lg">Logging in with Google...</p>
        </div>
    );
}
