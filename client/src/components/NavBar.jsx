import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useNotifications } from "../context/NotificationsContext";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const isLandingPage = location.pathname === "/";
  const isNotLandingPage = !isLandingPage;

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Helper: return /login instead of actual path when on landing page
  const route = (path) => (isLandingPage ? "/login" : path);

  return (
    <nav
      className="bg-ff-bg-dark backdrop-blur-md text-white fixed w-full top-0 z-50 shadow-md"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between h-20 gap-4">
        {/* LOGO */}
        <Link
          to={route("/Home")}
          aria-label="FloosFlow Home"
          className="inline-flex items-center flex-shrink-0"
        >
          <img
            src="/logo.svg"
            alt="FloosFlow Logo"
            className="object-contain"
            style={{
              width: "clamp(125px, 14vw, 600px)",
              height: "auto",
            }}
          />
        </Link>

        {/* CENTER MENU */}
        <div className="hidden md:flex flex-1 min-w-0 overflow-hidden justify-center">
          <ul
            className="flex items-center gap-4 flex-shrink overflow-hidden"
            role="menubar"
            aria-label="Main menu"
          >
            {[
              ["/Home", "Home"],
              ["/Transactions", "Services"],
              ["/Dashboard", "Dashboard"],
              ["/Help", "Help"],
            ].map(([path, label]) => (
              <li key={label} role="none" className="flex-shrink min-w-[60px]">
                <Link
                  role="menuitem"
                  to={route(path)}
                  className="px-2 py-1 rounded-md font-semibold transition-all duration-200 hover:bg-ff-gradient hover:text-white block text-center"
                  style={{
                    fontSize: "clamp(0.75rem, 1.4vw, 1.1rem)",
                  }}
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
              aria-label="View notifications"
              className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <svg
                className="w-6 h-6 text-white/80 hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-ff-accent rounded-full" />
              )}
            </Link>

            {/* Profile */}
            <Link
              to="/Settings"
              aria-label="Open profile menu"
              className="inline-flex flex-shrink-0 w-12 h-12"
            >
              <img
                src="/mefr.webp"
                alt="User profile picture"
                className="rounded-full border-2 border-green-400 hover:scale-105 transition-transform duration-200 cursor-pointer object-cover"
              />
            </Link>
          </div>
        ) : (
          <Link
            to="/Login"
            className="ff-btn hidden md:flex w-[200px] bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          >
            Log in
          </Link>
        )}

        {/* MOBILE HAMBURGER */}
        <div className="md:hidden relative">
          <button
            onClick={toggleMenu}
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="cursor-pointer flex flex-col space-y-1 w-10 h-10 justify-center z-50 relative rounded-md px-4 py-2 font-semibold transition-all duration-200 bg-ff-gradient hover:text-white"
          >
            <span
              className={`block h-0.5 w-full bg-black transition-transform duration-200 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : ""
                }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black transition-transform duration-200 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
            ></span>
          </button>

          {/* MOBILE MENU */}
          <ul
            id="mobile-menu"
            className={`${isMenuOpen ? "flex" : "hidden"
              } flex-col absolute top-16 right-0 w-56 bg-ff-bg-dark/90 p-4 space-y-2 rounded-md shadow-lg z-40`}
            role="menu"
            aria-label="Mobile Main Menu"
          >
            <li>
              <Link
                to={route("/Home")}
                className="block px-4 py-2 rounded-md font-semibold hover:bg-ff-gradient hover:text-white"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to={route("/Transactions")}
                className="block px-4 py-2 rounded-md font-semibold hover:bg-ff-gradient hover:text-white"
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                to={route("/Dashboard")}
                className="block px-4 py-2 rounded-md font-semibold hover:bg-ff-gradient hover:text-white"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to={route("/Help")}
                className="block px-4 py-2 rounded-md font-semibold hover:bg-ff-gradient hover:text-white"
              >
                Help
              </Link>
            </li>

            {isNotLandingPage ? (
              <>
                <li className="pt-2 border-t border-zinc-800">
                  <SearchBar />
                </li>

                <li>
                  <Link
                    to="/Notifications"
                    className="block px-4 py-2 rounded-md font-semibold hover:bg-zinc-800 flex items-center justify-between"
                    onClick={toggleMenu}
                  >
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <span className="min-w-[20px] h-5 px-1.5 bg-ff-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/Settings"
                    className="block px-4 py-2 rounded-md font-semibold hover:bg-zinc-800"
                  >
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <Link
                to="/Login"
                className="ff-btn w-[200px] bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                onClick={toggleMenu}
              >
                Log in
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
