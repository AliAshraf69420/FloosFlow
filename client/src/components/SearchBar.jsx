import React from 'react';
import useSearch from '../hooks/useSearch';

const SearchBar = ({ className = "", inputId = "searchInput" }) => {
  const { query, setQuery, results, loading } = useSearch();

  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: "clamp(120px, 20vw, 260px)" }}
    >
      {/* Label for search input */}
      <label htmlFor={inputId} className="sr-only">
        Search the account dashboard
      </label>

      {/* Search icon (this will be ignored by screen readers due to pointer-events-none) */}
      <img
        src="/search-outline-svgrepo-com.svg"
        alt="Search icon"
        className="absolute left-3 top-2.5 w-5 h-5 opacity-70 pointer-events-none"
      />

      {/* Search input */}
      <input
        id={inputId}
        type="text"
        placeholder="Search"
        aria-label="Search account dashboard" // Provides accessible label for screen readers
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="ff-search-input"
        aria-autocomplete="list"  // Indicates that the input will autocomplete from a list of options
        aria-controls="search-results" // Links the input field to the results list
      />

      {/* Loading state with aria-live for screen reader */}
      {loading && (
        <div 
          className="loading" 
          role="status" 
          aria-live="polite" // Ensures screen readers announce when loading is in progress
        >
          Loading...
        </div>
      )}

      {/* Display search results */}
      {results.length > 0 && (
        <ul 
          id="search-results" 
          className="search-results" 
          role="listbox" // Indicate that this is a list of options
          aria-labelledby="search-results" // Ensure the list is properly labeled
        >
          {results.map((result) => (
            <li 
              key={result.id} 
              className="search-result-item"
              role="option" // Indicates that each item is an option
              aria-selected={result.selected ? "true" : "false"} // Show which result is selected
            >
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>

  );
};

export default SearchBar;
