export default function SearchUser({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label htmlFor="search-user" className="ff-label">
        Request From
      </label>
      <div className="ff-search-Transfer">
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
          className="ff-search-input-Transfer"
        />
      </div>
    </div>
  );
}