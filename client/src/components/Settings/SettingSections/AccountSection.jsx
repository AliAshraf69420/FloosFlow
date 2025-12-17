import React, { useState, useEffect } from "react";
import userService from "../../../services/userService";
import { useUser } from "../../../context/UserContext";

export default function AccountSection({ data, onUpdateUser, onDeleteAccount }) {
  const [email, setEmail] = useState(data?.email || "");
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // "success" or "error"
  const { fetchUser } = useUser();

  const updatePassField = (key, value) => {
    setPasswords((prev) => ({ ...prev, [key]: value }));
  };

  // Automatically clear messages after 4 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleUpdateEmail = async () => {
    setLoadingEmail(true);
    setMessage("");

    try {
      const updatedUser = await userService.updateInfo({ email });
      setMessageType("success");
      setMessage("Email updated successfully");
      await fetchUser();
      onUpdateUser?.(updatedUser);
    } catch (error) {
      setMessageType("error");
      setMessage(error.response?.data?.error || error.message || "Failed to update email");
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleUpdatePassword = async () => {
    setLoadingPassword(true);
    setMessage("");

    if (passwords.new !== passwords.confirm) {
      setMessageType("error");
      setMessage("New password and confirmation do not match");
      setLoadingPassword(false);
      return;
    }

    try {
      await userService.updatePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      setMessageType("success");
      setMessage("Password updated successfully");
      await fetchUser();

      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      setMessageType("error");
      setMessage(error.response?.data?.error || error.message || "Failed to update password");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <section id="account" className="ff-card ff-settings-card">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white text-center sm:text-left">
        Account
      </h2>

      {message && (
        <p
          className={`mb-6 ${messageType === "success" ? "text-green-400" : "text-red-400"
            }`}
        >
          {message}
        </p>
      )}

      <div className="space-y-12">
        {/* Email Update */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Update Email</h3>
          <label className="block text-gray-200 mb-2">Email Address</label>
          <input
            type="email"
            className="ff-input w-full"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="ff-btn mt-8 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            onClick={handleUpdateEmail}
            disabled={loadingEmail}
          >
            {loadingEmail ? "Saving..." : "Save Email"}
          </button>
        </div>

        {/* Password Update */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-200 mb-2">Current Password</label>
              <input
                type="password"
                className="ff-input w-full"
                placeholder="Current password"
                value={passwords.current}
                onChange={(e) => updatePassField("current", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-2">New Password</label>
              <input
                type="password"
                className="ff-input w-full"
                placeholder="New password"
                value={passwords.new}
                onChange={(e) => updatePassField("new", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="ff-input w-full"
                placeholder="Confirm password"
                value={passwords.confirm}
                onChange={(e) => updatePassField("confirm", e.target.value)}
              />
            </div>
          </div>

          <button
            className="ff-btn mt-8 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            onClick={handleUpdatePassword}
            disabled={loadingPassword}
          >
            {loadingPassword ? "Updating..." : "Update Password"}
          </button>
        </div>

        {/* Delete Account */}
        <div className="pt-6 border-t border-red-500/30">
          <h3 className="text-xl font-semibold text-red-400 mb-3">Danger Zone</h3>
          <p className="text-gray-300 mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button
            className="ff-btn w-full sm:w-auto bg-red-600/80 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-colors"
            onClick={() => onDeleteAccount?.()}
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
}
