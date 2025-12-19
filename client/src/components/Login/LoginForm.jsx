import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { UserProvider, useUser } from "../../context/UserContext";
import { useNotifications } from "../../context/NotificationsContext";

const LoginForm = () => {
  const navigate = useNavigate(); // to redirect after login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { fetchUser } = useUser();
  const { fetchNotifications } = useNotifications();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await authService.login({ email, password });
      console.log("Logged in user:", data.user);
      localStorage.setItem("authToken", data.token);
      await fetchUser()
      await fetchNotifications()
      navigate("/Home");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ff-card p-6 space-y-6 flex flex-col hover:bg-gradient-to-r from-[#62A6BF]/10 via-[#49EB8C]/10 to-[#65E67F]/10 w-full max-w-[1100px]"
    >
      {/* Email field */}
      <div className="flex flex-col md:flex-row sm:flex-row sm:items-center sm:space-x-4">
        <label htmlFor="email" className="text-lg font-medium w-32 mb-2">
          Email
        </label>
        <input
          type="email"
          required
          id="email"
          className="ff-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password field */}
      <div className="flex flex-col md:flex-row sm:flex-row sm:items-center sm:space-x-4">
        <label htmlFor="password" className="text-lg font-medium w-32 mb-2">
          Password
        </label>
        <input
          type="password"
          required
          id="password"
          className="ff-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Other service buttons (Google/Apple) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          type="button"
          className="ff-btn w-full sm:flex-1 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-200 flex items-center justify-between px-6"
          onClick={() => {
            window.location.href = "http://localhost:5000/api/auth/google";
          }}
        >
          <span>Sign up with Google</span>
          <img
            src="/google-icon-logo-svgrepo-com.svg"
            alt="Google Icon"
            className="w-6 h-6 ml-4"

          />
        </button>

        <button
          type="button"
          className="ff-btn w-full sm:flex-1 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-200 flex items-center justify-between px-6"
        >
          <span>Sign up with Apple</span>
          <img
            src="/apple-logo-svgrepo-com.svg"
            alt="Apple Icon"
            className="w-6 h-6 ml-4"
          />
        </button>
      </div>

      {/* Main login button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="ff-btn w-full sm:w-56 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          Login
        </button>
      </div>

      <p className="text-gray-400 text-sm text-center">
        Don't have an account?{" "}
        <Link to="/Register" className="text-green-400 hover:underline">
          Sign up here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
