import React from "react";

export default function RecipientSearch({ value, onChange }) {
  return (
    <div>
      <label
        htmlFor="recipient-search"
        className="block text-sm font-medium mb-2 text-white text-left"
      >
        Recipient
      </label>

      <div className="ff-search-Transfer">
        <img
          src="/search-outline-svgrepo-com.svg"
          alt="search icon"
          className="ff-search-icon-Transfer"
        />

        <input
          id="recipient-search"
          type="text"
          placeholder="Search by email, or phone number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ff-search-input-Transfer"
        />
      </div>

      <p className="text-xs text-gray-400 mt-1 text-left">
        Enter the recipient's username, email, or phone number.
      </p>
    </div>
  );
}