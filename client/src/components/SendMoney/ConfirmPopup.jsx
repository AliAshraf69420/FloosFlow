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
    <div className="ff-popup-backdrop">
      <div className="ff-popup-overlay" onClick={onCancel} />

      <div className="ff-popup-content">
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
            <span className="ff-text-gradient font-semibold text-lg">
              {currency} {amount}
            </span>
          </div>
        </div>

        <p className="text-center text-white/60 text-sm mb-6">
          Are you sure you want to send this amount?
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button type="button" onClick={onCancel} className="ff-btn-secondary">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="ff-btn-primary">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
