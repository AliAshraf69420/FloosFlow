import React from "react";

export default function ConfirmPopup({
  isOpen,
  onConfirm,
  onCancel,
  recipient,
  amount,
  currency = "EGP",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/2 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4 text-white">
        <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Confirm Transfer
        </h3>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-white/70">Recipient</span>
            <span className="font-medium">{recipient}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-white/70">Amount</span>
            <span className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F]">
              {currency} {amount}
            </span>
          </div>
        </div>

        <p className="text-center text-white/60 text-sm mb-6">
          Are you sure you want to send this amount?
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2 sm:py-3 rounded-xl bg-white/10 backdrop-blur-xl
              border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-2 sm:py-3 rounded-xl bg-gradient-to-r from-[#62A6BF]/80 via-[#49EB8C]/80 to-[#65E67F]/80 text-white font-semibold hover:from-[#62A6BF] hover:via-[#49EB8C] hover:to-[#65E67F] transition-all duration-300 hover:shadow-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
