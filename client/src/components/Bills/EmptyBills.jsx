import React from "react";

export default function EmptyBills() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 14l2-2 4 4m0 0l2-2m-2 2V4"
          />
        </svg>
      </div>
      <p className="text-white/60">No bills or subscriptions yet</p>
    </div>
  );
}
