import React from "react";

const THEME_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

export default function ThemeSection({ theme, onChangeTheme }) {
  return (
    <section
      id="theme"
      className="ff-card hover:bg-gradient-to-r from-[#62A6BF]/10 via-[#49EB8C]/10 to-[#65E67F]/10 max-w-4xl mx-auto p-6 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-r from-gray-800/50 via-gray-900/50 to-gray-800/50 shadow-lg"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white text-center sm:text-left">
        Theme
      </h2>

      <p className="text-gray-200 mb-6">
        Choose your preferred appearance mode.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {THEME_OPTIONS.map((opt) => {
          const isActive = theme === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => onChangeTheme?.(opt.id)}
              className={`ff-btn w-full sm:w-auto px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive
                ? "bg-ff-gradient text-white shadow-md"
                : "bg-white/10 text-gray-200 hover:bg-white/20"
                }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
