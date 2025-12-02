import React from "react";

export default function TransferMoneyInput({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2 text-white text-left"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ff-input"
      />
    </div>
  );
}
