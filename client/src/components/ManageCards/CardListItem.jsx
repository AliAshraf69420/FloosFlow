import React from "react";

export default function CardListItem({ card, onRemove }) {
  return (
    <div className="ff-card-Transfer p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* Card icon */}
        <div className="w-12 h-8 rounded-md bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
            <path d="M2 10h20" strokeWidth="2" />
          </svg>
        </div>

        {/* Card info */}
        <div>
          <p className="text-white font-medium">
            {card.cardType} ending in {card.cardNumber.slice(-4)}
          </p>
          <p className="text-white/60 text-sm">
            {card.cardHolder} • Expires {card.expiryDate}
          </p>
        </div>
      </div>

      {/* Balance and remove button */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-white/60 text-xs">Balance</p>
          <p className="text-white font-semibold">
            {card.currency} {card.balance}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(card.id)}
          className="p-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400
                     hover:bg-red-500/30 transition-all duration-200"
          title="Remove card"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
