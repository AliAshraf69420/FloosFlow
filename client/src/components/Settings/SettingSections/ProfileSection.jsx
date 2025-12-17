import React, { useState } from "react";
import ConnectedProviderList from "../OAuth/ConnectedProviderList";
import FileUpload from "../FormControls/FileUpload";
import { useUser } from "../../../context/UserContext";

export default function ProfileSection({ onSave, onDisconnect }) {
  const { user } = useUser(); // get user
  const [prefs, setPrefs] = useState({
    email: user?.preferences?.email ?? false,
    sms: user?.preferences?.sms ?? false,
    marketing: user?.preferences?.marketing ?? false,
  });

  const handlePrefChange = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = () => {
    onSave.updatePreferences?.(prefs);
  };

  return (
    <section id="profile" className="ff-card ff-settings-card">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white text-center sm:text-left">
        Profile
      </h2>

      <div className="space-y-10">
        {/* Communication Preferences */}
        <div>
          <p className="text-white mb-4 text-lg font-semibold">Communication Preferences</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                className="ff-checkbox h-5 w-5"
                checked={prefs.email}
                onChange={() => handlePrefChange("email")}
              />
              Email Notifications
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                className="ff-checkbox h-5 w-5"
                checked={prefs.sms}
                onChange={() => handlePrefChange("sms")}
              />
              SMS Notifications
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-gray-200">
              <input
                type="checkbox"
                className="ff-checkbox h-5 w-5"
                checked={prefs.marketing}
                onChange={() => handlePrefChange("marketing")}
              />
              Marketing & Updates
            </label>
          </div>
          <button
            onClick={handleSavePreferences}
            className="ff-btn mt-4 px-5 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Save Preferences
          </button>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col flex-wrap">
          <p className="text-white mb-3 text-lg font-semibold">Change Profile Image</p>
          <FileUpload />
          {user?.profileImage && (
            <img
              src={user.profileImage ?? "https://via.placeholder.com/150"}
              alt="Profile"
              className="mt-4 w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gray-600 shadow-md"
            />
          )}
        </div>

        {/* Connected Providers */}
        <ConnectedProviderList
          providers={user?.providers}
          onDisconnect={onDisconnect}
          className="mt-6"
        />
      </div>
    </section>
  );
}
