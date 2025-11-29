import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E]/90 backdrop-blur-md border-t border-gray-700 text-gray-400 py-6 text-center fixed bottom-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm">&copy; 2025 FloosFlow Inc. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-3">
          <a
            href="#"
            className="transition-all duration-200 hover:bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] hover:text-black px-3 py-1 rounded-md"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="transition-all duration-200 hover:bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] hover:text-black px-3 py-1 rounded-md"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="transition-all duration-200 hover:bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] hover:text-black px-3 py-1 rounded-md"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
