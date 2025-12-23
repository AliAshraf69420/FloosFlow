import React from "react";
import { Link } from "react-router-dom";
export default function TransactionCard({ name, amount, to }) {
  const classes =
    "bg-gray-100 dark:bg-white/20 border border-gray-200 dark:border-white/30 rounded-xl p-5 flex justify-between items-center transition cursor-pointer hover:scale-[1.02] hover:bg-ff-accent/20";

  return to ? (
    <Link to={to} className={classes}>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{name}</p>
      <span className="text-sm text-gray-500 dark:text-white/60">{amount}</span>
    </Link>
  ) : (
    <div className={classes}>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{name}</p>
      <span className="text-sm text-gray-500 dark:text-white/60">{amount}</span>
    </div>
  );
}
