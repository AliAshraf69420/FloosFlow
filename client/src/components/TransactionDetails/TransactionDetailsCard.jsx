import React from "react";
import TransactionDetailItem from "./TransactionDetailsItem";

export default function TransactionDetailsCard() {
  return (
    <div className="ff-card p-6 lg:p-10 w-full max-w-4xl mx-auto group">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center group-hover:text-black">
        Grocery Shopping
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <TransactionDetailItem label="Amount" value="$150.00" />
        <TransactionDetailItem label="Type" value="Expense" />
        <TransactionDetailItem label="Where" value="Walmart" />
        <TransactionDetailItem label="Message" value="Weekly groceries" />
        <TransactionDetailItem label="Date" value="Oct 30, 2025" />
        <TransactionDetailItem label="Card Used" value="Visa **** 2451" />
      </div>
    </div>
  );
}
