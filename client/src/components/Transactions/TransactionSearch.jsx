import React from "react";

export default function TransactionSearch({ placeholder }) {
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
        className="ff-search-input-transaction w-full" // make input full width
      />
    </div>
  );
}
