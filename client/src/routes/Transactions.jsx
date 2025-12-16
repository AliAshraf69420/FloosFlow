import React from "react";
import TransactionParentCard from "../components/Transactions/TransactionParentCard";
import TransactionSearch from "../components/Transactions/TransactionSearch";
import TransactionCard from "../components/Transactions/TransactionsCard";
import TransactionButton from "../components/Transactions/TransactionButton";
import { useUser } from "../context/UserContext";

export default function TransactionsPage() {
  const { user, loading, error } = useUser();

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions: {error}</p>;

  // Map the user transactions into the format expected by TransactionCard
  const transactions = user?.transactions?.map((tx) => ({
    name: tx.transactionName ?? "Unnamed Transaction",
    amount: `$${tx.money.toFixed(2)}`,
    to: `/TransactionDetails/${tx.id}`,
    date: tx.date,
    category: tx.category,
    message: tx.message,
    merchantName: tx.merchantName,
    transactionName: tx.transactionName,
    cardNumber: tx.card?.cardNumber,
  })) || [];

  return (
    <main className="flex-grow pt-24 px-4 sm:px-8 text-center min-h-screen overflow-y-auto pb-12 scroll-smooth">
      <TransactionParentCard>
        {/* Search */}
        <TransactionSearch placeholder="Search transactions..." />

        {/* Action Buttons */}
        <div className="flex justify-end mb-6 space-x-4">
          <TransactionButton to="/AddTransaction">
            + Add Transaction
          </TransactionButton>

          <TransactionButton to="/TransferMoney">
            $ Transfer Money
          </TransactionButton>
        </div>

        {/* Transaction Cards */}
        <div className="flex flex-col space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {transactions.map((tx, idx) => (
            <TransactionCard key={idx} {...tx} />
          ))}
        </div>
      </TransactionParentCard>
    </main>
  );
}
