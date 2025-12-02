import React from "react";

export default function TransferButton() {
  return (
    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        type="submit"
        className="ff-btn w-full py-3 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] text-white"
      >
        Send
      </button>

      <button
        type="button"
        className="ff-btn w-full sm:w-auto px-4 py-2 bg-zinc-800 text-white text-lg font-bold"
      >
        Request
      </button>
    </div>
  );
}
