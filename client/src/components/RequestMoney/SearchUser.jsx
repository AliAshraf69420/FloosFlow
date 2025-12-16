import { useState, useEffect, useRef } from "react";
import { usersApi } from "../../api";

export default function SearchUser({ value, onChange, onSelect }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  // Search users when input changes
  useEffect(() => {
    const searchUsers = async () => {
      if (value.length < 2) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const data = await usersApi.search(value);
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounce);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (user) => {
    onSelect(user);
    setShowDropdown(false);
  };

  return (
    <div className="space-y-2" ref={wrapperRef}>
      <label htmlFor="search-user" className="ff-label">
        Request From
      </label>
      <div className="ff-search-Transfer relative">
        <svg
          className="ff-search-icon-Transfer text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          id="search-user"
          type="text"
          placeholder="Search by name, email or phone"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          className="ff-search-input-Transfer"
        />

        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
          </div>
        )}

        {/* Dropdown results */}
        {showDropdown && results.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-ff-bg-dark border border-white/20 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {results.map((user) => (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(user)}
                  className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-ff-accent/20 flex items-center justify-center text-ff-accent font-semibold">
                    {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{user.name || "User"}</p>
                    <p className="text-white/50 text-xs">{user.email}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}