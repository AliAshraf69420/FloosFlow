import { useState } from "react";

export default function StyledDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const categories = [
    "Groceries",
    "Transport",
    "Utilities",
    "Entertainment",
    "Health",
    "Other"
  ];

  const handleSelect = (item) => {
    onChange(item);
    setOpen(false);
  };

  return (
    <div className="relative w-full sm:w-auto">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full ff-input text-white flex justify-between items-center px-4 py-2 rounded-xl 
                   bg-[#1f1f1f]/80 border border-white/30 hover:bg-[#1f1f1f]/60 transition"
      >
        {value}

        {/* SVG image */}
        <img
          src="/dropdown-arrow-svgrepo-com.svg"
          alt="dropdown arrow"
          className={`ml-2 w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown List */}
      {open && (
        <ul
          className="absolute z-50 mt-2 w-full bg-[#1f1f1f] border border-white/20 rounded-xl shadow-lg 
                     max-h-60 overflow-y-auto"
        >
          {categories.map((item) => (
            <li
              key={item}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer text-white hover:bg-white/10 transition"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
