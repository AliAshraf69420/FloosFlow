import React from "react";
import { Link } from "react-router-dom";
export default function TransactionCard({ name, amount, to }) {
  const classes =
    "bg-white/20 border border-white/30 rounded-xl p-5 flex justify-between items-center transition cursor-pointer hover:scale-[1.02] hover:bg-ff-accent/20";

  return to ? (
    <Link to={to} className={classes}>
      <p className="text-lg font-semibold">{name}</p>
      <span className="text-sm text-white/60">{amount}</span>
    </Link>
  ) : (
    <div className={classes}>
      <p className="text-lg font-semibold">{name}</p>
      <span className="text-sm text-white/60">{amount}</span>
    </div>
  );
}
