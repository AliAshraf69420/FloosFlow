import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../context/NotificationsContext";
import SearchBar from "./SearchBar";
import { useUser } from "../context/UserContext";

const NavSpinner = () => (
  <div className="flex items-center justify-center p-7">
    <div className="w-6 h-6 border-2 border-white/20 border-t-ff-accent rounded-full animate-spin" />
  </div>
);

const NavBar = () => {
  const location = useLocation();
  const { unreadCount } = useNotifications();
  const isLandingPage = location.pathname === "/";
  const isNotLandingPage = !isLandingPage;
  const { user, loading, error } = useUser();

  if (loading) return <NavSpinner />;
  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Helper: return /login instead of actual path when on landing page
  const route = (path) => (isLandingPage ? "/login" : path);

return (
  <nav
    className="bg-white dark:bg-ff-bg-dark backdrop-blur-md text-gray-900 dark:text-white fixed w-full top-0 z-50 shadow-md border-b border-gray-200 dark:border-transparent"
    role="navigation"
    aria-label="Main Navigation"
  >
    <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between h-20 gap-4">
      {/* LOGO */}
      <Link
        to={route("/Home")}
        aria-label="FloosFlow Home"
        className="inline-flex items-center flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-accent rounded-md"
      >
        <img
          src="/logo.svg"
          alt="FloosFlow Logo"
          className="object-contain"
          style={{ width: "clamp(125px, 14vw, 600px)", height: "auto" }}
        />
      </Link>

      {/* CENTER MENU */}
      <div className="hidden md:flex flex-1 min-w-0 overflow-hidden justify-center">
        <ul
          className="flex items-center gap-4 flex-shrink overflow-hidden"
          role="menubar"
          aria-label="Primary navigation"
        >
          {[
            ["/Home", "Home"],
            ["/Transactions", "Services"],
            ["/Dashboard", "Dashboard"],
            ["/Help", "Help"],
          ]
            .concat(user?.role === "ADMIN" ? [["/Admin", "Admin Panel"]] : [])
            .map(([path, label]) => (
              <li key={label} role="none" className="flex-shrink min-w-[60px]">
                <Link
                  to={route(path)}
                  role="menuitem"
                  tabIndex={0}
                  className="px-2 py-1 rounded-md font-semibold transition-all duration-200 hover:bg-ff-gradient hover:text-white block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-accent"
                  style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.1rem)" }}
                >
                  {label}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* RIGHT SIDE */}
      {isNotLandingPage ? (
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <SearchBar />

          {/* Notifications */}
          <Link
            to="/Notifications"
            aria-label={`View notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-accent"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  aria-hidden="true"
                  className="absolute top-1 right-1 w-2 h-2 bg-ff-accent rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                />
              )}
            </AnimatePresence>
          </Link>

          {/* Profile */}
          <Link
            to="/Settings"
            aria-label="Open profile settings"
            className="inline-flex flex-shrink-0 w-12 h-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-accent rounded-full"
          >
            <img
              src={user?.profileImage ?? "../../assets/defaultimage.png"}
              alt="User profile picture"
              className="rounded-full border-2 border-green-400 hover:scale-105 transition-transform duration-200 object-cover"
            />
          </Link>
        </div>
      ) : (
        <Link
          to="/Login"
          className="ff-btn hidden md:flex w-[200px] bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Log in
        </Link>
      )}

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden relative">
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-haspopup="menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onKeyDown={(e) => e.key === "Escape" && setIsMenuOpen(false)}
          className="cursor-pointer flex flex-col space-y-1 w-10 h-10 justify-center z-50 relative rounded-md px-4 py-2 font-semibold transition-all duration-200 bg-ff-gradient focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className={`block h-0.5 w-full bg-black transition-transform ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block h-0.5 w-full bg-black transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-full bg-black transition-transform ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation menu"
              className="flex flex-col absolute top-16 right-0 w-56 bg-white dark:bg-ff-bg-dark/90 p-4 space-y-2 rounded-md shadow-lg z-40 border border-gray-200 dark:border-transparent"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {[
                ["/Home", "Home"],
                ["/Transactions", "Services"],
                ["/Dashboard", "Dashboard"],
                ["/Help", "Help"],
              ].map(([path, label]) => (
                <li key={label} role="none">
                  <Link
                    role="menuitem"
                    to={route(path)}
                    tabIndex={0}
                    className="block px-4 py-2 rounded-md font-semibold hover:bg-ff-gradient hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-accent"
                    onClick={toggleMenu}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {user?.role === "ADMIN" && (
                <li role="none">
                  <Link
                    role="menuitem"
                    to="/Admin"
                    className="block px-4 py-2 rounded-md font-semibold hover:bg-ff-gradient hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-accent"
                    onClick={toggleMenu}
                  >
                    Admin Panel
                  </Link>
                </li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  </nav>
);
};

export default NavBar;
