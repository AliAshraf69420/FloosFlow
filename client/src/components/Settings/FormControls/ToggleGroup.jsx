import React from "react";

/**
 * Accessible segmented toggle group
 * Props:
 * - options: [{ id, label }]
 * - value: selected id
 * - onChange(id)
 * - name (string) optional for radio semantics
 */
export default function ToggleGroup({ options = [], value, onChange, name = "toggle" }) {
  return (
    <div role="tablist" aria-label={name} className="inline-flex rounded-full bg-white/5 p-1">
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange?.(opt.id)}
            className={`px-4 py-2 rounded-full transition-all duration-200 focus:outline-none ${
              active ? "bg-ff-gradient text-black font-semibold" : "text-gray-200"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
