import React from "react";
import { Link } from "react-router-dom";

export default function TransactionButton({ to, children, className }) {
  return (
    <Link
      to={to}
      className={`ff-btn bg-white/20 px-5 py-2 rounded-xl shadow-md hover:scale-105 ${className}`}
    >
      {children}
    </Link>
  );
}
