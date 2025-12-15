import React from "react";
import LoadingBar from "../Loading/Loadingbar";

export default function SendButton({ onCancel, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="pt-4 flex flex-col items-center justify-center gap-4">
        <LoadingBar />
        <span className="text-white/70 text-sm">Processing your transfer...</span>
      </div>
    );
  }

  return (
    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button type="submit" className="ff-btn-primary">
        Send Money
      </button>
      <button type="button" onClick={onCancel} className="ff-btn-secondary">
        Cancel
      </button>
    </div>
  );
}
