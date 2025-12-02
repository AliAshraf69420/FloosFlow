import React, { useState } from "react";

export default function AccountSection({
  data,
  onUpdateEmail,
  onUpdatePassword,
  onDeleteAccount,
}) {
  const [email, setEmail] = useState(data?.email || "");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const updatePassField = (key, value) => {
    setPasswords((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section id="account" className="ff-card">
      <h2 className="text-3xl font-bold mb-6">Account</h2>

      <div className="space-y-10">

        {/* ---------------- Email Update ---------------- */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Update Email</h3>

          <label className="block text-gray-200 mb-2">Email Address</label>
          <input
            type="email"
            className="ff-input w-full"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="ff-btn mt-3"
            onClick={() => onUpdateEmail?.(email)}
          >
            Save Email
          </button>
        </div>

        {/* ---------------- Password Change ---------------- */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-200 mb-2">
                Current Password
              </label>
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
              <label className="block text-gray-200 mb-2">
                Confirm New Password
              </label>
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
            className="ff-btn mt-4"
            onClick={() =>
              onUpdatePassword?.({
                current: passwords.current,
                new: passwords.new,
                confirm: passwords.confirm,
              })
            }
          >
            Update Password
          </button>
        </div>

        {/* ---------------- Delete Account ---------------- */}
        <div className="pt-6 border-t border-white/20">
          <h3 className="text-xl font-semibold text-red-400 mb-3">
            Danger Zone
          </h3>
          <p className="text-gray-300 mb-4">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>

          <button
            className="ff-btn bg-red-600/70 hover:bg-red-700 text-white px-4 py-2"
            onClick={() => onDeleteAccount?.()}
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
}