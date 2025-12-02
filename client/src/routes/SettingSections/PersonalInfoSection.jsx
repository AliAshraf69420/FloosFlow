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
    <section id="personal-info" className="ff-card">
      <h2 className="text-3xl font-bold mb-6">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* First Name */}
        <div>
          <label className="block text-gray-200 mb-2">First Name</label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="ff-input pl-4 pr-4 py-2 w-full"
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-200 mb-2">Last Name</label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="ff-input pl-4 pr-4 py-2 w-full"
            placeholder="Last Name"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-gray-200 mb-2">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => updateField("username", e.target.value)}
            className="ff-input pl-4 pr-4 py-2 w-full"
            placeholder="Username"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-200 mb-2">Email</label>
          <input
            type="email"
            value={form.email}
            disabled={true} // many systems lock email changes
            className="ff-input pl-4 pr-4 py-2 w-full opacity-60 cursor-not-allowed"
            placeholder="Email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-200 mb-2">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="ff-input pl-4 pr-4 py-2 w-full"
            placeholder="Phone Number"
          />
        </div>

      </div>

      <button onClick={handleSave} className="ff-btn mt-6">
        Save Changes
      </button>
    </section>
  );
}