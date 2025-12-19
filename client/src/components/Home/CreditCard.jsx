import React from "react";

export default function CreditCard({
  cardNumber = "**** **** **** 4532",
  cardHolder = "WAEL AL ABYD",
  expiryDate = "12/27",
  balance = "25,430.00",
  currency = "EGP",
  cardType = "Visa",
}) {
  return (
    <div className="w-full max-w-[340px] aspect-[1.586/1] rounded-2xl p-5 sm:p-6 relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] shadow-2xl">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#62A6BF] to-[#49EB8C] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#65E67F] to-[#62A6BF] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="text-white font-bold text-lg tracking-wider">
            FloosFlow
          </div>
          <div className="w-10 h-8 rounded-md bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 opacity-80" />
        </div>

        <div className="mt-2">
          <p className="text-white/60 text-xs uppercase tracking-wide">Balance</p>
          <p className="text-white text-xl sm:text-2xl font-semibold">
            {currency} {balance}
          </p>
        </div>

        <div className="mt-2">
          <p className="text-white/90 text-base sm:text-lg tracking-[0.2em] font-mono">
            {cardNumber}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/60 text-[10px] uppercase tracking-wide">Card Holder</p>
            <p className="text-white text-sm font-medium tracking-wide">{cardHolder}</p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-[10px] uppercase tracking-wide">{cardType}</p>
            <p className="text-white text-sm font-medium">{expiryDate}</p>
          </div>
        </div>
      </div>

      <div className="absolute top-5 right-16 sm:right-20">
        <svg
          className="w-6 h-6 text-white/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M8.5 14.5c1.5-1.5 3.5-1.5 5 0" />
          <path d="M6 12c2.5-2.5 6.5-2.5 9 0" />
          <path d="M3.5 9.5c4-4 10.5-4 14.5 0" />
        </svg>
      </div>
    </div>
  );
}
