import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService"; // make sure the path is correct

const RegisterForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const fullName = firstName + " " + lastName;
      const data = await authService.register({
        firstName,
        lastName,
        email,
        password,
      });

      console.log("Registered user:", data.user);
      navigate("/Home"); // redirect after successful registration
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ff-card p-6 space-y-6 flex flex-col hover:bg-gradient-to-r from-[#62A6BF]/10 via-[#49EB8C]/10 to-[#65E67F]/10 w-full max-w-[1100px]"
    >
      {/* Full Name */}
      <div className="flex flex-col md:flex-row sm:flex-row sm:items-center sm:space-x-4">
        <label htmlFor="full-name" className="text-lg font-medium w-32 mb-2">
          Full-Name
        </label>
        <input
          required
          type="text"
          id="full-name"
          className="ff-input"
          placeholder="Enter your full name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          required
          type="text"
          id="last-name"
          className="ff-input mt-2 md:mt-0"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col md:flex-row sm:flex-row sm:items-center sm:space-x-4">
        <label htmlFor="email" className="text-lg font-medium w-32 mb-2">
          Email
        </label>
        <input
          required
          type="email"
          id="email"
          className="ff-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col md:flex-row sm:flex-row sm:items-center sm:space-x-4">
        <label htmlFor="password" className="text-lg font-medium w-32 mb-2">
          Password
        </label>
        <input
          required
          type="password"
          id="password"
          className="ff-input"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col md:flex-row sm:flex-row sm:items-center sm:space-x-4">
        <label
          htmlFor="confirmPassword"
          className="text-lg font-small w-32 mb-2"
        >
          Confirm Password
        </label>
        <input
          required
          type="password"
          id="confirmPassword"
          className="ff-input"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Other Service Providers */}
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

      {/* Final Sign Up Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="ff-btn w-full sm:w-56 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          Sign up
        </button>
      </div>

      <p className="text-gray-400 text-sm text-center">
        Already have an account?{" "}
        <Link to="/Login" className="text-green-400 hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
