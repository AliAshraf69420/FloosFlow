import React from 'react';
import useSearch from './useSearch';

const SearchBar = ({ className = "", inputId = "searchInput" }) => {
  const { query, setQuery, results, loading } = useSearch();

  return (
    <div className={`relative ${className}`} style={{ width: "clamp(120px, 20vw, 260px)" }}>
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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="ff-search-input"
      />

      {/* Display loading state */}
      {loading && <div className="loading">Loading...</div>}

      {/* Display search results */}
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((result) => (
            <li key={result.id} className="search-result-item">
              {result.name} {/* Adjust based on db schema (postgresql is still getting downloaded) */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
