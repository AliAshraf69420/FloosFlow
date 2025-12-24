import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-white dark:bg-ff-bg-dark text-gray-900 dark:text-white backdrop-blur-md border-t border-gray-200 dark:border-gray-700 py-6 text-center bottom-0 left-0 w-full"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Copyright */}
        <p className="text-sm">
          <span aria-hidden="true">&copy;</span>{" "}
          <span className="sr-only">Copyright </span>
          2025 FloosFlow Inc. All rights reserved.
        </p>

        {/* Footer Navigation */}
        <nav
          className="flex justify-center space-x-6 mt-3"
          aria-label="Footer navigation"
        >
          <a
            href="#"
            className="transition-all duration-200 hover:bg-ff-gradient hover:text-white px-3 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-accent"
            aria-label="Read our Privacy Policy"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="transition-all duration-200 hover:bg-ff-gradient hover:text-white px-3 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-accent"
            aria-label="Read our Terms of Service"
          >
            Terms of Service
          </a>

          <a
            href="#"
            className="transition-all duration-200 hover:bg-ff-gradient hover:text-white px-3 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-accent"
            aria-label="Contact FloosFlow support"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};


export default Footer;
