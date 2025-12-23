import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

export default function MobileMenu({ isOpen, onClose, links = [], user }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-ff-bg-dark/95 backdrop-blur-xl shadow-xl z-50
                    transform transition-transform duration-300 flex flex-col
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        role="menu"
        aria-label="Mobile Navigation Menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200 dark:border-white/10">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="FloosFlow Logo"
              className="w-32 object-contain"
            />
          </Link>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="ff-btn px-3 py-1 bg-white/10 hover:bg-ff-gradient rounded-md"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-white/10">
          <SearchBar />
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-2">
            {links.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={onClose}
                  className="ff-btn w-full text-left px-4 py-2 block hover:text-white"
                  role="menuitem"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile (bottom area) */}
        {user && (
          <div className="p-5 border-t border-gray-200 dark:border-white/10 flex items-center gap-3">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="User avatar"
              className="w-12 h-12 rounded-full border border-gray-300 dark:border-white/20 object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>
              <Link
                to="/settings"
                onClick={onClose}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline"
              >
                Settings
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}