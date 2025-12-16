import React from "react";
import TransactionDetailItem from "./TransactionDetailsItem";

export default function TransactionDetailsCard({ transaction }) {
  if (!transaction) return <p>No transaction data available</p>;

  return (
    <div className="ff-card p-6 lg:p-10 w-full max-w-4xl mx-auto group">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center group-hover:text-black">
        {transaction.transactionName}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <TransactionDetailItem label="Amount" value={`$${transaction.money}`} />
        <TransactionDetailItem label="Type" value={`${transaction.category}`} /> {/* You could derive if needed */}
        <TransactionDetailItem label="Where" value={transaction.merchantName} />
        <TransactionDetailItem label="Message" value={transaction.message || "No message"} />
        <TransactionDetailItem label="Date" value={new Date(transaction.date).toLocaleString()} />
        <TransactionDetailItem
          label="Card Used"
          value={transaction.cardNumber ? `**** ${transaction.cardNumber.slice(-4)}` : "N/A"}
        />
      </div>
    </div>
  );
}
