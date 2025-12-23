import React from "react";
import { useTheme } from "../../../context/ThemeContext";

const THEME_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

export default function ThemeSection() {
  const { theme, changeTheme } = useTheme();

  return (
    <section
      id="theme"
      className="ff-card ff-settings-card"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center sm:text-left">
        Theme
      </h2>

      <p className="text-gray-600 dark:text-gray-200 mb-6">
        Choose your preferred appearance mode.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {THEME_OPTIONS.map((opt) => {
          const isActive = theme === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => changeTheme(opt.id)}
              className={`ff-btn w-full sm:w-auto px-4 py-3 rounded-lg font-medium transition-all duration-300
                ${isActive
                  ? "bg-ff-gradient text-white shadow-md scale-105"
                  : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-white/20"
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
