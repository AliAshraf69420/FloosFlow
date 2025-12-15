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
      <button
        type="submit"
        className="w-full py-2 sm:py-3 rounded-xl bg-gradient-to-r
          from-[#62A6BF]/80 via-[#49EB8C]/80 to-[#65E67F]/80
          text-white font-semibold hover:from-[#62A6BF] hover:via-[#49EB8C] hover:to-[#65E67F]
          transition-all duration-300 hover:shadow-lg"
      >
        Send Money
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="w-full py-2 sm:py-3 rounded-xl bg-white/10 backdrop-blur-xl
          border border-white/20 text-white font-semibold
          hover:bg-white/20 transition-all duration-300"
      >
        Cancel
      </button>
    </div>
  );
}
