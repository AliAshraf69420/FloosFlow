import React from "react";

export default function TransactionDetailItem({ label, value }) {
  return (
    <div
      className="bg-white/20 border border-white/30 rounded-xl p-4 text-center 
                 transition group-hover:bg-[#1e1e1e]/90"
    >
      <p className="text-sm text-white/60">{label}</p>

      <p className="text-lg sm:text-xl font-semibold mt-2 group-hover:text-white/60">
        {value}
      </p>
    </div>
  );
}
