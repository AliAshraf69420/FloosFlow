import React from "react";

export default function TransactionSearch({ placeholder, value, onChange }) {
  return (
    <div className="ff-search-transaction mb-6 w-full">
      <img
        src="/search-outline-svgrepo-com.svg"
        alt="search"
        className="ff-search-icon-transaction"
      />
      <input
        type="text"
        placeholder={placeholder}
        className="ff-search-input-transaction w-full"
        value={value}            // controlled input
        onChange={onChange}      // notify parent when user types
      />
    </div>
  );
}
