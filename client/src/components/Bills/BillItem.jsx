import React from "react";
import BillIcon from "./BillsIcon";

export default function BillItem({ bill, onTogglePaid }) {
  const { id, name, amount, dueDate, paid, type } = bill;

  return (
    <div
      className={`ff-card-Transfer p-4 flex items-center gap-4 transition-all duration-200 ${
        !paid ? "border-l-4 border-[#62A6BF]" : ""
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          paid
            ? "bg-white/10 text-white/60"
            : "bg-gradient-to-br from-[#62A6BF] to-[#49EB8C] text-white"
        }`}
      >
        <BillIcon type={type} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3
            className={`font-semibold ${paid ? "text-white/70" : "text-white"}`}
          >
            {name}
          </h3>
          <span className="text-white/40 text-xs">Due {dueDate}</span>
        </div>
        <p
          className={`text-sm mt-1 ${paid ? "text-white/50" : "text-white/80"}`}
        >
          ${amount.toFixed(2)}
        </p>
      </div>

      {!paid && (
        <button
          onClick={() => onTogglePaid(id)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition"
        >
          Mark paid
        </button>
      )}
    </div>
  );
}
