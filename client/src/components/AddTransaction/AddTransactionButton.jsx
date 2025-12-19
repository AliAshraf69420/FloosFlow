// components/AddTransaction/AddTransactionButton.jsx
import React from "react";

export default function AddTransactionButton({ children, type, ...props }) {
  return (
    <button
      type={type}
      {...props}
      className="w-full py-2 sm:py-3 rounded-xl bg-gradient-to-r 
        from-[#62A6BF]/80 via-[#49EB8C]/80 to-[#65E67F]/80
        text-black font-semibold hover:from-[#62A6BF] hover:via-[#49EB8C] hover:to-[#65E67F]
        transition-all duration-300 hover:shadow-lg"
    >
      {children}
    </button>
  );
}
