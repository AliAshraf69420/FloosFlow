import React from "react";

export default function RemoveConfirmPopup({ isOpen, onConfirm, onCancel, card }) {
  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel}
      />

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20  rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4 text-white">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold text-center mb-4">
          Remove Card?
        </h3>

        <p className="text-center text-white/70 mb-2">
          Are you sure you want to remove this card?
        </p>

        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <p className="text-white font-medium text-center">
            {card.cardType} ending in {card.cardNumber.slice(-4)}
          </p>
          <p className="text-white/60 text-sm text-center">
            {card.cardHolder}
          </p>
        </div>

    
          <div className="grid grid-cols-2 gap-4">
          <button type="button" onClick={onCancel} className="w-full py-2 sm:py-3 rounded-xl bg-white/10 backdrop-blur-xl  border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Cancel
          </button>

          <button type="button" onClick={onConfirm} className="w-full py-2 sm:py-3 rounded-xl bg-red-500/80 text-white font-semibold hover:bg-red-500 transition-all duration-300">
           Remove
          </button>
        </div>
      </div>
    </div>
  );
}
