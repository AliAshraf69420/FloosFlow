import React from "react";

/**
 * Props:
 * - id
 * - value
 * - onChange(value)
 * - options: [{ value, label }]
 * - placeholder (optional)
 * - className
 */
export default function Select({
  id,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  className = "",
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`ff-input ${className}`}
      aria-label={id}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}