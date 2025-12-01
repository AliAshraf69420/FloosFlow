import React, { useState } from 'react';
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className="bg-ff-bg-dark backdrop-blur-md text-white fixed w-full top-0 z-50 shadow-md"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between h-20 gap-4">

        {/* LOGO */}
        <Link
          to="/"
          aria-label="FloosFlow Home"
          className="inline-flex items-center flex-shrink-0"
        >
          <img
            src="/logo.svg"
            alt="FloosFlow Logo"
            className="object-contain"
            style={{
              width: "clamp(125px, 14vw, 600px)",
              height: "auto"
            }}
          />
        </Link>

        {/* CENTER MENU (fluid shrinking) */}
        <div className="hidden md:flex flex-1 min-w-0 overflow-hidden justify-center">
          <ul
            className="flex items-center gap-4 flex-shrink overflow-hidden"
            role="menubar"
            aria-label="Main menu"
          >
            {[
              ["/home", "Home"],
              ["/services", "Services"],
              ["/dashboard", "Dashboard"],
              ["/help", "Help"]
            ].map(([path, label]) => (
              <li key={label} role="none" className="flex-shrink min-w-[60px]">
                <Link
                  role="menuitem"
                  to={path}
                  className="px-2 py-1 rounded-md font-semibold transition-all duration-200 hover:bg-ff-gradient hover:text-white block text-center"
                  style={{
                    fontSize: "clamp(0.75rem, 1.4vw, 1.1rem)"
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Search + Profile */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <SearchBar />


          {/* Profile Image */}
          <Link
            to="/settings"
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
              className={`block h-0.5 w-full bg-black transition-transform duration-200 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black transition-opacity   duration-200 ${isMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black transition-transform duration-200 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </button>

          {/* MOBILE MENU */}
          <ul
            id="mobile-menu"
            className={`${isMenuOpen ? "flex" : "hidden"} flex-col absolute top-16 right-0 w-56 
                    bg-ff-bg-dark/90 p-4 space-y-2 rounded-md shadow-lg z-40`}
            role="menu"
            aria-label="Mobile Main Menu"
          >
            <li><Link to="/home" className="block px-4 py-2 rounded-md font-semibold hover:bg-ff-gradient hover:text-white">Home</Link></li>
            <li><Link to="/services" className="block px-4 py-2 rounded-md font-semibold hover:bg-ff-gradient hover:text-white">Services</Link></li>
            <li><Link to="/dashboard" className="block px-4 py-2 rounded-md font-semibold hover:bg-ff-gradient hover:text-white">Dashboard</Link></li>
            <li><Link to="/help" className="block px-4 py-2 rounded-md font-semibold hover:bg-ff-gradient hover:text-white">Help</Link></li>

            <li>
              <SearchBar className="w-full" inputId="mobileSearch" />
            </li>

            <li>
              <Link to="/settings" className="block px-4 py-2 rounded-md font-semibold hover:bg-zinc-800">Profile</Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;