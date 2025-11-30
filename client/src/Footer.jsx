import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
      }}
      className="backdrop-blur-md border-t border-gray-700 py-6 text-center fixed bottom-0 left-0 w-full"
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm">&copy; 2025 FloosFlow Inc. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-3">
          <a
            href="#"
            className="transition-all duration-200 hover:bg-gradient-to-r from-primary via-secondary to-accent hover:text-black px-3 py-1 rounded-md"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="transition-all duration-200 hover:bg-gradient-to-r from-primary via-secondary to-accent hover:text-black px-3 py-1 rounded-md"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="transition-all duration-200 hover:bg-gradient-to-r from-primary via-secondary to-accent hover:text-black px-3 py-1 rounded-md"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
