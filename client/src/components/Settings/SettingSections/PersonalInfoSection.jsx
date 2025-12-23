import React, { useState, useEffect } from "react";
import userService from "../../../services/userService"; // your API service
import { useUser } from "../../../context/UserContext";

export default function PersonalInfoSection({ data, onUpdate }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
  });
  const { fetchUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (data) {
      setForm({
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        username: data.username ?? "",
        phone: data.phoneNumber ?? "", // matches backend field
      });
    }
  }, [data]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Only send fields that exist in form
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        phoneNumber: form.phone,
      };

      const updatedUser = await userService.updateInfo(payload);

      setMessage("Profile updated successfully");
      onUpdate?.(updatedUser); // update parent state
      await fetchUser()
    } catch (error) {
      setMessage(error.response?.data?.error || error.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="personal-info" className="ff-card ff-settings-card">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center sm:text-left break-words">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">First Name</label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="ff-input"
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">Last Name</label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="ff-input"
            placeholder="Last Name"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => updateField("username", e.target.value)}
            className="ff-input"
            placeholder="Username"
          />
        </div>

        {/* Email (disabled) */}

        {/* Phone */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="ff-input"
            placeholder="Phone Number"
          />
        </div>
      </div>

      {message && (
        <p className="mt-4 text-sm text-green-400">{message}</p>
      )}

      <button
        onClick={handleSave}
        disabled={loading}
        className="ff-btn mt-8 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </section>
  );
}
