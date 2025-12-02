import React from "react";

export default function SearchUser({ value, onChange }) {
  return (
    <div>
      <label
        htmlFor="user-search"
        className="block text-sm font-medium mb-2 text-white text-left"
      >
        Search user
      </label>

      <div className="ff-search-Transfer">
        <img
          src="/search-outline-svgrepo-com.svg"
          alt="search icon"
          className="ff-search-icon-Transfer"
        />

        <input
          id="user-search"
          type="text"
          placeholder="Search for a user by username or email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ff-search-input-Transfer"
        />
      </div>

      <p className="text-xs text-gray-400 mt-1 text-left">
        Search by username or email.
      </p>
    </div>
  );
}
