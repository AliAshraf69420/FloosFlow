import React from "react";

export default function SendInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm sm:text-base font-medium mb-2 text-white/90"
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="ff-input"
      />
    </div>
  );
}
