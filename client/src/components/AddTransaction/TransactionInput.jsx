import React from "react";

export default function TransactionInput({
  label,
  id,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
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
        required={required}
        value={value}
        onChange={onChange}
        className="ff-input"
      />
    </div>
  );
}
