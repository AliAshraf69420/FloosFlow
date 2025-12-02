// components/AddTransaction/TransactionInput.jsx
import React from "react";

export default function TransactionInput({
  label,
  id,
  type = "text",
  placeholder,
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
        required={required}
        className="ff-input"
      />
    </div>
  );
}
