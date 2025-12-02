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
      className="ff-card hover:bg-gradient-to-r from-[#62A6BF]/10 via-[#49EB8C]/10 to-[#65E67F]/10 max-w-4xl mx-auto p-6 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-r from-gray-800/50 via-gray-900/50 to-gray-800/50 shadow-lg"
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
            className="ff-input pl-4 pr-4 py-3 w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
            className="ff-input pl-4 pr-4 py-3 w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
            className="ff-input pl-4 pr-4 py-3 w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
            className="ff-input pl-4 pr-4 py-3 w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 opacity-60 cursor-not-allowed"
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
            className="ff-input pl-4 pr-4 py-3 w-full rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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