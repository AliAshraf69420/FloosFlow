import React, { useState, useEffect } from "react";

export default function PersonalInfoSection({ data, onSave }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        username: data.username ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
      });
    }
  }, [data]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave?.updatePersonalInfo?.(form);
  };

  return (
    <section
      id="personal-info"
      className="ff-card ff-settings-card"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white text-center sm:text-left break-words">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* First Name */}
        <div>
          <label className="block text-gray-200 mb-2 font-medium">First Name</label>
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
          <label className="block text-gray-200 mb-2 font-medium">Last Name</label>
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
          <label className="block text-gray-200 mb-2 font-medium">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => updateField("username", e.target.value)}
            className="ff-input"
            placeholder="Username"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-200 mb-2 font-medium">Email</label>
          <input
            type="email"
            value={form.email}
            disabled
            className="ff-input opacity-60 cursor-not-allowed"
            placeholder="Email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-200 mb-2 font-medium">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="ff-input"
            placeholder="Phone Number"
          />
        </div>

      </div>

      <button
        onClick={handleSave}
        className="ff-btn mt-8 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        Save Changes
      </button>
    </section>

  );
}
