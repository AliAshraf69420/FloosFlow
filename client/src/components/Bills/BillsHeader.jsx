import React from "react";

export default function BillsHeader({ totalDue }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Bills & Subscriptions
        </h1>
        <p className="text-white/60 text-sm mt-1">
          Total due this month:{" "}
          <span className="text-white font-semibold">
            ${totalDue.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
}
