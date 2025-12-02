import React from "react";

const THEME_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

export default function ThemeSection({ theme, onChangeTheme }) {
  return (
    <section id="theme" className="ff-card">
      <h2 className="text-3xl font-bold mb-6">Theme</h2>

      <p className="text-gray-200 mb-4">
        Choose your preferred appearance mode.
      </p>

      <div className="flex gap-3">
        {THEME_OPTIONS.map((opt) => {
          const isActive = theme === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => onChangeTheme?.(opt.id)}
              className={`ff-btn px-4 py-2 ${
                isActive ? "bg-ff-gradient text-white" : "bg-white/10 text-gray-200"
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
