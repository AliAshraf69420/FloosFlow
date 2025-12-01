import React from "react";

const SearchBar = ({ className = "", inputId = "searchInput" }) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: "clamp(120px, 20vw, 260px)" }}
    >
      <label htmlFor={inputId} className="sr-only">
        Search the account dashboard
      </label>

      <img
        src="/search-outline-svgrepo-com.svg"
        alt="Search icon"
        className="absolute left-3 top-2.5 w-5 h-5 opacity-70 pointer-events-none"
      />

      <input
        id={inputId}
        type="text"
        placeholder="Search"
        aria-label="Search account dashboard"
        className="ff-search-input"
      />
    </div>
  );
};

export default SearchBar;
