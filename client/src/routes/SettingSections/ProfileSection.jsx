import React, { useState } from "react";
// import Card from "../../components/Card";
import ConnectedProviderList from "../../components/Settings/OAuth/ConnectedProviderList";
import FileUpload from            "../../components/Settings/FormControls/FileUpload";

export default function ProfileSection({ data, onSave, onDisconnect }) {
  const [prefs, setPrefs] = useState({
    email: data?.preferences?.email ?? false,
    sms: data?.preferences?.sms ?? false,
    marketing: data?.preferences?.marketing ?? false,
  });

  const handlePrefChange = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = () => {
    onSave.updatePreferences?.(prefs);
  };

  return (
    <section id="profile" className="ff-card">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>

      <div className="space-y-8">

        {/* COMMUNICATION PREFERENCES */}
        <div>
          <p className="text-white mb-3">Communication Preferences</p>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="ff-checkbox"
                checked={prefs.email}
                onChange={() => handlePrefChange("email")}
              />
              <span className="text-gray-200">Email Notifications</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="ff-checkbox"
                checked={prefs.sms}
                onChange={() => handlePrefChange("sms")}
              />
              <span className="text-gray-200">SMS Notifications</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="ff-checkbox"
                checked={prefs.marketing}
                onChange={() => handlePrefChange("marketing")}
              />
              <span className="text-gray-200">Marketing & Updates</span>
            </label>
          </div>

          <button
            onClick={handleSavePreferences}
            className="ff-btn mt-4"
          >
            Save Preferences
          </button>
        </div>

        {/* PROFILE IMAGE */}
        <div>
          <p className="text-white mb-3">Change Profile Image</p>
          <div className="flex gap-3 items-center">
            <FileUpload onUpload={onSave.uploadAvatar} />

            {data?.avatarUrl && (
              <button
                onClick={() => onSave.removeAvatar?.()}
                className="ff-btn ff-btn-danger"
              >
                Remove
              </button>
            )}
          </div>

          {/* Preview */}
          {data?.avatarUrl && (
            <img
              src={data.avatarUrl}
              alt="Profile"
              className="mt-4 w-24 h-24 rounded-full object-cover border border-gray-600"
            />
          )}
        </div>

        {/* CONNECTED PROVIDERS */}
        <ConnectedProviderList
          providers={data?.providers}
          onDisconnect={onDisconnect}
        />

      </div>
    </section>
  );
}